import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token, newPassword } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Reset token is required' });
  }

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    // Find the reset token
    const resetRef = collection(db, 'passwordResets');
    const q = query(resetRef, where('token', '==', token), where('used', '==', false));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const resetDoc = querySnapshot.docs[0];
    const resetData = resetDoc.data();

    // Check if token has expired
    if (new Date() > resetData.expiresAt.toDate()) {
      return res.status(400).json({ message: 'Reset token has expired. Please request a new password reset.' });
    }

    const userEmail = resetData.email;
    console.log(`🔐 Processing password reset for: ${userEmail}`);

    // Find user in Firestore
    const usersRef = collection(db, 'users');
    const userQuery = query(usersRef, where('email', '==', userEmail));
    const userSnapshot = await getDocs(userQuery);

    let userDocRef;
    if (userSnapshot.empty) {
      // Create user document if it doesn't exist
      userDocRef = doc(db, 'users', userEmail.replace('@', '_at_').replace('.', '_dot_'));
      console.log(`📝 Creating new user document for: ${userEmail}`);
    } else {
      userDocRef = userSnapshot.docs[0].ref;
      console.log(`👤 Found existing user document for: ${userEmail}`);
    }

    // Update Firestore with new password
    await updateDoc(userDocRef, {
      email: userEmail,
      currentPassword: newPassword,
      passwordUpdatedAt: new Date(),
      passwordResetCompleted: true,
      lastPasswordReset: new Date(),
      // Clear old password data
      newPasswordFromReset: null,
      tempPassword: null,
      lastKnownPassword: null,
      // Security tracking
      totalPasswordResets: (userSnapshot.empty ? 0 : (userSnapshot.docs[0].data().totalPasswordResets || 0)) + 1,
      emailVerified: false,
      accountStatus: 'active'
    });

    console.log(`✅ Firestore updated for: ${userEmail}`);

    // Use ensure-auth API to sync Firebase Auth
    try {
      console.log(`🔧 Syncing Firebase Auth for: ${userEmail}`);
      
      const ensureResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/ensure-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          password: newPassword
        })
      });
      
      if (ensureResponse.ok) {
        const ensureData = await ensureResponse.json();
        console.log(`✅ Firebase Auth synced for: ${userEmail}`, ensureData.fixes);
      } else {
        console.log(`⚠️ Firebase Auth sync failed, but password reset completed in Firestore`);
      }
    } catch (ensureError) {
      console.log(`⚠️ Ensure-auth request failed:`, ensureError);
    }

    // Mark reset token as used
    await updateDoc(doc(db, 'passwordResets', resetDoc.id), {
      used: true,
      usedAt: new Date()
    });

    // Delete the reset token after a delay
    setTimeout(async () => {
      try {
        await deleteDoc(doc(db, 'passwordResets', resetDoc.id));
        console.log(`🗑️ Reset token deleted for: ${userEmail}`);
      } catch (error) {
        console.log(`⚠️ Could not delete reset token: ${error}`);
      }
    }, 5000);

    console.log(`🎉 Password reset completed successfully for: ${userEmail}`);
    
    return res.status(200).json({
      message: 'Password updated successfully. You can now sign in with your new password.',
      success: true,
      email: userEmail  // Return the email for auto-fill
    });

  } catch (error) {
    console.error('Password update error:', error);
    return res.status(500).json({ 
      message: 'Failed to update password. Please try again.',
      success: false 
    });
  }
}
