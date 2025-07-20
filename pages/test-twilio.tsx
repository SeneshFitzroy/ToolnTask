import { useState } from 'react';

export default function TestTwilio() {
  const [phone, setPhone] = useState('+94761120457');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testTwilio = async () => {
    setLoading(true);
    setResult('Testing Twilio...');
    
    try {
      const response = await fetch('/api/test-twilio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testPhone: phone }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ SUCCESS!\n\nMessage: ${data.message}\n\nDebug Info:\n${JSON.stringify(data.debug, null, 2)}`);
      } else {
        setResult(`❌ FAILED!\n\nError: ${data.error}\nCode: ${data.code}\nMore Info: ${data.moreInfo}\n\nDebug Info:\n${JSON.stringify(data.debug, null, 2)}`);
      }
    } catch (error) {
      setResult(`❌ NETWORK ERROR: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔧 Twilio SMS Test</h1>
      <p>This will test if Twilio can send SMS to your Sri Lankan number.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Phone Number:
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+94761120457"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <button
        onClick={testTwilio}
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
        {loading ? 'Testing...' : 'Test Twilio SMS'}
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
            fontFamily: 'monospace',
            fontSize: '14px'
          }}
        >
          {result}
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>Common Issues:</h3>
        <ul>
          <li><strong>Geographic Permissions:</strong> Twilio trial accounts may not support SMS to Sri Lanka</li>
          <li><strong>Phone Number Verification:</strong> You may need to verify your number in Twilio console</li>
          <li><strong>Account Upgrade:</strong> Trial accounts have restrictions on international SMS</li>
          <li><strong>Messaging Service:</strong> You might need to use a Messaging Service instead of a phone number</li>
        </ul>
        
        <h3>Next Steps if SMS Fails:</h3>
        <ul>
          <li>1. Check Twilio Console logs</li>
          <li>2. Verify your phone number in Twilio</li>
          <li>3. Upgrade account for international SMS</li>
          <li>4. Use email fallback for now</li>
        </ul>
      </div>
    </div>
  );
}
