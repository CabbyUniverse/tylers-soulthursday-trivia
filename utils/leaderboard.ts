import { database } from './firebase';
import { ref, set, get, query, orderByChild, limitToLast } from 'firebase/database';

interface ScoreEntry {
  username: string;
  email: string;
  score: number;
  correctAnswers: number;
  timestamp: number;
}

export class LeaderboardService {
  static async saveScore(username: string, email: string, score: number, correctAnswers: number) {
    const scoreId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const entry: ScoreEntry = {
      username,
      email,
      score,
      correctAnswers,
      timestamp: Date.now()
    };

    await set(ref(database, `scores/${scoreId}`), entry);
  }

  static async getAllScores(): Promise<ScoreEntry[]> {
    const scoresRef = ref(database, 'scores');
    const snapshot = await get(scoresRef);
    
    if (!snapshot.exists()) return [];
    
    const scores: ScoreEntry[] = [];
    snapshot.forEach((child) => {
      scores.push(child.val());
    });
    
    return scores;
  }

  static async getActiveScores(): Promise<ScoreEntry[]> {
    const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
    const scores = await this.getAllScores();
    
    return scores
      .filter(s => s.timestamp > thirtyMinutesAgo)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  static async getAllTimeLeaders(): Promise<ScoreEntry[]> {
    const scores = await this.getAllScores();
    const userTotals = new Map<string, { username: string; totalScore: number; totalCorrect: number }>();
    
    scores.forEach(entry => {
      const existing = userTotals.get(entry.email) || { username: entry.username, totalScore: 0, totalCorrect: 0 };
      existing.totalScore += entry.score;
      existing.totalCorrect += entry.correctAnswers;
      userTotals.set(entry.email, existing);
    });

    return Array.from(userTotals.values())
      .map(u => ({
        username: u.username,
        email: '',
        score: u.totalScore,
        correctAnswers: u.totalCorrect,
        timestamp: 0
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }
}
