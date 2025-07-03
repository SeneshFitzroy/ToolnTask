import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-white mt-16" style={{ background: 'linear-gradient(135deg, #1A1818 0%, #0C0F16 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="text-2xl sm:text-3xl font-bold mb-4">
              Tool<span style={{ color: '#FFE514' }}>N</span>Task
            </div>
            <p className="mb-4 max-w-md text-sm sm:text-base" style={{ color: '#B3B5BC' }}>
              Sri Lanka&apos;s premier marketplace for equipment rentals and skilled services. 
              Connecting communities through shared resources and opportunities.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
                style={{ backgroundColor: '#FE5F16' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF5D13'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FE5F16'}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/About" className="transition-colors text-sm sm:text-base hover:scale-105 inline-block" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFE514'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>About Us</Link></li>
              <li><Link href="/Contact" className="transition-colors text-sm sm:text-base hover:scale-105 inline-block" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFE514'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>Contact</Link></li>
              <li><Link href="/PrivacyPolicy" className="transition-colors text-sm sm:text-base hover:scale-105 inline-block" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFE514'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>Privacy Policy</Link></li>
              <li><Link href="/TermsAndConditions" className="transition-colors text-sm sm:text-base hover:scale-105 inline-block" style={{ color: '#B3B5BC' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFE514'} onMouseLeave={(e) => e.currentTarget.style.color = '#B3B5BC'}>Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm sm:text-base" style={{ color: '#B3B5BC' }}>
              <li>+94 11 123 4567</li>
              <li>info@toolntask.lk</li>
              <li>123, Galle Road, Colombo 03</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-center border-t border-opacity-30" style={{ borderColor: '#B3B5BC' }}>
          <p className="text-sm sm:text-base" style={{ color: '#B3B5BC' }}>&copy; 2025 ToolNTask. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;