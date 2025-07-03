import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';

interface LoadingAnimationProps {
  steps: string[];
  onComplete: () => void;
  duration?: number;
}

export default function LoadingAnimation({
  steps,
  onComplete,
  duration = 5000,
}: LoadingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const stepDuration = duration / steps.length;

  useEffect(() => {
    let stepInterval: NodeJS.Timeout;
    let completed = false;
    
    const runAnimation = () => {
      // Create step-by-step animations
      const stepAnimations = steps.map((_, index) => {
        return Animated.timing(progressAnim, {
          toValue: (index + 1) / steps.length,
          duration: stepDuration,
          useNativeDriver: false,
        });
      });

      // Run the sequence
      Animated.sequence(stepAnimations).start(() => {
        if (!completed) {
          completed = true;
          onComplete();
        }
      });

      // Update current step indicator
      let stepIndex = 0;
      stepInterval = setInterval(() => {
        if (stepIndex < steps.length - 1) {
          stepIndex++;
          setCurrentStep(stepIndex);
        } else {
          clearInterval(stepInterval);
        }
      }, stepDuration);
    };

    runAnimation();

    return () => {
      completed = true;
      if (stepInterval) {
        clearInterval(stepInterval);
      }
      progressAnim.stopAnimation();
    };
  }, [steps.length, stepDuration, onComplete, progressAnim]);

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Building your personalized Fight AI program...</Text>
      
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View style={[
              styles.stepIndicator,
              index <= currentStep ? styles.activeStep : {}
            ]}>
              {index < currentStep && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={[
              styles.stepText,
              index <= currentStep ? styles.activeStepText : {}
            ]}>
              {step}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    width: '100%',
  },
  title: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  stepsContainer: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.dark.accent,
    marginRight: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStep: {
    backgroundColor: Colors.dark.primary,
  },
  checkmark: {
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.subtext,
  },
  activeStepText: {
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.dark.progressBackground,
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: theme.borderRadius.pill,
  },
});