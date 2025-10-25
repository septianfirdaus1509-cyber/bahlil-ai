import { Card, CardContent } from '@/components/ui/card';
import {
  Briefcase,
  Landmark,
  Newspaper,
  Palette,
  Utensils,
} from 'lucide-react';
import React from 'react';

const topics = [
  {
    name: 'Latest News',
    icon: Newspaper,
    query: 'What are the latest news updates in Indonesia?',
    useRealtime: true,
  },
  {
    name: 'Tourism',
    icon: Landmark,
    query: 'What are some popular tourist destinations in Indonesia?',
  },
  {
    name: 'Economy',
    icon: Briefcase,
    query: 'How is the Indonesian economy performing recently?',
  },
  {
    name: 'Culture',
    icon: Palette,
    query: 'Tell me about the culture of Indonesia.',
  },
  {
    name: 'Cuisine',
    icon: Utensils,
    query: 'What are some famous Indonesian dishes?',
  },
];

interface TopicBrowserProps {
  onTopicSelect: (query: string, useRealtime?: boolean) => void;
}

export function TopicBrowser({ onTopicSelect }: TopicBrowserProps) {
  return (
    <div className="mb-8 px-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {topics.map((topic) => (
          <button
            key={topic.name}
            onClick={() => onTopicSelect(topic.query, topic.useRealtime)}
            className="group text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Card className="h-full transition-all duration-200 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1 group-focus-visible:border-primary">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="bg-accent/50 p-3 rounded-full mb-3 transition-colors group-hover:bg-accent">
                  <topic.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                </div>
                <p className="font-medium text-sm text-foreground">
                  {topic.name}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
