import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { Insight } from '@/lib/types';
import { Bookmark, Trash2 } from 'lucide-react';
import React from 'react';

interface SavedInsightsSheetProps {
  insights: Insight[];
  onDeleteInsight: (id: string) => void;
}

export function SavedInsightsSheet({
  insights,
  onDeleteInsight,
}: SavedInsightsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bookmark className="h-5 w-5 text-accent-foreground/80 hover:text-accent-foreground" />
          <span className="sr-only">Saved Insights</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Saved Insights</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-4rem)] mt-4 pr-4">
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights
                .slice()
                .reverse()
                .map((insight) => (
                  <div
                    key={insight.id}
                    className="group relative rounded-lg border bg-card p-4 text-sm transition-shadow hover:shadow-md"
                  >
                    <p className="font-medium pr-8">{insight.content}</p>
                    <p className="mt-2 text-xs text-muted-foreground italic">
                      Original query: "{insight.originalQuery}"
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100"
                      onClick={() => onDeleteInsight(insight.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete insight</span>
                    </Button>
                  </div>
                ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full py-20 rounded-md border-2 border-dashed">
                <Bookmark className="h-12 w-12 mb-4" />
                <h3 className="font-semibold text-foreground">
                  No insights saved yet.
                </h3>
                <p className="text-sm">
                  Save answers from the chat to review them later.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
