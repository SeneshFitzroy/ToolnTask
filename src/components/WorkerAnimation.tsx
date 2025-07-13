import React, { use  const t  const tools = [
    { icon: '🔧', name: 'Wrench', color: '#FF5E14', position: { top: '10%', left: '15%' } },
    { icon: '🔨', name: 'Hammer', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '20%', right: '10%' } },
    { icon: '⚙️', name: 'Gear', color: '#FF5E14', position: { bottom: '25%', left: '8%' } },
    { icon: '🪚', name: 'Saw', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '15%', left: '50%' } },
    { icon: '🪛', name: 'Screwdriver', color: '#FF5E14', position: { bottom: '30%', right: '15%' } },
    { icon: '📐', name: 'Ruler', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '45%', right: '5%' } },
    { icon: '🎯', name: 'Target', color: '#FF5E14', position: { top: '25%', left: '25%' } },
    { icon: '🔩', name: 'Bolt', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '35%', left: '10%' } }
  ];    { icon: '🔧', name: 'Wrench', color: '#FF5E14', position: { top: '10%', left: '15%' } },
    { icon: '🔨', name: 'Hammer', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '20%', right: '10%' } },
    { icon: '📝', name: 'Notepad', color: '#FF5E14', position: { top: '30%', left: '5%' } },
    { icon: '🪚', name: 'Saw', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '15%', left: '50%' } },
    { icon: '⚡', name: 'Power', color: '#FF5E14', position: { top: '40%', right: '20%' } },
    { icon: '📐', name: 'Ruler', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '45%', right: '5%' } },
    { icon: '🎯', name: 'Target', color: '#FF5E14', position: { top: '25%', left: '25%' } },
    { icon: '🔩', name: 'Bolt', color: theme === 'dark' ? '#FFFFFF' : '#001554', position: { top: '35%', left: '10%' } }
  ];Effect } from 'react';
import { useTheme } from 'next-themes';

const WorkerAnimation = () => {
  const { theme } = useTheme();
  const [activeTask, setActiveTask] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveTask((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const tools = [
    { icon: '🔧', name: 'Wrench', color: '#FF5E14', position: { top: '10%', left: '15%' } },
    { icon: '🔨', name: 'Hammer', color: '#2D3748', position: { top: '20%', right: '10%' } },
    { icon: '⚙️', name: 'Gear', color: '#FF5E14', position: { bottom: '25%', left: '8%' } },
    { icon: '🪚', name: 'Saw', color: '#2D3748', position: { top: '15%', left: '50%' } },
    { icon: '🪛', name: 'Screwdriver', color: '#FF5E14', position: { bottom: '30%', right: '15%' } },
    { icon: '📐', name: 'Ruler', color: '#2D3748', position: { top: '45%', right: '5%' } },
    { icon: '🪜', name: 'Ladder', color: '#FF5E14', position: { bottom: '10%', left: '45%' } },
    { icon: '🔩', name: 'Bolt', color: '#2D3748', position: { top: '35%', left: '10%' } }
  ];

  const tasks = [
    { title: 'Building', icon: '🏗️', progress: activeTask === 0 ? 100 : activeTask > 0 ? 100 : 30 },
    { title: 'Fixing', icon: '🔧', progress: activeTask === 1 ? 100 : activeTask > 1 ? 100 : 20 },
    { title: 'Creating', icon: '⚡', progress: activeTask === 2 ? 100 : 10 }
  ];

  return (
    <div className="relative w-80 h-80 lg:w-96 lg:h-96 transform hover:scale-105 transition-all duration-500 cursor-pointer">
      {/* Dynamic background glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 blur-2xl transition-all duration-1000"
        style={{ 
          background: theme === 'dark' 
            ? 'linear-gradient(45deg, #FF5E14, #2D3748, #FF5E14)' 
            : 'linear-gradient(45deg, #FFE5D6, #E8F4FD, #FFE5D6)',
          animation: 'pulse 4s ease-in-out infinite'
        }}
      ></div>
      
      {/* Rotating border rings */}
      <div 
        className="absolute inset-4 border-4 border-dashed rounded-full opacity-60 transition-colors duration-300"
        style={{ 
          borderColor: theme === 'dark' ? '#FF5E14' : '#2D3748',
          animation: 'spin 20s linear infinite'
        }}
      ></div>
      <div 
        className="absolute inset-6 border-2 border-dotted rounded-full opacity-40 transition-colors duration-300"
        style={{ 
          borderColor: theme === 'dark' ? '#2D3748' : '#FF5E14',
          animation: 'spin 15s linear infinite reverse'
        }}
      ></div>

      {/* Main workshop area */}
      <div 
        className="absolute inset-8 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-2 transition-all duration-300"
        style={{ 
          backgroundColor: theme === 'dark' ? '#2D3748' : '#FFFFFF',
          borderColor: theme === 'dark' ? '#333333' : '#E5E7EB'
        }}
      >
        {/* Interactive floating tools */}
        {tools.map((tool, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 hover:scale-125 cursor-pointer z-10"
            style={{
              ...tool.position,
              transform: hoveredTool === index ? 'scale(1.3) rotate(10deg)' : 'scale(1)',
              animation: `bounce 3s ease-in-out infinite ${index * 0.5}s`
            }}
            onMouseEnter={() => setHoveredTool(index)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <div 
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg transition-all duration-300 relative overflow-hidden"
              style={{ 
                backgroundColor: tool.color,
                boxShadow: hoveredTool === index ? `0 10px 25px ${tool.color}40` : `0 4px 15px ${tool.color}20`
              }}
            >
              <span className="relative z-10">{tool.icon}</span>
              {hoveredTool === index && (
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
              )}
            </div>
            {hoveredTool === index && (
              <div 
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap z-20"
                style={{ 
                  backgroundColor: tool.color,
                  color: '#FFFFFF'
                }}
              >
                {tool.name}
              </div>
            )}
          </div>
        ))}

        {/* Central builder character */}
        <div className="relative">
          <div 
            className="w-32 h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center shadow-2xl border-4 relative overflow-hidden transition-all duration-500"
            style={{ 
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #2D3748, #4A5568)' 
                : 'linear-gradient(135deg, #F7FAFC, #EDF2F7)',
              borderColor: theme === 'dark' ? '#4A5568' : '#E2E8F0',
              animation: 'pulse 3s ease-in-out infinite'
            }}
          >
            <div 
              className="text-6xl lg:text-7xl transition-transform duration-500 hover:scale-110"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transform: activeTask === 0 ? 'rotate(5deg)' : activeTask === 1 ? 'rotate(-5deg)' : 'rotate(0deg)'
              }}
            >
              👷‍♂️
            </div>
            
            {/* Activity indicator */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Progress tasks at bottom */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48">
            <div className="flex justify-center space-x-2">
              {tasks.map((task, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center transition-all duration-300"
                  style={{
                    transform: activeTask === index ? 'scale(1.1)' : 'scale(1)',
                    opacity: activeTask >= index ? 1 : 0.6
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shadow-md mb-1 transition-all duration-300"
                    style={{ 
                      backgroundColor: activeTask >= index ? '#FF5E14' : (theme === 'dark' ? '#374151' : '#F3F4F6'),
                      color: activeTask >= index ? '#FFFFFF' : (theme === 'dark' ? '#9CA3AF' : '#6B7280')
                    }}
                  >
                    {task.icon}
                  </div>
                  <div 
                    className="text-xs font-semibold transition-colors duration-300"
                    style={{ 
                      color: activeTask >= index ? '#FF5E14' : (theme === 'dark' ? '#9CA3AF' : '#6B7280')
                    }}
                  >
                    {task.title}
                  </div>
                  {/* Progress bar */}
                  <div 
                    className="w-12 h-1 rounded-full mt-1 overflow-hidden"
                    style={{ backgroundColor: theme === 'dark' ? '#374151' : '#E5E7EB' }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${task.progress}%`,
                        backgroundColor: '#FF5E14'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-orange-600 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-orange-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-orange-700 rounded-full animate-ping opacity-60" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-orange-600 rounded-full animate-ping opacity-60" style={{ animationDelay: '4s' }}></div>

      {/* Interactive connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5E14" />
            <stop offset="100%" stopColor="#2D3748" />
          </linearGradient>
        </defs>
        {hoveredTool !== null && (
          <line
            x1="50%"
            y1="50%"
            x2={tools[hoveredTool].position.left || `${100 - parseInt(tools[hoveredTool].position.right || '0')}%`}
            y2={tools[hoveredTool].position.top || `${100 - parseInt(tools[hoveredTool].position.bottom || '0')}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        )}
      </svg>
    </div>
  );
};

export default WorkerAnimation;
