#!/bin/bash
echo "Building and deploying the portfolio site..."

# Navigate to the project directory
cd /workspace/zulqarnain-portfolio

# Install dependencies if needed
echo "Checking dependencies..."
pnpm install

# Build the project
echo "Building the project..."
pnpm build

# Copy the dist directory
echo "Preparing for deployment..."
cp -r dist/* /workspace/dist/

# Deploy
echo "Deploying to web server..."
cd /workspace
deploy

echo "Deployment complete!"