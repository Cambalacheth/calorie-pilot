
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const SettingsPage = () => {
  const { user } = useAuth();
  const [calorieGoal, setCalorieGoal] = useState('2000');
  const [proteinGoal, setProteinGoal] = useState('150');
  const [carbsGoal, setCarbsGoal] = useState('200');
  const [fatGoal, setFatGoal] = useState('65');
  const [loading, setLoading] = useState(false);
  
  // Fetch user profile data when component mounts or user changes
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('calorie_goal, protein_goal, carbs_goal, fat_goal')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setCalorieGoal(data.calorie_goal?.toString() || '2000');
          setProteinGoal(data.protein_goal?.toString() || '150');
          setCarbsGoal(data.carbs_goal?.toString() || '200');
          setFatGoal(data.fat_goal?.toString() || '65');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error al cargar tus objetivos nutricionales');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);
  
  const handleSaveNutritionGoals = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Debes iniciar sesión para guardar tus objetivos');
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          calorie_goal: parseInt(calorieGoal),
          protein_goal: parseInt(proteinGoal),
          carbs_goal: parseInt(carbsGoal),
          fat_goal: parseInt(fatGoal),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success('Objetivos nutricionales guardados correctamente');
      
      // Dispatch a custom event to notify other components that settings were updated
      window.dispatchEvent(new Event('settings-updated'));
      
    } catch (error) {
      console.error('Error saving nutrition goals:', error);
      toast.error('Error al guardar tus objetivos nutricionales');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetGoals = () => {
    setCalorieGoal('2000');
    setProteinGoal('150');
    setCarbsGoal('200');
    setFatGoal('65');
    toast.info('Objetivos nutricionales restablecidos');
  };
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Ajustes</h1>
          
          <Tabs defaultValue="nutrition" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="nutrition">Nutrición</TabsTrigger>
              <TabsTrigger value="account">Cuenta</TabsTrigger>
              <TabsTrigger value="appearance">Apariencia</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nutrition" className="animate-fade-in space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Objetivos Nutricionales</CardTitle>
                  <CardDescription>
                    Establece tus objetivos diarios de calorías y macronutrientes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveNutritionGoals} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="calorie-goal">Objetivo de calorías (kcal)</Label>
                      <Input 
                        id="calorie-goal" 
                        type="number" 
                        value={calorieGoal}
                        onChange={(e) => setCalorieGoal(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="protein-goal">Proteínas (g)</Label>
                        <Input 
                          id="protein-goal" 
                          type="number" 
                          value={proteinGoal}
                          onChange={(e) => setProteinGoal(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="carbs-goal">Carbohidratos (g)</Label>
                        <Input 
                          id="carbs-goal" 
                          type="number" 
                          value={carbsGoal}
                          onChange={(e) => setCarbsGoal(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fat-goal">Grasas (g)</Label>
                        <Input 
                          id="fat-goal" 
                          type="number" 
                          value={fatGoal}
                          onChange={(e) => setFatGoal(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                    
                    <CardFooter className="px-0 pt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={handleResetGoals} disabled={loading}>
                        Restablecer valores
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar cambios'}
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Preferencias de Alimentos</CardTitle>
                  <CardDescription>
                    Configura tus preferencias alimenticias y restricciones.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Próximamente podrás configurar preferencias dietéticas y restricciones alimenticias 
                    para recibir recomendaciones personalizadas.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="animate-fade-in">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Cuenta de Usuario</CardTitle>
                  <CardDescription>
                    Gestiona tu información personal y preferencias de cuenta.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {user ? `Conectado como: ${user.email}` : 'Próximamente podrás registrarte con una cuenta y sincronizar tus datos en varios dispositivos.'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="animate-fade-in">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Apariencia</CardTitle>
                  <CardDescription>
                    Personaliza la apariencia y el tema de la aplicación.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Próximamente podrás elegir entre temas claros, oscuros y personalizados.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
