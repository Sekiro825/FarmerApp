import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="language-selection" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>

  );
}