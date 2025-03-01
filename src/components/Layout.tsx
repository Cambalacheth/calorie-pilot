import React from 'react';
import { useFood } from '@/context/FoodContext';
import LoadingSpinner from './LoadingSpinner';
import BottomNavBar from './BottomNavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { foods } = useFood();
  const isLoading = foods === null;

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 pb-16">
        {isLoading ? <LoadingSpinner /> : children}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default Layout;
