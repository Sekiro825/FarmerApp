import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ai-diagnosis" />
      <Stack.Screen name="ai-assistant" />
      <Stack.Screen name="weather" />
      <Stack.Screen name="schemes" />
      <Stack.Screen name="tutorials" />
    </Stack>
  );
}