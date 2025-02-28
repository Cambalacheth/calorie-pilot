
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  const routes = [
    { path: '/', name: 'Inicio', icon: <Home className="h-5 w-5" /> },
    { path: '/dashboard', name: 'Panel', icon: <BarChart2 className="h-5 w-5" /> },
    { path: '/settings', name: 'Ajustes', icon: <Settings className="h-5 w-5" /> },
  ];

  const NavLinks = () => (
    <div className="flex flex-col gap-2 mt-6">
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
            location.pathname === route.path
              ? 'bg-accent text-accent-foreground shadow-sm'
              : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          {route.icon}
          <span>{route.name}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {isMobile ? (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="flex flex-col h-full py-4">
                    <div className="px-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xl font-semibold">NutriScribe</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <NavLinks />
                  </div>
                </SheetContent>
              </Sheet>
            ) : null}
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight">NutriScribe</span>
            </Link>
          </div>
          
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    location.pathname === route.path
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      
      <main className="flex-1 w-full animate-slide-up">
        {children}
      </main>
      
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between text-sm text-muted-foreground">
          <p>© 2023 NutriScribe. Todos los derechos reservados.</p>
          <nav className="flex gap-4">
            <Link to="#" className="hover:text-foreground transition-colors">Términos</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Privacidad</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Contacto</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
