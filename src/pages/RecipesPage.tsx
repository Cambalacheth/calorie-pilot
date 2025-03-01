
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/Layout';
import { Clock, Utensils, Users } from 'lucide-react';

const RecipesPage = () => {
  // Sample recipe data - in a real app, this would come from an API or database
  const recipes = [
    {
      id: 1,
      title: "Ensalada Mediterránea",
      description: "Una ensalada fresca con tomates, pepino, aceitunas y queso feta",
      prepTime: "15 min",
      calories: 320,
      servings: 2,
      image: "/placeholder.svg",
      category: "saludable"
    },
    {
      id: 2,
      title: "Tortilla Española",
      description: "Clásica tortilla de patatas con cebolla",
      prepTime: "30 min",
      calories: 450,
      servings: 4,
      image: "/placeholder.svg",
      category: "tradicional"
    },
    {
      id: 3,
      title: "Batido Verde",
      description: "Batido nutritivo con espinacas, plátano y leche de almendras",
      prepTime: "5 min",
      calories: 220,
      servings: 1,
      image: "/placeholder.svg",
      category: "saludable"
    },
    {
      id: 4,
      title: "Paella Valenciana",
      description: "Paella tradicional con arroz, pollo y verduras",
      prepTime: "45 min",
      calories: 520,
      servings: 6,
      image: "/placeholder.svg",
      category: "tradicional"
    }
  ];

  return (
    <Layout>
      <div className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-4">Recetas</h1>
        
        <Tabs defaultValue="all" className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="saludable">Saludables</TabsTrigger>
            <TabsTrigger value="tradicional">Tradicionales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="saludable" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {recipes.filter(recipe => recipe.category === "saludable").map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tradicional" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {recipes.filter(recipe => recipe.category === "tradicional").map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface RecipeProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    prepTime: string;
    calories: number;
    servings: number;
    image: string;
    category: string;
  }
}

const RecipeCard = ({ recipe }: RecipeProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center">
            <Utensils size={16} className="mr-1" />
            <span>{recipe.calories} cal</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{recipe.servings}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <button className="text-[#FF7043] text-sm font-medium">Ver receta</button>
      </CardFooter>
    </Card>
  );
};

export default RecipesPage;
