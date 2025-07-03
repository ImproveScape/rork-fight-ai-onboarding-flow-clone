import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/colors";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: Colors.dark.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="tutorial" options={{ headerShown: false }} />
        <Stack.Screen name="growth-comparison" options={{ headerShown: false }} />
        <Stack.Screen 
          name="quiz/index" 
          options={{ 
            headerShown: true, 
            title: "Fighter Profile",
            headerBackVisible: false,
          }} 
        />
        <Stack.Screen 
          name="building-plan" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="video-submission" 
          options={{ 
            headerShown: true, 
            title: "Upload Your Video",
          }} 
        />
        <Stack.Screen 
          name="fighter-profile" 
          options={{ 
            headerShown: true, 
            title: "Your Fighter Analysis",
            headerBackVisible: false,
          }} 
        />
        <Stack.Screen 
          name="sign-in" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="subscription" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </>
  );
}