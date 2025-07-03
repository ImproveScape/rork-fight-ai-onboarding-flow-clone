import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/tutorial/analysis');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#1E1E1E']}
        style={styles.background}
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://i.imgur.com/xypwJPT.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <View style={styles.textContainer}>
            <Text style={styles.title}>Train Smarter. Fight Better.</Text>
            <Text style={styles.subtitle}>
              We'll build a custom program tailored to your style.
            </Text>
          </View>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🥊</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Personalized Training</Text>
                <Text style={styles.featureDescription}>
                  Custom drills based on your fighting style
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🎯</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Video Analysis</Text>
                <Text style={styles.featureDescription}>
                  AI feedback on your technique and form
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📈</Text>
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Progress Tracking</Text>
                <Text style={styles.featureDescription}>
                  Monitor your improvement over time
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              size="large"
              style={styles.getStartedButton}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: theme.spacing.xl,
  },
  textContainer: {
    alignItems: 'center',
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
  },
  featuresContainer: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.dark.subtext,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: theme.spacing.xl,
  },
  getStartedButton: {
    marginBottom: 0,
  },
});