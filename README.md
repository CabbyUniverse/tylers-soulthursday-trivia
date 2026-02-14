# 🎯 Soul Thursday Trivia

A React Native trivia game about Soul Thursday, the Cabby Universe, and themes of belonging, identity, and community.

## ✨ Features

- **Adaptive Difficulty** - Questions adjust based on performance
- **Multiple Categories** - Soul Thursday, Memoir, Leadership, Identity
- **Real-time Feedback** - Instant answer validation
- **Streak Tracking** - Motivational streak counter
- **Cross-Platform** - Works on iOS, Android, and Web

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run the App
```bash
# Start development server
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📂 Project Structure

```
soul-thursday-trivia/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Main game screen
│   │   └── about.tsx          # About screen
│   └── _layout.tsx            # Root layout
├── types/
│   └── game.ts                # TypeScript types
├── utils/
│   ├── questionLoader.ts      # Question management
│   └── difficultyEngine.ts    # Adaptive difficulty
└── data/
    └── questions.json         # Trivia questions
```

## 🎮 How to Play

1. Read the question about Soul Thursday or the Cabby Universe
2. Select your answer from multiple choices
3. Get 3 correct in a row to increase difficulty
4. Track your score and streak

## 📊 Points System

- 🟢 Easy Questions = 5 points
- 🟠 Medium Questions = 10 points
- 🔴 Hard Questions = 15 points

## 🎯 Categories

- **Soul Thursday** - Community and connection
- **Memoir** - Cabby's personal journey
- **Leadership** - Manhood Academy principles
- **Identity** - 31 Flavors Framework

## 💻 Tech Stack

- React Native + Expo
- TypeScript
- Expo Router (file-based routing)
- Cross-platform support

## 📚 About the Cabby Universe

This trivia game is part of the Cabby Universe - a connected series of books and programs that follows Cabby from age 5 to 50, exploring themes of:

- Black identity and cultural experiences
- Class and neurodivergence
- Belonging and community
- Leadership and purpose
- Healing and transformation

---

**Built with 💙 for the Soul Thursday community**
