#!/bin/bash

# Zulqarnain Portfolio Deployment Script
# Run this script to deploy your portfolio to Vercel

echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial portfolio deployment"
fi

# Prompt for repository URL
echo "Please enter your GitHub repository URL (or press Enter to skip):"
read repo_url

if [ ! -z "$repo_url" ]; then
    git remote add origin "$repo_url"
    echo "🔗 Added remote repository"
    
    echo "📤 Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    echo "✅ Pushed to GitHub successfully!"
    echo ""
    echo "🌐 Now deploy on Vercel:"
    echo "   1. Go to https://vercel.com/dashboard"
    echo "   2. Click 'Add New Project'"
    echo "   3. Import your GitHub repository"
    echo "   4. Click 'Deploy'"
    echo ""
    echo "🎉 Your portfolio will be live in a few minutes!"
else
    echo "📤 To deploy, push to GitHub first:"
    echo "   git add ."
    echo "   git commit -m 'Portfolio ready'"
    echo "   git remote add origin YOUR_GITHUB_REPO_URL"
    echo "   git push -u origin main"
    echo ""
    echo "🌐 Then deploy on Vercel:"
    echo "   1. Go to https://vercel.com/dashboard"
    echo "   2. Click 'Add New Project'"
    echo "   3. Import your GitHub repository"
    echo "   4. Click 'Deploy'"
fi

echo ""
echo "📋 After deployment, don't forget to:"
echo "   • Replace profile photo in public/assets/profile.jpg"
echo "   • Update CV at public/assets/Zulqarnain_CV.pdf"
echo "   • Update Topmate URL in components/ui/Contact.tsx"
echo "   • Update DOIs for research papers in constants/index.ts"
