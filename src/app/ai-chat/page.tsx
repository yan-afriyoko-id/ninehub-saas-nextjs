'use client';

import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for your message: "${inputMessage}". I'm here to help you with your ${user?.role === 'admin' ? 'administrative' : 'business'} needs.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">AI Chat Assistant</h3>
          <p className="text-gray-300 mb-4">
            {user?.role === 'admin' 
              ? 'Advanced AI assistant for administrative tasks and system management.'
              : 'AI assistant to help with your business queries and support.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Chat Sessions</h4>
              <p className="text-2xl font-bold text-blue-400">
                {user?.role === 'admin' ? '156' : '23'}
              </p>
              <p className="text-green-400 text-sm">+5 today</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Response Time</h4>
              <p className="text-2xl font-bold text-green-400">
                {user?.role === 'admin' ? '0.8s' : '1.2s'}
              </p>
              <p className="text-green-400 text-sm">Average</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Satisfaction</h4>
              <p className="text-2xl font-bold text-purple-400">
                {user?.role === 'admin' ? '98%' : '94%'}
              </p>
              <p className="text-green-400 text-sm">+2% this week</p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Chat with AI Assistant</h3>
          </div>
          
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gray-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>

        {user?.role === 'admin' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Admin AI Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">System Management</h4>
                <p className="text-gray-300 text-sm mb-3">AI-powered system administration</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Manage System
                </button>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Analytics Insights</h4>
                <p className="text-gray-300 text-sm mb-3">AI-generated business insights</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Insights
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 