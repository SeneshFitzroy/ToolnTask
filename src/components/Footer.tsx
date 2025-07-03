import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-gray-900 dark:to-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="text-2xl sm:text-3xl font-bold mb-4">
              Tool<span className="text-orange-500">N</span>Task
            </div>
            <p className="text-gray-300 mb-4 max-w-md text-sm sm:text-base">
              Sri Lanka&apos;s premier marketplace for equipment rentals and skilled services. 
              Connecting communities through shared resources and opportunities.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/About" className="text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base">About Us</Link></li>
              <li><Link href="/Contact" className="text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base">Contact</Link></li>
              <li><Link href="/PrivacyPolicy" className="text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base">Privacy Policy</Link></li>
              <li><Link href="/TermsAndConditions" className="text-gray-300 hover:text-orange-400 transition-colors text-sm sm:text-base">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>+94 11 123 4567</li>
              <li>info@toolntask.lk</li>
              <li>123, Galle Road, Colombo 03</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-300">
          <p className="text-sm sm:text-base">&copy; 2025 ToolNTask. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;