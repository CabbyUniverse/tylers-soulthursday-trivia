import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCrMkDvKMyS6GGWzdIBfI550ZOIQ3yqazE",
  authDomain: "tylers-soulthursdays-trivia.firebaseapp.com",
  databaseURL: "https://tylers-soulthursdays-trivia-default-rtdb.firebaseio.com",
  projectId: "tylers-soulthursdays-trivia",
  storageBucket: "tylers-soulthursdays-trivia.firebasestorage.app",
  messagingSenderId: "207312228111",
  appId: "1:207312228111:web:38f96236a0c86930b0387a",
  measurementId: "G-CYXKTWR4EC"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
