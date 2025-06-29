import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  FileText, 
  BookOpen, 
  Calculator, 
  Lightbulb, 
  HelpCircle,
  Search,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Download,
  Share2,
  Settings,
  Brain,
  Zap,
  Target,
  TrendingUp,
  BookMarked,
  Calendar,
  CheckCircle,
  AlertCircle,
  Info,
  User,
  Smartphone,
  Headphones,
  Video,
  Image,
  File,
  Link,
  Plus,
  Minus,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2
} from 'lucide-react';

const AIAssistantPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);

  // Sample conversation history
  const conversationHistory = [
    {
      id: 1,
      type: 'user',
      message: 'Can you help me with my math homework?',
      timestamp: '2024-01-15 14:30',
      subject: 'Mathematics',
      topic: 'Algebra'
    },
    {
      id: 2,
      type: 'assistant',
      message: 'Of course! I\'d be happy to help you with your math homework. What specific topic or problem are you working on?',
      timestamp: '2024-01-15 14:31',
      subject: 'Mathematics',
      topic: 'Algebra',
      helpful: true
    },
    {
      id: 3,
      type: 'user',
      message: 'I\'m stuck on solving quadratic equations',
      timestamp: '2024-01-15 14:32',
      subject: 'Mathematics',
      topic: 'Algebra'
    },
    {
      id: 4,
      type: 'assistant',
      message: 'Great! Let me help you with quadratic equations. The general form is ax² + bx + c = 0. There are several methods to solve them:\n\n1. **Factoring** - when the equation can be factored\n2. **Quadratic Formula** - x = (-b ± √(b² - 4ac)) / 2a\n3. **Completing the Square**\n\nWhich method would you like to learn about, or do you have a specific problem to solve?',
      timestamp: '2024-01-15 14:33',
      subject: 'Mathematics',
      topic: 'Algebra',
      helpful: true
    }
  ];

  // Sample quick actions
  const quickActions = [
    {
      id: 1,
      title: 'Homework Help',
      description: 'Get assistance with your assignments',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-800',
      prompt: 'I need help with my homework'
    },
    {
      id: 2,
      title: 'Study Tips',
      description: 'Learn effective study strategies',
      icon: <Lightbulb className="h-6 w-6" />,
      color: 'bg-yellow-100 text-yellow-800',
      prompt: 'Give me some study tips'
    },
    {
      id: 3,
      title: 'Math Calculator',
      description: 'Solve mathematical problems',
      icon: <Calculator className="h-6 w-6" />,
      color: 'bg-green-100 text-green-800',
      prompt: 'Help me solve this math problem'
    },
    {
      id: 4,
      title: 'Essay Writing',
      description: 'Get help with writing assignments',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-800',
      prompt: 'Help me write an essay'
    },
    {
      id: 5,
      title: 'Science Lab',
      description: 'Virtual science experiments',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-800',
      prompt: 'Explain this science concept'
    },
    {
      id: 6,
      title: 'Language Learning',
      description: 'Practice languages and grammar',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'bg-pink-100 text-pink-800',
      prompt: 'Help me with language learning'
    }
  ];

  // Sample AI capabilities
  const aiCapabilities = [
    {
      category: 'Academic Support',
      features: [
        'Homework assistance across all subjects',
        'Step-by-step problem solving',
        'Essay writing and editing help',
        'Research paper guidance',
        'Study material explanations'
      ]
    },
    {
      category: 'Study Tools',
      features: [
        'Flashcard generation',
        'Quiz creation and practice',
        'Study schedule planning',
        'Note-taking assistance',
        'Concept mapping'
      ]
    },
    {
      category: 'Language Learning',
      features: [
        'Grammar correction',
        'Vocabulary building',
        'Translation assistance',
        'Pronunciation practice',
        'Writing improvement'
      ]
    },
    {
      category: 'Creative Writing',
      features: [
        'Story writing prompts',
        'Poetry assistance',
        'Creative brainstorming',
        'Character development',
        'Plot structure help'
      ]
    }
  ];

  // Sample usage statistics
  const usageStats = {
    totalConversations: 45,
    totalMessages: 234,
    averageRating: 4.7,
    subjectsHelped: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
    mostUsedFeatures: [
      { feature: 'Homework Help', count: 23 },
      { feature: 'Math Calculator', count: 18 },
      { feature: 'Essay Writing', count: 15 },
      { feature: 'Study Tips', count: 12 }
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        message: `I understand you're asking about "${inputMessage}". Let me help you with that. This is a simulated response from the AI assistant. In a real implementation, this would be connected to an actual AI service like OpenAI's GPT or similar.`,
        timestamp: new Date().toLocaleString(),
        helpful: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (prompt) => {
    setInputMessage(prompt);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, this would integrate with speech recognition
  };

  const handleFeedback = (messageId, helpful) => {
    // Handle feedback for message helpfulness
    console.log(`Message ${messageId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">AI Learning Assistant</h1>
          <p className="text-muted-foreground">Your intelligent companion for academic success and learning support</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                  <p className="text-2xl font-bold">{usageStats.totalConversations}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    This month
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages Exchanged</p>
                  <p className="text-2xl font-bold">{usageStats.totalMessages}</p>
                  <p className="text-sm text-gray-600">Total interactions</p>
                </div>
                <Bot className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-purple-600">{usageStats.averageRating}/5</p>
                  <p className="text-sm text-gray-600">User satisfaction</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Subjects Helped</p>
                  <p className="text-2xl font-bold text-orange-600">{usageStats.subjectsHelped.length}</p>
                  <p className="text-sm text-gray-600">Academic areas</p>
                </div>
                <BookMarked className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <CardTitle>AI Learning Assistant</CardTitle>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Start a conversation with your AI learning assistant!</p>
                      <p className="text-sm">Ask questions, get homework help, or explore study resources.</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {formatTimestamp(message.timestamp)}
                            </span>
                            {message.type === 'assistant' && (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleFeedback(message.id, true)}
                                  className="h-6 w-6 p-0"
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleFeedback(message.id, false)}
                                  className="h-6 w-6 p-0"
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">AI is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about your studies..."
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleVoiceInput}
                      className={isListening ? 'bg-red-100 text-red-600' : ''}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.id}
                      variant="outline"
                      className="justify-start h-auto p-3"
                      onClick={() => handleQuickAction(action.prompt)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          {action.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-sm">{action.title}</div>
                          <div className="text-xs text-gray-600">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiCapabilities.map((category) => (
                    <div key={category.category}>
                      <h4 className="font-medium text-sm mb-2">{category.category}</h4>
                      <ul className="space-y-1">
                        {category.features.map((feature, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Most Used Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {usageStats.mostUsedFeatures.map((feature) => (
                    <div key={feature.feature} className="flex items-center justify-between">
                      <span className="text-sm">{feature.feature}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(feature.count / 25) * 100} className="w-16" />
                        <span className="text-xs text-gray-600">{feature.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conversation History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversationHistory.map((conversation) => (
                <div key={conversation.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="text-xs">{conversation.subject}</Badge>
                        <Badge variant="outline" className="text-xs">{conversation.topic}</Badge>
                        <span className="text-xs text-gray-600">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{conversation.message}</p>
                      {conversation.helpful !== undefined && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-600">Helpful:</span>
                          {conversation.helpful ? (
                            <ThumbsUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <ThumbsDown className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage; 