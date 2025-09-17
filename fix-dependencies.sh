#!/bin/bash

echo "🔧 Fixing dependency conflicts..."

# Remove existing node_modules and lock files
echo "Cleaning up existing dependencies..."
rm -rf node_modules package-lock.json

# Install with legacy peer deps to handle React version conflicts
echo "Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo "🚀 Starting development server..."
    npm run dev
else
    echo "❌ Installation failed. Trying with force flag..."
    npm install --force
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed with force flag!"
        echo "🚀 Starting development server..."
        npm run dev
    else
        echo "❌ Installation failed completely. Please check the error messages above."
    fi
fi
