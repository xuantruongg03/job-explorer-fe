<div align="center">

# Job Explorer

### *Advanced Job Market Intelligence & Skills Analytics Platform*

A sophisticated web application providing comprehensive analysis of Vietnam's and the world's job market landscape, skill demand insights, and career opportunity discovery through interactive data visualizations and real-time analytics.

[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Bun](https://img.shields.io/badge/Bun-Runtime-f9f1e1?style=for-the-badge&logo=bun)](https://bun.sh/)

---

</div>

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 📊 **Smart Analytics Dashboard**
- Job market statistics for Vietnam and the world
- Skill demand analysis with interactive charts
- Interactive pie charts and data visualizations
- Global vs Vietnam market comparisons
- Trend analysis with historical data

### 🎯 **Intelligent Job Search**
- Advanced search with multiple filters
- Location-based job discovery
- Industry and skill-based filtering
- Detailed job requirement analysis

</td>
<td width="50%">

### 🧠 **Skills Intelligence Engine**
- Top 15 most in-demand skills analysis
- Skill frequency and market share metrics
- Interactive skill demand pie charts
- Country-specific skill requirements

### 📈 **Market Insights**
- Job posting frequency analysis
- Skill trend predictions
- Career opportunity mapping
- Competitive market analysis

</td>
</tr>
</table>

## 🌐 Application Pages

| Page | Route | Description | Key Features |
|------|-------|-------------|--------------|
| **🏠 Home** | `/` | Landing page with market overview | Hero section, featured statistics, quick navigation |
| **📊 Analytics** | `/analytics` | Comprehensive market dashboard | Job trends charts, skills analysis, global comparisons |
| **💼 Find Jobs** | `/find-jobs` | Job search and discovery | Advanced filters, job listings, detailed descriptions |
| **🔍 Search Skills** | `/search-skills` | Skills demand analysis | Skill search, pie charts, market statistics |
| **ℹ️ About** | `/about` | Project information | Mission, team, technology overview |
| **📞 Contact** | `/contact` | Contact information | Team contacts, support channels |

## 🚀 Quick Start

### Prerequisites

- **Bun** 1.0+ (recommended) or **Node.js** 21+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git for version control

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/xuantruongg003/job-explorer-fe.git

# Navigate to project directory
cd job-explorer-fe

# Install dependencies (using Bun - recommended)
bun install

# Or using npm
npm install

# Start development server
bun run dev
# Or using npm
npm run dev

# Open browser and navigate to http://localhost:5173
```

### 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `bun run dev` | Start Vite development server with hot reload |
| **Build** | `bun run build` | Create production build |
| **Build (Dev)** | `bun run build:dev` | Create development build |
| **Preview** | `bun run preview` | Preview production build locally |
| **Lint** | `bun run lint` | Run ESLint for code quality checks |

## 🛠️ Technology Stack

<div align="center">

### Core Framework
![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)
![Bun](https://img.shields.io/badge/Bun-Runtime-f9f1e1?style=flat-square&logo=bun)

### UI & Styling
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06b6d4?style=flat-square&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?style=flat-square)
![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-8b5cf6?style=flat-square)
![Lucide React](https://img.shields.io/badge/Lucide_Icons-0.462-f56565?style=flat-square)

### Data Management & Charts
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.56-ff4154?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-1.9-5a29e4?style=flat-square&logo=axios)
![Recharts](https://img.shields.io/badge/Recharts-2.12-22d3ee?style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-6.26-ca4245?style=flat-square&logo=reactrouter)

### Development Tools
![ESLint](https://img.shields.io/badge/ESLint-9.9-4b32c3?style=flat-square&logo=eslint)
![PostCSS](https://img.shields.io/badge/PostCSS-8.4-dd3a0a?style=flat-square&logo=postcss)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.53-ec5990?style=flat-square)

</div>

## � Project Architecture

```
job-explorer-fe/
├── 📱 src/
│   ├── 🧩 components/
│   │   ├── features/              # Feature-specific components
│   │   │   ├── JobMatch.tsx       # Job matching functionality
│   │   │   └── RecommendSkills.tsx # Skill recommendations
│   │   ├── layouts/               # Layout & page components  
│   │   │   ├── EmptyState.tsx     # Empty state handler
│   │   │   ├── Footer.tsx         # Application footer
│   │   │   ├── GlobalJobsChart.tsx # Global job statistics
│   │   │   ├── GlobalSkillsChart.tsx # Global skills analysis
│   │   │   ├── Layout.tsx         # Main layout wrapper
│   │   │   ├── Loading.tsx        # Loading states
│   │   │   ├── Nav.tsx           # Navigation component
│   │   │   ├── SkillsByCountry.tsx # Country-specific skills
│   │   │   ├── VietNamJobsChart.tsx # Vietnam job data
│   │   │   └── VietnamSkillsChart.tsx # Vietnam skills data
│   │   └── ui/                    # shadcn/ui components (40+ components)
│   │       ├── button.tsx         # Button component
│   │       ├── card.tsx          # Card component
│   │       ├── chart.tsx         # Chart components
│   │       ├── input.tsx         # Input component
│   │       ├── select.tsx        # Select component
│   │       └── ... (and many more)
│   ├── 📄 pages/                  # Application pages
│   │   ├── About.tsx             # About page
│   │   ├── Analytics.tsx         # Analytics dashboard
│   │   ├── Contact.tsx           # Contact page
│   │   ├── FindJobs.tsx          # Job search page
│   │   ├── Home.tsx             # Landing page
│   │   ├── NotFound.tsx         # 404 error page
│   │   └── SearchSkills.tsx     # Skills analysis page
│   ├── 🪝 hooks/                  # Custom React hooks
│   │   ├── use-debounce.ts       # Debounce hook
│   │   ├── use-intersection-observer.ts # Intersection observer
│   │   ├── use-job-data.ts       # Job data management
│   │   ├── use-mobile.tsx        # Mobile detection
│   │   └── use-toast.ts          # Toast notifications
│   ├── 🌐 services/               # API integration
│   │   └── analyze.ts            # Analytics API service
│   ├── 🌐 apis/                   # API client setup
│   │   └── client.ts             # HTTP client configuration
│   ├── 📋 interfaces/             # TypeScript definitions
│   │   └── job.ts                # Job-related types
│   ├── 🔧 lib/                    # Utilities & constants
│   │   ├── constant.ts           # App constants
│   │   └── utils.ts              # Utility functions
│   └── 🎨 assets/                 # Static assets
│       └── videos/
│           └── banner.mp4        # Video assets
├── 🎨 public/                     # Public static files
│   ├── favicon.ico               # App favicon
│   ├── placeholder.svg           # Placeholder images
│   └── robots.txt               # SEO robots file
└── ⚙️ Configuration Files
    ├── components.json           # shadcn/ui config
    ├── eslint.config.js         # ESLint configuration
    ├── postcss.config.js        # PostCSS config
    ├── tailwind.config.ts       # Tailwind CSS config
    ├── tsconfig.json            # TypeScript config
    ├── tsconfig.app.json        # App-specific TS config
    ├── tsconfig.node.json       # Node-specific TS config
    └── vite.config.ts           # Vite build config
```

## 🎨 UI Components Library

This project utilizes **shadcn/ui** components built on top of **Radix UI** primitives, providing:

- **40+ Pre-built Components**: Buttons, Cards, Charts, Forms, Navigation, and more
- **Fully Accessible**: ARIA-compliant components following accessibility best practices  
- **Customizable**: Tailwind CSS styling with theme support
- **Type-safe**: Full TypeScript support with proper type definitions
- **Modern Design**: Beautiful, consistent design system

### Key Component Categories
- **🎛️ Form Controls**: Input, Select, Checkbox, Radio, Switch, Slider
- **📊 Data Display**: Card, Table, Badge, Avatar, Progress, Charts
- **🧭 Navigation**: Tabs, Breadcrumb, Pagination, Command Menu
- **💬 Feedback**: Toast, Alert, Dialog, Popover, Tooltip
- **📱 Layout**: Separator, Accordion, Collapsible, Resizable Panels

## 🔧 Development Features

### Code Quality & Standards
- **ESLint**: Advanced linting with React-specific rules
- **TypeScript**: Strict type checking for better code reliability
- **Prettier Integration**: Consistent code formatting
- **Path Aliases**: Clean imports using `@/` prefix

### Performance Optimizations  
- **Vite**: Lightning-fast build tool with HMR
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Eliminate unused code in production
- **Asset Optimization**: Automatic image and asset optimization

### Development Tools
- **Hot Reload**: Instant updates during development
- **TypeScript Intellisense**: Full IDE support
- **Component Dev Tools**: React Developer Tools compatibility
- **Debug Support**: Source maps for easy debugging

### Environment Variables
Create `.env` file in project root:
```env
VITE_SERVER_URL=your_api_endpoint
```

