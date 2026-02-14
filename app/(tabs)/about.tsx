import { StyleSheet, ScrollView, View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About Soul Thursday Trivia</Text>

        <View style={styles.card}>
          <Text style={styles.subtitle}>What is Soul Thursday?</Text>
          <Text style={styles.text}>
            Soul Thursday is a weekly gathering focused on community, connection, belonging, healing, and purpose.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>The Cabby Universe</Text>
          <Text style={styles.text}>
            This trivia game is part of the Cabby Universe - a connected series of books and programs following Cabby from age 5 to 50, exploring Black identity, class, neurodivergence, and faith.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Game Features</Text>
          <Text style={styles.text}>
            • Adaptive difficulty based on performance{'\n'}
            • Questions about Soul Thursday, memoir, leadership, and identity{'\n'}
            • Track your score and streak{'\n'}
            • Learn about community and belonging
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Tech Stack</Text>
          <Text style={styles.text}>
            Built with React Native + Expo{'\n'}
            TypeScript for type safety{'\n'}
            Cross-platform (iOS, Android, Web)
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 16 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  text: { fontSize: 16, lineHeight: 24 },
});
