import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from './Button';
import { LinearGradient } from 'expo-linear-gradient';
import { Upload, Video, Zap } from 'lucide-react-native';

interface VideoUploaderProps {
  onVideoSelected: (uri: string) => void;
}

export default function VideoUploader({ onVideoSelected }: VideoUploaderProps) {
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisSteps = [
    { title: "Initializing AI Engine", detail: "Loading neural networks..." },
    { title: "Frame Extraction", detail: "Processing 30 FPS video data..." },
    { title: "Motion Detection", detail: "Tracking body movement patterns..." },
    { title: "Technique Analysis", detail: "Comparing to 10,000+ fight sequences..." },
    { title: "Performance Metrics", detail: "Calculating speed, power, accuracy..." },
    { title: "Fighter Matching", detail: "Finding your fighting style twin..." },
    { title: "Generating Report", detail: "Creating personalized training plan..." }
  ];

  const pickVideo = async () => {
    setLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setVideoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking video:', error);
    } finally {
      setLoading(false);
    }
  };

  const recordVideo = async () => {
    setLoading(true);
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (cameraPermission.granted) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          quality: 1,
          videoMaxDuration: 60,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          setVideoUri(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.error('Error recording video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (videoUri) {
      setAnalyzing(true);
      setAnalysisStep(0);
      
      // Simulate detailed analysis steps
      const stepInterval = setInterval(() => {
        setAnalysisStep((prev) => {
          if (prev < analysisSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(stepInterval);
            setTimeout(() => {
              onVideoSelected(videoUri);
            }, 1000);
            return prev;
          }
        });
      }, 1200);
    }
  };

  if (analyzing) {
    return (
      <View style={styles.analysisContainer}>
        <View style={styles.analysisHeader}>
          <Text style={styles.analysisTitle}>AI Analysis in Progress</Text>
          <Text style={styles.analysisSubtitle}>
            Processing your video with advanced computer vision
          </Text>
        </View>

        <View style={styles.analysisSteps}>
          {analysisSteps.map((step, index) => (
            <View key={index} style={[
              styles.analysisStep,
              index <= analysisStep ? styles.activeAnalysisStep : {}
            ]}>
              <View style={[
                styles.stepNumber,
                index < analysisStep ? styles.completedStep : 
                index === analysisStep ? styles.currentStep : {}
              ]}>
                <Text style={styles.stepNumberText}>
                  {index < analysisStep ? '✓' : index + 1}
                </Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={[
                  styles.stepTitle,
                  index <= analysisStep ? styles.activeStepTitle : {}
                ]}>
                  {step.title}
                </Text>
                <Text style={[
                  styles.stepDetail,
                  index === analysisStep ? styles.activeStepDetail : {}
                ]}>
                  {step.detail}
                </Text>
              </View>
              {index === analysisStep && (
                <View style={styles.processingIndicator}>
                  <View style={styles.processingDot} />
                  <View style={styles.processingDot} />
                  <View style={styles.processingDot} />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(((analysisStep + 1) / analysisSteps.length) * 100)}% Complete
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {videoUri ? (
        <View style={styles.previewContainer}>
          <View style={styles.videoContainer}>
            <Image
              source={{ uri: videoUri }}
              style={styles.videoPreview}
              resizeMode="cover"
            />
            <View style={styles.videoOverlay}>
              <View style={styles.playIcon}>
                <Video size={32} color={Colors.dark.text} />
              </View>
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusText}>Video Ready for Analysis</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={pickVideo}
              disabled={analyzing}
            >
              <Text style={styles.secondaryButtonText}>Replace Video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.primaryButton, analyzing && styles.analyzingButton]}
              onPress={handleContinue}
              disabled={analyzing}
            >
              <Text style={styles.primaryButtonText}>
                {analyzing ? 'Analyzing...' : 'Start Analysis'}
              </Text>
              {analyzing && <Zap size={18} color={Colors.dark.background} style={styles.buttonIcon} />}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.uploadSection}>
          <TouchableOpacity
            style={styles.uploadCard}
            onPress={pickVideo}
            disabled={loading}
          >
            <View style={styles.uploadIconContainer}>
              <Upload size={48} color={Colors.dark.primary} />
            </View>
            <Text style={styles.uploadTitle}>Upload Training Video</Text>
            <Text style={styles.uploadDescription}>
              Select a video from your device gallery
            </Text>
            <View style={styles.uploadBorder} />
          </TouchableOpacity>

          {Platform.OS !== 'web' && (
            <TouchableOpacity
              style={styles.uploadCard}
              onPress={recordVideo}
              disabled={loading}
            >
              <View style={styles.uploadIconContainer}>
                <Camera size={48} color={Colors.dark.primary} />
              </View>
              <Text style={styles.uploadTitle}>Record New Video</Text>
              <Text style={styles.uploadDescription}>
                Capture your training session live
              </Text>
              <View style={styles.uploadBorder} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  uploadSection: {
    flex: 1,
    gap: theme.spacing.lg,
  },
  uploadCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.accent,
    position: 'relative',
    minHeight: 200,
    justifyContent: 'center',
  },
  uploadIconContainer: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  uploadTitle: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  uploadDescription: {
    color: Colors.dark.subtext,
    fontSize: theme.typography.fontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  uploadBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.dark.primary,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
  },
  previewContainer: {
    width: '100%',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    position: 'relative',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.dark.accent,
  },
  videoPreview: {
    width: '100%',
    height: 280,
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.pill,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    marginVertical: theme.spacing.lg,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.pill,
    borderWidth: 1,
    borderColor: Colors.dark.success,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.dark.success,
    marginRight: theme.spacing.sm,
  },
  statusText: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.accent,
  },
  secondaryButtonText: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 2,
    backgroundColor: Colors.dark.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  analyzingButton: {
    backgroundColor: Colors.dark.techBlue,
  },
  primaryButtonText: {
    color: Colors.dark.background,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: theme.spacing.sm,
  },
  analysisContainer: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  analysisHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  analysisTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.sm,
  },
  analysisSubtitle: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.subtext,
    textAlign: 'center',
  },
  analysisSteps: {
    flex: 1,
    marginBottom: theme.spacing.xl,
  },
  analysisStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
    opacity: 0.4,
  },
  activeAnalysisStep: {
    opacity: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  completedStep: {
    backgroundColor: Colors.dark.success,
  },
  currentStep: {
    backgroundColor: Colors.dark.primary,
  },
  stepNumberText: {
    color: Colors.dark.text,
    fontWeight: 'bold',
    fontSize: theme.typography.fontSizes.sm,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: Colors.dark.subtext,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeStepTitle: {
    color: Colors.dark.text,
  },
  stepDetail: {
    color: Colors.dark.subtext,
    fontSize: theme.typography.fontSizes.sm,
    opacity: 0.7,
  },
  activeStepDetail: {
    opacity: 1,
    color: Colors.dark.primary,
  },
  processingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
  },
  processingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.primary,
    marginHorizontal: 2,
  },
  progressSection: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.dark.accent,
    borderRadius: 4,
    marginBottom: theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 4,
  },
  progressText: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
  },
});