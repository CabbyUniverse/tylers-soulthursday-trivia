export interface Question {
  q: string;
  a: string;
  options?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: 'soul-thursday' | 'memoir' | 'leadership' | 'identity';
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  correctStreak: number;
  incorrectStreak: number;
  answeredQuestions: number[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuestionData {
  questions: Question[];
}
