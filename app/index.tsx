import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, check if user is logged in and language is selected
    const checkInitialRoute = async () => {
      // For demo, always go to onboarding
      setTimeout(() => {
        router.replace('/(onboarding)/splash');
      }, 1000);
    };

    checkInitialRoute();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4A7C59" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
});