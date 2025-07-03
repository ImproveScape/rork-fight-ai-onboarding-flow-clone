import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { QuizQuestion } from '@/types/fighter';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';
import Button from './Button';

interface QuizCardProps {
  question: QuizQuestion;
  value: any;
  onAnswer: (value: any) => void;
  onNext: () => void;
}

const getDefaultValue = (type: string) => {
  switch (type) {
    case 'text':
      return '';
    case 'number':
      return '';
    case 'select':
      return '';
    case 'multiselect':
      return [];
    case 'rating':
      return 0;
    default:
      return '';
  }
};

export default function QuizCard({ question, value, onAnswer, onNext }: QuizCardProps) {
  const [localValue, setLocalValue] = useState<any>(() => {
    if (value !== undefined && value !== null) {
      return value;
    }
    return getDefaultValue(question.type);
  });
  
  // Reset local value when question changes
  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      setLocalValue(value);
    } else {
      setLocalValue(getDefaultValue(question.type));
    }
  }, [question.id, value]);
  
  const handleNext = () => {
    onAnswer(localValue);
    onNext();
  };

  const isNextDisabled = () => {
    if (question.type === 'text' && (!localValue || localValue.trim() === '')) return true;
    if (question.type === 'number' && (localValue === null || localValue === '')) return true;
    if (question.type === 'select' && !localValue) return true;
    if (question.type === 'multiselect' && (!localValue || localValue.length === 0)) return true;
    if (question.type === 'rating' && (localValue === null || localValue === 0)) return true;
    return false;
  };

  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <TextInput
            style={styles.textInput}
            placeholder={question.placeholder || ''}
            placeholderTextColor={Colors.dark.subtext}
            value={localValue || ''}
            onChangeText={setLocalValue}
            autoFocus
          />
        );
      case 'number':
        return (
          <TextInput
            style={styles.textInput}
            placeholder={question.placeholder || ''}
            placeholderTextColor={Colors.dark.subtext}
            value={localValue ? String(localValue) : ''}
            onChangeText={(text) => {
              const numValue = text ? parseInt(text, 10) : '';
              setLocalValue(isNaN(numValue as number) ? '' : numValue);
            }}
            keyboardType="numeric"
            autoFocus
          />
        );
      case 'select':
        return (
          <ScrollView style={styles.optionsContainer}>
            {question.options?.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  localValue === option && styles.selectedOption,
                ]}
                onPress={() => setLocalValue(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    localValue === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case 'multiselect':
        return (
          <ScrollView style={styles.optionsContainer}>
            {question.options?.map((option) => {
              const isSelected = Array.isArray(localValue) && localValue.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => {
                    if (!Array.isArray(localValue)) {
                      setLocalValue([option]);
                    } else {
                      if (isSelected) {
                        setLocalValue(localValue.filter((item) => item !== option));
                      } else {
                        setLocalValue([...localValue, option]);
                      }
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        );
      case 'rating':
        return (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>1 (Beginner) - 10 (Expert)</Text>
            <View style={styles.ratingButtons}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.ratingButton,
                    localValue === rating && styles.selectedRating,
                  ]}
                  onPress={() => setLocalValue(rating)}
                >
                  <Text
                    style={[
                      styles.ratingText,
                      localValue === rating && styles.selectedRatingText,
                    ]}
                  >
                    {rating}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question.question}</Text>
      {renderInput()}
      <Button
        title="Next"
        onPress={handleNext}
        disabled={isNextDisabled()}
        style={styles.nextButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    minHeight: 300,
    justifyContent: 'space-between',
  },
  question: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.lg,
  },
  textInput: {
    backgroundColor: Colors.dark.accent,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.lg,
    marginBottom: theme.spacing.lg,
  },
  optionsContainer: {
    maxHeight: 300,
    marginBottom: theme.spacing.lg,
  },
  optionButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  selectedOption: {
    backgroundColor: Colors.dark.primary,
  },
  optionText: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.md,
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: theme.spacing.md,
  },
  ratingContainer: {
    marginBottom: theme.spacing.lg,
  },
  ratingLabel: {
    color: Colors.dark.subtext,
    fontSize: theme.typography.fontSizes.sm,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  ratingButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  ratingButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: theme.borderRadius.md,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  selectedRating: {
    backgroundColor: Colors.dark.primary,
  },
  ratingText: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: 'bold',
  },
  selectedRatingText: {
    color: Colors.dark.background,
  },
});