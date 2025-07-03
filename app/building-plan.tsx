import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import LoadingAnimation from '@/components/LoadingAnimation';

export default function BuildingPlanScreen() {
  const router = useRouter();

  const analysisSteps = [
    "Analyzing your fighter profile",
    "Identifying optimal training methods",
    "Selecting drills for your style",
    "Optimizing for your schedule",
    "Finalizing your training plan"
  ];

  const handleComplete = () => {
    router.push('/video-submission');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LoadingAnimation
          steps={analysisSteps}
          onComplete={handleComplete}
          duration={5000}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
});