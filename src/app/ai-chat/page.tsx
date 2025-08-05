'use client';

import { useState, useEffect, useRef } from 'react';
import SecureRoute from '../components/SecureRoute';
import SecureDashboard from '../components/SecureDashboard';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyConversations: Conversation[] = [
        {
          id: '1',
          title: 'Project Discussion',
          messages: [
            {
              id: '1',
              content: 'Hello! How can I help you with your project today?',
              role: 'assistant',
              timestamp: '2024-01-20T10:00:00Z'
            },
            {
              id: '2',
              content: 'I need help with implementing a multi-tenant architecture in my application.',
              role: 'user',
              timestamp: '2024-01-20T10:01:00Z'
            },
            {
              id: '3',
              content: 'Great question! Multi-tenant architecture can be implemented in several ways. The most common approaches are: 1) Database per tenant, 2) Shared database with tenant isolation, and 3) Hybrid approach. Which type of application are you building?',
              role: 'assistant',
              timestamp: '2024-01-20T10:02:00Z'
            }
          ],
          createdAt: '2024-01-20T10:00:00Z',
          updatedAt: '2024-01-20T10:02:00Z'
        },
        {
          id: '2',
          title: 'Technical Support',
          messages: [
            {
              id: '1',
              content: 'Hi! I\'m here to help with any technical questions you might have.',
              role: 'assistant',
              timestamp: '2024-01-19T15:00:00Z'
            },
            {
              id: '2',
              content: 'I\'m having issues with my API authentication.',
              role: 'user',
              timestamp: '2024-01-19T15:01:00Z'
            }
          ],
          createdAt: '2024-01-19T15:00:00Z',
          updatedAt: '2024-01-19T15:01:00Z'
        }
      ];
      setConversations(dummyConversations);
      if (dummyConversations.length > 0) {
        setCurrentConversation(dummyConversations[0]);
        setMessages(dummyConversations[0].messages);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you said: "${userMessage.content}". This is a simulated AI response. In a real implementation, this would be connected to an actual AI service like OpenAI, Claude, or a custom model.`,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

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
    }, 2000);
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

  const deleteConversation = (conversationId: string) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
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
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                    currentConversation?.id === conversation.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => selectConversation(conversation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{conversation.title}</h3>
                      <p className="text-gray-400 text-sm truncate">
                        {conversation.messages.length > 0 
                          ? conversation.messages[conversation.messages.length - 1].content
                          : 'No messages yet'
                        }
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {formatDate(conversation.updatedAt)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      className="p-1 hover:bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} className="text-gray-400" />
                    </button>
                  </div>
            </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {currentConversation?.title || 'New Conversation'}
                    </h3>
                    <p className="text-gray-400 text-sm">AI Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings size={16} className="text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Download size={16} className="text-gray-400" />
                  </button>
          </div>
        </div>
          </div>
          
          {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center space-x-1">
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
          
            {/* Input Area */}
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