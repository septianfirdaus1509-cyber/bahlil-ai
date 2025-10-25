import { cn } from '@/lib/utils';

export function BouncingLoader() {
  return (
    <div className="flex items-center space-x-1 py-2">
      <div
        className={cn(
          'h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]'
        )}
      />
      <div
        className={cn(
          'h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]'
        )}
      />
      <div
        className={cn('h-2 w-2 rounded-full bg-muted-foreground animate-bounce')}
      />
    </div>
  );
}
