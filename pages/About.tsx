import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import { Button } from '../src/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F3F5' }}>
      <Navigation />
      
      <div className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8" style={{ color: '#1A1818' }}>
              About{' '}
              <span 
                className="relative inline-block"
                style={{ color: '#FF5E14' }}
              >
                ToolNTask
                <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 100 12" style={{ fill: '#FF5E14', opacity: 0.3 }}>
                  <path d="M0 10 Q 50 0 100 10 L 100 12 L 0 12 Z" />
                </svg>
              </span>
            </h1>
            <p className="text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#B3B5BC' }}>
              Connecting communities through shared tasks and tool rentals. 
              Making everyday life easier, one helping hand at a time.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-16 sm:mb-20">
            <div className="p-8 rounded-3xl shadow-xl" style={{ backgroundColor: '#FFFFFF' }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8" style={{ color: '#1A1818' }}>Our Mission</h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#B3B5BC' }}>
                We believe that every community has untapped potential. Whether it&apos;s someone with 
                time to spare looking for extra income, or a neighbor who needs a specific tool 
                for a weekend project, ToolNTask bridges these gaps.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                Our platform empowers people to share resources, build connections, and create 
                a more collaborative community where everyone benefits.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center shadow-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF5E14 0%, #FF5E14 100%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <span className="text-6xl sm:text-7xl lg:text-8xl relative z-10">🤝</span>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-20">
            <div className="p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1A1818' }}>Trust & Safety</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                Every user is verified, and we maintain high standards for safety and reliability 
                in all transactions.
              </p>
            </div>

            <div className="p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1A1818' }}>Sustainability</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                By sharing tools and resources, we reduce waste and promote a more sustainable 
                way of living.
              </p>
            </div>

            <div className="p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#001554' }}>
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1A1818' }}>Community</h3>
              <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                We strengthen local communities by encouraging neighbors to help each other 
                and share resources.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16" style={{ color: '#1A1818' }}>Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #FF5E14 0%, #FF5D13 100%)' }}>
                  <span className="text-white text-2xl sm:text-3xl font-bold">JD</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#1A1818' }}>John Doe</h3>
                <p className="font-semibold mb-4" style={{ color: '#FF5E14' }}>Founder & CEO</p>
                <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                  Passionate about building communities and creating sustainable solutions.
                </p>
              </div>

              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #001554 0%, #011659 100%)' }}>
                  <span className="text-white text-2xl sm:text-3xl font-bold">JS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#1A1818' }}>Jane Smith</h3>
                <p className="font-semibold mb-4" style={{ color: '#001554' }}>CTO</p>
                <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                  Tech enthusiast dedicated to creating seamless user experiences.
                </p>
              </div>

              <div className="p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FF5E14' }}>
                  <span className="text-2xl sm:text-3xl font-bold" style={{ color: '#1A1818' }}>MP</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#1A1818' }}>Mike Peterson</h3>
                <p className="font-semibold mb-4" style={{ color: '#FFE514' }}>Head of Operations</p>
                <p className="text-lg leading-relaxed" style={{ color: '#B3B5BC' }}>
                  Ensures smooth operations and exceptional customer service.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="rounded-3xl p-12 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #FF5E14 0%, #001554 100%)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Ready to Join Our Community?</h2>
              <p className="text-xl sm:text-2xl mb-8 sm:mb-10 opacity-90 leading-relaxed">
                Start earning by helping others or find the assistance you need today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  className="px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl border-0"
                  style={{ backgroundColor: '#FFFFFF', color: '#FF5E14' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F3F5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                >
                  Get Started
                </Button>
                <Button 
                  className="border-2 px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
                  style={{ borderColor: '#FFFFFF', color: '#FFFFFF', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#FF5E14';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
