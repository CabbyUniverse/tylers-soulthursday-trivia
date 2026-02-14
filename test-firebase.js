const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyCrMkDvKMyS6GGWzdIBfI550ZOIQ3yqazE",
  authDomain: "tylers-soulthursdays-trivia.firebaseapp.com",
  databaseURL: "https://tylers-soulthursdays-trivia-default-rtdb.firebaseio.com",
  projectId: "tylers-soulthursdays-trivia",
  storageBucket: "tylers-soulthursdays-trivia.firebasestorage.app",
  messagingSenderId: "207312228111",
  appId: "1:207312228111:web:38f96236a0c86930b0387a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function test() {
  try {
    // Test write
    await set(ref(database, 'scores/test123'), {
      username: 'TestPlayer',
      email: 'test@test.com',
      score: 50,
      correctAnswers: 5,
      timestamp: Date.now()
    });
    console.log('✅ Write successful');
    
    // Test read
    const snapshot = await get(ref(database, 'scores'));
    console.log('✅ Read successful');
    console.log('Data:', snapshot.val());
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit(0);
}

test();
