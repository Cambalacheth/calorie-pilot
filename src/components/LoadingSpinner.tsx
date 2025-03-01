
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#FF7043]/30 rounded-full"></div>
        <div className="w-16 h-16 border-t-4 border-[#FF7043] rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="ml-4 text-lg font-medium text-gray-600">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;
