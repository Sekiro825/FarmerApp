import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Send, Mic, Volume2 } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export default function AIAssistantScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. How can I help you today?',
      sender: 'ai',
      timestamp: '10:30 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('rice') || lowerQuestion.includes('धान')) {
      return 'For rice cultivation, ensure proper water management. Plant during monsoon season (June-July). Use disease-resistant varieties like ADT-43 or CR-1009. Apply organic fertilizers and monitor for pests like stem borer.';
    }
    
    if (lowerQuestion.includes('fertilizer') || lowerQuestion.includes('खाद')) {
      return 'I recommend organic fertilizers for sustainable farming. Use compost, vermicompost, and green manure. For quick results, you can use NPK fertilizers but balance with organic matter. Test your soil pH first.';
    }
    
    if (lowerQuestion.includes('pest') || lowerQuestion.includes('कीट')) {
      return 'For natural pest control, try neem oil spray, companion planting with marigolds, and encouraging beneficial insects. Avoid excessive pesticide use. Regular monitoring is key for early detection.';
    }
    
    return 'That\'s a great question! For specific farming advice, I recommend consulting with local agricultural experts. Meanwhile, you can try organic farming methods and sustainable practices for better yield and soil health.';
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Placeholder for voice recording
    setTimeout(() => {
      setIsListening(false);
      setInputText('How to grow rice in Kerala?');
    }, 2000);
  };

  const quickQuestions = [
    'How to grow rice?',
    'Best fertilizer for vegetables?',
    'Pest control methods',
    'Soil testing tips',
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <TouchableOpacity style={styles.speakerButton}>
          <Volume2 size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === 'user' ? styles.userMessage : styles.aiMessage,
            ]}
          >
            <Text style={[styles.messageText, message.sender === 'user' && styles.userMessageText]}>
              {message.text}
            </Text>
            <Text style={[styles.timestamp, message.sender === 'user' && styles.userTimestamp]}>
              {message.timestamp}
            </Text>
          </View>
        ))}

        {/* Quick Questions */}
        {messages.length === 1 && (
          <View style={styles.quickQuestions}>
            <Text style={styles.quickQuestionsTitle}>Quick Questions</Text>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionButton}
                onPress={() => setInputText(question)}
              >
                <Text style={styles.quickQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask your farming question..."
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
            onPress={handleVoiceInput}
          >
            <Mic size={20} color={isListening ? 'white' : '#4A7C59'} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Send size={20} color="white" />
        </TouchableOpacity>
      </View>

      {isListening && (
        <View style={styles.listeningOverlay}>
          <Text style={styles.listeningText}>🎤 Listening...</Text>
          <Text style={styles.listeningSubtext}>Speak your question in any language</Text>
        </View>
      )}
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
    justifyContent: 'space-between',
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
    flex: 1,
  },
  speakerButton: {
    padding: 5,
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A7C59',
    padding: 12,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  userTimestamp: {
    color: '#E5E5E5',
  },
  quickQuestions: {
    marginTop: 20,
  },
  quickQuestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 12,
  },
  quickQuestionButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  quickQuestionText: {
    fontSize: 14,
    color: '#4A7C59',
  },
  inputSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5DC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  voiceButton: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    marginLeft: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#4A7C59',
  },
  sendButton: {
    backgroundColor: '#4A7C59',
    padding: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
  },
  listeningOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  listeningText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A7C59',
    marginBottom: 4,
  },
  listeningSubtext: {
    fontSize: 14,
    color: '#666',
  },
});