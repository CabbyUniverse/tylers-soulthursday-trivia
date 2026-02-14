import { Question } from '@/types/game';

export class QuestionLoader {
  static async loadQuestions(): Promise<Question[]> {
    try {
      const questions = require('@/data/questions.json').questions;
      return questions.map((q: Question) => ({
        ...q,
        options: q.options ? this.shuffleArray([...q.options]) : undefined
      }));
    } catch (error) {
      console.error('Failed to load questions:', error);
      return this.getFallbackQuestions();
    }
  }

  static getFallbackQuestions(): Question[] {
    return [
      { q: "What is Soul Thursday?", a: "A weekly gathering for community and connection", options: ["A weekly gathering for community and connection", "A restaurant", "A holiday", "A book club"], difficulty: 'easy', category: 'soul-thursday' },
      { q: "What are the core values of Soul Thursday?", a: "Belonging, healing, and purpose", options: ["Belonging, healing, and purpose", "Food and fun", "Work and success", "Money and power"], difficulty: 'medium', category: 'soul-thursday' }
    ];
  }

  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static shuffleQuestions(questions: Question[]): Question[] {
    return this.shuffleArray(questions);
  }
}
