import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import supabase from '@/lib/supabaseClient';

export default function SignupEmailOtpScreen() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleSendCode = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    try {
      setIsSending(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      setShowOtpInput(true);
      Alert.alert('Code sent', 'Enter the 6-digit code sent to your email');
    } catch (err: any) {
      Alert.alert('Failed to send code', err.message ?? 'Unknown error');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }
    try {
      setIsVerifying(true);
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });
      if (error) throw error;
      if (data?.session) {
        router.replace('/(tabs)');
      } else {
        const sessionRes = await supabase.auth.getSession();
        if (sessionRes.data.session) {
          router.replace('/(tabs)');
        } else {
          Alert.alert('Verification', 'Code verified, but no session found. Try again.');
        }
      }
    } catch (err: any) {
      Alert.alert('Verification failed', err.message ?? 'Unknown error');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🌱</Text>
        </View>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Sign in or sign up with email OTP</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {showOtpInput && (
          <View style={styles.otpContainer}>
            <Text style={styles.label}>Enter Code</Text>
            <TextInput
              style={styles.input}
              placeholder="6-digit code"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={showOtpInput ? handleVerifyCode : handleSendCode}
          disabled={isSending || isVerifying}
        >
          <Text style={styles.buttonText}>
            {showOtpInput ? (isVerifying ? 'Verifying...' : 'Verify Code') : (isSending ? 'Sending...' : 'Send Code')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 12, alignItems: 'center' }}>
          <Text style={{ color: '#4A7C59', fontWeight: '600' }}>Use phone instead</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B4513',
  },
  formContainer: {
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A7C59',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    fontSize: 18,
  },
  otpContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4A7C59',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

