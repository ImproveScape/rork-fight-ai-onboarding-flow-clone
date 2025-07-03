import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FighterProfile } from '@/types/fighter';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from './Button';

interface FighterProfileCardProps {
  profile: Partial<FighterProfile>;
  onContinue: () => void;
}

export default function FighterProfileCard({ profile, onContinue }: FighterProfileCardProps) {
  // Mock data for the analysis results
  const analysisResults = {
    fightStyle: "Aggressive Counter-Striker",
    strengths: ["Fast hand speed", "Good footwork", "Solid defensive awareness"],
    weaknesses: ["Telegraphed kicks", "Low guard when tired", "Predictable combinations"],
    skillLevel: 7.5,
  };

  const renderSkillLevel = () => {
    const level = analysisResults.skillLevel;
    const filledStars = Math.floor(level / 2);
    const halfStar = level % 2 >= 1;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
    
    return (
      <View style={styles.starsContainer}>
        {[...Array(filledStars)].map((_, i) => (
          <Text key={`filled-${i}`} style={styles.star}>★</Text>
        ))}
        {halfStar && <Text style={styles.star}>✬</Text>}
        {[...Array(emptyStars)].map((_, i) => (
          <Text key={`empty-${i}`} style={[styles.star, styles.emptyStar]}>☆</Text>
        ))}
        <Text style={styles.skillScore}>{level}/10</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fighter Profile</Text>
        <Text style={styles.name}>{profile.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fight Style Classification</Text>
        <Text style={styles.styleText}>{analysisResults.fightStyle}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skill Assessment</Text>
        {renderSkillLevel()}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Strengths</Text>
        <View style={styles.listContainer}>
          {analysisResults.strengths.map((strength, index) => (
            <View key={`strength-${index}`} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{strength}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Areas to Improve</Text>
        <View style={styles.listContainer}>
          {analysisResults.weaknesses.map((weakness, index) => (
            <View key={`weakness-${index}`} style={styles.listItem}>
              <Text style={styles.listBullet}>•</Text>
              <Text style={styles.listText}>{weakness}</Text>
            </View>
          ))}
        </View>
      </View>

      <Button
        title="Continue to Training Plan"
        onPress={onContinue}
        style={styles.continueButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
  },
  header: {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSizes.lg,
    color: Colors.dark.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.fontSizes.xl,
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.subtext,
    marginBottom: theme.spacing.sm,
  },
  styleText: {
    fontSize: theme.typography.fontSizes.lg,
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 24,
    color: Colors.dark.primary,
    marginRight: 2,
  },
  emptyStar: {
    color: Colors.dark.accent,
  },
  skillScore: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.text,
    marginLeft: theme.spacing.sm,
  },
  listContainer: {
    marginTop: theme.spacing.xs,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  listBullet: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.primary,
    marginRight: theme.spacing.xs,
    width: 15,
  },
  listText: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.text,
    flex: 1,
  },
  continueButton: {
    marginTop: theme.spacing.lg,
  },
});