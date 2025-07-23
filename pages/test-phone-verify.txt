import { useState } from 'react';

export default function TestPhoneVerify() {
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testPhoneVerify = async () => {
    setLoading(true);
    setResult('');
    
    try {
      console.log('Testing phone:', phone);
      
      const response = await fetch('/api/phone-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      console.log('Response:', data);
      
      if (response.ok) {
        setResult(`✅ SUCCESS: ${data.message}`);
      } else {
        setResult(`❌ ERROR: ${data.message}`);
      }
    } catch (error) {
      console.error('Test error:', error);
      setResult(`❌ NETWORK ERROR: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🧪 Test Phone Verification API</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Phone Number:</strong>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number (e.g., 0771234567 or +18777804236)"
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>
      </div>

      <button
        onClick={testPhoneVerify}
        disabled={loading || !phone}
        style={{
          padding: '12px 24px',
          backgroundColor: loading ? '#ccc' : '#FF5E14',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Testing...' : 'Test Phone Verify API'}
      </button>

      {result && (
        <div
          style={{
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: result.includes('SUCCESS') ? '#d4edda' : '#f8d7da',
            color: result.includes('SUCCESS') ? '#155724' : '#721c24',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace'
          }}
        >
          {result}
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>Test Numbers:</h3>
        <ul>
          <li><strong>Sri Lankan:</strong> 0771234567, 0761234567</li>
          <li><strong>Twilio Virtual:</strong> +18777804236</li>
          <li><strong>Your Real Number:</strong> Enter your actual Sri Lankan mobile number</li>
        </ul>
        
        <h3>Expected Behavior:</h3>
        <ul>
          <li>✅ With Twilio: Real SMS sent to your phone</li>
          <li>📧 Without Twilio: Email simulation sent to admin</li>
          <li>❌ Invalid format: Validation error</li>
        </ul>
      </div>
    </div>
  );
}
