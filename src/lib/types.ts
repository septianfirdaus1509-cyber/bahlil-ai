export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export type Insight = Omit<Message, 'role'> & {
  originalQuery: string;
};
