# Leaderboard Setup Instructions

## Firebase Setup (Required for Leaderboard)

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "soul-thursday-trivia"
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Realtime Database
1. In Firebase Console, go to "Build" → "Realtime Database"
2. Click "Create Database"
3. Choose location (us-central1)
4. Start in **test mode** (for development)
5. Click "Enable"

### 3. Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click Web icon (</>)
4. Register app name: "soul-thursday-trivia"
5. Copy the firebaseConfig object

### 4. Update Firebase Config
Edit `utils/firebase.ts` and replace with your config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Database Rules (Security)
In Realtime Database → Rules, use:

```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": true
    }
  }
}
```

## How It Works

### Player Flow:
1. **Splash Screen** → Tap to start
2. **Registration** → Enter username + email (with warning)
3. **Game** → Play 10 questions
4. **Email Verification** → Confirm email to see score
5. **Game Over** → View score + leaderboard position

### Leaderboard Features:
- **Active Players**: Last 30 minutes, sorted by score
- **All-Time Leaders**: Total points accumulated
- **Auto-refresh**: Updates every 10 seconds
- **Zoom-ready**: Full-screen display for screen sharing

### Data Structure:
```
scores/
  {userId}/
    username: "PlayerName"
    email: "player@email.com"
    score: 85
    correctAnswers: 8
    timestamp: 1234567890
```

## Testing Leaderboard

1. Start the app: `npm start`
2. Open in browser: Press `w`
3. Navigate to Leaderboard tab
4. Play games to populate data
5. Watch it update every 10 seconds

## For Zoom Screen Share

Open the leaderboard page in a browser:
- Full screen (F11)
- Dark theme optimized for visibility
- Large text for readability
- Two-column layout (Active | All-Time)
