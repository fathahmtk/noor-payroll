#!/bin/bash

# Noor Payroll Deployment Script
echo "🚀 Noor Payroll Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Set up git configuration if needed
echo "📋 Checking git configuration..."
git config --global user.email "noordigital@example.com" 2>/dev/null || true
git config --global user.name "Noor Digital" 2>/dev/null || true

# Set environment variables
echo "🔧 Setting up environment variables..."
export EDGE_CONFIG_URL="https://edge-config.vercel.com/ecfg_ksa2e2e2wqi5llggsvrgrndmgom"
export EDGE_CONFIG_TOKEN="a3e771c9-e871-47c5-b7b4-6b72c8cc2ceb"
export NEXTAUTH_URL="https://your-app.vercel.app"
export NEXTAUTH_SECRET="your-nextauth-secret-here"
export NODE_ENV="production"

echo "✅ Environment variables set"

# Deployment options
echo ""
echo "📋 Deployment Options:"
echo "1. Vercel Deployment (Recommended)"
echo "2. Railway Deployment"
echo "3. GitHub Pages (Static Only)"
echo "4. Exit"
echo ""
read -p "Choose deployment option (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        echo "💡 Removing old Vercel configuration..."
        rm -rf .vercel 2>/dev/null || true
        
        echo "📦 Deploying to Vercel..."
        npx vercel --yes
        
        echo "✅ Vercel deployment complete!"
        echo "📝 Don't forget to set environment variables in Vercel dashboard:"
        echo "   EDGE_CONFIG_URL=$EDGE_CONFIG_URL"
        echo "   EDGE_CONFIG_TOKEN=$EDGE_CONFIG_TOKEN"
        echo "   NEXTAUTH_SECRET=generate-a-secure-secret"
        echo "   NEXTAUTH_URL=https://your-app.vercel.app"
        ;;
    2)
        echo "🚀 Deploying to Railway..."
        echo "💡 Installing Railway CLI..."
        npx @railway/cli --version 2>/dev/null || npx @railway/cli --help
        
        echo "📦 Logging in to Railway..."
        npx @railway/cli login
        
        echo "📦 Deploying to Railway..."
        npx @railway/cli up
        
        echo "✅ Railway deployment complete!"
        echo "📝 Don't forget to set environment variables in Railway dashboard"
        ;;
    3)
        echo "🚀 Setting up GitHub Pages deployment..."
        echo "💡 Installing gh-pages..."
        npm install gh-pages --save-dev
        
        echo "📦 Creating static build..."
        npm run build
        
        echo "✅ GitHub Pages setup complete!"
        echo "📝 Note: GitHub Pages is for static content only. Database features won't work."
        ;;
    4)
        echo "👋 Exiting deployment script."
        exit 0
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-4."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo "⚠️  Don't forget to set up environment variables in your deployment platform!"