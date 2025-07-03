import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Video, 
  BarChart3, 
  Users, 
  Trophy, 
  ArrowRight,
  CheckCircle
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';

export default function SignInScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced computer vision analyzes your technique frame by frame"
    },
    {
      icon: Target,
      title: "Personalized Training Plan",
      description: "Custom workouts designed specifically for your fighting style"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Detailed metrics showing your improvement over time"
    },
    {
      icon: Video,
      title: "Video Breakdowns",
      description: "Broken down into strengths and weaknesses as well as a rating"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Speed, power, and accuracy measurements"
    },
    {
      icon: Users,
      title: "Specialized Training",
      description: "Get specialized drills and exercises to target your weak points"
    }
  ];

  const handleSignIn = () => {
    setIsLoading(true);
    // Simulate sign-in process
    setTimeout(() => {
      router.replace('/subscription');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Trophy size={48} color={Colors.dark.primary} />
          </View>
          <Text style={styles.title}>Your AI Analysis is Ready!</Text>
          <Text style={styles.subtitle}>
            Sign in to access your personalized training plan and detailed fight analysis
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>What you'll get access to:</Text>
          
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <feature.icon size={24} color={Colors.dark.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <CheckCircle size={20} color={Colors.dark.success} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={[styles.signInButton, isLoading && styles.loadingButton]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Text style={styles.signInButtonText}>
              {isLoading ? 'Signing In...' : 'Sign In to Continue'}
            </Text>
            {!isLoading && <ArrowRight size={20} color={Colors.dark.background} />}
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            Free 3-day trial • Cancel anytime • No commitment
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.subtext,
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresSection: {
    marginBottom: theme.spacing.xl,
  },
  featuresTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.lg,
  },
  featuresList: {
    gap: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.accent,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.dark.subtext,
    lineHeight: 18,
  },
  ctaSection: {
    alignItems: 'center',
  },
  signInButton: {
    width: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  loadingButton: {
    opacity: 0.8,
  },
  signInButtonText: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: 'bold',
    color: Colors.dark.background,
    marginRight: theme.spacing.sm,
  },
  disclaimer: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.dark.subtext,
    textAlign: 'center',
  },
});