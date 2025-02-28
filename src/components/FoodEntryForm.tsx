
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, Camera, Scan, Text, RefreshCw, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useFood, Food } from '@/context/FoodContext';
import { v4 as uuidv4 } from 'uuid';

const FoodEntryForm: React.FC = () => {
  const { addFood } = useFood();
  const [activeTab, setActiveTab] = useState('text');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Voice recognition function (simulated for now)
  const startVoiceRecognition = () => {
    setIsListening(true);
    setRecognizedText('');
    
    // Simulate voice recognition
    toast.info('Escuchando... diga el nombre del alimento y los nutrientes.');
    
    setTimeout(() => {
      const simulatedRecognition = 'Una manzana con aproximadamente 100 calorías, 0.5g de proteína, 25g de carbohidratos y 0.3g de grasa.';
      setRecognizedText(simulatedRecognition);
      setIsListening(false);
      
      // Auto-populate form fields based on recognized text
      setFoodName('Manzana');
      setCalories('100');
      setProtein('0.5');
      setCarbs('25');
      setFat('0.3');
      
      toast.success('¡Audio reconocido con éxito!');
    }, 2000);
  };
  
  // Camera handling
  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        toast.error('No se pudo acceder a la cámara.');
        console.error(err);
      }
    }
  };
  
  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Simulate AI processing
        processImage(canvas.toDataURL('image/png'));
      }
    }
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Simulate AI processing
          processImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Simulate barcode scanning
  const scanBarcode = () => {
    setIsProcessing(true);
    toast.info('Escaneando código de barras...');
    
    setTimeout(() => {
      setIsProcessing(false);
      setFoodName('Yogur Griego');
      setCalories('130');
      setProtein('12');
      setCarbs('8');
      setFat('4');
      toast.success('¡Producto identificado con éxito!');
    }, 2000);
  };
  
  // Simulate AI image processing
  const processImage = (imageData: string) => {
    setIsProcessing(true);
    toast.info('Analizando imagen con IA...');
    
    setTimeout(() => {
      setIsProcessing(false);
      setFoodName('Ensalada Mixta');
      setCalories('220');
      setProtein('8');
      setCarbs('25');
      setFat('10');
      toast.success('¡Alimento identificado con éxito!');
    }, 3000);
  };
  
  // Reset form
  const resetForm = () => {
    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setRecognizedText('');
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodName || !calories) {
      toast.error('El nombre y las calorías son obligatorios.');
      return;
    }
    
    const newFood: Food = {
      id: uuidv4(),
      name: foodName,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
      date: new Date()
    };
    
    addFood(newFood);
    toast.success(`¡${foodName} añadido correctamente!`);
    resetForm();
  };
  
  return (
    <Card className="glass-card animate-appear">
      <CardHeader>
        <CardTitle className="text-xl font-medium">Registrar Alimento</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Text className="h-4 w-4" />
              <span className="hidden sm:inline">Texto</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span className="hidden sm:inline">Voz</span>
            </TabsTrigger>
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Foto</span>
            </TabsTrigger>
            <TabsTrigger value="barcode" className="flex items-center gap-2">
              <Scan className="h-4 w-4" />
              <span className="hidden sm:inline">Barcode</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food-name">Nombre del alimento</Label>
                <Input 
                  id="food-name" 
                  placeholder="Ej. Pollo asado" 
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="calories">Calorías (kcal)</Label>
                <Input 
                  id="calories" 
                  type="number" 
                  placeholder="Ej. 250" 
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protein">Proteínas (g)</Label>
                  <Input 
                    id="protein" 
                    type="number" 
                    placeholder="Ej. 25" 
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbohidratos (g)</Label>
                  <Input 
                    id="carbs" 
                    type="number" 
                    placeholder="Ej. 0" 
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fat">Grasas (g)</Label>
                  <Input 
                    id="fat" 
                    type="number" 
                    placeholder="Ej. 12" 
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Limpiar
                </Button>
                <Button type="submit">
                  Añadir
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="voice" className="mt-0">
            <div className="space-y-4">
              <div className={`p-8 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${isListening ? 'bg-accent/20' : 'bg-secondary/30'}`}>
                {recognizedText ? (
                  <div className="space-y-4 w-full">
                    <p className="text-center text-sm text-muted-foreground">Texto reconocido:</p>
                    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-md">
                      <p className="text-sm">{recognizedText}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      {isListening 
                        ? 'Escuchando... Hable claramente.'
                        : 'Pulse el botón para comenzar a grabar'}
                    </p>
                    <Button 
                      type="button" 
                      variant={isListening ? "destructive" : "default"}
                      size="lg"
                      className="rounded-full h-16 w-16 flex items-center justify-center"
                      onClick={startVoiceRecognition}
                      disabled={isListening}
                    >
                      <Mic className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} />
                    </Button>
                  </div>
                )}
              </div>
              
              {recognizedText && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
                  <div className="space-y-2">
                    <Label htmlFor="voice-food-name">Nombre del alimento</Label>
                    <Input 
                      id="voice-food-name" 
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="voice-calories">Calorías</Label>
                      <Input 
                        id="voice-calories" 
                        type="number" 
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voice-protein">Proteínas</Label>
                      <Input 
                        id="voice-protein" 
                        type="number" 
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voice-carbs">Carbos</Label>
                      <Input 
                        id="voice-carbs" 
                        type="number" 
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voice-fat">Grasas</Label>
                      <Input 
                        id="voice-fat" 
                        type="number" 
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => {
                      setRecognizedText('');
                      resetForm();
                    }}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reiniciar
                    </Button>
                    <Button type="submit">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Añadir
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </TabsContent>

          <TabsContent value="camera" className="mt-0">
            <div className="space-y-4">
              {cameraActive ? (
                <div className="relative">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full rounded-lg overflow-hidden border border-border"
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button 
                      variant="secondary"
                      size="sm" 
                      onClick={toggleCamera}
                    >
                      Cerrar
                    </Button>
                    <Button 
                      variant="default"
                      size="sm" 
                      onClick={captureImage}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Procesando...' : 'Capturar'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="p-8 bg-secondary/30 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={toggleCamera}
                  >
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Usar cámara</p>
                  </div>
                  
                  <div 
                    className="p-8 bg-secondary/30 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Subir imagen</p>
                  </div>
                </div>
              )}

              <canvas ref={canvasRef} className="hidden" />
              
              {(isProcessing || foodName) && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
                  {isProcessing ? (
                    <div className="flex justify-center p-4">
                      <div className="animate-spin h-6 w-6 border-2 border-accent border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="camera-food-name">Alimento identificado</Label>
                        <Input 
                          id="camera-food-name" 
                          value={foodName}
                          onChange={(e) => setFoodName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="camera-calories">Calorías</Label>
                          <Input 
                            id="camera-calories" 
                            type="number" 
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="camera-protein">Proteínas</Label>
                          <Input 
                            id="camera-protein" 
                            type="number" 
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="camera-carbs">Carbos</Label>
                          <Input 
                            id="camera-carbs" 
                            type="number" 
                            value={carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="camera-fat">Grasas</Label>
                          <Input 
                            id="camera-fat" 
                            type="number" 
                            value={fat}
                            onChange={(e) => setFat(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={resetForm}>
                          Limpiar
                        </Button>
                        <Button type="submit">
                          Añadir
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              )}
            </div>
          </TabsContent>

          <TabsContent value="barcode" className="mt-0">
            <div className="space-y-4">
              <div 
                className={`p-8 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${isProcessing ? 'bg-accent/20' : 'bg-secondary/30'}`}
              >
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {isProcessing 
                      ? 'Escaneando...'
                      : 'Pulse el botón para escanear un código de barras'}
                  </p>
                  <Button 
                    type="button" 
                    variant={isProcessing ? "outline" : "default"}
                    size="lg"
                    onClick={scanBarcode}
                    disabled={isProcessing}
                  >
                    <Scan className={`h-5 w-5 mr-2 ${isProcessing ? 'animate-pulse' : ''}`} />
                    Escanear código de barras
                  </Button>
                </div>
              </div>
              
              {!isProcessing && foodName && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
                  <div className="space-y-2">
                    <Label htmlFor="barcode-food-name">Producto escaneado</Label>
                    <Input 
                      id="barcode-food-name" 
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="barcode-calories">Calorías</Label>
                      <Input 
                        id="barcode-calories" 
                        type="number" 
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="barcode-protein">Proteínas</Label>
                      <Input 
                        id="barcode-protein" 
                        type="number" 
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="barcode-carbs">Carbos</Label>
                      <Input 
                        id="barcode-carbs" 
                        type="number" 
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="barcode-fat">Grasas</Label>
                      <Input 
                        id="barcode-fat" 
                        type="number" 
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Limpiar
                    </Button>
                    <Button type="submit">
                      Añadir
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FoodEntryForm;
