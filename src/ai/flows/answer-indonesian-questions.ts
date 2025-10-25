'use server';

/**
 * @fileOverview A flow that answers questions about Indonesia.
 *
 * - answerIndonesianQuestions - A function that answers questions about Indonesia.
 * - AnswerIndonesianQuestionsInput - The input type for the answerIndonesianQuestions function.
 * - AnswerIndonesianQuestionsOutput - The return type for the answerIndonesianQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerIndonesianQuestionsInputSchema = z.object({
  question: z.string().describe('The question about Indonesia.'),
});
export type AnswerIndonesianQuestionsInput = z.infer<typeof AnswerIndonesianQuestionsInputSchema>;

const AnswerIndonesianQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about Indonesia.'),
});
export type AnswerIndonesianQuestionsOutput = z.infer<typeof AnswerIndonesianQuestionsOutputSchema>;

export async function answerIndonesianQuestions(input: AnswerIndonesianQuestionsInput): Promise<AnswerIndonesianQuestionsOutput> {
  return answerIndonesianQuestionsFlow(input);
}

const answerIndonesianQuestionsPrompt = ai.definePrompt({
  name: 'answerIndonesianQuestionsPrompt',
  input: {schema: AnswerIndonesianQuestionsInputSchema},
  output: {schema: AnswerIndonesianQuestionsOutputSchema},
  prompt: `You are a knowledgeable chatbot providing information about Indonesia. Answer the following question about Indonesia: {{{question}}}`,
});

const answerIndonesianQuestionsFlow = ai.defineFlow(
  {
    name: 'answerIndonesianQuestionsFlow',
    inputSchema: AnswerIndonesianQuestionsInputSchema,
    outputSchema: AnswerIndonesianQuestionsOutputSchema,
  },
  async input => {
    const {output} = await answerIndonesianQuestionsPrompt(input);
    return output!;
  }
);
