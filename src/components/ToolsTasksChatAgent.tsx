import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface ToolsTasksChatAgentProps {
  pageType: 'tools' | 'tasks' | 'home';
}

interface Message {
  id: number;
  type: string;
  message: string;
  time: string;
}

export default function ToolsTasksChatAgent({ pageType }: ToolsTasksChatAgentProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'support'>('chat');
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .taskmate-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .taskmate-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .taskmate-scrollbar::-webkit-scrollbar-thumb {
        background: #001554;
        border-radius: 3px;
      }
      .taskmate-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #001554;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'agent',
      message: pageType === 'home' 
        ? `Hi! I'm Taskie, your 24/7 virtual assistant. I can help you with tools, tasks, and more. How can I assist you today?`
        : `Hi! I'm Taskie, your 24/7 ${pageType} assistant. How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [supportMessages, setSupportMessages] = useState<Message[]>([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Auto scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, supportMessages]);

  // Simulate new messages for demo
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Listen for Footer and About page events
  useEffect(() => {
    const handleOpenTaskMate = (event: CustomEvent) => {
      console.log('Opening TaskMate from external trigger', event.detail);
      setIsOpen(true);
      
      // Check if a specific tab was requested
      if (event.detail && event.detail.tab) {
        setActiveTab(event.detail.tab);
      } else {
        // Default behavior: footer opens support, others open chat
        setActiveTab(event.detail.source === 'footer-support' ? 'support' : 'support');
      }
      
      // Don't add any automatic messages - let the respective tab show its welcome message
    };

    const handleShowTaskMate = (event: CustomEvent) => {
      console.log('Showing TaskMate from external trigger', event.detail);
      setIsOpen(true);
      
      // Check if a specific tab was requested
      if (event.detail && event.detail.tab) {
        setActiveTab(event.detail.tab);
      } else if (event.detail.trigger === 'about-chat') {
        setActiveTab('chat');
      } else if (event.detail.trigger === 'about-support' || event.detail.trigger === 'support-center') {
        setActiveTab('support');
      } else {
        setActiveTab('support'); // Default fallback
      }
    };

    // Add event listeners
    window.addEventListener('openTaskMate', handleOpenTaskMate as EventListener);
    document.addEventListener('showTaskMate', handleShowTaskMate as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('openTaskMate', handleOpenTaskMate as EventListener);
      document.removeEventListener('showTaskMate', handleShowTaskMate as EventListener);
    };
  }, []);

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
          message: pageType === 'home' 
            ? `Thanks for your message! I'm TaskMate, your 24/7 assistant, and I'll help you find the right tools or tasks. Let me check our available options for you.`
            : `Thanks for your message! I'm TaskMate, your 24/7 ${pageType} assistant, and I'll help you with your ${pageType} inquiry. Let me check our available options for you.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1500);
    }
  };

  const handleSupportMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: supportMessages.length + 100, // Use different ID range
        type: 'user',
        message: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setSupportMessages([...supportMessages, newMessage]);
      setMessage('');
      
      // Simulate support team response
      setTimeout(() => {
        const supportResponse = {
          id: supportMessages.length + 101,
          type: 'agent',
          message: `Thank you for contacting ToolNTask Support! We've received your message: "${newMessage.message}". A team member will join the chat shortly to assist you. For immediate help, call +94 76 112 0457.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setSupportMessages(prev => [...prev, supportResponse]);
      }, 1500);
    }
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
              background: 'linear-gradient(135deg, #001554 0%, #001554 100%)', // Dark blue theme
              boxShadow: '0 8px 25px rgba(30, 58, 138, 0.4)'
            }}
          >
            {isOpen ? (
              <span className="text-white text-2xl">✕</span>
            ) : (
              <span className="text-white text-2xl">🤖</span>
            )}
          </div>
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div
          data-testid="taskmate-chat"
          className="fixed bottom-24 right-6 w-96 h-[500px] rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden taskmate-widget"
          id="taskmate-container"
          style={{
            backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
            border: '2px solid #001554' // Dark blue theme
          }}
        >
          {/* Header */}
          <div
            className="p-4 text-white"
            style={{
              background: 'linear-gradient(135deg, #001554 0%, #001554 100%)' // Dark blue theme
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {activeTab === 'support' ? 'Support Team' : 'TaskMate'}
                  </h3>
                  <p className="text-sm opacity-90">
                    {activeTab === 'support' 
                      ? 'Online • Support team ready to help' 
                      : 'Online • 24/7 assistant ready to help'
                    }
                  </p>
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
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-2 px-3 rounded-md transition-all duration-200 text-sm font-semibold ${
                  activeTab === 'support' 
                    ? 'bg-white text-gray-800' 
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                🛠️ Support
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'chat' ? (
              <>
                {/* Messages */}
                <div
                  className="flex-1 p-4 overflow-y-auto space-y-4 max-h-80"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#374151' : '#F9FAFB',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#1e3a8a transparent'
                  }}
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
                            ? '#001554' // Dark blue theme for user messages
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
                  <div ref={messagesEndRef} />
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
                      placeholder={pageType === 'home' ? `Ask TaskMate 24/7 assistant anything...` : `Ask TaskMate 24/7 assistant about ${pageType}...`}
                      className="flex-1 p-3 border rounded-xl focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1F2937'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#001554'; // Dark blue theme
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 21, 84, 0.1)';
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
                        backgroundColor: '#001554', // Dark blue theme
                        boxShadow: '0 4px 12px rgba(0, 21, 84, 0.3)'
                      }}
                    >
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Support Center Tab - Now with Chat Interface */
              <>
                {/* Support Messages Area */}
                <div
                  className="flex-1 p-4 overflow-y-auto space-y-4 max-h-80"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#374151' : '#F9FAFB',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#1e3a8a transparent'
                  }}
                >
                  {/* Welcome Message */}
                  <div className="flex justify-start">
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'
                      }`}
                      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                    >
                      <p className="text-sm font-semibold mb-1">🛠️ ToolNTask Support</p>
                      <p className="text-sm">
                        Welcome to our Support Center! Send us a message and one of our team members will join the chat shortly.
                      </p>
                      <p className="text-sm mt-2" style={{ color: '#001554' }}>
                        For immediate assistance, you can also call: <strong>+94 76 112 0457</strong>
                      </p>
                      <p className="text-xs mt-1 text-gray-500">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Support Messages */}
                  {supportMessages.map((msg) => (
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
                            ? '#001554'
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
                  <div ref={messagesEndRef} />
                </div>

                {/* Support Input */}
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
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSupportMessage();
                        }
                      }}
                      placeholder="Send a message to our support team..."
                      className="flex-1 p-3 border rounded-xl focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
                        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                        color: theme === 'dark' ? '#FFFFFF' : '#1F2937'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#001554';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 21, 84, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = theme === 'dark' ? '#4B5563' : '#D1D5DB';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      onClick={handleSupportMessage}
                      className="p-3 rounded-xl text-white transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: '#001554',
                        boxShadow: '0 4px 12px rgba(0, 21, 84, 0.3)'
                      }}
                    >
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
