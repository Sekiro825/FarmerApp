import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, Mic, Cloud, BookOpen, FileText, Hop as HomeIcon, Users, Wifi, WifiOff } from 'lucide-react-native';

interface QuickActionButton {
  id: string;
  title: string;
  icon: React.ReactNode;
  route: string;
  color: string;
}

export default function HomeScreen() {
  const router = useRouter();

  const quickActions: QuickActionButton[] = [
    {
      id: 'diagnosis',
      title: 'AI Crop Diagnosis',
      icon: <Camera size={28} color="white" />,
      route: '/(tabs)/(screens)/ai-diagnosis',
      color: '#4A7C59',
    },
    {
      id: 'assistant',
      title: 'Ask AI Assistant',
      icon: <Mic size={28} color="white" />,
      route: '/(tabs)/(screens)/ai-assistant',
      color: '#6B8E6B',
    },
    {
      id: 'weather',
      title: 'Weather & Alerts',
      icon: <Cloud size={28} color="white" />,
      route: '/(tabs)/(screens)/weather',
      color: '#8B4513',
    },
    {
      id: 'tutorials',
      title: 'Farming Tutorials',
      icon: <BookOpen size={28} color="white" />,
      route: '/(tabs)/(screens)/tutorials',
      color: '#D2691E',
    },
    {
      id: 'schemes',
      title: 'Govt Schemes',
      icon: <FileText size={28} color="white" />,
      route: '/(tabs)/(screens)/schemes',
      color: '#4A7C59',
    },
    {
      id: 'staycation',
      title: 'Farm Staycation',
      icon: <HomeIcon size={28} color="white" />,
      route: '/(tabs)/staycation',
      color: '#8B4513',
    },
  ];

  const handleQuickAction = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.farmerName}>Ravi Kumar</Text>
          </View>
          <View style={styles.connectionStatus}>
            <Wifi size={20} color="#4A7C59" />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        
        {/* Weather Summary */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Today's Weather - Kochi</Text>
          <View style={styles.weatherRow}>
            <Text style={styles.temperature}>28°C</Text>
            <Text style={styles.weatherDesc}>Partly Cloudy • 60% Humidity</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionButton, { backgroundColor: action.color }]}
              onPress={() => handleQuickAction(action.route)}
            >
              {action.icon}
              <Text style={styles.actionButtonText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Camera size={20} color="#4A7C59" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Crop diagnosis completed</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Cloud size={20} color="#8B4513" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Weather alert received</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
          </View>
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
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#666',
  },
  farmerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A7C59',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  onlineText: {
    fontSize: 14,
    color: '#4A7C59',
    fontWeight: '600',
  },
  weatherCard: {
    backgroundColor: '#F5F5DC',
    padding: 16,
    borderRadius: 12,
  },
  weatherTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A7C59',
  },
  weatherDesc: {
    fontSize: 16,
    color: '#8B4513',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recentActivity: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5DC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
  },
});