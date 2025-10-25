import { BahlilLogo } from '@/components/icons';
import React from 'react';

interface AppHeaderProps {
  children?: React.ReactNode;
}

export function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 max-w-3xl items-center justify-between">
        <div className="flex items-center gap-3">
          <BahlilLogo className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Bahlil AI
            </h1>
            <p className="text-xs text-muted-foreground">
              Your Indonesia Insight
            </p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}
