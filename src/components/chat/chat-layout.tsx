'use client';

import { AppHeader } from '@/components/layout/app-header';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { Insight, Message } from '@/lib/types';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { submitQuery } from '@/app/actions';
import { ChatMessages } from './chat-messages';
import { SavedInsightsSheet } from './saved-insights-sheet';
import { TopicBrowser } from './topic-browser';
import { ChatInput } from './chat-input';

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const [savedInsights, setSavedInsights] = useLocalStorage<Insight[]>(
    'bahlil-ai-insights',
    []
  );
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleQuerySubmit = (query: string, useRealtime: boolean = false) => {
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    startTransition(async () => {
      try {
        const result = await submitQuery(query, useRealtime);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error(error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  const handleTopicSelect = (query: string, useRealtime?: boolean) => {
    handleQuerySubmit(query, useRealtime);
  };

  const handleSaveInsight = (message: Message) => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === 'user');
    const newInsight: Insight = {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      originalQuery: lastUserMessage?.content || 'N/A',
    };
    if (!savedInsights.some((i) => i.id === newInsight.id)) {
      setSavedInsights((prev) => [...prev, newInsight]);
      toast({
        title: 'Insight Saved!',
        description: 'You can view it in your saved insights.',
      });
    } else {
      toast({
        title: 'Already Saved',
        description: 'This insight is already in your saved list.',
      });
    }
  };

  const handleDeleteInsight = (id: string) => {
    setSavedInsights((prev) => prev.filter((insight) => insight.id !== id));
    toast({ title: 'Insight Deleted' });
  };

  const handleShare = async (content: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Insight from Bahlil AI',
          text: content,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
          title: 'Error Sharing',
          description: 'There was an error trying to share.',
          variant: 'destructive',
        });
      }
    } else {
      await navigator.clipboard.writeText(content);
      toast({
        title: 'Copied to clipboard!',
        description:
          'Web sharing is not supported on this browser. The content has been copied.',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <AppHeader>
        <SavedInsightsSheet
          insights={savedInsights}
          onDeleteInsight={handleDeleteInsight}
        />
      </AppHeader>
      <main className="flex-1 container mx-auto max-w-3xl py-8 flex flex-col">
        <div className="flex-1 pb-4 overflow-y-auto">
          <ChatMessages
            messages={messages}
            isLoading={isPending}
            onSave={handleSaveInsight}
            onShare={handleShare}
          />
          <div ref={messagesEndRef} />
        </div>
        {messages.length === 0 && !isPending && (
          <TopicBrowser onTopicSelect={handleTopicSelect} />
        )}
        <div className="mt-auto px-4 sticky bottom-0 pb-4 pt-2 bg-background">
          <ChatInput onSubmit={handleQuerySubmit} isLoading={isPending} />
        </div>
      </main>
    </div>
  );
}
