import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

interface EmailVerificationProps {
  originalEmail: string;
  score: number;
  onVerified: () => void;
}

export function EmailVerification({ originalEmail, score, onVerified }: EmailVerificationProps) {
  const [email, setEmail] = useState('');

  const handleVerify = () => {
    if (email.trim().toLowerCase() === originalEmail.toLowerCase()) {
      onVerified();
    } else {
      Alert.alert('Error', 'Email does not match. Please try again.');
      setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Game Complete!</Text>
      <Text style={styles.subtitle}>You scored {score} points!</Text>
      
      <Text style={styles.instruction}>
        To see your final score and leaderboard position, please confirm your email address:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Confirm your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity 
        style={[styles.button, !email.trim() && styles.buttonDisabled]} 
        onPress={handleVerify}
        disabled={!email.trim()}
      >
        <Text style={styles.buttonText}>Verify & View Score</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 30, color: '#007AFF' },
  instruction: { fontSize: 16, textAlign: 'center', marginBottom: 30, paddingHorizontal: 20 },
  input: { backgroundColor: '#fff', padding: 16, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#ddd', width: '100%', maxWidth: 400, marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, width: '100%', maxWidth: 400 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});
