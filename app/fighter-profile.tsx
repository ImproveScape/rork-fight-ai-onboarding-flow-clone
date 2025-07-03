import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboarding-store';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import { CheckCircle } from 'lucide-react-native';

export default function FighterProfileScreen() {
  const router = useRouter();
  const { setProfileGenerated } = useOnboardingStore();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProfileGenerated(true);
      setShouldNavigate(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setProfileGenerated]);

  useEffect(() => {
    if (shouldNavigate) {
      router.push('/sign-in');
    }
  }, [shouldNavigate, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={64} color={Colors.dark.primary} />
        </View>
        <Text style={styles.title}>Analysis Complete</Text>
        <Text style={styles.subtitle}>Sign in to find out your results</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    color: Colors.dark.subtext,
    textAlign: 'center',
  },
});