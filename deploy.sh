#!/bin/bash

echo "🚀 ToolnTask Final Deployment Script"
echo "===================================="

# Step 1: Clean build
echo "Step 1: Running clean build..."
npm run build

# Step 2: Check build success
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Step 3: Deploy to Vercel
    echo "Step 2: Deploying to Vercel..."
    npx vercel --prod
    
    echo "🎉 Deployment completed!"
    echo "Your ToolnTask app should now be live!"
else
    echo "❌ Build failed. Please check errors above."
    exit 1
fi
