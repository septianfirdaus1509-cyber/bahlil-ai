'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp } from 'lucide-react';
import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type FormValues = {
  query: string;
};

interface ChatInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { query: '' },
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const queryValue = watch('query');

  const onFormSubmit: SubmitHandler<FormValues> = (data) => {
    if (!data.query.trim()) return;
    onSubmit(data.query);
    reset();
  };

  React.useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="relative">
      <Input
        {...register('query')}
        placeholder="Ask about Indonesia..."
        disabled={isLoading}
        className="pr-12 h-12 text-base rounded-full shadow-sm bg-card"
        autoComplete="off"
        ref={inputRef}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute top-1/2 -translate-y-1/2 right-2 rounded-full"
        disabled={isLoading || !(queryValue || '').trim()}
      >
        <ArrowUp className="h-5 w-5" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
