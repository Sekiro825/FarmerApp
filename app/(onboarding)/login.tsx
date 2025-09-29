import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const router = useRouter();

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }
    // Placeholder for OTP sending
    setShowOtpInput(true);
    Alert.alert('OTP Sent', 'Please enter the 6-digit OTP sent to your phone');
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    // Placeholder for OTP verification
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🌱</Text>
        </View>
        <Text style={styles.title}>Welcome to Preethvi</Text>
        <Text style={styles.subtitle}>Your AI Farming Assistant</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {showOtpInput && (
          <View style={styles.otpContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="6-digit OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={showOtpInput ? handleVerifyOTP : handleSendOTP}
        >
          <Text style={styles.buttonText}>
            {showOtpInput ? 'Verify OTP' : 'Send OTP'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  countryCode: {
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#4A7C59',
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
  },
  phoneInput: {
    flex: 1,
    padding: 16,
    fontSize: 18,
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
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 20,
  },
});