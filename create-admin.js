const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "toolntask-firebase",
  "private_key_id": "your-private-key-id",
  "private_key": "your-private-key",
  "client_email": "firebase-adminsdk@toolntask-firebase.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your-cert-url"
};

// Note: This is a placeholder script for creating admin account
// In production, you would use proper Firebase Admin SDK credentials

async function createAdminAccount() {
  try {
    console.log('Creating admin account...');
    
    // Admin credentials
    const adminEmail = 'admin@toolntask.com';
    const adminPassword = 'AdminToolnTask2025!';
    
    console.log(`Admin Email: ${adminEmail}`);
    console.log(`Admin Password: ${adminPassword}`);
    console.log('');
    console.log('⚠️  IMPORTANT: You need to manually create this admin account in Firebase Auth Console');
    console.log('📋 Steps to create admin account:');
    console.log('1. Go to Firebase Console > Authentication > Users');
    console.log('2. Click "Add user"');
    console.log('3. Enter the email and password above');
    console.log('4. Save the user');
    console.log('5. The admin can now login and access /admin/AdminDashboard');
    console.log('');
    console.log('🔗 Firebase Console: https://console.firebase.google.com/');
    
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
}

createAdminAccount();
