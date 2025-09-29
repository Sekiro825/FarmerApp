import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface WeatherDay {
  day: string;
  icon: React.ReactNode;
  high: number;
  low: number;
  condition: string;
}

interface Alert {
  id: string;
  type: 'irrigation' | 'pest' | 'weather' | 'scheme';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
}

export default function WeatherScreen() {
  const router = useRouter();

  const currentWeather = {
    location: 'Kochi, Kerala',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 2.5,
    uvIndex: 7,
  };

  const forecast: WeatherDay[] = [
    {
      day: 'Today',
      icon: <Cloud size={24} color="#666" />,
      high: 30,
      low: 24,
      condition: 'Partly Cloudy',
    },
    {
      day: 'Tomorrow',
      icon: <CloudRain size={24} color="#4A90E2" />,
      high: 27,
      low: 22,
      condition: 'Light Rain',
    },
    {
      day: 'Wed',
      icon: <CloudRain size={24} color="#4A90E2" />,
      high: 26,
      low: 21,
      condition: 'Moderate Rain',
    },
    {
      day: 'Thu',
      icon: <Sun size={24} color="#F5A623" />,
      high: 32,
      low: 25,
      condition: 'Sunny',
    },
    {
      day: 'Fri',
      icon: <Cloud size={24} color="#666" />,
      high: 29,
      low: 23,
      condition: 'Cloudy',
    },
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'irrigation',
      title: 'Irrigation Reminder',
      message: 'Water your tomato crops. Last watered 2 days ago.',
      priority: 'high',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'weather',
      title: 'Rain Expected',
      message: 'Moderate rainfall expected tomorrow. Secure loose equipment.',
      priority: 'medium',
      time: '4 hours ago',
    },
    {
      id: '3',
      type: 'pest',
      title: 'Pest Alert',
      message: 'Aphid activity increased in your area. Check plants regularly.',
      priority: 'medium',
      time: '6 hours ago',
    },
    {
      id: '4',
      type: 'scheme',
      title: 'Scheme Deadline',
      message: 'PM-KISAN scheme application deadline in 5 days.',
      priority: 'high',
      time: '1 day ago',
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'irrigation':
        return <Droplets size={20} color="#4A90E2" />;
      case 'weather':
        return <Cloud size={20} color="#666" />;
      case 'pest':
        return <AlertTriangle size={20} color="#D2691E" />;
      case 'scheme':
        return <AlertTriangle size={20} color="#4A7C59" />;
      default:
        return <AlertTriangle size={20} color="#666" />;
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#D2691E';
      case 'low':
        return '#4A7C59';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather & Alerts</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Weather */}
        <View style={styles.currentWeatherCard}>
          <View style={styles.currentWeatherHeader}>
            <Text style={styles.location}>{currentWeather.location}</Text>
            <Text style={styles.currentTemp}>{currentWeather.temperature}°C</Text>
          </View>
          <Text style={styles.currentCondition}>{currentWeather.condition}</Text>
          
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailItem}>
              <Droplets size={20} color="#4A90E2" />
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{currentWeather.humidity}%</Text>
            </View>
            
            <View style={styles.weatherDetailItem}>
              <Wind size={20} color="#666" />
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{currentWeather.windSpeed} km/h</Text>
            </View>
            
            <View style={styles.weatherDetailItem}>
              <CloudRain size={20} color="#4A90E2" />
              <Text style={styles.detailLabel}>Rainfall</Text>
              <Text style={styles.detailValue}>{currentWeather.rainfall} mm</Text>
            </View>
          </View>
        </View>

        {/* 5-Day Forecast */}
        <View style={styles.forecastCard}>
          <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          {forecast.map((day, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.forecastDay}>{day.day}</Text>
              <View style={styles.forecastMiddle}>
                {day.icon}
                <Text style={styles.forecastCondition}>{day.condition}</Text>
              </View>
              <View style={styles.forecastTemps}>
                <Text style={styles.forecastHigh}>{day.high}°</Text>
                <Text style={styles.forecastLow}>{day.low}°</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Farming Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.sectionTitle}>💡 Weather-Based Tips</Text>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Rain expected tomorrow - cover sensitive crops</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• High humidity levels - monitor for fungal diseases</Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipText}>• Good conditions for applying organic fertilizers</Text>
          </View>
        </View>

        {/* Alerts */}
        <View style={styles.alertsCard}>
          <Text style={styles.sectionTitle}>🔔 Recent Alerts</Text>
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertItem}>
              <View style={styles.alertHeader}>
                <View style={styles.alertIconContainer}>
                  {getAlertIcon(alert.type)}
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                </View>
                <View style={[styles.alertPriority, { backgroundColor: getAlertColor(alert.priority) }]} />
              </View>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          ))}
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
  currentWeatherCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  currentWeatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    color: '#666',
  },
  currentTemp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A7C59',
  },
  currentCondition: {
    fontSize: 16,
    color: '#8B4513',
    marginBottom: 20,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  weatherDetailItem: {
    alignItems: 'center',
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  forecastCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 16,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  forecastDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: 80,
  },
  forecastMiddle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  forecastCondition: {
    fontSize: 14,
    color: '#666',
  },
  forecastTemps: {
    flexDirection: 'row',
    gap: 8,
  },
  forecastHigh: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastLow: {
    fontSize: 16,
    color: '#666',
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  tip: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  alertsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  alertItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 4,
  },
  alertIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#F5F5DC',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  alertPriority: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 44,
  },
});