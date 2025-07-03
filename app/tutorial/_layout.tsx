import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function TutorialLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.dark.background,
        },
      }}
    >
      <Stack.Screen name="analysis" />
      <Stack.Screen name="drills" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}