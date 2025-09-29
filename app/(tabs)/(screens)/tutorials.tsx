import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Play, Clock, BookOpen, Star } from 'lucide-react-native';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  rating: number;
  views: string;
}

export default function TutorialsScreen() {
  const router = useRouter();

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Organic Rice Cultivation in Kerala',
      description: 'Complete guide to growing rice organically using traditional and modern techniques',
      duration: '25 min',
      difficulty: 'Beginner',
      category: 'Rice Farming',
      thumbnail: 'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      views: '12.5K',
    },
    {
      id: '2',
      title: 'Natural Pest Control Methods',
      description: 'Learn effective organic pest control techniques using neem, companion planting, and beneficial insects',
      duration: '18 min',
      difficulty: 'Intermediate',
      category: 'Pest Management',
      thumbnail: 'https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      views: '8.2K',
    },
    {
      id: '3',
      title: 'Coconut Farm Management',
      description: 'Best practices for coconut cultivation, harvesting, and disease prevention in coastal areas',
      duration: '32 min',
      difficulty: 'Intermediate',
      category: 'Coconut Farming',
      thumbnail: 'https://images.pexels.com/photos/568471/pexels-photo-568471.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      views: '15.3K',
    },
    {
      id: '4',
      title: 'Composting and Soil Health',
      description: 'Step-by-step guide to creating nutrient-rich compost and improving soil fertility',
      duration: '22 min',
      difficulty: 'Beginner',
      category: 'Soil Management',
      thumbnail: 'https://images.pexels.com/photos/4022120/pexels-photo-4022120.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      views: '20.1K',
    },
    {
      id: '5',
      title: 'Vegetable Farming in Small Spaces',
      description: 'Maximize yield in limited space using vertical farming and intensive techniques',
      duration: '15 min',
      difficulty: 'Beginner',
      category: 'Vegetable Farming',
      thumbnail: 'https://images.pexels.com/photos/4022120/pexels-photo-4022120.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      views: '9.8K',
    },
    {
      id: '6',
      title: 'Spice Cultivation Guide',
      description: 'Growing cardamom, pepper, and ginger in Kerala climate with proper care techniques',
      duration: '28 min',
      difficulty: 'Advanced',
      category: 'Spice Farming',
      thumbnail: 'https://images.pexels.com/photos/4022120/pexels-photo-4022120.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.4,
      views: '6.7K',
    },
  ];

  const categories = ['All', 'Rice Farming', 'Pest Management', 'Coconut Farming', 'Soil Management', 'Vegetable Farming', 'Spice Farming'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTutorials = selectedCategory === 'All' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#4A7C59';
      case 'Intermediate':
        return '#D2691E';
      case 'Advanced':
        return '#8B4513';
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
        <Text style={styles.headerTitle}>Farming Tutorials</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>🌱 Learn Natural Farming</Text>
          <Text style={styles.welcomeText}>
            Discover sustainable farming techniques, organic methods, and best practices 
            specifically designed for Kerala's climate and soil conditions.
          </Text>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeCategoryChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tutorials List */}
        <View style={styles.tutorialsList}>
          {filteredTutorials.map((tutorial) => (
            <TouchableOpacity key={tutorial.id} style={styles.tutorialCard}>
              <Image source={{ uri: tutorial.thumbnail }} style={styles.thumbnail} />
              
              <View style={styles.playOverlay}>
                <Play size={24} color="white" fill="white" />
              </View>

              <View style={styles.tutorialContent}>
                <View style={styles.tutorialHeader}>
                  <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(tutorial.difficulty) }]}>
                    <Text style={styles.difficultyText}>{tutorial.difficulty}</Text>
                  </View>
                </View>

                <Text style={styles.tutorialDescription}>{tutorial.description}</Text>

                <View style={styles.tutorialMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color="#666" />
                    <Text style={styles.metaText}>{tutorial.duration}</Text>
                  </View>
                  
                  <View style={styles.metaItem}>
                    <Star size={14} color="#F5A623" fill="#F5A623" />
                    <Text style={styles.metaText}>{tutorial.rating}</Text>
                  </View>
                  
                  <View style={styles.metaItem}>
                    <BookOpen size={14} color="#666" />
                    <Text style={styles.metaText}>{tutorial.views} views</Text>
                  </View>
                </View>

                <Text style={styles.categoryTag}>{tutorial.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Learning Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>📚 Learning Tips</Text>
          <Text style={styles.tip}>• Watch tutorials in your preferred language</Text>
          <Text style={styles.tip}>• Take notes and practice the techniques</Text>
          <Text style={styles.tip}>• Start with beginner-level content</Text>
          <Text style={styles.tip}>• Apply learnings gradually to your farm</Text>
          <Text style={styles.tip}>• Share knowledge with fellow farmers</Text>
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
  },
  welcomeCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activeCategoryChip: {
    backgroundColor: '#4A7C59',
    borderColor: '#4A7C59',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: 'white',
  },
  tutorialsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  tutorialCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -120 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialContent: {
    padding: 16,
  },
  tutorialHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tutorialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  tutorialDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  tutorialMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  categoryTag: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
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