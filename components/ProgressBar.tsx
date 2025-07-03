import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  showPercentage?: boolean;
  height?: number;
}

export default function ProgressBar({
  progress,
  showPercentage = false,
  height = 8,
}: ProgressBarProps) {
  const percentage = Math.round(progress * 100);
  
  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { height }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, height },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={styles.percentageText}>{percentage}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  progressContainer: {
    backgroundColor: Colors.dark.progressBackground,
    borderRadius: theme.borderRadius.pill,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    backgroundColor: Colors.dark.progressBar,
    borderRadius: theme.borderRadius.pill,
  },
  percentageText: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: theme.spacing.xs,
    textAlign: 'right',
  },
});