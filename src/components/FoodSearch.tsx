
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Food, useFood } from '@/context/FoodContext';

interface FoodSearchProps {
  onFoodSelect: (food: Food) => void;
  placeholder?: string;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ onFoodSelect, placeholder = "Buscar alimentos..." }) => {
  const { foods } = useFood();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Food[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter unique food names to avoid duplicates in suggestions
  const uniqueFoods = Array.from(new Map(foods.map(food => [food.name.toLowerCase(), food])).values());

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredFoods = uniqueFoods.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSuggestions(filteredFoods.slice(0, 5)); // Limit to 5 suggestions
  }, [searchTerm, uniqueFoods]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectFood = (food: Food) => {
    onFoodSelect(food);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={clearSearch}
          >
            <X className="h-4 w-4 text-gray-400" />
          </Button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {suggestions.map((food) => (
            <div
              key={`${food.id}-${food.name}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleSelectFood(food)}
            >
              {food.image && (
                <img src={food.image} alt={food.name} className="w-8 h-8 rounded-md object-cover mr-3" />
              )}
              <div>
                <p className="font-medium">{food.name}</p>
                <p className="text-xs text-gray-500">{food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | G: {food.fat}g</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
