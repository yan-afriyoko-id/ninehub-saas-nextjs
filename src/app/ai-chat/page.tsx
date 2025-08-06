'use client';

import { useState, useEffect, useRef } from 'react';
import SecureRoute from '../components/SecureRoute';
import SecureDashboard from '../components/SecureDashboard';
import { apiClient } from '../services/api';
import { 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Download,
  Upload,
  Settings,
  MessageCircle,
  Clock,
  Search,
  MoreVertical,
  RefreshCw,
  StopCircle
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  isTyping?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export default function AIChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiClient.getChatHistory();
      
      // Debug: Log the response format
      console.log('🔍 Chat History Response:', response);
      console.log('🔍 Response data type:', typeof response.data);
      console.log('🔍 Response data:', response.data);
      
      if (response.success && response.data) {
        // Check if response.data is an array
        let conversationsData = [];
        
        if (Array.isArray(response.data)) {
          conversationsData = response.data;
          console.log('✅ Using response.data as array');
        } else if (response.data.conversations && Array.isArray(response.data.conversations)) {
          conversationsData = response.data.conversations;
          console.log('✅ Using response.data.conversations');
        } else if (response.data.history && Array.isArray(response.data.history)) {
          conversationsData = response.data.history;
          console.log('✅ Using response.data.history');
        } else {
          // If no conversations found, create new one
          console.log('❌ No conversations found in response:', response.data);
          createNewConversation();
          setIsLoading(false);
          return;
        }
        
        console.log('🔍 Conversations data:', conversationsData);
        
        // Transform API data to frontend format
        const apiConversations: Conversation[] = conversationsData.map((conv: any) => ({
          id: conv.id || conv.conversation_id || Date.now().toString(),
          title: conv.title || conv.name || 'Conversation',
          messages: conv.messages || conv.chat_messages || [],
          createdAt: conv.created_at || conv.createdAt || new Date().toISOString(),
          updatedAt: conv.updated_at || conv.updatedAt || new Date().toISOString()
        }));
        
        setConversations(apiConversations);
        
        if (apiConversations.length > 0) {
          setCurrentConversation(apiConversations[0]);
          setMessages(apiConversations[0].messages);
        } else {
          createNewConversation();
        }
      } else {
        // If no history, create new conversation
        console.log('❌ No chat history found, creating new conversation');
        createNewConversation();
      }
    } catch (error) {
      console.error('❌ Error loading chat history:', error);
      setError('Failed to load chat history - API may not be available yet');
      createNewConversation();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Send message to API
      const response = await apiClient.sendChatMessage(inputMessage);
      
      // Debug: Log the response format
      console.log('🔍 Send Message Response:', response);
      console.log('🔍 Response data:', response.data);
      
      if (response.success && response.data) {
        // Handle different response formats
        let aiResponse = '';
        
        if (typeof response.data === 'string') {
          aiResponse = response.data;
          console.log('✅ Using response.data as string');
        } else if (response.data.response) {
          aiResponse = response.data.response;
          console.log('✅ Using response.data.response');
        } else if (response.data.message) {
          aiResponse = response.data.message;
          console.log('✅ Using response.data.message');
        } else if (response.data.content) {
          aiResponse = response.data.content;
          console.log('✅ Using response.data.content');
        } else if (response.data.text) {
          aiResponse = response.data.text;
          console.log('✅ Using response.data.text');
        } else {
          aiResponse = 'Sorry, I could not process your request.';
          console.log('❌ No valid response format found');
        }

        console.log('🔍 AI Response:', aiResponse);

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Update conversation
        if (currentConversation) {
          const updatedConversation = {
            ...currentConversation,
            messages: [...currentConversation.messages, userMessage, aiMessage],
            updatedAt: new Date().toISOString()
          };
          setCurrentConversation(updatedConversation);
          setConversations(prev => 
            prev.map(conv => 
              conv.id === currentConversation.id ? updatedConversation : conv
            )
          );
        }
      } else {
        // If API is not available, provide a fallback response
        console.log('⚠️ API not available, using fallback response');
        
        const fallbackResponse = `I understand you said: "${inputMessage}". This is a fallback response because the AI chat API is not yet available. In a real implementation, this would be connected to an actual AI service.`;
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: fallbackResponse,
          role: 'assistant',
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Update conversation
        if (currentConversation) {
          const updatedConversation = {
            ...currentConversation,
            messages: [...currentConversation.messages, userMessage, aiMessage],
            updatedAt: new Date().toISOString()
          };
          setCurrentConversation(updatedConversation);
          setConversations(prev => 
            prev.map(conv => 
              conv.id === currentConversation.id ? updatedConversation : conv
            )
          );
        }
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setError('Failed to send message - API may not be available yet');
      
      // Add fallback response when API is not available
      const fallbackResponse = `I understand you said: "${inputMessage}". This is a fallback response because the AI chat API is not yet available. In a real implementation, this would be connected to an actual AI service.`;
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Update conversation
      if (currentConversation) {
        const updatedConversation = {
          ...currentConversation,
          messages: [...currentConversation.messages, userMessage, aiMessage],
          updatedAt: new Date().toISOString()
        };
        setCurrentConversation(updatedConversation);
        setConversations(prev => 
          prev.map(conv => 
            conv.id === currentConversation.id ? updatedConversation : conv
          )
        );
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
    setMessages([]);
  };

  const selectConversation = (conversation: Conversation) => {
    setCurrentConversation(conversation);
    setMessages(conversation.messages);
  };

  const deleteConversation = async (conversationId: string) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      try {
        const response = await apiClient.deleteConversation(conversationId);
        
        if (response.success) {
          setConversations(prev => prev.filter(conv => conv.id !== conversationId));
          if (currentConversation?.id === conversationId) {
            if (conversations.length > 1) {
              const nextConversation = conversations.find(conv => conv.id !== conversationId);
              if (nextConversation) {
                setCurrentConversation(nextConversation);
                setMessages(nextConversation.messages);
              } else {
                createNewConversation();
              }
            } else {
              createNewConversation();
            }
          }
        } else {
          throw new Error(response.message || 'Failed to delete conversation');
        }
      } catch (error) {
        console.error('Error deleting conversation:', error);
        setError('Failed to delete conversation');
      }
    }
  };

  const clearAllChats = async () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      try {
        const response = await apiClient.clearChatHistory();
        
        if (response.success) {
          createNewConversation();
          setConversations([]);
        } else {
          throw new Error(response.message || 'Failed to clear chat history');
        }
      } catch (error) {
        console.error('Error clearing chat history:', error);
        setError('Failed to clear chat history');
      }
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <SecureRoute>
        <SecureDashboard>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </SecureDashboard>
      </SecureRoute>
    );
  }

  return (
    <SecureRoute>
      <SecureDashboard>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">AI Chat</h2>
                <button
                  onClick={createNewConversation}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <MessageCircle size={20} className="text-white" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-gray-400 text-sm">No conversations yet</p>
                </div>
              ) : (
                <div className="p-2">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentConversation?.id === conversation.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => selectConversation(conversation)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{conversation.title}</h3>
                          {conversation.messages.length > 0 && (
                            <p className="text-xs opacity-75 truncate">
                              {conversation.messages[conversation.messages.length - 1].content}
                            </p>
                          )}
                          <p className="text-xs opacity-50 mt-1">
                            {formatDate(conversation.updatedAt)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conversation.id);
                          }}
                          className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={clearAllChats}
                className="w-full flex items-center justify-center space-x-2 p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
                <span className="text-sm">Clear All Chats</span>
              </button>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-900">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-white">
                    {currentConversation?.title || 'New Conversation'}
                  </h1>
                  <p className="text-sm text-gray-400">AI Assistant</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Settings size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {error && (
                <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="mx-auto text-gray-400" size={48} />
                  <h3 className="text-lg font-semibold text-white mt-4">Start a conversation</h3>
                  <p className="text-gray-400 mt-2">Ask me anything about your project or get help with technical questions.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-3xl ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' ? 'bg-blue-600' : 'bg-gray-600'
                      }`}>
                        {message.role === 'user' ? (
                          <User size={16} className="text-white" />
                        ) : (
                          <Bot size={16} className="text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-200'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-200' : 'text-gray-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700 bg-gray-800">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={1}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send size={20} className="text-white" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{inputMessage.length} characters</span>
              </div>
            </div>
          </div>
        </div>
      </SecureDashboard>
    </SecureRoute>
  );
} 