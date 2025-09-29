import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { User, CreditCard as Edit, MapPin, Phone, Mail, Settings, Globe, Bell, Shield, LogOut } from 'lucide-react-native';

interface FarmRecord {
  crop: string;
  area: string;
  season: string;
  yield: string;
}

export default function ProfileScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const farmerProfile = {
    name: 'Ravi Kumar',
    phone: '+91 98765 43210',
    email: 'ravi.kumar@gmail.com',
    location: 'Kochi, Ernakulam, Kerala',
    farmSize: '5.2 acres',
    experience: '15 years',
    specialization: 'Organic Rice & Vegetables',
  };

  const farmRecords: FarmRecord[] = [
    { crop: 'Rice (Ponni)', area: '3.0 acres', season: 'Kharif 2023', yield: '18 tons' },
    { crop: 'Tomato', area: '1.0 acre', season: 'Rabi 2023', yield: '12 tons' },
    { crop: 'Okra', area: '0.5 acres', season: 'Summer 2023', yield: '3 tons' },
  ];

  const languages = ['English', 'Hindi', 'Malayalam'];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    Alert.alert('Language Changed', `Language switched to ${language}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && <Text style={styles.settingArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <User size={32} color="white" />
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Edit size={16} color="#4A7C59" />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.farmerName}>{farmerProfile.name}</Text>
            <Text style={styles.specialization}>{farmerProfile.specialization}</Text>
            
            <View style={styles.profileDetails}>
              <View style={styles.detailItem}>
                <MapPin size={16} color="#666" />
                <Text style={styles.detailText}>{farmerProfile.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Phone size={16} color="#666" />
                <Text style={styles.detailText}>{farmerProfile.phone}</Text>
              </View>
              <View style={styles.detailItem}>
                <Mail size={16} color="#666" />
                <Text style={styles.detailText}>{farmerProfile.email}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Farm Statistics */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>🚜 Farm Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{farmerProfile.farmSize}</Text>
              <Text style={styles.statLabel}>Total Farm Area</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{farmerProfile.experience}</Text>
              <Text style={styles.statLabel}>Farming Experience</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{farmRecords.length}</Text>
              <Text style={styles.statLabel}>Active Crops</Text>
            </View>
          </View>
        </View>

        {/* Farm Records */}
        <View style={styles.recordsCard}>
          <Text style={styles.cardTitle}>📊 Recent Farm Records</Text>
          {farmRecords.map((record, index) => (
            <View key={index} style={styles.recordItem}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordCrop}>{record.crop}</Text>
                <Text style={styles.recordYield}>{record.yield}</Text>
              </View>
              <View style={styles.recordDetails}>
                <Text style={styles.recordDetail}>Area: {record.area}</Text>
                <Text style={styles.recordDetail}> • </Text>
                <Text style={styles.recordDetail}>Season: {record.season}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Records</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>⚙️ Settings</Text>
          
          <SettingItem
            icon={<Globe size={20} color="#4A7C59" />}
            title="Language"
            subtitle={`Currently: ${selectedLanguage}`}
            onPress={() => {
              Alert.alert(
                'Select Language',
                'Choose your preferred language',
                languages.map(lang => ({
                  text: lang,
                  onPress: () => handleLanguageChange(lang),
                }))
              );
            }}
          />

          <SettingItem
            icon={<Bell size={20} color="#4A7C59" />}
            title="Notifications"
            subtitle={notificationsEnabled ? 'Enabled' : 'Disabled'}
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
          />

          <SettingItem
            icon={<Shield size={20} color="#4A7C59" />}
            title="Privacy & Security"
            subtitle="Manage your data and privacy settings"
            onPress={() => console.log('Privacy settings')}
          />

          <SettingItem
            icon={<Settings size={20} color="#4A7C59" />}
            title="App Settings"
            subtitle="General app preferences"
            onPress={() => console.log('App settings')}
          />
        </View>

        {/* Support */}
        <View style={styles.supportCard}>
          <Text style={styles.cardTitle}>🤝 Support</Text>
          
          <SettingItem
            icon={<Phone size={20} color="#4A7C59" />}
            title="Contact Support"
            subtitle="Get help with the app"
            onPress={() => console.log('Contact support')}
          />

          <SettingItem
            icon={<Mail size={20} color="#4A7C59" />}
            title="Feedback"
            subtitle="Share your suggestions"
            onPress={() => console.log('Feedback')}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Preethvi v1.0.0</Text>
          <Text style={styles.versionSubtext}>AI Farming Assistant</Text>
        </View>
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
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A7C59',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editProfileText: {
    fontSize: 14,
    color: '#4A7C59',
    fontWeight: '600',
  },
  profileInfo: {
    gap: 8,
  },
  farmerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  specialization: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
    marginBottom: 12,
  },
  profileDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  recordsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  recordItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  recordCrop: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recordYield: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7C59',
  },
  recordDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordDetail: {
    fontSize: 12,
    color: '#666',
  },
  viewAllButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4A7C59',
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  supportCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F5F5DC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  settingArrow: {
    fontSize: 20,
    color: '#CCC',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  versionSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});