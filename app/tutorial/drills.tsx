import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Target, Calendar, Zap, BarChart3, ChevronLeft } from 'lucide-react-native';
import { VIDEOS } from '@/constants/videos';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';

export default function DrillsTutorialScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/tutorial/profile');
  };

  const handlePrevious = () => {
    router.push('/tutorial/analysis');
  };

  const features = [
    {
      icon: Target,
      title: 'Targeted Weakness Training',
      description: 'AI identifies your specific weak points from video analysis and creates focused drills to address each area that needs improvement.',
    },
    {
      icon: Calendar,
      title: 'Custom Training Plans',
      description: 'Generated drills are automatically organized into structured training plans that fit your schedule and skill level progression.',
    },
    {
      icon: Zap,
      title: 'Adaptive Difficulty',
      description: 'Drill difficulty adjusts based on your progress, ensuring you are always challenged at the right level for optimal improvement.',
    },
    {
      icon: BarChart3,
      title: 'Performance Integration',
      description: 'Training plans evolve based on your ongoing video submissions, creating a dynamic improvement cycle tailored to your development.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: VIDEOS.drillGeneration.url }}
            style={styles.video}
            shouldPlay={VIDEOS.drillGeneration.shouldPlay}
            isLooping={VIDEOS.drillGeneration.isLooping}
            useNativeControls={VIDEOS.drillGeneration.useNativeControls}
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
              <View style={[styles.tab, styles.activeTab]}>
                <Text style={[styles.tabText, styles.activeTabText]}>
                  Smart Drills
                </Text>
              </View>
              <View style={styles.tab}>
                <Text style={styles.tabText}>Fighter Profile</Text>
              </View>
            </View>
            
            <Text style={styles.introTitle}>Smart Drill Generation</Text>
            <Text style={styles.introDescription}>
              Based on your video analysis, our AI automatically generates personalized training drills that target your specific weak points and seamlessly integrates them into your custom training plan.
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
            <Text style={styles.ctaTitle}>Transform Your Weaknesses Into Strengths</Text>
            <Text style={styles.ctaSubtitle}>
              Let AI create the perfect training plan based on your unique needs and goals.
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Next Feature"
                onPress={handleNext}
                size="large"
                style={styles.continueButton}
              />
            </View>

            <View style={styles.pageIndicator}>
              <View style={styles.pageIndicatorDot} />
              <View style={[styles.pageIndicatorDot, styles.pageIndicatorDotActive]} />
              <View style={styles.pageIndicatorDot} />
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