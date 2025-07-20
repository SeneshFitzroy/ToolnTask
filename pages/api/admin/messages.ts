import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../src/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, where, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      // Add new message to admin dashboard
      const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        subject, 
        message, 
        userId, 
        userEmail,
        type = 'contact_form',
        source = 'website',
        priority = 'normal'
      } = req.body;

      if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const contactMessage = {
        firstName,
        lastName,
        email,
        phone: phone || '',
        subject,
        message,
        userId: userId || null,
        userEmail: userEmail || null,
        timestamp: serverTimestamp(),
        status: 'new',
        type,
        source,
        priority,
        read: false,
        assignedTo: null,
        notes: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Store in admin messages collection
      const docRef = await addDoc(collection(db, 'admin_messages'), contactMessage);
      
      // Also store in contacts collection for backwards compatibility
      await addDoc(collection(db, 'contacts'), contactMessage);

      return res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully',
        messageId: docRef.id 
      });

    } else if (req.method === 'GET') {
      // Get messages for admin dashboard
      const { status, limit = 50, type } = req.query;
      
      let q = query(
        collection(db, 'admin_messages'),
        orderBy('timestamp', 'desc')
      );

      if (status) {
        q = query(
          collection(db, 'admin_messages'),
          where('status', '==', status),
          orderBy('timestamp', 'desc')
        );
      }

      if (type) {
        q = query(
          collection(db, 'admin_messages'),
          where('type', '==', type),
          orderBy('timestamp', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return res.status(200).json({ 
        success: true, 
        messages: messages.slice(0, parseInt(limit as string))
      });

    } else if (req.method === 'PUT') {
      // Update message status
      const { messageId, status, read, assignedTo, notes } = req.body;

      if (!messageId) {
        return res.status(400).json({ error: 'Message ID is required' });
      }

      const updateData: Record<string, any> = {
        updatedAt: serverTimestamp()
      };

      if (status !== undefined) {
        updateData.status = status;
      }
      if (read !== undefined) {
        updateData.read = read;
      }
      if (assignedTo !== undefined) {
        updateData.assignedTo = assignedTo;
      }
      if (notes !== undefined) {
        updateData.notes = notes;
      }

      await updateDoc(doc(db, 'admin_messages', messageId), updateData);

      return res.status(200).json({ 
        success: true, 
        message: 'Message updated successfully'
      });

    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

  } catch (error) {
    console.error('Admin messages API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
