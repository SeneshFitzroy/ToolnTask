# ToolnTask - Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a Vercel account (sign up at vercel.com)

## Deployment Steps

### 1. Login to Vercel
```bash
vercel login
```

### 2. Deploy from project directory
```bash
cd "c:\Users\senes\OneDrive\Desktop\ToolNTask\ToolnTask"
vercel
```

### 3. Follow the prompts:
- Link to existing project? No (first time)
- Project name: toolntask (or your preferred name)
- Directory: ./ (current directory)
- Override settings? No

### 4. Production deployment
```bash
vercel --prod
```

## Environment Variables (if needed)
If you need to add environment variables in Vercel dashboard:
1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add variables like:
   - NODE_ENV: production
   - Any API keys or secrets

## Custom Domain (Optional)
1. In Vercel dashboard → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Firebase Configuration
Your Firebase config is already set up and will work in production.
No additional environment variables needed for Firebase.

## Notes
- The build passed successfully ✅
- All dependencies are compatible with Vercel ✅
- Firebase configuration is ready ✅
- Your app is ready for deployment! 🚀
