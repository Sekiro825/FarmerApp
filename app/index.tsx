import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import supabase from '@/lib/supabaseClient';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const routeBySession = async () => {
      const { data } = await supabase.auth.getSession();
      const hasSession = !!data.session;
      if (!isMounted) return;
      if (hasSession) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)/splash');
      }
    };

    // initial check
    routeBySession();

    // subscribe to auth state changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session) {
        router.replace('/(tabs)');
      }
    });

    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
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