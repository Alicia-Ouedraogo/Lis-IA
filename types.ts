
export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type MoodType = 'peaceful' | 'anxious' | 'sad' | 'angry' | 'exhausted' | 'happy';

export interface MoodLog {
  id: string;
  mood: MoodType;
  timestamp: Date;
  note?: string;
}

export type ViewMode = 'chat' | 'tools' | 'journal' | 'panic';
