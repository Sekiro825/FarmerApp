import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MapPin, Star, Calendar, Users, Plus } from 'lucide-react-native';

interface StaycationPackage {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  hostName: string;
  capacity: string;
}

export default function StaycationScreen() {
  const [activeTab, setActiveTab] = useState<'browse' | 'myListings'>('browse');

  const packages: StaycationPackage[] = [
    {
      id: '1',
      title: 'Organic Rice Farm Experience',
      location: 'Kuttanad, Alappuzha',
      price: '₹2,500/night',
      rating: 4.8,
      reviews: 24,
      image: 'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Farm Activities', 'Organic Meals', 'Traditional House'],
      hostName: 'Ravi Nair',
      capacity: '4-6 guests',
    },
    {
      id: '2',
      title: 'Spice Plantation Retreat',
      location: 'Munnar, Idukki',
      price: '₹3,200/night',
      rating: 4.9,
      reviews: 18,
      image: 'https://images.pexels.com/photos/4022120/pexels-photo-4022120.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Spice Tour', 'Nature Walks', 'Ayurvedic Meals'],
      hostName: 'Maya Kumar',
      capacity: '2-4 guests',
    },
    {
      id: '3',
      title: 'Coconut Farm Stay',
      location: 'Kollam',
      price: '₹2,000/night',
      rating: 4.6,
      reviews: 31,
      image: 'https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Beach Access', 'Coconut Climbing', 'Seafood'],
      hostName: 'Suresh Menon',
      capacity: '6-8 guests',
    },
  ];

  const myListings = [
    {
      id: '4',
      title: 'My Organic Vegetable Farm',
      location: 'Kochi, Ernakulam',
      price: '₹1,800/night',
      rating: 4.7,
      reviews: 12,
      image: 'https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Vegetable Picking', 'Cooking Classes', 'Farm House'],
      hostName: 'You',
      capacity: '4-6 guests',
    },
  ];

  const renderPackageCard = (package_: StaycationPackage, isMyListing = false) => (
    <TouchableOpacity key={package_.id} style={styles.packageCard}>
      <Image source={{ uri: package_.image }} style={styles.packageImage} />
      
      <View style={styles.packageContent}>
        <View style={styles.packageHeader}>
          <Text style={styles.packageTitle}>{package_.title}</Text>
          <Text style={styles.packagePrice}>{package_.price}</Text>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={14} color="#666" />
          <Text style={styles.locationText}>{package_.location}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Star size={14} color="#F5A623" fill="#F5A623" />
          <Text style={styles.ratingText}>{package_.rating}</Text>
          <Text style={styles.reviewsText}>({package_.reviews} reviews)</Text>
          <Text style={styles.capacityText}>• {package_.capacity}</Text>
        </View>

        <View style={styles.featuresContainer}>
          {package_.features.map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.packageFooter}>
          <Text style={styles.hostText}>Hosted by {package_.hostName}</Text>
          <TouchableOpacity 
            style={[styles.actionButton, isMyListing && styles.editButton]}
          >
            <Text style={[styles.actionButtonText, isMyListing && styles.editButtonText]}>
              {isMyListing ? 'Edit Listing' : 'Book Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farm Staycation</Text>
        <Text style={styles.headerSubtitle}>Experience authentic farm life</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'browse' && styles.activeTab]}
          onPress={() => setActiveTab('browse')}
        >
          <Text style={[styles.tabText, activeTab === 'browse' && styles.activeTabText]}>
            Browse Stays
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'myListings' && styles.activeTab]}
          onPress={() => setActiveTab('myListings')}
        >
          <Text style={[styles.tabText, activeTab === 'myListings' && styles.activeTabText]}>
            My Listings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'browse' && (
          <>
            {/* Featured Section */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏡 Featured Farm Stays</Text>
              <Text style={styles.sectionSubtitle}>
                Discover authentic farming experiences across Kerala
              </Text>
            </View>

            {/* Filter Options */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterContainer}
            >
              <TouchableOpacity style={[styles.filterChip, styles.activeFilter]}>
                <Text style={[styles.filterText, styles.activeFilterText]}>All Farms</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Rice Farms</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Spice Gardens</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Coconut Farms</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Vegetable Farms</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Packages List */}
            <View style={styles.packagesList}>
              {packages.map(package_ => renderPackageCard(package_))}
            </View>
          </>
        )}

        {activeTab === 'myListings' && (
          <>
            {/* My Listings Header */}
            <View style={styles.myListingsHeader}>
              <Text style={styles.sectionTitle}>🏠 My Farm Listings</Text>
              <TouchableOpacity style={styles.addListingButton}>
                <Plus size={20} color="white" />
                <Text style={styles.addListingText}>Add New Listing</Text>
              </TouchableOpacity>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>1</Text>
                <Text style={styles.statLabel}>Active Listings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>₹21,600</Text>
                <Text style={styles.statLabel}>Total Earnings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>4.7</Text>
                <Text style={styles.statLabel}>Avg Rating</Text>
              </View>
            </View>

            {/* My Listings */}
            <View style={styles.packagesList}>
              {myListings.map(listing => renderPackageCard(listing, true))}
            </View>

            {/* Tips for Hosts */}
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Tips for Successful Hosting</Text>
              <Text style={styles.tip}>• Highlight unique farm experiences</Text>
              <Text style={styles.tip}>• Offer hands-on agricultural activities</Text>
              <Text style={styles.tip}>• Provide fresh, organic meals</Text>
              <Text style={styles.tip}>• Share your farming knowledge with guests</Text>
              <Text style={styles.tip}>• Maintain clean and comfortable accommodations</Text>
            </View>
          </>
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
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E5E5E5',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4A7C59',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  filterScroll: {
    maxHeight: 50,
    marginBottom: 20,
  },
  filterContainer: {
    gap: 8,
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
  packagesList: {
    gap: 16,
  },
  packageCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  packageImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  packageContent: {
    padding: 16,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7C59',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
  },
  capacityText: {
    fontSize: 12,
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  featureTag: {
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 11,
    color: '#4A7C59',
    fontWeight: '600',
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hostText: {
    fontSize: 12,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#4A7C59',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#D2691E',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButtonText: {
    color: 'white',
  },
  myListingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addListingButton: {
    backgroundColor: '#4A7C59',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addListingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 12,
  },
  tip: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
});