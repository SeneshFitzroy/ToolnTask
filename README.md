# ToolnTask 🚀🔥  
**Sri Lanka's First Unified Tool Rental & Gig Marketplace**

**ToolnTask** revolutionizes Sri Lanka's sharing economy with a sophisticated web application that seamlessly integrates equipment rentals and short-term gigs. Built with **Next.js 15.3.4** and **Firebase**, our platform addresses the critical gap in Sri Lanka's fragmented marketplace, empowering communities through technology-driven solutions. 🌍💼  

*Empower your skills. Share your tools. Transform Sri Lanka's economy! 🇱🇰*

---

## 🌟 Core Features & Capabilities  

### 🛠️ **Dual Marketplace System**
- **Tool Rentals**: List, discover, and rent equipment (drills, lawnmowers, cameras, etc.)
- **Gig Services**: Offer or book services (cleaning, repairs, tutoring, delivery, etc.)
- **Unified Dashboard**: Manage both rentals and gigs from a single interface

### 📱 **Advanced User Experience**
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Chat**: Integrated communication system for seamless coordination
- **Smart Search & Filtering**: AI-powered discovery with location-based results
- **Profile Management**: Comprehensive user profiles with verification badges

### 🔐 **Security & Trust**
- **Firebase Authentication**: Secure user registration and login
- **Phone Number Verification**: Mandatory phone verification for all users
- **Contact Revelation System**: Secure contact sharing upon request
- **User Ratings & Reviews**: Community-driven trust building

### 💰 **Smart Business Features**
- **Dynamic Pricing**: Flexible pricing models for rentals and services
- **Save System**: Users can bookmark favorite tools and gigs
- **District-based Location**: Sri Lankan district integration for local discovery
- **Payment Integration Ready**: Stripe-ready architecture for secure transactions

> 💡 **Innovation Edge**: ToolnTask uniquely combines rentals and gigs in one platform, specifically designed for Sri Lankan market dynamics and cultural preferences.🔥  
**ToolnTask** redefines empowerment for Sri Lankans with a cutting-edge web app, merging equipment rentals and short-term gigs into a sustainable, community-driven economy. Powered by **Next.js** and **Firebase**, it conquers high costs and fragmented marketplaces with flair. 🌍💼  

*Empower your skills. Share your tools. Shape a thriving Sri Lanka! 🇱🇰*

---

## 🌟 Standout Features  
- 🛠️ **Equipment Rentals**: Rent or list tools (e.g., drills, lawnmowers) to save or earn effortlessly.  
- 👷 **Gig Marketplace**: Book or offer gigs like babysitting, gardening, or repairs with ease.  
- 📱 **Sleek UI**: Responsive, intuitive design with search, profiles, and secure payments.  
- 🤝 **Trusted Network**: Advanced verification for safe, reliable transactions.  

> 💡 **What Sets Us Apart?** Unlike TaskRabbit, ToolnTask fuses rentals *and* gigs, crafted for Sri Lanka’s unique landscape.

---

## 🏗️ Advanced Technology Stack  

### **Frontend Architecture**
| **Technology**     | **Version** | **Purpose**                    | **Implementation**           |
|-------------------|-------------|--------------------------------|------------------------------|
| **Next.js**       | 15.3.4      | React framework with SSR/SSG   | Pages router, API routes     |
| **TypeScript**    | Latest      | Type-safe development          | Full type coverage           |
| **Tailwind CSS**  | 3.x         | Utility-first styling          | Custom component library     |
| **Shadcn/UI**     | Latest      | Modern component system        | Accessible, customizable UI  |

### **Backend & Database**
| **Service**        | **Purpose**                    | **Features Used**            |
|-------------------|--------------------------------|------------------------------|
| **Firebase Auth** | User authentication            | Email/password, phone verify |
| **Firestore**    | NoSQL database                 | Real-time updates, queries   |
| **Firebase Storage** | File uploads                | Image hosting, optimization  |
| **Cloud Functions** | Serverless backend           | Email notifications, triggers |

### **Development & Deployment**
| **Tool**          | **Purpose**                    | **Configuration**            |
|-------------------|--------------------------------|------------------------------|
| **Vercel**        | Production hosting             | Auto-deployment, edge network |
| **ESLint**        | Code quality                   | Custom rules, TypeScript     |
| **Prettier**      | Code formatting                | Consistent style enforcement |
| **Git**           | Version control                | Feature branching, CI/CD     |

---

## 📁 Complete Application Structure

### **Core Pages & Functionality**

#### 🏠 **Main Navigation Pages**
- **`/` (Home)**: Landing page with hero section, features showcase, and call-to-action
- **`/Tools`**: Browse and search available tools for rent
- **`/Tasks`**: Discover and book available gig services
- **`/About`**: Company information, mission, and team details
- **`/Profile`**: User dashboard with complete profile management

#### 🔐 **Authentication System**
- **`/SignIn`**: Secure user login with Firebase authentication
- **`/SignUp`**: User registration with phone number verification
- **`/PrivacyPolicy`**: GDPR-compliant privacy policy
- **`/TermsAndConditions`**: Comprehensive terms of service

#### � **Creation & Management**
- **`/CreateTool`**: List new tools for rent (with phone number requirement)
- **`/CreateTask`**: Post new gig services (with phone number requirement)
- **`/Profile`**: Enhanced profile management with edit capabilities

#### 📱 **Detail Pages**
- **`/tools/[id]`**: Individual tool detail pages with contact revelation
- **`/tasks/[id]`**: Individual task detail pages with contact revelation
- **`/admin`**: Administrative dashboard for platform management

#### 🎯 **Special Features**
- **`/Ads`**: Advertisement showcase and management
- **`/AdShowcase`**: Premium ad display system
- **Phone Number Integration**: Mandatory phone verification across all forms
- **Contact Revelation**: Secure phone number sharing system
- **Save System**: Golden save button with user preference tracking

---

## 🚀 Enhanced Setup & Installation

### **Prerequisites**
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Firebase Account**: For backend services
- **Git**: For version control

### **Quick Start Guide**  

1. **Clone & Setup**:  
   ```bash
   git clone https://github.com/SeneshFitzroy/ToolnTask.git
   cd ToolnTask
   npm install
   ```

2. **Environment Configuration**:  
   Create `.env.local` with your Firebase configuration:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Optional: Email Service Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_key
   ```

3. **Firebase Setup**:  
   - Visit [Firebase Console](https://console.firebase.google.com)
   - Create a new project or select existing one
   - Enable Authentication (Email/Password, Phone)
   - Create Firestore database
   - Configure Storage bucket
   - Copy configuration to `.env.local`

4. **Development Server**:  
   ```bash
   npm run dev
   ```
   🌐 Access your application at [http://localhost:3000](http://localhost:3000)

5. **Production Build**:  
   ```bash
   npm run build
   npm start
   ```

### **Advanced Development Commands**
```bash
# Code Quality
npm run lint          # Run ESLint checks
npm run lint:fix       # Auto-fix linting issues
npm run type-check     # TypeScript type checking

# Database Management
npm run db:seed        # Seed database with sample data
npm run db:backup      # Backup Firestore data
npm run db:restore     # Restore from backup

# Deployment
npm run deploy         # Deploy to Vercel
npm run build:analyze  # Analyze bundle size
```

---

## 🎯 Key Features Implementation

### **Enhanced Profile System**
- ✅ **Complete Edit Functionality**: Users can edit all profile information
- ✅ **Golden Save Button**: Visual feedback with gradient styling when items are saved
- ✅ **Phone Number Integration**: Mandatory phone fields in all creation forms
- ✅ **Contact Revelation**: Secure phone number sharing between users

### **Advanced Form System**
- ✅ **CreateTool Form**: Tool listing with phone number, district selection, image upload
- ✅ **CreateTask Form**: Service posting with phone number, category selection, pricing
- ✅ **Request Forms**: RequestTool and RequestTask with complete validation
- ✅ **Profile Edit Modal**: In-place editing with real-time Firebase updates

### **Smart Discovery & Interaction**
- ✅ **Search & Filter**: Advanced filtering by category, location, price range
- ✅ **Save System**: Users can save favorite tools and tasks for later
- ✅ **Contact System**: Secure contact exchange with Firebase tracking
- ✅ **Real-time Updates**: Live data synchronization across all components

### **Security & Verification**
- ✅ **Phone Verification**: Mandatory phone number for all new listings
- ✅ **User Authentication**: Secure Firebase Auth integration
- ✅ **Data Validation**: Comprehensive form validation and sanitization
- ✅ **Privacy Controls**: User-controlled contact information sharing

---

## 📊 Database Schema & Architecture

### **Firestore Collections**

#### **Users Collection** (`/users/{userId}`)
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;        // NEW: Mandatory field
  photoURL?: string;
  district: string;           // Sri Lankan district
  createdAt: Timestamp;
  lastLogin: Timestamp;
  verified: boolean;
  rating: number;
  reviewCount: number;
}
```

#### **Tools Collection** (`/tools/{toolId}`)
```typescript
{
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  priceType: 'hourly' | 'daily' | 'weekly';
  district: string;
  phoneNumber: string;        // NEW: Contact information
  imageUrls: string[];
  ownerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  available: boolean;
  rating: number;
  viewCount: number;
}
```

#### **Tasks Collection** (`/tasks/{taskId}`)
```typescript
{
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  district: string;
  phoneNumber: string;        // NEW: Contact information
  imageUrls: string[];
  creatorId: string;
  createdAt: Timestamp;
  deadline?: Timestamp;
  status: 'open' | 'in_progress' | 'completed';
  applicantCount: number;
}
```

#### **SavedGigs Collection** (`/savedGigs/{userId}`)
```typescript
{
  userId: string;
  gigId: string;
  gigType: 'tool' | 'task';
  savedAt: Timestamp;
}
```

#### **ContactRequests Collection** (`/contactRequests/{requestId}`)
```typescript
{
  requesterId: string;
  targetId: string;
  gigId: string;
  gigType: 'tool' | 'task';
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Timestamp;
  message?: string;
}
```

---

## 🔧 Component Architecture

### **Reusable Components** (`/src/components/`)
- **`UniversalCard.tsx`**: Enhanced card component with golden save functionality
- **`Navigation.tsx`**: Responsive navigation with authentication state
- **`TaskCard.tsx` & `ToolCard.tsx`**: Specialized cards for different content types
- **`ChatAgent.tsx`**: AI-powered chat assistance
- **`FilterButtons.tsx`**: Advanced filtering interface
- **`AdShowcase.tsx`**: Advertisement display system

### **UI Components** (`/src/components/ui/`)
- Complete Shadcn/UI component library
- Custom-styled components with Tailwind CSS
- Accessible, responsive design patterns
- Dark mode support throughout

### **Page Components** (`/pages/`)
- Server-side rendering optimization
- TypeScript integration
- Firebase real-time data binding
- SEO-optimized meta tags

---

## 🚀 Deployment & Production

### **Vercel Configuration**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_FIREBASE_API_KEY": "@firebase_api_key",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN": "@firebase_auth_domain",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID": "@firebase_project_id"
  }
}
```

### **Performance Optimizations**
- ✅ **Image Optimization**: Next.js automatic image optimization
- ✅ **Code Splitting**: Automatic route-based code splitting
- ✅ **Caching Strategy**: Optimal caching headers and service worker
- ✅ **Bundle Analysis**: Regular bundle size monitoring
- ✅ **Core Web Vitals**: Optimized for Google's performance metrics

### **Security Measures**
- ✅ **HTTPS Enforcement**: Automatic SSL certificate management
- ✅ **Environment Variables**: Secure configuration management
- ✅ **CORS Configuration**: Proper cross-origin resource sharing
- ✅ **Content Security Policy**: XSS and injection attack prevention
- ✅ **Rate Limiting**: API abuse prevention

---

## 📈 Analytics & Monitoring

### **Performance Tracking**
- Google Analytics 4 integration
- Real-time user behavior analysis
- Conversion funnel optimization
- A/B testing framework ready

### **Error Monitoring**
- Sentry integration for error tracking
- Real-time error alerts
- Performance bottleneck identification
- User experience monitoring

---

## 🤝 Advanced Contribution Guide  
Be a pioneer in Sri Lanka’s sharing economy!  

<details open>  
<summary>👉 Contribution Blueprint</summary>  

1. **Fork the Repo** 🍴  
2. **Create a Branch**:  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit Your Magic**:  
   ```bash
   git commit -m "Add YourFeature"
   ```
4. **Push Changes**:  
   ```bash
   git push origin feature/YourFeature
   ```
5. **Submit PR** 🚀  

</details>  

📜 Adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) and wield ESLint/Prettier for code excellence.  

> **Milestone Tracker**:  
> - ![MVP Progress](https://img.shields.io/badge/MVP-75%25-green)  
> - ![Community Growth](https://img.shields.io/badge/Users-500%2B-blue)  
> - ![Last Updated](https://img.shields.io/badge/Last%20Updated-June%2022,%202025-lightgrey)  

---

## 📜 Legal Note  
Licensed under the [MIT License](LICENSE) – Open for all to use, share, and innovate! 🗽  

---

## 📬 Connect with Us  
- **Senesh Fitzroy**: [dsfmendis@students.nsbm.ac.lk](mailto:dsfmendis@students.nsbm.ac.lk)  
- **Mandira De Silva**: [dumdsilva@students.nsbm.ac.lk](mailto:dumdsilva@students.nsbm.ac.lk)  

📲 Stay tuned: [Facebook](https://facebook.com) | [Instagram](https://instagram.com) *(Links forthcoming)*  

---

## 🏆 Why Back ToolnTask?  
- **Transform Lives**: Enable Sri Lankans to earn and save with purpose.  
- **Innovate Locally**: A one-of-a-kind marketplace for rentals and gigs.  
- **Forge Community**: Cultivate trust and collaboration at every step.  

**Together, let’s ignite a prosperous Sri Lanka! 🇱🇰💪**  

---

## 🔧 Advanced Insights  
- **Build Status**: [Check CI](https://github.com/SeneshFitzroy/ToolnTask/actions) *(Setup pending)*  
- **Version**: v0.1.0-alpha *(Track releases here)*  
- **Contrib Stats**: [View Contributors](https://github.com/SeneshFitzroy/ToolnTask/graphs/contributors)  

---

[![Next.js](https://img.shields.io/badge/Powered%20by-Next.js-000000)](https://nextjs.org)  
[![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)](https://firebase.google.com)  
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)  
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-green)](https://opensource.org/licenses/MIT)  

