
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import UserMenu from '@/components/UserMenu';

const Index = () => {
  const slogans = [
    "Captura, come, registra – Tu salud en cada bocado",
    "Calorías simplificadas, potenciadas por IA",
    "Tu cámara sabe lo que comes",
    "Nutrición inteligente, sin adivinanzas",
    "Cada comida cuenta – Regístrala sin esfuerzo",
    "Nutre tu cuerpo, guiado por IA",
    "La forma más fácil de contar calorías – solo captura",
    "Mira tu comida, conoce tu energía",
    "Come más inteligente, registra más rápido",
    "Del plato al progreso",
    "Cada ingrediente, cada nutriente – revelado",
    "Donde la IA encuentra hábitos saludables",
    "Tu diario de alimentos, reinventado",
    "La IA que ve lo que comes",
    "Comer saludable, sin complicaciones",
    "Registrando tus comidas, más inteligente que nunca",
    "Conocimiento nutricional, en cada captura",
    "Escanéalo. Conócelo. Contrólalo",
    "Reconocimiento de alimentos hecho mágico",
    "Nutrición impulsada por IA en tu bolsillo"
  ];

  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex(prevIndex => (prevIndex + 1) % slogans.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <header className="w-full py-4 px-6">
        <div className="container mx-auto flex justify-end">
          <UserMenu />
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="container px-4 text-center max-w-3xl">
          <div className="space-y-12">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent-foreground">
              Nutrición inteligente
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter animate-appear">
              CaloriePilot
            </h1>
            
            <div className="h-16">
              <p className="text-xl text-muted-foreground animate-fade-in">
                {slogans[currentSloganIndex]}
              </p>
            </div>
            
            <div className="flex justify-center mt-12">
              <Link to="/dashboard" className="pulse-on-hover">
                <Button className="w-full px-8 py-8 text-xl rounded-xl" size="lg">
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
