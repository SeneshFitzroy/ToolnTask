import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MessageCircle, Phone, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'request';
}

interface ChatAgentProps {
  pageType: 'tools' | 'tasks';
}

const ChatAgent: React.FC<ChatAgentProps> = ({ pageType }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `👋 Hi! I'm your ${pageType} assistant. I can help you find what you're looking for or connect you with the right people. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      // Mock AI response
      setTimeout(() => {
        const responses = [
          `I found several ${pageType} that match your criteria. Let me show you the best options...`,
          `Would you like me to connect you with someone who specializes in this type of ${pageType.slice(0, -1)}?`,
          `Based on your location and requirements, I can recommend some highly-rated providers.`,
          `I'll help you get in touch with the right person. Would you prefer to chat or have a quick call?`
        ];

        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'bot',
          timestamp: new Date(),
          type: 'suggestion'
        };

        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      const callMessage: Message = {
        id: Date.now().toString(),
        text: 'Call connected! You are now speaking with our specialist agent.',
        sender: 'agent',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, callMessage]);
    }, 3000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          style={{
            backgroundColor: '#FF5E14',
            boxShadow: '0 8px 32px rgba(255, 94, 20, 0.3)'
          }}
        >
          <MessageCircle className="h-6 w-6 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">!</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 rounded-lg shadow-2xl overflow-hidden"
         style={{
           backgroundColor: theme === 'dark' ? '#1f1f1f' : '#FFFFFF',
           border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`
         }}>
      
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between"
           style={{
             backgroundColor: '#FF5E14',
             borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
           }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">
              {pageType.charAt(0).toUpperCase() + pageType.slice(1)} Assistant
            </h3>
            <p className="text-xs text-white text-opacity-80">
              Online • Ready to help
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCall}
            disabled={isCalling}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isCalling ? 'bg-green-500 animate-pulse' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
            }`}
          >
            <Phone className="h-4 w-4 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto max-h-64">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : message.sender === 'bot'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-green-100 text-green-800'
            } ${theme === 'dark' && message.sender !== 'user' ? 'bg-gray-700 text-gray-200' : ''}`}>
              
              {message.sender !== 'user' && (
                <div className="flex items-center gap-2 mb-2">
                  {message.sender === 'bot' ? (
                    <Bot className="h-3 w-3" />
                  ) : (
                    <User className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">
                    {message.sender === 'bot' ? 'AI Assistant' : 'Agent'}
                  </span>
                </div>
              )}
              
              <p className="text-sm">{message.text}</p>
              
              {message.type === 'suggestion' && (
                <div className="mt-2 space-y-1">
                  <button className="w-full text-left text-xs px-2 py-1 rounded bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors">
                    💬 Start live chat
                  </button>
                  <button className="w-full text-left text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                    📞 Request callback
                  </button>
                </div>
              )}
              
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t"
           style={{
             borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
           }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={{
              backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f9fafb',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              color: theme === 'dark' ? '#e5e7eb' : '#374151'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
            style={{
              backgroundColor: '#FF5E14',
              color: 'white'
            }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isCalling && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-800">Connecting call...</p>
            <p className="text-xs text-gray-600 mt-1">Please wait while we connect you</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAgent;
