import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, BarChart3, TrendingUp, Trophy, Award, ChevronLeft } from 'lucide-react-native';
import { VIDEOS } from '@/constants/videos';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';

export default function ProfileTutorialScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push('/quiz');
  };

  const handlePrevious = () => {
    router.push('/tutorial/drills');
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Martial Arts Levels',
      description: 'Visual representation of your skill levels across different martial arts disciplines, updated based on your training performance and video analysis.',
    },
    {
      icon: TrendingUp,
      title: 'Strengths & Weaknesses',
      description: 'Clear breakdown of your fighting strengths and areas for improvement, helping you understand where to focus your training efforts.',
    },
    {
      icon: Trophy,
      title: 'Achievement System',
      description: 'Earn badges and achievements for reaching milestones, completing training goals, and demonstrating skill improvements over time.',
    },
    {
      icon: Award,
      title: 'Progress History',
      description: 'Comprehensive timeline of your martial arts journey, showing skill development, training consistency, and performance improvements.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: VIDEOS.fighterProfile.url }}
            style={styles.video}
            shouldPlay={VIDEOS.fighterProfile.shouldPlay}
            isLooping={VIDEOS.fighterProfile.isLooping}
            useNativeControls={VIDEOS.fighterProfile.useNativeControls}
            resizeMode={ResizeMode.COVER}
          />
          
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <X size={24} color={Colors.dark.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
            <ChevronLeft size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.introSection}>
            <View style={styles.tabContainer}>
              <View style={styles.tab}>
                <Text style={styles.tabText}>Video Analysis</Text>
              </View>
              <View style={styles.tab}>
                <Text style={styles.tabText}>Smart Drills</Text>
              </View>
              <View style={[styles.tab, styles.activeTab]}>
                <Text style={[styles.tabText, styles.activeTabText]}>
                  Fighter Profile
                </Text>
              </View>
            </View>
            
            <Text style={styles.introTitle}>Fighter Profile & Achievements</Text>
            <Text style={styles.introDescription}>
              Track your martial arts journey with detailed skill levels across different disciplines, monitor your strengths and weaknesses, and unlock achievements as you progress.
            </Text>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <feature.icon size={24} color={Colors.dark.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Build Your Fighter Legacy</Text>
            <Text style={styles.ctaSubtitle}>
              Create your profile and start earning achievements as you develop your martial arts skills.
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Create Fighter Profile"
                onPress={handleContinue}
                size="large"
                style={styles.continueButton}
              />
            </View>

            <View style={styles.pageIndicator}>
              <View style={styles.pageIndicatorDot} />
              <View style={styles.pageIndicatorDot} />
              <View style={[styles.pageIndicatorDot, styles.pageIndicatorDotActive]} />
            </View>
          </View>
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
  videoContainer: {
    height: 500,
    position: 'relative',
    backgroundColor: Colors.dark.background,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  prevButton: {
    position: 'absolute',
    left: theme.spacing.lg,
    top: '50%',
    marginTop: -22,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  introSection: {
    marginBottom: theme.spacing.xl,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
    backgroundColor: Colors.dark.card,
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.dark.primary,
  },
  tabText: {
    color: Colors.dark.subtext,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    color: Colors.dark.text,
  },
  introTitle: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.md,
  },
  introDescription: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.subtext,
    lineHeight: 22,
  },
  featuresSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureContent: {
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
    lineHeight: 20,
  },
  ctaSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  ctaTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  ctaSubtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.subtext,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  continueButton: {
    width: '100%',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  pageIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.inactive,
  },
  pageIndicatorDotActive: {
    backgroundColor: Colors.dark.primary,
    width: 24,
  },
});