import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This is a placeholder for the subscription screen that's already built

export default function SubscriptionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Subscription Screen (Already Implemented)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});