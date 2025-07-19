#!/bin/bash

# Modern React Website Quick Setup Script
# Based on Mercer & Loom project workflow

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Modern React Website Quick Setup${NC}"
echo -e "${BLUE}====================================${NC}"

# Get project details
read -p "Project name (lowercase, no spaces): " PROJECT_NAME
read -p "Project description: " PROJECT_DESC
read -p "GitHub username: " GITHUB_USER
read -p "Domain name (optional, press enter to skip): " DOMAIN_NAME

echo -e "\n${YELLOW}📦 Creating project structure...${NC}"

# Create Vite project
npm create vite@latest $PROJECT_NAME -- --template react-ts
cd $PROJECT_NAME

echo -e "${YELLOW}📚 Installing dependencies...${NC}"

# Install pnpm if not available
if ! command -v pnpm &> /dev/null; then
    npm install -g pnpm
fi

# Install dependencies
pnpm install
pnpm add react-router-dom react-icons
pnpm add -D tailwindcss postcss autoprefixer @types/node

# Initialize Tailwind
npx tailwindcss init -p

echo -e "${YELLOW}⚙️ Configuring Tailwind CSS...${NC}"

# Create tailwind config
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'worksans': ['Work Sans', 'sans-serif'],
      },
      colors: {
        'accent': '#9146FF', // Change this to your brand color
        'gray-850': '#1F2937',
      },
      animation: {
        'scroll-animate-header': 'fadeInUp 1.2s ease-out 0.3s both',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [],
}
EOF

# Update index.css
cat > src/index.css << 'EOF'
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap');

.scroll-animate-header {
  animation: fadeInUp 1.2s ease-out 0.3s both;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
EOF

# Create basic project structure
mkdir -p src/components src/pages

echo -e "${YELLOW}🏗️ Creating component templates...${NC}"

# Create basic App.tsx with router
cat > src/App.tsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
EOF

# Create basic Home component
cat > src/components/Home.tsx << 'EOF'
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-worksans antialiased">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Your Amazing
            <br />
            <span className="text-accent">Project Title</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Describe your project's value proposition and what makes it special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-accent/90 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-accent text-accent px-8 py-4 rounded-lg text-lg font-medium hover:bg-accent hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
EOF

# Create wrangler.toml for Cloudflare Pages
if [ ! -z "$DOMAIN_NAME" ]; then
cat > wrangler.toml << EOF
name = "$PROJECT_NAME"
compatibility_date = "2024-12-01"

[[routes]]
pattern = "$DOMAIN_NAME"
zone_name = "$DOMAIN_NAME"

[[routes]]
pattern = "www.$DOMAIN_NAME"
zone_name = "$DOMAIN_NAME"

[build]
command = "pnpm build"
cwd = "."
watch_dir = "src"

[build.upload]
format = "service-worker"
dir = "dist"
EOF
else
cat > wrangler.toml << EOF
name = "$PROJECT_NAME"
compatibility_date = "2024-12-01"

[build]
command = "pnpm build"
cwd = "."
watch_dir = "src"

[build.upload]
format = "service-worker"
dir = "dist"
EOF
fi

# Create README
cat > README.md << EOF
# $PROJECT_NAME

$PROJECT_DESC

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Cloudflare Pages

## Development

\`\`\`bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
\`\`\`

## Deployment

This project is configured for automatic deployment with Cloudflare Pages.

1. Push to GitHub
2. Connect repository in Cloudflare Pages
3. Configure build settings:
   - Build command: \`pnpm build\`
   - Build output directory: \`dist\`
   - Node.js version: 18+

## Project Structure

\`\`\`
src/
├── components/     # Reusable components
├── pages/         # Page components
├── App.tsx        # Router setup
└── index.css      # Global styles
\`\`\`
EOF

echo -e "${YELLOW}🔄 Initializing Git repository...${NC}"

# Initialize Git
git init
git add .
git commit -m "Initial commit: React website with Vite and Tailwind"

echo -e "${YELLOW}🌐 Setting up GitHub repository...${NC}"

# Create GitHub repository if gh CLI is available
if command -v gh &> /dev/null; then
    gh repo create $GITHUB_USER/$PROJECT_NAME --public --description "$PROJECT_DESC" || echo "Repository might already exist"
    git branch -M main
    git remote add origin https://github.com/$GITHUB_USER/$PROJECT_NAME.git
    git push -u origin main
else
    echo -e "${YELLOW}⚠️ GitHub CLI not found. Manual setup required:${NC}"
    echo "1. Create repository at https://github.com/new"
    echo "2. Repository name: $PROJECT_NAME"
    echo "3. Run these commands:"
    echo "   git branch -M main"
    echo "   git remote add origin https://github.com/$GITHUB_USER/$PROJECT_NAME.git"
    echo "   git push -u origin main"
fi

echo -e "\n${GREEN}✅ Project setup complete!${NC}"
echo -e "${GREEN}=========================${NC}"
echo -e "📁 Project location: $(pwd)"
echo -e "🚀 Start development: ${BLUE}pnpm dev${NC}"
echo -e "🌐 GitHub repository: ${BLUE}https://github.com/$GITHUB_USER/$PROJECT_NAME${NC}"

if [ ! -z "$DOMAIN_NAME" ]; then
    echo -e "🌍 Domain configured: ${BLUE}$DOMAIN_NAME${NC}"
fi

echo -e "\n${YELLOW}📋 Next steps:${NC}"
echo "1. Customize src/components/Home.tsx with your content"
echo "2. Update colors in tailwind.config.js"
echo "3. Add your logo and assets"
echo "4. Set up Cloudflare Pages deployment"
echo "5. Configure your domain"

echo -e "\n${BLUE}Happy coding! 🎉${NC}"
