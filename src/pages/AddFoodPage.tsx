
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, Search, Barcode, History, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Food, useFood } from '@/context/FoodContext';
import { Label } from '@/components/ui/label';
import FoodSearch from '@/components/FoodSearch';

const AddFoodPage = () => {
  const navigate = useNavigate();
  const { foods, addFood } = useFood();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [foodDetails, setFoodDetails] = useState<Partial<Food>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealType: 'snack',
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Recent foods (last 5)
  const recentFoods = [...foods].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      
      // In a real app, this would trigger AI analysis
      // For now, simulating AI detection after a delay
      setTimeout(() => {
        setFoodDetails({
          ...foodDetails,
          name: 'Detected Food',
          calories: 350,
          protein: 15,
          carbs: 40,
          fat: 10,
        });
        toast.success('¡Alimento detectado! Verifica los detalles.');
      }, 1500);
    }
  };

  const handleVoiceInput = () => {
    // Simulate voice recognition (in real app would use WebSpeech API)
    toast.info('Escuchando...');
    setTimeout(() => {
      setFoodDetails({
        ...foodDetails,
        name: 'Manzana grande',
        calories: 120,
        protein: 1,
        carbs: 30,
        fat: 0,
      });
      toast.success('¡Detectado por voz! Verifica los detalles.');
    }, 2000);
  };

  const handleBarcodeScanner = () => {
    // In a real app, would use barcode scanning library
    toast.info('Escaneando código de barras...');
    setTimeout(() => {
      setFoodDetails({
        ...foodDetails,
        name: 'Yogur Griego',
        calories: 150,
        protein: 15,
        carbs: 10,
        fat: 5,
      });
      toast.success('¡Producto escaneado! Verifica los detalles.');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFoodDetails({
      ...foodDetails,
      [name]: name === 'name' ? value : Number(value),
    });
  };

  const handleMealTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFoodDetails({
      ...foodDetails,
      mealType: e.target.value,
    });
  };

  const handleAddFood = () => {
    if (!foodDetails.name) {
      toast.error('Por favor ingresa un nombre para el alimento');
      return;
    }

    const newFood: Food = {
      id: uuidv4(),
      name: foodDetails.name || '',
      calories: foodDetails.calories || 0,
      protein: foodDetails.protein || 0,
      carbs: foodDetails.carbs || 0,
      fat: foodDetails.fat || 0,
      date: new Date(),
      mealType: foodDetails.mealType || 'snack',
      image: previewUrl || undefined,
    };

    addFood(newFood);
    toast.success('¡Alimento añadido correctamente!');
    navigate('/dashboard');
  };

  const addRecentFood = (food: Food) => {
    const newFood = {
      ...food,
      id: uuidv4(),
      date: new Date(),
    };
    addFood(newFood);
    toast.success('¡Alimento añadido correctamente!');
    navigate('/dashboard');
  };

  const handleFoodSelect = (selectedFood: Food) => {
    setFoodDetails({
      name: selectedFood.name,
      calories: selectedFood.calories,
      protein: selectedFood.protein,
      carbs: selectedFood.carbs,
      fat: selectedFood.fat,
      mealType: foodDetails.mealType || selectedFood.mealType || 'snack',
    });
    
    if (selectedFood.image) {
      setPreviewUrl(selectedFood.image);
    }
    
    setSelectedMethod('manual');
    toast.success('¡Alimento seleccionado! Puedes editar los detalles si lo necesitas.');
  };

  return (
    <div className="container max-w-md mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#212121]">Añadir Alimento</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <FoodSearch onFoodSelect={handleFoodSelect} placeholder="Buscar alimentos previos..." />
      </div>
      
      {/* Quick selector methods */}
      {!selectedMethod && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto border-2 hover:border-[#FF7043] hover:bg-orange-50"
            onClick={() => setSelectedMethod('photo')}
          >
            <Camera size={32} className="mb-2 text-[#FF7043]" />
            <span>Subir Foto</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto border-2 hover:border-[#FF7043] hover:bg-orange-50"
            onClick={() => setSelectedMethod('voice')}
          >
            <Mic size={32} className="mb-2 text-[#FF7043]" />
            <span>Entrada por Voz</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto border-2 hover:border-[#FF7043] hover:bg-orange-50"
            onClick={() => setSelectedMethod('manual')}
          >
            <Search size={32} className="mb-2 text-[#FF7043]" />
            <span>Búsqueda Manual</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center p-6 h-auto border-2 hover:border-[#FF7043] hover:bg-orange-50"
            onClick={() => setSelectedMethod('barcode')}
          >
            <Barcode size={32} className="mb-2 text-[#FF7043]" />
            <span>Escanear Código</span>
          </Button>
        </div>
      )}
      
      {/* Photo upload */}
      {selectedMethod === 'photo' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Subir Foto</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedMethod(null)}
            >
              Cancelar
            </Button>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {previewUrl ? (
              <div className="space-y-2">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="mx-auto max-h-48 rounded-md"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  Cambiar Imagen
                </Button>
              </div>
            ) : (
              <>
                <Camera size={40} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500 mb-2">
                  Sube una foto del alimento
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="food-photo"
                  onChange={handleFileChange}
                />
                <Label
                  htmlFor="food-photo"
                  className="bg-[#FF7043] text-white px-4 py-2 rounded-md inline-block cursor-pointer hover:bg-orange-600"
                >
                  Seleccionar Imagen
                </Label>
              </>
            )}
          </div>
          
          {/* Food details form */}
          {previewUrl && (
            <div className="mt-4 space-y-4">
              <h3 className="font-medium">Detalles del alimento</h3>
              <FoodDetailsForm 
                foodDetails={foodDetails} 
                handleInputChange={handleInputChange}
                handleMealTypeChange={handleMealTypeChange}
              />
              <Button 
                className="w-full bg-[#FF7043] hover:bg-orange-600" 
                onClick={handleAddFood}
              >
                <Check className="mr-2" /> Confirmar
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Voice input */}
      {selectedMethod === 'voice' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Entrada por Voz</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedMethod(null)}
            >
              Cancelar
            </Button>
          </div>
          
          <div className="p-8 flex flex-col items-center justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full w-24 h-24 flex items-center justify-center"
              onClick={handleVoiceInput}
            >
              <Mic size={40} className="text-[#FF7043]" />
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Presiona el micrófono y describe el alimento
            </p>
          </div>
          
          {/* Food details form if voice detected something */}
          {foodDetails.name && selectedMethod === 'voice' && (
            <div className="mt-4 space-y-4">
              <h3 className="font-medium">Detalles del alimento</h3>
              <FoodDetailsForm 
                foodDetails={foodDetails} 
                handleInputChange={handleInputChange}
                handleMealTypeChange={handleMealTypeChange}
              />
              <Button 
                className="w-full bg-[#FF7043] hover:bg-orange-600" 
                onClick={handleAddFood}
              >
                <Check className="mr-2" /> Confirmar
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Manual entry */}
      {selectedMethod === 'manual' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Búsqueda Manual</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedMethod(null)}
            >
              Cancelar
            </Button>
          </div>
          
          <FoodDetailsForm 
            foodDetails={foodDetails} 
            handleInputChange={handleInputChange}
            handleMealTypeChange={handleMealTypeChange}
          />
          
          <Button 
            className="w-full bg-[#FF7043] hover:bg-orange-600" 
            onClick={handleAddFood}
          >
            <Check className="mr-2" /> Añadir Alimento
          </Button>
        </div>
      )}
      
      {/* Barcode scanner */}
      {selectedMethod === 'barcode' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Escanear Código</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedMethod(null)}
            >
              Cancelar
            </Button>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center">
            <Barcode size={80} className="mb-4 text-gray-400" />
            <p className="text-sm text-gray-500 mb-4 text-center">
              Posiciona el código de barras frente a la cámara
            </p>
            <Button 
              onClick={handleBarcodeScanner}
              className="bg-[#FF7043] hover:bg-orange-600"
            >
              Iniciar Escáner
            </Button>
          </div>
          
          {/* Food details form if barcode detected something */}
          {foodDetails.name && selectedMethod === 'barcode' && (
            <div className="mt-4 space-y-4">
              <h3 className="font-medium">Detalles del alimento</h3>
              <FoodDetailsForm 
                foodDetails={foodDetails} 
                handleInputChange={handleInputChange}
                handleMealTypeChange={handleMealTypeChange}
              />
              <Button 
                className="w-full bg-[#FF7043] hover:bg-orange-600" 
                onClick={handleAddFood}
              >
                <Check className="mr-2" /> Confirmar
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Recent Foods */}
      {!selectedMethod && recentFoods.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center mb-2">
            <History className="h-5 w-5 mr-2 text-[#FF7043]" />
            <h2 className="text-lg font-semibold">Alimentos Recientes</h2>
          </div>
          <div className="space-y-2">
            {recentFoods.map(food => (
              <div 
                key={food.id} 
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => addRecentFood(food)}
              >
                {food.image && (
                  <img src={food.image} alt={food.name} className="w-12 h-12 rounded-md object-cover mr-3" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-500">{food.calories} kcal</p>
                </div>
                <Button size="sm" variant="ghost" className="text-[#FF7043]">
                  <Check size={16} className="mr-1" /> Añadir
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Food Details Form Component
interface FoodDetailsFormProps {
  foodDetails: Partial<Food>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMealTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FoodDetailsForm: React.FC<FoodDetailsFormProps> = ({ 
  foodDetails, 
  handleInputChange,
  handleMealTypeChange 
}) => {
  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="name">Nombre del alimento</Label>
        <Input 
          id="name"
          name="name"
          value={foodDetails.name || ''}
          onChange={handleInputChange}
          placeholder="Nombre del alimento"
        />
      </div>
      
      <div>
        <Label htmlFor="calories">Calorías (kcal)</Label>
        <Input 
          id="calories"
          name="calories"
          type="number"
          value={foodDetails.calories || ''}
          onChange={handleInputChange}
          placeholder="0"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor="protein">Proteínas (g)</Label>
          <Input 
            id="protein"
            name="protein"
            type="number"
            value={foodDetails.protein || ''}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="carbs">Carbohidratos (g)</Label>
          <Input 
            id="carbs"
            name="carbs"
            type="number"
            value={foodDetails.carbs || ''}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="fat">Grasas (g)</Label>
          <Input 
            id="fat"
            name="fat"
            type="number"
            value={foodDetails.fat || ''}
            onChange={handleInputChange}
            placeholder="0"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="mealType">Tiempo de comida</Label>
        <select
          id="mealType"
          name="mealType"
          value={foodDetails.mealType || 'snack'}
          onChange={handleMealTypeChange}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="breakfast">Desayuno</option>
          <option value="lunch">Almuerzo</option>
          <option value="dinner">Cena</option>
          <option value="snack">Snack</option>
        </select>
      </div>
    </div>
  );
};

export default AddFoodPage;
