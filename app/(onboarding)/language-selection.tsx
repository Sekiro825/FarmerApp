import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const router = useRouter();

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    // In a real app, save to AsyncStorage
    setTimeout(() => {
      router.replace('/(onboarding)/login');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Language</Text>
        <Text style={styles.subtitle}>अपनी भाषा चुनें • നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക</Text>
      </View>

      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              selectedLanguage === language.code && styles.selectedLanguageButton,
            ]}
            onPress={() => handleLanguageSelect(language.code)}
          >
            <Text
              style={[
                styles.languageText,
                selectedLanguage === language.code && styles.selectedLanguageText,
              ]}
            >
              {language.nativeName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>Select your preferred language to continue</Text>
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
    marginBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8B4513',
    textAlign: 'center',
  },
  languageContainer: {
    gap: 16,
    marginBottom: 40,
  },
  languageButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  selectedLanguageButton: {
    borderColor: '#4A7C59',
    backgroundColor: '#4A7C59',
  },
  languageText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  selectedLanguageText: {
    color: 'white',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
});