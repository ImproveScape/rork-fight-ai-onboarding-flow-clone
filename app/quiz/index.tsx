import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboarding-store';
import { quizQuestions } from '@/constants/quizQuestions';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import ProgressBar from '@/components/ProgressBar';
import QuizCard from '@/components/QuizCard';

export default function QuizScreen() {
  const router = useRouter();
  const { 
    currentQuestionIndex, 
    fighterProfile, 
    setCurrentQuestionIndex, 
    updateFighterProfile 
  } = useOnboardingStore();

  const progress = (currentQuestionIndex) / quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = (value: any) => {
    const key = currentQuestion.key;
    updateFighterProfile({ [key]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push('/building-plan');
    }
  };

  useEffect(() => {
    // Reset the quiz when the component mounts
    setCurrentQuestionIndex(0);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProgressBar progress={progress} showPercentage />
        
        {currentQuestion && (
          <QuizCard
            question={currentQuestion}
            value={fighterProfile[currentQuestion.key]}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
});