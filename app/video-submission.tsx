import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@/store/onboarding-store';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import VideoUploader from '@/components/VideoUploader';
import { LinearGradient } from 'expo-linear-gradient';

export default function VideoSubmissionScreen() {
  const router = useRouter();
  const { setVideoUploaded, setVideoUri } = useOnboardingStore();

  const handleVideoSelected = (uri: string) => {
    setVideoUri(uri);
    setVideoUploaded(true);
    router.push('/fighter-profile');
  };

  const handleSkip = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>AI Video Analysis</Text>
          </View>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Motion Tracking</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Technique Analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Performance Metrics</Text>
            </View>
          </View>
        </View>
        
        <VideoUploader onVideoSelected={handleVideoSelected} />
        
        <View style={styles.footerSection}>
          <Text style={styles.helpText}>
            Best Results: 30-60 seconds • Full body visible • Good lighting • 1080p+ quality
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  skipButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  skipText: {
    color: Colors.dark.primary,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  headerSection: {
    marginBottom: theme.spacing.xl,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  featuresGrid: {
    backgroundColor: Colors.dark.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.accent,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.primary,
    marginRight: theme.spacing.md,
  },
  featureText: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '500',
  },
  footerSection: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.accent,
  },
  helpText: {
    fontSize: theme.typography.fontSizes.sm,
    color: Colors.dark.subtext,
    textAlign: 'center',
    lineHeight: 20,
  },
});