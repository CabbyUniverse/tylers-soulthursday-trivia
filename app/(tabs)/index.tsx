import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SplashScreen } from '@/components/game/SplashScreen';
import { UserRegistration } from '@/components/game/UserRegistration';
import { EmailVerification } from '@/components/game/EmailVerification';
import { GameOverScreen } from '@/components/game/GameOverScreen';
import { QuestionLoader } from '@/utils/questionLoader';
import { DifficultyEngine } from '@/utils/difficultyEngine';
import { Question, GameState } from '@/types/game';

export default function GameScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 0,
    correctStreak: 0,
    incorrectStreak: 0,
    answeredQuestions: [],
    difficulty: 'easy',
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const loadedQuestions = await QuestionLoader.loadQuestions();
    
    // Separate by difficulty and category
    const easy = loadedQuestions.filter(q => q.difficulty === 'easy');
    const medium = loadedQuestions.filter(q => q.difficulty === 'medium');
    const hard = loadedQuestions.filter(q => q.difficulty === 'hard');
    
    const shuffledEasy = QuestionLoader.shuffleQuestions(easy);
    const shuffledMedium = QuestionLoader.shuffleQuestions(medium);
    const shuffledHard = QuestionLoader.shuffleQuestions(hard);
    
    // Separate hashtags from other questions
    const easyHashtags = shuffledEasy.filter(q => q.category === 'culture-tags');
    const easyOther = shuffledEasy.filter(q => q.category !== 'culture-tags');
    const mediumHashtags = shuffledMedium.filter(q => q.category === 'culture-tags');
    const mediumOther = shuffledMedium.filter(q => q.category !== 'culture-tags');
    const hardHashtags = shuffledHard.filter(q => q.category === 'culture-tags');
    const hardOther = shuffledHard.filter(q => q.category !== 'culture-tags');
    
    // Pick max 2 hashtags total, rest from other categories
    const selectedQuestions = [
      ...easyHashtags.slice(0, 1),
      ...easyOther.slice(0, 2),
      ...mediumHashtags.slice(0, 1),
      ...mediumOther.slice(0, 2),
      ...hardOther.slice(0, 4)
    ];
    
    setQuestions(QuestionLoader.shuffleQuestions(selectedQuestions));
    setGameState(prev => ({ ...prev, totalQuestions: selectedQuestions.length }));
    setLoading(false);
  };

  const checkAnswer = (selectedAnswer: string) => {
    if (!selectedAnswer.trim()) return;

    const currentQuestion = questions[gameState.currentQuestionIndex];
    let isCorrect = false;

    // For hashtag questions, check 75% word match
    if (currentQuestion.category === 'culture-tags') {
      const answerWords = currentQuestion.a.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const userWords = selectedAnswer.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const matchCount = answerWords.filter(word => 
        userWords.some(userWord => userWord.includes(word) || word.includes(userWord))
      ).length;
      isCorrect = matchCount >= Math.ceil(answerWords.length * 0.75);
    } else {
      // For multiple choice, exact match
      isCorrect = selectedAnswer.trim() === currentQuestion.a;
    }

    setUserAnswer(selectedAnswer);

    if (isCorrect) {
      let points = 5;
      if (currentQuestion.difficulty === 'medium') points = 10;
      if (currentQuestion.difficulty === 'hard') points = 15;
      
      const newScore = gameState.score + points;
      const newCorrectStreak = gameState.correctStreak + 1;
      const newDifficulty = DifficultyEngine.adjustDifficulty({
        ...gameState,
        correctStreak: newCorrectStreak,
        incorrectStreak: 0,
      });

      setGameState(prev => ({
        ...prev,
        score: newScore,
        correctStreak: newCorrectStreak,
        incorrectStreak: 0,
        difficulty: newDifficulty,
      }));

      setFeedback({
        correct: true,
        message: `✅ Correct! +${points} points!`,
      });
    } else {
      const newIncorrectStreak = gameState.incorrectStreak + 1;
      const newDifficulty = DifficultyEngine.adjustDifficulty({
        ...gameState,
        correctStreak: 0,
        incorrectStreak: newIncorrectStreak,
      });

      setGameState(prev => ({
        ...prev,
        correctStreak: 0,
        incorrectStreak: newIncorrectStreak,
        difficulty: newDifficulty,
      }));

      setFeedback({
        correct: false,
        message: `❌ Not quite. The answer is: ${currentQuestion.a}`,
      });
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleRegistrationComplete = (user: string, userEmail: string) => {
    setUsername(user);
    setEmail(userEmail);
    setShowRegistration(false);
    loadQuestions();
  };

  const handleEmailVerified = async () => {
    const correctAnswers = Math.round((gameState.score / 105) * 10);
    
    const { LeaderboardService } = require('@/utils/leaderboard');
    await LeaderboardService.saveScore(username, email, gameState.score, correctAnswers);
    
    setShowEmailVerification(false);
    setGameOver(true);
  };

  const nextQuestion = () => {
    const nextIndex = gameState.currentQuestionIndex + 1;
    
    if (nextIndex >= questions.length) {
      setShowEmailVerification(true);
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
    }));
    setUserAnswer('');
    setFeedback(null);
  };

  const resetGame = () => {
    setGameOver(false);
    setShowEmailVerification(false);
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: questions.length,
      correctStreak: 0,
      incorrectStreak: 0,
      answeredQuestions: [],
      difficulty: 'easy',
    });
    setUserAnswer('');
    setFeedback(null);
    loadQuestions();
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => { setShowSplash(false); setShowRegistration(true); }} />;
  }

  if (showRegistration) {
    return <UserRegistration onComplete={handleRegistrationComplete} />;
  }

  if (showEmailVerification) {
    return (
      <EmailVerification
        originalEmail={email}
        score={gameState.score}
        onVerified={handleEmailVerified}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Soul Thursday Trivia...</Text>
      </View>
    );
  }

  if (gameOver) {
    return (
      <GameOverScreen
        score={gameState.score}
        totalQuestions={gameState.totalQuestions}
        onPlayAgain={resetGame}
      />
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>✨ Soul Thursday Trivia</Text>
        
        <View style={styles.scoreCard}>
          <View>
            <Text style={styles.scoreText}>{gameState.score}</Text>
            <Text style={styles.label}>Score</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <View style={[styles.difficultyBadge, { backgroundColor: DifficultyEngine.getDifficultyColor(gameState.difficulty) }]}>
              <Text style={styles.difficultyText}>
                {DifficultyEngine.getDifficultyLabel(gameState.difficulty)}
              </Text>
            </View>
            {gameState.correctStreak > 0 && (
              <Text style={styles.streak}>🔥 {gameState.correctStreak} streak</Text>
            )}
          </View>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            Question {gameState.currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={styles.difficultyLabel}>
            {currentQuestion.difficulty === 'easy' ? '🟢' : currentQuestion.difficulty === 'medium' ? '🟠' : '🔴'} {currentQuestion.difficulty?.toUpperCase()}
          </Text>
          <Text style={styles.question}>{currentQuestion.q}</Text>
        </View>

        {feedback && (
          <View style={[styles.feedback, { backgroundColor: feedback.correct ? '#4CAF50' : '#F44336' }]}>
            <Text style={styles.feedbackText}>{feedback.message}</Text>
          </View>
        )}

        {currentQuestion.category === 'culture-tags' ? (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your answer..."
              value={userAnswer}
              onChangeText={setUserAnswer}
              onSubmitEditing={() => checkAnswer(userAnswer)}
              editable={!feedback}
              autoCapitalize="words"
              autoCorrect={false}
            />
            <TouchableOpacity 
              style={[styles.submitButton, (!!feedback || !userAnswer.trim()) && styles.disabledOption]} 
              onPress={() => checkAnswer(userAnswer)}
              disabled={!!feedback || !userAnswer.trim()}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.optionsContainer}>
            {currentQuestion.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  userAnswer === option && styles.selectedOption,
                  !!feedback && styles.disabledOption
                ]}
                onPress={() => checkAnswer(option)}
                disabled={!!feedback}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Tip: Get 3 correct in a row to increase difficulty!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  scoreCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 20 },
  scoreText: { fontSize: 36, fontWeight: 'bold' },
  label: { fontSize: 12, opacity: 0.7, textAlign: 'center' },
  divider: { width: 1, height: 40, backgroundColor: '#ccc' },
  difficultyBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginBottom: 8 },
  difficultyText: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  streak: { fontSize: 12, textAlign: 'center' },
  questionCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20 },
  questionNumber: { fontSize: 14, opacity: 0.7, marginBottom: 5 },
  difficultyLabel: { fontSize: 13, fontWeight: '600', marginBottom: 10 },
  question: { fontSize: 20, fontWeight: '600' },
  feedback: { padding: 16, borderRadius: 8, marginBottom: 20 },
  feedbackText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  textInputContainer: { gap: 12, marginBottom: 20 },
  textInput: { backgroundColor: '#fff', padding: 16, borderRadius: 8, fontSize: 18 },
  submitButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8 },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  optionsContainer: { gap: 12 },
  optionButton: { backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  selectedOption: { borderColor: '#007AFF', borderWidth: 2 },
  disabledOption: { opacity: 0.5 },
  optionText: { fontSize: 16, textAlign: 'center' },
  infoBox: { marginTop: 20, padding: 12, backgroundColor: '#fff', borderRadius: 8, opacity: 0.7 },
  infoText: { fontSize: 14, textAlign: 'center' },
  score: { fontSize: 24, marginBottom: 10, textAlign: 'center' },
  percentage: { fontSize: 20, opacity: 0.8, marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#007AFF', padding: 16, borderRadius: 25, marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});
