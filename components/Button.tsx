import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return Colors.dark.inactive;
    
    switch (variant) {
      case 'primary':
        return Colors.dark.primary;
      case 'secondary':
        return Colors.dark.secondary;
      case 'outline':
        return 'transparent';
      default:
        return Colors.dark.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled) return Colors.dark.inactive;
    
    switch (variant) {
      case 'outline':
        return Colors.dark.primary;
      default:
        return 'transparent';
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.dark.subtext;
    
    switch (variant) {
      case 'outline':
        return Colors.dark.primary;
      default:
        return Colors.dark.text;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
          borderRadius: theme.borderRadius.sm,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing.lg,
          paddingHorizontal: theme.spacing.xl,
          borderRadius: theme.borderRadius.lg,
        };
      default:
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.borderRadius.md,
        };
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return theme.typography.fontSizes.sm;
      case 'large':
        return theme.typography.fontSizes.lg;
      default:
        return theme.typography.fontSizes.md;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getSizeStyle(),
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.dark.text} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            { color: getTextColor(), fontSize: getFontSize() },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});