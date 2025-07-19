# Modern React Website Blueprint
## Complete Workflow: From Concept to Production

> **Project Example**: Mercer & Loom Post-Production Studio Website  
> **Stack**: React + TypeScript + Vite + Tailwind CSS + Cloudflare Pages  
> **Deployment**: Automated CI/CD with GitHub integration

---

## 📋 Table of Contents

1. [Project Setup & Dependencies](#1-project-setup--dependencies)
2. [Design System & Styling](#2-design-system--styling)
3. [Component Architecture](#3-component-architecture)
4. [Routing & Navigation](#4-routing--navigation)
5. [Animations & Interactions](#5-animations--interactions)
6. [Deployment & CI/CD](#6-deployment--cicd)
7. [Domain & SSL Setup](#7-domain--ssl-setup)
8. [Performance Optimization](#8-performance-optimization)
9. [Troubleshooting Guide](#9-troubleshooting-guide)

---

## 1. Project Setup & Dependencies

### Initial Setup
```bash
# Create Vite project with React + TypeScript
npm create vite@latest project-name -- --template react-ts
cd project-name

# Install dependencies with pnpm (recommended for speed)
npm install -g pnpm
pnpm install

# Install core dependencies
pnpm add react-router-dom react-icons

# Install dev dependencies
pnpm add -D tailwindcss postcss autoprefixer @types/node

# Initialize Tailwind CSS
npx tailwindcss init -p
```

### Package.json Structure
```json
{
  "name": "project-name",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.7.0",
    "react-icons": "^4.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.6.2",
    "vite": "^5.4.19"
  }
}
```

---

## 2. Design System & Styling

### Tailwind Configuration
```javascript
// tailwind.config.js
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
        'accent': '#9146FF', // Brand primary color
        'gray-850': '#1F2937', // Custom gray shade
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
```

### Global CSS Setup
```css
/* src/index.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap');

/* Custom animations */
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

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Remove scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
```

---

## 3. Component Architecture

### Project Structure
```
src/
├── components/
│   ├── Header.tsx           # Navigation component
│   ├── Home.tsx            # Main landing page
│   └── NotFound.tsx        # 404 page template
├── pages/
│   ├── Team.tsx            # Individual page components
│   ├── Portfolio.tsx       # (all return NotFound component)
│   ├── Work.tsx
│   └── StartProject.tsx
├── App.tsx                 # Router setup
├── index.css              # Global styles
└── main.tsx               # App entry point
```

### App.tsx - Router Setup
```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Team from './pages/Team';
import Portfolio from './pages/Portfolio';
import Work from './pages/Work';
import StartProject from './pages/StartProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/work" element={<Work />} />
        <Route path="/start-project" element={<StartProject />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Responsive Header Component
```typescript
// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      {/* Header implementation */}
    </header>
  );
};

export default Header;
```

---

## 4. Routing & Navigation

### Navigation Links Setup
```typescript
const navLinks = [
  { href: '/#philosophy', label: 'Philosophy' },
  { href: '/#services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

const pageLinks = [
  { to: '/team', label: 'Team' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/work', label: 'Work' },
  { to: '/start-project', label: 'Start Project' },
];
```

### 404 Page Template
```typescript
// src/components/NotFound.tsx
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiHome, FiArrowLeft } from 'react-icons/fi';
import Header from './Header';

interface NotFoundProps {
  pageName: string;
}

export default function NotFound({ pageName }: NotFoundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900 text-white">
      <Header />
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 content */}
        </div>
      </div>
    </div>
  );
}
```

---

## 5. Animations & Interactions

### Intersection Observer for Scroll Animations
```typescript
const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

useEffect(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleItems(prev => new Set([...prev, entry.target.id]));
      }
    });
  }, observerOptions);

  const elementsToObserve = document.querySelectorAll('[data-animate]');
  elementsToObserve.forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, []);
```

### Animation Classes
```typescript
const getAnimationClass = (id: string, delay: number = 0) => {
  return visibleItems.has(id) 
    ? `animate-scroll-animate-header` 
    : 'opacity-0 translate-y-8';
};
```

---

## 6. Deployment & CI/CD

### GitHub Repository Setup
```bash
# Initialize Git repository
git init
git add .
git commit -m "Initial commit: React website with Vite and Tailwind"

# Create GitHub repository (using GitHub CLI)
gh repo create username/project-name --public --description "Project description"
git branch -M main
git remote add origin https://github.com/username/project-name.git
git push -u origin main
```

### Cloudflare Pages Configuration
```toml
# wrangler.toml
name = "project-name"
compatibility_date = "2024-12-01"

[[routes]]
pattern = "yourdomain.com"
zone_name = "yourdomain.com"

[[routes]]
pattern = "www.yourdomain.com"
zone_name = "yourdomain.com"

[build]
command = "pnpm build"
cwd = "."
watch_dir = "src"

[build.upload]
format = "service-worker"
dir = "dist"
```

### Cloudflare Deployment Steps
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create Pages project through Cloudflare Dashboard:
# 1. Go to dash.cloudflare.com/pages
# 2. Connect to Git → Select GitHub repository
# 3. Configure build settings:
#    - Framework: Vite
#    - Build command: pnpm build
#    - Build output: dist
#    - Node.js version: 18+
```

---

## 7. Domain & SSL Setup

### DNS Configuration
```
Type: CNAME
Name: www
Content: project-name.pages.dev

Type: CNAME  
Name: @
Content: project-name.pages.dev
```

### SSL Certificate
- Automatic SSL/TLS certificate provisioning
- Force HTTPS redirect enabled
- HSTS headers configured

---

## 8. Performance Optimization

### Build Optimization
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
```

### Image Optimization
- Use WebP format when possible
- Implement lazy loading for images
- Optimize for mobile-first approach
- Use appropriate image sizes for different breakpoints

### Performance Checklist
- [x] Minimize bundle size
- [x] Use CDN (Cloudflare)
- [x] Enable compression
- [x] Optimize images
- [x] Implement caching strategies
- [x] Remove unused CSS/JS

---

## 9. Troubleshooting Guide

### Common Issues & Solutions

#### TypeScript Errors
```bash
# Fix: Remove unused props/variables
# Before: const Component = ({ unusedProp }) => {}
# After: const Component = () => {}
```

#### Build Failures
```bash
# Check for TypeScript errors
pnpm build

# Common fixes:
# 1. Remove unused imports
# 2. Fix type definitions
# 3. Update dependencies
```

#### Deployment Issues
```bash
# Check Cloudflare Pages build logs
# Common fixes:
# 1. Verify build command
# 2. Check Node.js version
# 3. Ensure dependencies are in package.json
```

#### Routing Problems
```bash
# Add _redirects file for SPA routing
echo "/*    /index.html   200" > public/_redirects
```

---

## 🚀 Quick Start Checklist

### Phase 1: Setup (30 minutes)
- [ ] Create Vite + React + TypeScript project
- [ ] Install dependencies (Tailwind, React Router, Icons)
- [ ] Configure Tailwind with custom colors/fonts
- [ ] Set up basic project structure

### Phase 2: Development (2-4 hours)
- [ ] Create Header component with responsive navigation
- [ ] Build Home page with sections (Hero, About, Services, Contact)
- [ ] Implement routing with 404 pages
- [ ] Add scroll animations and interactions
- [ ] Style with Tailwind CSS

### Phase 3: Deployment (30 minutes)
- [ ] Initialize Git repository
- [ ] Push to GitHub
- [ ] Set up Cloudflare Pages
- [ ] Configure domain and SSL
- [ ] Test automatic deployments

### Phase 4: Optimization (1-2 hours)
- [ ] Optimize images and assets
- [ ] Test performance and accessibility
- [ ] Add meta tags for SEO
- [ ] Test on different devices

---

## 📚 Technology Stack Summary

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 18 + TypeScript | Component-based UI with type safety |
| **Build Tool** | Vite 5.4+ | Fast development and production builds |
| **Styling** | Tailwind CSS 3.4+ | Utility-first CSS framework |
| **Routing** | React Router DOM 7+ | Client-side routing |
| **Icons** | React Icons (Feather) | Consistent icon system |
| **Package Manager** | pnpm | Fast, efficient package management |
| **Hosting** | Cloudflare Pages | Global CDN with automatic deployments |
| **Version Control** | Git + GitHub | Source code management |
| **CI/CD** | GitHub → Cloudflare | Automatic build and deploy |

---

## 💡 Best Practices

### Code Organization
- Use TypeScript for type safety
- Implement proper component composition
- Maintain consistent naming conventions
- Keep components focused and reusable

### Performance
- Minimize bundle size with proper imports
- Use lazy loading for non-critical components
- Optimize images and assets
- Implement proper caching strategies

### Accessibility
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

### SEO
- Add proper meta tags
- Use semantic HTML structure
- Implement Open Graph tags
- Create sitemap.xml

---

**Total Development Time**: 4-6 hours for a complete professional website  
**Maintenance**: Automated with CI/CD pipeline  
**Scalability**: Easy to extend with additional pages and features

This blueprint provides a solid foundation for creating modern, professional websites with automated deployment workflows.
