# Firebase Setup & Index Creation Guide

## Current Firebase Error Resolution

### Error: Query Requires Index
```
FirebaseError: The query requires an index. You can create it here: 
https://console.firebase.google.com/v1/r/project/toolntask/firestore/indexes?create_composite=Ckdwcm9qZWN0cy90b29sbnRhc2svZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3Rhc2tzL2luZGV4ZXMvXxABGgoKBnVzZXJJZBABGg0KCWNyZWF0ZWRBdBACGgwKCF9fbmFtZV9fEAI
```

### Solution Steps:

#### 1. Create Required Firebase Indexes

**Access Firebase Console:**
1. Go to: https://console.firebase.google.com/project/toolntask/firestore/indexes
2. Click "Create Index" or use the direct link provided in the error

**Required Indexes:**

**Index 1: Tasks Collection (Multi-field)**
- Collection: `tasks`
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)
  - `__name__` (Descending)

**Index 2: Tools Collection (Multi-field)**
- Collection: `tools` 
- Fields:
  - `userId` (Ascending)
  - `createdAt` (Descending)
  - `__name__` (Descending)

**Index 3: Users Collection (Single-field)**
- Collection: `users`
- Fields:
  - `email` (Ascending)
  - `createdAt` (Descending)

#### 2. Firestore Rules Setup

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read tasks and tools, but only authenticated users can create/update their own
    match /tasks/{taskId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /tools/{toolId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Admin access (replace with your admin UID)
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == "YOUR_ADMIN_UID_HERE";
    }
  }
}
```

#### 3. Create Initial Admin User

**Option A: Using Firebase Console**
1. Go to Authentication > Users
2. Add user manually with email/password
3. Copy the generated UID
4. Replace "YOUR_ADMIN_UID_HERE" in Firestore rules

**Option B: Using Code (run once)**
```javascript
// Add this to your admin setup script
import { auth, db } from './src/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const createAdminUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'admin@toolntask.com', 
      'YOUR_SECURE_PASSWORD'
    );
    
    const user = userCredential.user;
    
    // Create admin profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      createdAt: new Date(),
      isAdmin: true
    });
    
    console.log('Admin user created with UID:', user.uid);
    console.log('Update Firestore rules with this UID');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};
```

#### 4. Test Database Queries

After creating indexes, test these queries work:

```javascript
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './src/lib/firebase';

// Test query that requires the index
const testQuery = async () => {
  const q = query(
    collection(db, 'tasks'),
    where('userId', '==', 'some-user-id'),
    orderBy('createdAt', 'desc'),
    limit(10)
  );
  
  const querySnapshot = await getDocs(q);
  console.log('Query successful, docs:', querySnapshot.size);
};
```

#### 5. Index Creation Timeline

- **Single-field indexes**: Created immediately
- **Composite indexes**: May take several minutes to hours depending on existing data
- **Status**: Check index creation status in Firebase Console

#### 6. Alternative Query Patterns (if indexes fail)

```javascript
// Option 1: Simplified query without composite index
const getTasksByUser = async (userId) => {
  const q = query(
    collection(db, 'tasks'),
    where('userId', '==', userId)
  );
  
  const snapshot = await getDocs(q);
  const tasks = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  
  // Sort in client-side
  return tasks.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
};

// Option 2: Use subcollections (requires data restructure)
// /users/{userId}/tasks/{taskId}
// /users/{userId}/tools/{toolId}
```

## Current Project Status

### ✅ Completed Features
- [x] Multilingual system (English, Sinhala, Tamil)
- [x] Global language selector for all users
- [x] Responsive navigation with language switching
- [x] Translation integration across components
- [x] Public language selection (no account required)
- [x] localStorage language persistence

### 🔧 Pending Setup
- [ ] Firebase indexes creation (manual step required)
- [ ] Admin user creation
- [ ] Firestore security rules deployment
- [ ] Production environment variables

### 🚀 Ready for Production
- [x] TypeScript compilation
- [x] ESLint validation
- [x] Responsive design
- [x] Theme switching (dark/light)
- [x] Authentication system
- [x] Component architecture

## Next Steps

1. **Immediate**: Create Firebase indexes using the console link
2. **Admin Setup**: Create admin user and update security rules
3. **Testing**: Verify all queries work after index creation
4. **Deployment**: Ready for production deployment

## Support

If you encounter issues:
1. Check Firebase Console for index creation status
2. Verify Firestore rules are deployed
3. Test queries in Firebase Console Query tab
4. Check browser console for detailed error messages

---

**Last Updated**: Production-ready multilingual system with comprehensive Firebase setup guide.
