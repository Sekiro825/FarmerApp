import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Heart, MessageCircle, Share, Plus, Camera, Send } from 'lucide-react-native';

interface Post {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  category: string;
}

export default function CommunityScreen() {
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const posts: Post[] = [
    {
      id: '1',
      author: 'Ravi Kumar',
      location: 'Kochi, Kerala',
      timeAgo: '2 hours ago',
      content: 'Great harvest this season! My organic rice yield increased by 30% after following the natural farming techniques shared in this community. Thank you all for the valuable advice! 🌾',
      image: 'https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 24,
      comments: 8,
      isLiked: true,
      category: 'Success Story',
    },
    {
      id: '2',
      author: 'Maya Nair',
      location: 'Wayanad, Kerala',
      timeAgo: '5 hours ago',
      content: 'Has anyone tried companion planting with marigolds for pest control? I\'m seeing some white flies on my tomato plants and looking for organic solutions.',
      likes: 12,
      comments: 15,
      isLiked: false,
      category: 'Question',
    },
    {
      id: '3',
      author: 'Suresh Menon',
      location: 'Kollam, Kerala',
      timeAgo: '1 day ago',
      content: 'Monsoon preparation tips: Make sure to clean your drainage channels and check your irrigation systems. Also, cover sensitive crops with plastic sheets during heavy rains. Stay safe, fellow farmers! 🌧️',
      image: 'https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 45,
      comments: 12,
      isLiked: true,
      category: 'Tips & Advice',
    },
    {
      id: '4',
      author: 'Lakshmi Devi',
      location: 'Thrissur, Kerala',
      timeAgo: '2 days ago',
      content: 'My spice garden is thriving! Cardamom, black pepper, and ginger are all doing well. The key is proper shade management and consistent watering. Happy to share more details if anyone is interested.',
      image: 'https://images.pexels.com/photos/4022120/pexels-photo-4022120.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 31,
      comments: 9,
      isLiked: false,
      category: 'Success Story',
    },
  ];

  const categories = ['All Posts', 'Questions', 'Tips & Advice', 'Success Stories', 'Market Updates'];
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const handleLike = (postId: string) => {
    // In a real app, this would update the backend
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    // In a real app, this would open a comment modal
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    // In a real app, this would open share options
    console.log('Share post:', postId);
  };

  const handleNewPost = () => {
    if (newPostText.trim()) {
      // In a real app, this would send the post to backend
      console.log('New post:', newPostText);
      setNewPostText('');
      setShowNewPostForm(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Success Story':
        return '#4A7C59';
      case 'Question':
        return '#D2691E';
      case 'Tips & Advice':
        return '#8B4513';
      case 'Market Updates':
        return '#6B8E6B';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Community Forum</Text>
          <Text style={styles.headerSubtitle}>Connect with fellow farmers</Text>
        </View>
        <TouchableOpacity 
          style={styles.newPostButton}
          onPress={() => setShowNewPostForm(!showNewPostForm)}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* New Post Form */}
      {showNewPostForm && (
        <View style={styles.newPostForm}>
          <TextInput
            style={styles.newPostInput}
            placeholder="Share your farming experience, ask questions, or give advice..."
            multiline
            value={newPostText}
            onChangeText={setNewPostText}
            maxLength={500}
          />
          <View style={styles.newPostActions}>
            <TouchableOpacity style={styles.photoButton}>
              <Camera size={18} color="#4A7C59" />
              <Text style={styles.photoButtonText}>Add Photo</Text>
            </TouchableOpacity>
            <View style={styles.postFormButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setShowNewPostForm(false);
                  setNewPostText('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.postButton, !newPostText.trim() && styles.postButtonDisabled]}
                onPress={handleNewPost}
                disabled={!newPostText.trim()}
              >
                <Send size={16} color="white" />
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

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

      {/* Posts Feed */}
      <ScrollView style={styles.postsContainer} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{post.author.charAt(0)}</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <View style={styles.postMeta}>
                    <Text style={styles.location}>{post.location}</Text>
                    <Text style={styles.dot}> • </Text>
                    <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(post.category) }]}>
                <Text style={styles.categoryBadgeText}>{post.category}</Text>
              </View>
            </View>

            {/* Post Content */}
            <Text style={styles.postContent}>{post.content}</Text>

            {/* Post Image */}
            {post.image && (
              <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            {/* Post Actions */}
            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
              >
                <Heart 
                  size={20} 
                  color={post.isLiked ? '#FF6B6B' : '#666'} 
                  fill={post.isLiked ? '#FF6B6B' : 'none'}
                />
                <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
                  {post.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleComment(post.id)}
              >
                <MessageCircle size={20} color="#666" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleShare(post.id)}
              >
                <Share size={20} color="#666" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Community Guidelines */}
        <View style={styles.guidelinesCard}>
          <Text style={styles.guidelinesTitle}>🤝 Community Guidelines</Text>
          <Text style={styles.guideline}>• Be respectful and helpful to fellow farmers</Text>
          <Text style={styles.guideline}>• Share authentic farming experiences</Text>
          <Text style={styles.guideline}>• Ask questions and learn from others</Text>
          <Text style={styles.guideline}>• No spam or promotional content</Text>
          <Text style={styles.guideline}>• Use appropriate language and images</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E5E5E5',
  },
  newPostButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPostForm: {
    backgroundColor: 'white',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  newPostInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  newPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  photoButtonText: {
    fontSize: 14,
    color: '#4A7C59',
    fontWeight: '600',
  },
  postFormButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  postButton: {
    backgroundColor: '#4A7C59',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  postButtonDisabled: {
    backgroundColor: '#CCC',
  },
  postButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 16,
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
  postsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A7C59',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
  dot: {
    fontSize: 12,
    color: '#666',
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  likedText: {
    color: '#FF6B6B',
  },
  guidelinesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  guidelinesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 12,
  },
  guideline: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
});