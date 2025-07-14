import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ToolsTasksChatAgentProps {
  pageType: 'tools' | 'tasks' | 'home';
}

export default function ToolsTasksChatAgent({ pageType }: ToolsTasksChatAgentProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'call'>('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      message: pageType === 'home' 
        ? `Hi! I'm your virtual assistant. I can help you with tools, tasks, and more. How can I assist you today?`
        : `Hi! I'm your ${pageType} assistant. How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Simulate new messages for demo
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          type: 'agent',
          message: `Thanks for your message! I'll help you with your ${pageType} inquiry. Let me check our available options for you.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1500);
    }
  };

  const handleCallRequest = () => {
    alert('Call request sent! An agent will call you within 5 minutes.');
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
          }}
          className="relative group"
        >
          {/* Notification Badge */}
          {hasNewMessage && !isOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse z-10">
              1
            </div>
          )}
          
          {/* Main Button */}
          <div
            className="w-16 h-16 rounded-full shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${pageType === 'tools' ? '#3B82F6 0%, #1D4ED8 100%' : '#F59E0B 0%, #D97706 100%'})`,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
            }}
          >
            {isOpen ? (
              <span className="text-white text-2xl">✕</span>
            ) : (
              <span className="text-white text-2xl">💬</span>
            )}
          </div>
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 h-[500px] rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden"
          style={{
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
            border: `2px solid ${pageType === 'tools' ? '#3B82F6' : '#F59E0B'}`
          }}
        >
          {/* Header */}
          <div
            className="p-4 text-white"
            style={{
              background: `linear-gradient(135deg, ${pageType === 'tools' ? '#3B82F6 0%, #1D4ED8 100%' : '#F59E0B 0%, #D97706 100%'})`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <span className="text-lg">{pageType === 'tools' ? '🔧' : '📋'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{pageType === 'tools' ? 'Tools' : 'Tasks'} Assistant</h3>
                  <p className="text-sm opacity-90">Online • Ready to help</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Tab Buttons */}
            <div className="flex mt-3 bg-white bg-opacity-20 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 px-3 rounded-md transition-all duration-200 text-sm font-semibold ${
                  activeTab === 'chat' 
                    ? 'bg-white text-gray-800' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                💬 Chat
              </button>
              <button
                onClick={() => setActiveTab('call')}
                className={`flex-1 py-2 px-3 rounded-md transition-all duration-200 text-sm font-semibold ${
                  activeTab === 'call' 
                    ? 'bg-white text-gray-800' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                📞 Call
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'chat' ? (
              <>
                {/* Messages */}
                <div
                  className="flex-1 p-4 overflow-y-auto space-y-4"
                  style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F9FAFB' }}
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.type === 'user'
                            ? 'text-white'
                            : theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'
                        }`}
                        style={{
                          backgroundColor: msg.type === 'user' 
                            ? (pageType === 'tools' ? '#3B82F6' : '#F59E0B') 
                            : undefined,
                          boxShadow: msg.type !== 'user' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : undefined
                        }}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-white text-opacity-70' : 'text-gray-500'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div
                  className="p-4 border-t"
                  style={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
                  }}
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={`Ask about ${pageType}...`}
                      className="flex-1 p-3 border rounded-xl focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1F2937'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = pageType === 'tools' ? '#3B82F6' : '#F59E0B';
                        e.currentTarget.style.boxShadow = `0 0 0 3px ${pageType === 'tools' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#D1D5DB';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-3 rounded-xl text-white transition-all duration-200 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${pageType === 'tools' ? '#3B82F6 0%, #1D4ED8 100%' : '#F59E0B 0%, #D97706 100%'})`,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Call Tab */
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                <div
                  className="w-20 h-20 rounded-full mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${pageType === 'tools' ? '#3B82F6 0%, #1D4ED8 100%' : '#F59E0B 0%, #D97706 100%'})`
                  }}
                >
                  <span className="text-3xl text-white">📞</span>
                </div>
                
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}
                >
                  Request a Call
                </h3>
                
                <p
                  className="text-sm mb-6 leading-relaxed"
                  style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}
                >
                  Get personalized help with your {pageType} needs. Our experts are available to discuss your requirements and provide recommendations.
                </p>

                <div className="space-y-4 w-full">
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">⚡</span>
                      <span
                        className="font-semibold"
                        style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}
                      >
                        Quick Response
                      </span>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}
                    >
                      Average callback time: &lt;5 minutes
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">🎯</span>
                      <span
                        className="font-semibold"
                        style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}
                      >
                        Expert Advice
                      </span>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: theme === 'dark' ? '#D1D5DB' : '#6B7280' }}
                    >
                      Get personalized {pageType} recommendations
                    </p>
                  </div>

                  <button
                    onClick={handleCallRequest}
                    className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${pageType === 'tools' ? '#3B82F6 0%, #1D4ED8 100%' : '#F59E0B 0%, #D97706 100%'})`,
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    📞 Request Call Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
