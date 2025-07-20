import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { X, FileText, Shield, Users, CheckCircle, AlertTriangle, Scroll } from 'lucide-react';

interface TermsAcceptanceProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

const TermsAcceptance: React.FC<TermsAcceptanceProps> = ({ isOpen, onClose, onAccept, onDecline }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [acceptChecked, setAcceptChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [communityChecked, setCommunityChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      if (isAtBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true);
        setHasReadTerms(true);
      }
    }
  };

  const canAccept = hasReadTerms && acceptChecked && privacyChecked && communityChecked;

  const handleAcceptClick = () => {
    if (canAccept) {
      onAccept();
    }
  };

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200" style={{ borderColor: theme === 'dark' ? '#333' : '#e2e8f0' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" style={{ color: '#FE5F16' }} />
              <h2 className="text-xl font-bold" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                Terms & Conditions
              </h2>
            </div>
            <button
              onClick={onDecline}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ backgroundColor: theme === 'dark' ? '#333' : 'transparent' }}
            >
              <X className="w-5 h-5" style={{ color: theme === 'dark' ? '#FFFFFF' : '#666' }} />
            </button>
          </div>
        </div>

        {/* Terms Content */}
        <div 
          className="p-6 h-96 overflow-y-auto"
          onScroll={handleScroll}
          style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#FFFFFF' }}
        >
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 mt-1" style={{ color: '#FE5F16' }} />
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  1. Community Guidelines
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  By creating an account, you agree to treat all community members with respect and professionalism. 
                  Harassment, discrimination, or inappropriate behavior will result in account suspension.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 mt-1" style={{ color: '#FE5F16' }} />
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  2. Account Verification & Safety
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  All users must provide accurate information during registration. Identity verification may be required 
                  for certain transactions. You are responsible for maintaining account security and reporting any unauthorized access.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 mt-1" style={{ color: '#FE5F16' }} />
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  3. Payment & Transaction Terms
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  All payments are processed securely through verified payment gateways. ToolNTask charges a service fee 
                  for completed transactions. Refunds are subject to our dispute resolution process and completed task verification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 mt-1" style={{ color: '#FE5F16' }} />
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  4. Task & Tool Listing Responsibilities
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Task creators must provide accurate descriptions, fair compensation, and clear requirements. 
                  Tool owners must ensure all equipment is safe, functional, and as described. Misrepresentation may result in account penalties.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 mt-1" style={{ color: '#FE5F16' }} />
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  5. Liability & Insurance
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Users engage in transactions at their own risk. ToolNTask facilitates connections but is not liable 
                  for damages, injuries, or disputes between users. We recommend comprehensive insurance for high-value items and tasks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 mt-1" style={{ color: '#FE5F16' }} />
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme === 'dark' ? '#FFFFFF' : '#2D3748' }}>
                  6. Data Privacy & Usage
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                  Your personal information is protected according to our Privacy Policy. We collect data to improve 
                  services, ensure safety, and facilitate transactions. You may request data deletion subject to legal requirements.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f7f7f7' }}>
              <p className="text-sm text-center" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
                <strong>Last Updated:</strong> January 2025 | 
                <strong> Contact:</strong> toolntask@gmail.com | 
                <strong> Phone:</strong> +94 76 112 0457
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200" style={{ borderColor: theme === 'dark' ? '#333' : '#e2e8f0' }}>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setAcceptedTerms(!acceptedTerms)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                acceptedTerms ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
              style={{ 
                borderColor: acceptedTerms ? '#10B981' : theme === 'dark' ? '#444' : '#D1D5DB',
                backgroundColor: acceptedTerms ? '#10B981' : 'transparent'
              }}
            >
              {acceptedTerms && <CheckCircle className="w-3 h-3 text-white" />}
            </button>
            <label className="text-sm cursor-pointer" style={{ color: theme === 'dark' ? '#CCCCCC' : '#6B7280' }}>
              I have read and agree to the Terms & Conditions
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="px-6 py-2 rounded-lg border transition-colors"
              style={{ 
                borderColor: theme === 'dark' ? '#444' : '#D1D5DB',
                color: theme === 'dark' ? '#CCCCCC' : '#6B7280',
                backgroundColor: 'transparent'
              }}
            >
              Decline
            </button>
            <button
              onClick={acceptedTerms && hasScrolledToBottom ? onAccept : undefined}
              disabled={!acceptedTerms || !hasScrolledToBottom}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                acceptedTerms && hasScrolledToBottom
                  ? 'opacity-100 cursor-pointer hover:scale-105'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ 
                backgroundColor: acceptedTerms && hasScrolledToBottom ? '#FE5F16' : '#ccc',
                color: '#FFFFFF'
              }}
            >
              Accept & Continue
            </button>
          </div>

          {!hasScrolledToBottom && (
            <p className="text-xs mt-2 text-center" style={{ color: '#FE5F16' }}>
              Please scroll to the bottom to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAcceptance;
