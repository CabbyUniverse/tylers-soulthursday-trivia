import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

interface UserRegistrationProps {
  onComplete: (username: string, email: string) => void;
}

export function UserRegistration({ onComplete }: UserRegistrationProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }
    if (username.includes('@')) {
      Alert.alert('Error', 'Username cannot be an email address. Please enter just your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    onComplete(username.trim(), email.trim().toLowerCase());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Welcome to Soul Thursday Trivia!</Text>
      
      <Text style={styles.warning}>
        ⚠️ Important: Enter a valid email address. You'll need it later!
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Username for Leaderboard (not email)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name (e.g., John Smith)"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="words"
          maxLength={20}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity 
          style={[styles.button, (!username.trim() || !email.trim()) && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={!username.trim() || !email.trim()}
        >
          <Text style={styles.buttonText}>Start Playing</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  warning: { fontSize: 16, textAlign: 'center', marginBottom: 30, paddingHorizontal: 20, color: '#FF9800', fontWeight: '600' },
  form: { width: '100%', maxWidth: 400 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#fff', padding: 16, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, marginTop: 30 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});
