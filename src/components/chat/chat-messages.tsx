import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bookmark, Share2, User } from 'lucide-react';
import React from 'react';
import { BahlilLogo } from '../icons';
import { BouncingLoader } from './bouncing-loader';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onSave: (message: Message) => void;
  onShare: (content: string) => void;
}

export function ChatMessages({
  messages,
  isLoading,
  onSave,
  onShare,
}: ChatMessagesProps) {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <BahlilLogo className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome to Bahlil AI
        </h2>
        <p className="mt-2 max-w-md">
          Ask me anything about Indonesia, or select a topic below to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'flex items-start gap-3',
            message.role === 'user' && 'justify-end'
          )}
        >
          {message.role === 'assistant' && (
            <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <BahlilLogo className="h-5 w-5" />
            </Avatar>
          )}
          <div
            className={cn(
              'group relative max-w-xl rounded-2xl px-4 py-3 shadow-sm',
              message.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-none'
                : 'bg-card text-card-foreground rounded-bl-none'
            )}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            {message.role === 'assistant' && (
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 transform translate-x-full flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onSave(message)}
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Save Insight</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onShare(message.content)}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share Insight</span>
                </Button>
              </div>
            )}
          </div>
          {message.role === 'user' && (
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start gap-4">
          <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
            <BahlilLogo className="h-5 w-5" />
          </Avatar>
          <div className="rounded-2xl px-4 py-3 bg-card shadow-sm">
            <BouncingLoader />
          </div>
        </div>
      )}
    </div>
  );
}
