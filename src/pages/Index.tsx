
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Camera, Mic, Pencil } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid gap-4 px-4 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent-foreground">
                Lanzamiento Beta
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                NutriScribe: Seguimiento Nutricional Inteligente
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Registra tus alimentos de manera rápida y sencilla con texto, voz, fotos o códigos de barras. 
                Obtén un análisis completo de tus macronutrientes en segundos.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/dashboard">
                  <Button className="w-full min-[400px]:w-auto" size="lg">
                    Comenzar ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button className="w-full min-[400px]:w-auto" variant="outline" size="lg">
                    Ver demostración
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="glass-card rounded-2xl p-4 animate-appear">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center gap-2">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Pencil className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Texto</h3>
                    <p className="text-xs text-muted-foreground">Escribe manualmente</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center gap-2">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Mic className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Voz</h3>
                    <p className="text-xs text-muted-foreground">Dicta los alimentos</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center gap-2">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Foto</h3>
                    <p className="text-xs text-muted-foreground">Captura tus comidas</p>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-center gap-2">
                    <div className="bg-primary/10 rounded-full p-3">
                      <BarChart2 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Análisis</h3>
                    <p className="text-xs text-muted-foreground">Visualiza tus datos</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
                  <h3 className="font-medium text-center mb-3">Vista previa de macronutrientes</h3>
                  <div className="flex justify-between text-sm">
                    <div className="text-center">
                      <div className="font-medium text-xs text-muted-foreground">Calorías</div>
                      <div className="text-lg font-bold">2,134</div>
                      <div className="text-xs text-muted-foreground">kcal</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-xs text-indigo-600">Proteínas</div>
                      <div className="text-lg font-bold">132</div>
                      <div className="text-xs text-muted-foreground">gramos</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-xs text-emerald-600">Carbos</div>
                      <div className="text-lg font-bold">185</div>
                      <div className="text-xs text-muted-foreground">gramos</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-xs text-amber-600">Grasas</div>
                      <div className="text-lg font-bold">64</div>
                      <div className="text-xs text-muted-foreground">gramos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Funcionalidades
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Múltiples formas de registro</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                NutriScribe te permite registrar tus alimentos de la manera que prefieras, adaptándose a tu estilo de vida.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="glass-card rounded-xl p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Pencil className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Texto</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Registro manual rápido y preciso de tus alimentos y sus valores nutricionales.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Voz</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Dicta los alimentos que consumes y la IA reconocerá automáticamente sus valores nutricionales.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Foto</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Toma una foto de tu comida y nuestra IA identificará automáticamente el alimento y sus nutrientes.
              </p>
            </div>
            <div className="glass-card rounded-xl p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M5 7 H19 M5 17 H19 M9 3 L6 21 M14 3 L17 21" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Código de barras</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Escanea el código de barras de productos envasados para obtener información nutricional precisa.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/dashboard">
              <Button size="lg">
                Comenzar a registrar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
