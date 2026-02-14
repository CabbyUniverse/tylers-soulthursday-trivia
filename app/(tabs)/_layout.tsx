import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Game', href: '/' }} />
      <Tabs.Screen name="leaderboard" options={{ title: 'Leaderboard', href: null }} />
      <Tabs.Screen name="about" options={{ title: 'About', href: null }} />
    </Tabs>
  );
}
