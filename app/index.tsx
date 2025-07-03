import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { theme } from '@/constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#1E1E1E']}
        style={styles.background}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://i.imgur.com/xypwJPT.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Your Personalized AI MMA Coach</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  tagline: {
    color: Colors.dark.text,
    fontSize: theme.typography.fontSizes.md,
    marginTop: theme.spacing.md,
    fontWeight: '500',
  },
});