'use server';

import { answerIndonesianQuestions } from '@/ai/flows/answer-indonesian-questions';
import { provideRealTimeUpdates } from '@/ai/flows/provide-real-time-updates';

export async function submitQuery(query: string, useRealtime: boolean = false) {
  try {
    if (useRealtime) {
      const result = await provideRealTimeUpdates({ query });
      return result.updates;
    }
    const result = await answerIndonesianQuestions({ question: query });
    return result.answer;
  } catch (error) {
    console.error('Error submitting query:', error);
    return 'Sorry, I encountered an error while processing your request. Please try again.';
  }
}
