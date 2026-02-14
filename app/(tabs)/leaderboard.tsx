import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { LeaderboardService } from '@/utils/leaderboard';

interface LeaderboardEntry {
  username: string;
  score: number;
  correctAnswers: number;
  timestamp: number;
}

export default function LeaderboardScreen() {
  const [activeLeaders, setActiveLeaders] = useState<LeaderboardEntry[]>([]);
  const [allTimeLeaders, setAllTimeLeaders] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboards();
    const interval = setInterval(loadLeaderboards, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadLeaderboards = async () => {
    const active = await LeaderboardService.getActiveScores();
    const allTime = await LeaderboardService.getAllTimeLeaders();
    setActiveLeaders(active);
    setAllTimeLeaders(allTime);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>🏆 Soul Thursday Trivia Leaderboard</Text>
      
      <View style={styles.columns}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>🔥 Active Players (Last 30 min)</Text>
          <View style={styles.header}>
            <Text style={styles.headerRank}>#</Text>
            <Text style={styles.headerName}>Player</Text>
            <Text style={styles.headerScore}>Score</Text>
          </View>
          {activeLeaders.map((entry, index) => (
            <View key={index} style={[styles.row, index < 3 && styles.topThree]}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Text style={styles.name}>{entry.username}</Text>
              <Text style={styles.score}>{entry.score}</Text>
            </View>
          ))}
          {activeLeaders.length === 0 && (
            <Text style={styles.empty}>No active players yet</Text>
          )}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>👑 All-Time Leaders</Text>
          <View style={styles.header}>
            <Text style={styles.headerRank}>#</Text>
            <Text style={styles.headerName}>Player</Text>
            <Text style={styles.headerScore}>Total Points</Text>
          </View>
          {allTimeLeaders.map((entry, index) => (
            <View key={index} style={[styles.row, index < 3 && styles.topThree]}>
              <Text style={styles.rank}>{index + 1}</Text>
              <Text style={styles.name}>{entry.username}</Text>
              <Text style={styles.score}>{entry.score}</Text>
            </View>
          ))}
          {allTimeLeaders.length === 0 && (
            <Text style={styles.empty}>No players yet</Text>
          )}
        </View>
      </View>

      <Text style={styles.updateText}>Updates every 10 seconds</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 20 },
  mainTitle: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#fff' },
  columns: { flexDirection: 'row', gap: 20 },
  column: { flex: 1, backgroundColor: '#2a2a2a', borderRadius: 12, padding: 20 },
  columnTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#fff', textAlign: 'center' },
  header: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: '#444', marginBottom: 10 },
  headerRank: { width: 50, fontSize: 16, fontWeight: 'bold', color: '#aaa' },
  headerName: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#aaa' },
  headerScore: { width: 100, fontSize: 16, fontWeight: 'bold', color: '#aaa', textAlign: 'right' },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333' },
  topThree: { backgroundColor: '#3a3a3a' },
  rank: { width: 50, fontSize: 20, fontWeight: 'bold', color: '#fff' },
  name: { flex: 1, fontSize: 20, color: '#fff' },
  score: { width: 100, fontSize: 20, fontWeight: 'bold', color: '#4CAF50', textAlign: 'right' },
  empty: { fontSize: 18, color: '#666', textAlign: 'center', marginTop: 40 },
  updateText: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 30 },
});
