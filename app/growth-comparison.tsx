import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';
import RadarChart from '@/components/RadarChart';
import LineChart from '@/components/LineChart';

export default function GrowthComparisonScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/quiz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>See The Difference</Text>
          <Text style={styles.subtitle}>
            Don't waste time guessing. Fight AI accelerates your development.
          </Text>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Long-Term Progress Comparison</Text>
            <LineChart />
            <Text style={styles.chartSubtitle}>Fight IQ Score Over Time</Text>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Your Growth in 30 Days</Text>
            <RadarChart />
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.dark.inactive }]} />
                <Text style={styles.legendText}>Traditional Training</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.dark.primary }]} />
                <Text style={styles.legendText}>With Fight AI</Text>
              </View>
            </View>
          </View>

          <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>
              "I improved more in 30 days with Fight AI than I did in 6 months of traditional training."
            </Text>
            <Text style={styles.calloutAuthor}>- Marcus Chen, Amateur Boxer</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Start Your Journey"
          onPress={handleContinue}
          style={styles.button}
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    color: Colors.dark.subtext,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  chartContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  chartTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  chartSubtitle: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.dark.subtext,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.xs,
  },
  legendText: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.dark.text,
  },
  calloutContainer: {
    backgroundColor: Colors.dark.primary + '20',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.dark.primary,
  },
  calloutText: {
    fontSize: theme.typography.fontSizes.lg,
    color: Colors.dark.text,
    fontStyle: 'italic',
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },
  calloutAuthor: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.dark.subtext,
    textAlign: 'right',
  },
  footer: {
    padding: theme.spacing.lg,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
});