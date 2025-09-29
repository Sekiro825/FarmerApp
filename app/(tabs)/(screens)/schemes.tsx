import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ExternalLink, Calendar, MapPin } from 'lucide-react-native';

interface Scheme {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  eligibility: string[];
  benefits: string;
  status: 'active' | 'upcoming' | 'closing';
}

export default function SchemesScreen() {
  const router = useRouter();

  const schemes: Scheme[] = [
    {
      id: '1',
      title: 'PM-KISAN Scheme',
      category: 'Central Government',
      description: 'Direct income support to farmers for their families',
      deadline: '31st March, 2024',
      eligibility: ['Small and marginal farmers', 'Landholding up to 2 hectares', 'Indian citizen'],
      benefits: '₹6,000 per year in three installments',
      status: 'active',
    },
    {
      id: '2',
      title: 'Kerala Farmer Interest-free Loan',
      category: 'State Government',
      description: 'Interest-free agricultural loans for Kerala farmers',
      deadline: '15th April, 2024',
      eligibility: ['Kerala resident', 'Active farmer', 'No previous loan defaults'],
      benefits: 'Up to ₹3,00,000 interest-free loan',
      status: 'active',
    },
    {
      id: '3',
      title: 'Organic Farming Subsidy',
      category: 'Central Government',
      description: 'Subsidies for organic farming practices and certification',
      deadline: '30th June, 2024',
      eligibility: ['Certified organic farmers', 'Minimum 1 acre land', 'Previous farming experience'],
      benefits: '50% subsidy on organic inputs',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Pradhan Mantri Fasal Bima Yojana',
      category: 'Central Government',
      description: 'Crop insurance scheme for farmers against production risks',
      deadline: '20th May, 2024',
      eligibility: ['All farmers', 'Sharecroppers eligible', 'Covers all food crops'],
      benefits: 'Insurance coverage up to sum insured',
      status: 'closing',
    },
    {
      id: '5',
      title: 'Coconut Development Board Scheme',
      category: 'Kerala Specific',
      description: 'Support for coconut farming and processing in Kerala',
      deadline: '10th July, 2024',
      eligibility: ['Coconut farmers in Kerala', 'Minimum 10 coconut palms', 'Group formation preferred'],
      benefits: 'Subsidy on coconut processing equipment',
      status: 'upcoming',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4A7C59';
      case 'upcoming':
        return '#D2691E';
      case 'closing':
        return '#FF6B6B';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Apply Now';
      case 'upcoming':
        return 'Coming Soon';
      case 'closing':
        return 'Closing Soon';
      default:
        return 'Learn More';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Government Schemes</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📜 Available Farming Schemes</Text>
          <Text style={styles.infoText}>
            Explore government schemes and subsidies available for farmers in Kerala. 
            Apply for eligible schemes to get financial support for your farming activities.
          </Text>
        </View>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterChip, styles.activeFilter]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>All Schemes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Central Govt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>State Govt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterText}>Kerala Specific</Text>
          </TouchableOpacity>
        </View>

        {/* Schemes List */}
        <View style={styles.schemesList}>
          {schemes.map((scheme) => (
            <View key={scheme.id} style={styles.schemeCard}>
              <View style={styles.schemeHeader}>
                <View style={styles.schemeInfo}>
                  <View style={styles.schemeTitleRow}>
                    <Text style={styles.schemeTitle}>{scheme.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(scheme.status) }]}>
                      <Text style={styles.statusText}>{scheme.status.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.schemeCategory}>{scheme.category}</Text>
                </View>
              </View>

              <Text style={styles.schemeDescription}>{scheme.description}</Text>

              <View style={styles.schemeDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={16} color="#8B4513" />
                  <Text style={styles.detailText}>Deadline: {scheme.deadline}</Text>
                </View>
                
                <View style={styles.benefitsContainer}>
                  <Text style={styles.benefitsLabel}>💰 Benefits:</Text>
                  <Text style={styles.benefitsText}>{scheme.benefits}</Text>
                </View>

                <View style={styles.eligibilityContainer}>
                  <Text style={styles.eligibilityLabel}>✅ Key Eligibility:</Text>
                  {scheme.eligibility.slice(0, 2).map((criteria, index) => (
                    <Text key={index} style={styles.eligibilityItem}>• {criteria}</Text>
                  ))}
                  {scheme.eligibility.length > 2 && (
                    <Text style={styles.moreEligibility}>+{scheme.eligibility.length - 2} more criteria</Text>
                  )}
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: getStatusColor(scheme.status) }]}
                disabled={scheme.status === 'upcoming'}
              >
                <Text style={styles.actionButtonText}>{getStatusText(scheme.status)}</Text>
                <ExternalLink size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Help Section */}
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>🤝 Need Help with Applications?</Text>
          <Text style={styles.helpText}>
            Contact your local agricultural officer or visit the nearest Common Service Center (CSC) 
            for assistance with scheme applications.
          </Text>
          <TouchableOpacity style={styles.helpButton}>
            <MapPin size={16} color="#4A7C59" />
            <Text style={styles.helpButtonText}>Find Nearest CSC</Text>
          </TouchableOpacity>
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
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activeFilter: {
    backgroundColor: '#4A7C59',
    borderColor: '#4A7C59',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeFilterText: {
    color: 'white',
  },
  schemesList: {
    gap: 16,
  },
  schemeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
  },
  schemeHeader: {
    marginBottom: 12,
  },
  schemeInfo: {
    flex: 1,
  },
  schemeTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  schemeCategory: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
  },
  schemeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  schemeDetails: {
    gap: 12,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
  },
  benefitsContainer: {
    backgroundColor: '#F5F5DC',
    padding: 12,
    borderRadius: 8,
  },
  benefitsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 4,
  },
  benefitsText: {
    fontSize: 14,
    color: '#333',
  },
  eligibilityContainer: {
    gap: 4,
  },
  eligibilityLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 4,
  },
  eligibilityItem: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  moreEligibility: {
    fontSize: 12,
    color: '#8B4513',
    fontStyle: 'italic',
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  helpCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F5DC',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    fontSize: 14,
    color: '#4A7C59',
    fontWeight: '600',
  },
});