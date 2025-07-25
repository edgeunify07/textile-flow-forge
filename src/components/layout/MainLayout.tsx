import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { useAuth } from '@/hooks/useAuth';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { profile } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <main className="flex-1 lg:ml-72 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}