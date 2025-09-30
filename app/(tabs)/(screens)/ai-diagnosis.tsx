import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, Upload, ArrowLeft, CircleCheck as CheckCircle } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDiagnosis } from '@/backend/ai/diagnosisService';

export default function AIDiagnosisScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera permission is needed to take a photo.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
      });
      if (result.canceled) return;

      const photo = result.assets[0];
      setSelectedImage(photo.uri);
      setIsAnalyzing(true);
      const { imageUrl, diagnosis } = await getDiagnosis(photo);
      setDiagnosisResult({
        disease: diagnosis.disease,
        confidence: `${Math.round((diagnosis.confidence ?? 0) * 100)}%`,
        severity: diagnosis.severity,
        recommendations: diagnosis.recommendations ?? [],
      });
    } catch (err: any) {
      Alert.alert('Analysis failed', err?.message || 'Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUploadPhoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Gallery permission is needed to select a photo.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
      });
      if (result.canceled) return;

      const photo = result.assets[0];
      setSelectedImage(photo.uri);
      setIsAnalyzing(true);
      const { imageUrl, diagnosis } = await getDiagnosis(photo);
      setDiagnosisResult({
        disease: diagnosis.disease,
        confidence: `${Math.round((diagnosis.confidence ?? 0) * 100)}%`,
        severity: diagnosis.severity,
        recommendations: diagnosis.recommendations ?? [],
      });
    } catch (err: any) {
      Alert.alert('Analysis failed', err?.message || 'Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDiagnosis = () => {
    setSelectedImage(null);
    setDiagnosisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Crop Diagnosis</Text>
      </View>

      <ScrollView style={styles.content}>
        {!selectedImage && (
          <View style={styles.uploadSection}>
            <Text style={styles.sectionTitle}>Take or Upload Plant Photo</Text>
            <Text style={styles.instruction}>
              Capture a clear photo of the affected plant part for accurate diagnosis
            </Text>

            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadButton} onPress={handleTakePhoto}>
                <Camera size={32} color="white" />
                <Text style={styles.uploadButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.uploadButton, styles.uploadButtonSecondary]} onPress={handleUploadPhoto}>
                <Upload size={32} color="#4A7C59" />
                <Text style={[styles.uploadButtonText, styles.uploadButtonTextSecondary]}>
                  Upload from Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tips}>
              <Text style={styles.tipsTitle}>📸 Photo Tips</Text>
              <Text style={styles.tip}>• Ensure good lighting</Text>
              <Text style={styles.tip}>• Focus on affected areas</Text>
              <Text style={styles.tip}>• Include healthy parts for comparison</Text>
              <Text style={styles.tip}>• Avoid blurry images</Text>
            </View>
          </View>
        )}

        {selectedImage && (
          <View style={styles.analysisSection}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            
            {isAnalyzing && (
              <View style={styles.analyzingCard}>
                <Text style={styles.analyzingText}>🔍 Analyzing your plant...</Text>
                <Text style={styles.analyzingSubtext}>Our AI is examining the image</Text>
              </View>
            )}

            {diagnosisResult && (
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <CheckCircle size={24} color="#4A7C59" />
                  <Text style={styles.resultTitle}>Diagnosis Complete</Text>
                </View>

                <View style={styles.diagnosisInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Disease:</Text>
                    <Text style={styles.infoValue}>{diagnosisResult.disease}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Confidence:</Text>
                    <Text style={styles.infoValue}>{diagnosisResult.confidence}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Severity:</Text>
                    <Text style={[styles.infoValue, { color: diagnosisResult.severity === 'None' ? '#4A7C59' : '#D2691E' }]}>
                      {diagnosisResult.severity}
                    </Text>
                  </View>
                </View>

                <View style={styles.recommendations}>
                  <Text style={styles.recommendationsTitle}>💡 Recommendations</Text>
                  {diagnosisResult.recommendations.map((rec: string, index: number) => (
                    <View key={index} style={styles.recommendationItem}>
                      <Text style={styles.recommendationBullet}>•</Text>
                      <Text style={styles.recommendationText}>{rec}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.resetButton} onPress={resetDiagnosis}>
              <Text style={styles.resetButtonText}>Diagnose Another Plant</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  header: {
    backgroundColor: '#4A7C59',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  uploadSection: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 8,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  uploadOptions: {
    width: '100%',
    gap: 16,
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: '#4A7C59',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  uploadButtonSecondary: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4A7C59',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadButtonTextSecondary: {
    color: '#4A7C59',
  },
  tips: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 12,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  analysisSection: {
    alignItems: 'center',
  },
  selectedImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
  },
  analyzingCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 8,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: '#666',
  },
  resultCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    marginBottom: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A7C59',
  },
  diagnosisInfo: {
    gap: 12,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendations: {
    marginTop: 10,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recommendationBullet: {
    fontSize: 16,
    color: '#4A7C59',
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  resetButton: {
    backgroundColor: '#6B8E6B',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});