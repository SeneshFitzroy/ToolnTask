import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';

export default function TestTaskLinks() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const testTasks = [
    { id: 'garden_maintenance_enhanced', title: 'Garden Maintenance & Landscaping' },
    { id: 'babysitting_service_enhanced', title: 'Babysitting Service' },
    { id: 'house_cleaning_enhanced', title: 'House Cleaning Service' },
    { id: 'pet_walking_enhanced', title: 'Pet Walking & Care' },
    { id: 'furniture_assembly_enhanced', title: 'Furniture Assembly' },
  ];

  const testTools = [
    { id: 'power_drill_enhanced', title: 'Professional Power Drill Set' },
    { id: 'lawn_mower_enhanced', title: 'Electric Lawn Mower' },
    { id: 'circular_saw_enhanced', title: 'Circular Saw - Heavy Duty' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#F8FAFC' }}>
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }}>
          Test Task & Tool Links
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Task Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: theme === 'dark' ? '#FF5E14' : '#001554' }}>
              Task Links
            </h2>
            <div className="space-y-3">
              {testTasks.map(task => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="block p-4 rounded-lg border transition-colors duration-200 hover:border-orange-300"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    color: theme === 'dark' ? '#FFFFFF' : '#1F2937'
                  }}
                >
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm mt-1" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    ID: {task.id}
                  </div>
                  <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    URL: /tasks/{task.id}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tool Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: theme === 'dark' ? '#FF5E14' : '#001554' }}>
              Tool Links
            </h2>
            <div className="space-y-3">
              {testTools.map(tool => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="block p-4 rounded-lg border transition-colors duration-200 hover:border-orange-300"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    color: theme === 'dark' ? '#FFFFFF' : '#1F2937'
                  }}
                >
                  <div className="font-medium">{tool.title}</div>
                  <div className="text-sm mt-1" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    ID: {tool.id}
                  </div>
                  <div className="text-sm" style={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>
                    URL: /tools/{tool.id}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
