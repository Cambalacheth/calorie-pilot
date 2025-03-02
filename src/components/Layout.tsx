
import React from 'react';
import { useFood } from '@/context/FoodContext';
import LoadingSpinner from './LoadingSpinner';
import BottomNavBar from './BottomNavBar';
import UserMenu from './UserMenu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { foods } = useFood();
  const isLoading = foods === null;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full py-4 px-6 border-b">
        <div className="container mx-auto flex justify-end">
          <UserMenu />
        </div>
      </header>
      <main className="flex-1 pb-16">
        {isLoading ? <LoadingSpinner /> : children}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default Layout;
