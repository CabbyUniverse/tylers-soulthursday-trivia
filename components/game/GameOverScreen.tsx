import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Linking } from 'react-native';

interface GameOverScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

export function GameOverScreen({ score, totalQuestions, onPlayAgain }: GameOverScreenProps) {
  const percentage = Math.round((score / 105) * 100);

  const handleDonatePress = () => {
    Linking.openURL('https://buymeacoffee.com/soullivestream');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/soul-thursdays-trivia-splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <Text style={styles.title}>
        🎉 Congratulations! 🎉
      </Text>
      
      <Text style={styles.scoreText}>
        You scored {score} points!
      </Text>
      
      <Text style={styles.percentageText}>
        {percentage}% Correct
      </Text>
      
      <Text style={styles.thankYouText}>
        Thanks for playing! Play as much as you like and increase your score.
      </Text>
      
      <TouchableOpacity style={styles.donateButton} onPress={handleDonatePress}>
        <Text style={styles.donateText}>
          To donate and support, scan QR code or{' '}
          <Text style={styles.linkText}>click here</Text>
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  logo: { width: 200, height: 200, marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  scoreText: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  percentageText: { fontSize: 20, opacity: 0.8, marginBottom: 20 },
  thankYouText: { fontSize: 16, textAlign: 'center', marginBottom: 15, paddingHorizontal: 20 },
  donateButton: { marginBottom: 30, paddingHorizontal: 20 },
  donateText: { fontSize: 14, textAlign: 'center', opacity: 0.9 },
  linkText: { color: '#007AFF', textDecorationLine: 'underline', fontWeight: '600' },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 40, paddingVertical: 16, borderRadius: 25 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
});
