
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import TaskCard from '../src/components/TaskCard';
import ToolCard from '../src/components/ToolCard';
import FilterButtons from '../src/components/FilterButtons';
import WorkerAnimation from '../src/components/WorkerAnimation';
import { Button } from '../src/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tasks' | 'tools'>('all');

  const handleFilterChange = (filter: 'all' | 'tasks' | 'tools') => {
    setActiveFilter(filter);
  };

  const taskCards = [
    <TaskCard
      key="task1"
      title="Garden Maintenance"
      description="Looking for someone to help with weekly garden maintenance including weeding, pruning, and lawn care."
      price="Rs. 5,000"
      time="2-3 hours"
      location="Colombo 03"
      isUrgent={true}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
    />,
    <TaskCard
      key="task2"
      title="House Cleaning"
      description="Need help with deep cleaning of 3-bedroom house. All supplies provided."
      price="Rs. 8,000"
      time="4-5 hours"
      location="Kandy"
      isPromoted={true}
      image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    />,
    <TaskCard
      key="task3"
      title="Babysitting Service"
      description="Reliable babysitting for 2 kids (ages 5 and 8) for weekend evenings."
      price="Rs. 3,000"
      time="4 hours"
      location="Galle"
      isPromoted={true}
      image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop"
    />
  ];

  const toolCards = [
    <ToolCard
      key="tool1"
      title="Power Drill Set"
      description="Professional Bosch power drill with multiple bits. Perfect for home improvement projects."
      price="Rs. 1,500/day"
      brand="Bosch"
      condition="Excellent"
      available={true}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop"
    />,
    <ToolCard
      key="tool2"
      title="Lawn Mower"
      description="Electric lawn mower in great condition. Ideal for medium to large gardens."
      price="Rs. 2,000/day"
      brand="Honda"
      condition="Good"
      available={true}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&h=300&fit=crop"
    />,
    <ToolCard
      key="tool3"
      title="Angle Grinder"
      description="Heavy-duty angle grinder for metal cutting and grinding projects."
      price="Rs. 1,200/day"
      brand="Makita"
      condition="Excellent"
      available={false}
      isPromoted={true}
      image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"
    />
  ];

  const getFilteredCards = () => {
    if (activeFilter === 'tasks') return taskCards;
    if (activeFilter === 'tools') return toolCards;
    return [...taskCards, ...toolCards];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="py-12 sm:py-16" style={{ backgroundColor: '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#1A1818' }}>
                Need a Hand or a Hammer?
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#FFE514' }}>
                We&apos;ve Got Both!
              </h2>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed" style={{ color: '#B3B5BC' }}>
                Whether you need a quick helping hand or a power drill for the weekend, 
                we&apos;ve got you covered. Browse one-time gigs like babysitting, gardening, 
                or minor repairs — or rent out home tools neighbours need year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/Tasks">
                  <Button 
                    className="w-full sm:w-auto text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg border-0"
                    style={{ backgroundColor: '#FE5F16' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/About">
                  <Button 
                    className="w-full sm:w-auto text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg border-0"
                    style={{ backgroundColor: '#001554' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#011659'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#001554'}
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <WorkerAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-12 shadow-sm border-t border-opacity-20" style={{ backgroundColor: '#FFFFFF', borderColor: '#B3B5BC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterButtons onFilterChange={handleFilterChange} activeFilter={activeFilter} />
        </div>
      </div>

      {/* Promoted Cards Section */}
      <div className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#1A1818' }}>
              Featured {activeFilter === 'all' ? '' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {getFilteredCards()}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16" style={{ backgroundColor: '#F2F3F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1A1818' }}>
              Changing Lives, Shaping Sri Lanka
            </h2>
            <p className="text-lg" style={{ color: '#B3B5BC' }}>
              Join thousands of users who trust ToolNTask for their daily needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '👥', number: '5,000+', label: 'Active Users', desc: 'Trusted community members' },
              { icon: '🔧', number: '1,000+', label: 'Tools Available', desc: 'Ready to rent anytime' },
              { icon: '🏆', number: '500+', label: 'Tasks Completed', desc: 'Successfully finished projects' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#FFE514' }}>{stat.number}</div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1A1818' }}>{stat.label}</h3>
                <p className="text-sm" style={{ color: '#B3B5BC' }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1A1818' }}>
              How It Works
            </h2>
            <p className="text-lg" style={{ color: '#B3B5BC' }}>
              Getting help or lending a hand has never been easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: '1', 
                icon: '📝', 
                title: 'Post or Browse', 
                desc: 'Create a task or browse available tools in your area'
              },
              { 
                step: '2', 
                icon: '🤝', 
                title: 'Connect & Agree', 
                desc: 'Chat with providers, agree on terms and pricing'
              },
              { 
                step: '3', 
                icon: '✅', 
                title: 'Complete & Review', 
                desc: 'Finish the task, make payment, and leave reviews'
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg"
                  style={{ backgroundColor: '#001554' }}
                >
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1A1818' }}>{step.title}</h3>
                <p style={{ color: '#B3B5BC' }}>{step.desc}</p>
                
                {index < 2 && (
                  <div 
                    className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 transform translate-x-6"
                    style={{ backgroundColor: '#FFE514' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16" style={{ backgroundColor: '#F2F3F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1A1818' }}>
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#B3B5BC' }}>
            Join our community today and discover the power of collaborative living
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/SignUp">
              <Button 
                className="w-full sm:w-auto text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg border-0"
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                Join Now - It's Free
              </Button>
            </Link>
            <Link href="/About">
              <Button 
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg border-2"
                style={{ 
                  backgroundColor: 'transparent',
                  color: '#001554',
                  borderColor: '#001554'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001554';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#001554';
                }}
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
