import { StyleSheet } from 'react-native';
import Colors from './colors';

export const theme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    pill: 9999,
  },
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: theme.spacing.lg,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    color: Colors.dark.subtext,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  text: {
    fontSize: theme.typography.fontSizes.md,
    color: Colors.dark.text,
  },
  card: {
    backgroundColor: Colors.dark.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    width: '100%',
  },
});