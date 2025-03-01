
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Book, BarChart2, Plus, Brain, Utensils } from 'lucide-react';

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {/* Diary */}
        <button 
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${
            isActive('/dashboard') ? 'text-[#FF7043]' : 'text-gray-600'
          }`}
        >
          <Book size={20} />
          <span className="text-xs mt-1">Diario</span>
        </button>
        
        {/* Progress */}
        <button 
          onClick={() => navigate('/progress')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${
            isActive('/progress') ? 'text-[#FF7043]' : 'text-gray-600'
          }`}
        >
          <BarChart2 size={20} />
          <span className="text-xs mt-1">Progreso</span>
        </button>
        
        {/* Add Button (Center, Prominent) */}
        <button 
          onClick={() => navigate('/add')}
          className="relative flex items-center justify-center w-1/5"
        >
          <div className="absolute -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#FF7043] text-white shadow-lg">
            <Plus size={30} />
          </div>
          <span className="text-xs mt-8 text-[#FF7043]">Añadir</span>
        </button>
        
        {/* Analysis */}
        <button 
          onClick={() => navigate('/analysis')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${
            isActive('/analysis') ? 'text-[#FF7043]' : 'text-gray-600'
          }`}
        >
          <Brain size={20} />
          <span className="text-xs mt-1">Análisis</span>
        </button>
        
        {/* Recipes */}
        <button 
          onClick={() => navigate('/recipes')}
          className={`flex flex-col items-center justify-center w-1/5 h-full ${
            isActive('/recipes') ? 'text-[#FF7043]' : 'text-gray-600'
          }`}
        >
          <Utensils size={20} />
          <span className="text-xs mt-1">Recetas</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavBar;
