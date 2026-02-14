import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onFinish} style={styles.touchable}>
        <Image
          source={require('@/assets/images/soul-thursdays-trivia-splash.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  touchable: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  logo: { width: '90%', height: '90%', maxWidth: 600, maxHeight: 600 },
});
