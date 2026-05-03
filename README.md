<p align="center">
  <img src="https://img.shields.io/badge/React-18%20%2B%20Vite-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React Vite" />
  <img src="https://img.shields.io/badge/TypeScript-5.2-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/D3%20Maps-Geography-f59e0b?style=for-the-badge&logo=d3dotjs&logoColor=white" alt="D3 Maps" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<h1 align="center">
  🗺️ Rozgar Radar — Skill Salary Map
</h1>

<p align="center">
  <strong>Interactive Job Market Intelligence for Indian Districts</strong><br/>
  Explore salary trends, skill demand, and career opportunities across India.<br/>
  Resume analyzer, AI career chatbot, and salary insights all in one platform.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-10b981?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Platform-Web%20App-6366f1?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/Coverage-All%20Indian%20Districts-dc2626?style=flat-square" alt="Coverage" />
  <img src="https://img.shields.io/badge/Version-1.0.0-8b5cf6?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/License-Competition%20Use-a855f7?style=flat-square" alt="License" />
</p>

<p align="center">
  <a href="#-features">✨ Features</a> •
  <a href="#-how-it-works">⚙️ How It Works</a> •
  <a href="#-quick-start">🚀 Quick Start</a> •
  <a href="#-deployment">🌐 Deployment</a> •
  <a href="#-tech-stack">🛠️ Tech Stack</a> •
  <a href="#-future-scope">🔮 Future Scope</a>
</p>

<br/>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Components Guide](#-components-guide)
- [Data Structure](#-data-structure)
- [Feature Details](#-feature-details)
- [Design System](#-design-system)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Future Scope](#-future-scope)
- [Useful Git Commands](#-useful-git-commands)
- [Unique Selling Point](#-unique-selling-point)
- [Team](#-team)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 📌 Overview

**Rozgar Radar** is an interactive data visualization and career guidance platform that helps Indian students and professionals explore job market opportunities, salary trends, and skill demand across districts.

The platform combines:

- **Geographic Intelligence** — Interactive India map with district-wise job data
- **Resume Analysis** — AI-powered ATS scoring and job matching
- **Career Guidance** — EFOS Saathi chatbot for personalized suggestions
- **Market Analytics** — Salary trends, demand growth, and skill insights
- **Real-time Filtering** — Filter by industry, skill, and location

Rozgar Radar helps students make informed career decisions and understand where their skills are most in demand across India.

---

## ❗ Problem Statement

Indian students face significant challenges in career planning:

- **Information Gap** — Limited access to real salary and demand data by location
- **Geographic Confusion** — Don't know which districts/states offer best opportunities
- **Skill Mismatch** — Unclear which skills are in demand in which locations
- **Resume Uncertainty** — Can't assess if resume is job-ready
- **Career Clarity** — No guidance on career paths aligned with local market demand

Students often make career decisions based on:

- Guesswork
- Incomplete information
- Peer pressure
- Lack of location-specific insights

---

## ✅ Solution

**Rozgar Radar** makes job market data visible, searchable, and actionable.

Students can:

1. **Explore the Interactive Map** — Click any district to see salary and demand data
2. **Upload Their Resume** — Get instant ATS score and skill analysis
3. **Find Best Locations** — Discover where their skills are most valued
4. **Ask Career Questions** — Chat with EFOS Saathi for personalized guidance
5. **View Analytics** — Understand salary trends and skill demand patterns

The platform transforms raw job market data into career clarity.

---

## ✨ Features

<table>
  <tr>
    <td width="50%">

### 🗺️ Interactive India Map

Click any district to view:
- Salary ranges
- Job demand
- Top skills
- Demand growth trends
- Company presence

### 📄 Resume Analyzer

Upload resume and get:
- ATS score (0-100)
- Skill detection
- Formatting assessment
- Keyword analysis
- District match recommendations

  </td>
  <td width="50%">

### 💬 AI Career Chatbot

EFOS Saathi provides:
- Career path suggestions
- Skill development roadmaps
- Industry insights
- Job market trends
- Counselor handoff option

### 📊 Advanced Analytics

Interactive charts showing:
- Salary trends by district
- Skill demand patterns
- Demand growth metrics
- Industry filters
- Real-time data updates

  </td>
  </tr>
</table>

<details>
<summary><strong>🔍 View All Features</strong></summary>
<br/>

| Category | Feature | Details |
|:--|:--|:--|
| Visualization | Interactive Map | Click districts for detailed insights |
| Visualization | Real-time Filtering | Filter by industry and skill |
| Visualization | Analytics Charts | Salary trends and demand graphs |
| Resume | ATS Score | Instant job-readiness score |
| Resume | Skill Detection | Automatic skill extraction |
| Resume | District Matching | Find best locations for skills |
| Resume | Recommendations | Targeted improvement suggestions |
| Career | AI Chatbot | EFOS Saathi career guidance |
| Career | Career Paths | Skill roadmaps and next steps |
| Career | Industry Insights | Market demand by sector |
| Career | Counselor Support | Connect to EFOS counselors |
| Design | Responsive Layout | Desktop, tablet, mobile support |
| Design | Glassmorphic UI | Modern aesthetic with animations |
| Performance | Lazy Loading | Components load on demand |
| Performance | Fast Rendering | Vite + React optimization |
| Data | Real-time Updates | Live data filtering |
| Data | State Management | Context API + hooks |

</details>

---

## ⚙️ How It Works

### Map Exploration Flow

```text
User opens Rozgar Radar
        ↓
Interactive India map loads
        ↓
User clicks a district
        ↓
District data panel shows:
  - Salary range
  - Job demand
  - Top skills
  - Companies
  - Demand growth
        ↓
User can filter by industry
        ↓
Analytics charts update
```

### Resume Analysis Flow

```text
User uploads/pastes resume
        ↓
Resume is parsed
        ↓
Skills are extracted
        ↓
ATS scoring:
  - Formatting check (0-25 pts)
  - Keywords analysis (0-25 pts)
  - Structure check (0-25 pts)
  - Experience relevance (0-25 pts)
        ↓
Career matching:
  - Compare with district data
  - Find best locations
  - Calculate match score
        ↓
Display results & recommendations
```

### Career Guidance Flow

```text
User asks career question
        ↓
EFOS Saathi processes query
        ↓
AI generates career guidance
        ↓
Relevant district suggestions
        ↓
Salary and demand insights
        ↓
Skill roadmap recommendations
        ↓
Option to connect with counselor
```

---

## 🏗️ Architecture

```text
Rozgar Radar/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── IndiaMap.tsx        ← D3 + TopoJSON map visualization
│   │   ├── DataPanel.tsx       ← District info display
│   │   ├── ChartsPanel.tsx     ← Recharts analytics
│   │   ├── ChatBot.tsx         ← EFOS Saathi integration
│   │   ├── ResumeAnalyzer.tsx  ← Resume parsing & ATS scoring
│   │   ├── Filters.tsx         ← Industry & skill filters
│   │   └── * .tsx              ← Other components
│   │
│   ├── context/
│   │   └── FilterContext.tsx   ← Global filter state
│   │
│   ├── data/
│   │   ├── stateData.ts        ← District master data
│   │   ├── mockData.ts         ← Data structures & types
│   │   ├── parseRozgar.ts      ← Data parsing utilities
│   │   └── rozgar_radar_data.txt ← Raw source data
│   │
│   ├── __tests__/
│   │   └── App.test.tsx        ← Component tests
│   │
│   ├── App.tsx                 ← Main app component
│   ├── main.tsx                ← React entry point
│   ├── styles.css              ← Global styles
│   └── index.html              ← HTML template
│
├── vite.config.ts              ← Vite build config
├── tailwind.config.cjs         ← Tailwind CSS config
├── tsconfig.json               ← TypeScript config
├── package.json                ← Dependencies
├── vercel.json                 ← Vercel deployment
└── README.md                   ← Documentation
```

### Component Dependency Graph

```text
App.tsx
  ├── IndiaMap.tsx (D3 visualization)
  │   └── District click handler
  │
  ├── DataPanel.tsx
  │   └── Selected district data
  │
  ├── ChartsPanel.tsx (Recharts)
  │   └── Salary & demand graphs
  │
  ├── ChatBot.tsx
  │   └── Career guidance
  │
  ├── ResumeAnalyzer.tsx
  │   ├── ATS scoring
  │   └── Job matching
  │
  ├── Filters.tsx
  │   └── Industry filtering
  │
  └── FilterContext (state management)
      └── Global filters & selections
```

---

## 🧰 Tech Stack

| Layer | Technology | Purpose |
|:--|:--|:--|
| **Frontend** | React 18 + TypeScript | Component-based UI |
| **Build** | Vite | Fast development & build |
| **Styling** | Tailwind CSS | Utility-first design |
| **Maps** | D3.js + TopoJSON | Geographic visualization |
| **Charts** | Recharts | Interactive data charts |
| **Animations** | GSAP | Smooth interactions |
| **AI** | Chatbot API | Career guidance |
| **State** | React Context | Global state management |
| **Testing** | Vitest + React Testing Library | Unit & integration tests |
| **Deployment** | Vercel | Production hosting |

---

## 📁 Project Structure

```
New folder/
├── public/
├── src/
│   ├── components/
│   │   ├── ChartsPanel.tsx
│   │   ├── ChatBot.tsx
│   │   ├── DataPanel.tsx
│   │   ├── Filters.tsx
│   │   ├── IndiaMap.tsx
│   │   └── ResumeAnalyzer.tsx
│   ├── context/
│   │   └── FilterContext.tsx
│   ├── data/
│   │   ├── ai-jobs-market-2025-2026-metadata.json
│   │   ├── mockData.ts
│   │   ├── parseRozgar.ts
│   │   ├── rozgar_radar_data.txt
│   │   └── stateData.ts
│   ├── __tests__/
│   │   └── App.test.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── postcss.config.cjs
├── README_DEPLOYMENT.md
├── README.md (this file)
├── tailwind.config.cjs
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Git

### Installation Steps

1. **Clone the Repository**

```bash
git clone <repository-url>
cd "New folder"
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm run dev
```

4. **Open in Browser**

```text
http://localhost:5173
```

---

## 📦 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests with Vitest
npm test
```

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**

```bash
git push -u origin main
```

2. **Connect to Vercel**

```text
Go to vercel.com → Import Project → Select GitHub repo
```

3. **Vercel Auto-Configuration**

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. **Deploy**

```text
Click "Deploy"
```

### Environment Variables

If needed, add to Vercel Project Settings:

```text
Go to: Settings → Environment Variables
```

### Manual Build

```bash
npm run build
# Output files in ./dist
```

---

## 🧩 Components Guide

### IndiaMap.tsx

Interactive D3.js map showing all Indian districts.

```typescript
<IndiaMap 
  data={filtered}
  onSelect={setSelected}
  selected={selected?.district || null}
/>
```

**Features:**
- Click districts for details
- Color-coded by demand
- Responsive on mobile
- Smooth interactions

### DataPanel.tsx

Shows selected district information.

**Displays:**
- District name
- Salary range
- Job demand
- Top skills
- Companies
- Demand growth

### ChartsPanel.tsx

Analytics using Recharts.

**Charts:**
- Salary trends
- Demand growth
- Industry breakdown
- Skill distribution

### ResumeAnalyzer.tsx

Resume parsing and ATS scoring.

**Features:**
- Paste resume text
- Extract skills
- Calculate ATS score
- Find matching districts
- Recommendations

### ChatBot.tsx

EFOS Saathi career guidance chatbot.

**Features:**
- Career questions
- Skill roadmaps
- Industry insights
- Counselor connection

### Filters.tsx

Industry and skill filtering.

**Controls:**
- Industry dropdown
- Skill selector
- Filter apply/reset

---

## 📊 Data Structure

### District Data Format

```typescript
interface DistrictData {
  district: string
  state: string
  salary: string
  demand: string
  skills: string[]
  demandGrowth: string
  companies: string[]
}
```

### Resume Analysis Result

```typescript
interface AnalysisResult {
  skills: string[]
  atsScore: number
  atsBreakdown: {
    formatting: number
    keywords: number
    structure: number
    experience: number
  }
  matchedDistricts: DistrictMatch[]
  recommendations: string[]
  issues: string[]
}
```

### Filter State

```typescript
interface Filters {
  industry: string | null
  selectedSkills: string[]
  selectedDistrict: string | null
}
```

---

## 🎨 Feature Details

### Interactive Map

- **Click Districts** — View salary and demand data
- **Color Coding** — Visual demand intensity
- **Responsive** — Works on all screen sizes
- **Smooth Animations** — GSAP transitions
- **Hover Effects** — Interactive feedback

### Resume Analyzer

- **ATS Score** — 0-100 rating
- **Skill Detection** — Automatic extraction
- **Scoring Breakdown** — 4 dimensions
- **District Matching** — Best fit locations
- **Recommendations** — Specific improvements

### Career Chatbot

- **AI Powered** — Intelligent responses
- **Career Guidance** — Personalized suggestions
- **Market Insights** — Salary & demand data
- **Skill Roadmaps** — Learning paths
- **Counselor Handoff** — Connect with experts

### Advanced Analytics

- **Real-time Filtering** — Update charts instantly
- **Salary Trends** — Historical and projected
- **Demand Insights** — Growth patterns
- **Skill Analysis** — Most in-demand skills
- **Industry Breakdown** — Sector-wise data

---

## 🎨 Design System

### Color Scheme

- **Neon Accent** — #00d4ff (primary CTA)
- **Dark Background** — #0f172a (main)
- **Glass Effect** — rgba(15, 23, 42, 0.8) (cards)
- **Text** — #e2e8f0 (primary), #94a3b8 (secondary)
- **Green** — #10b981 (positive/success)
- **Red** — #ef4444 (attention/alert)

### UI Components

- **Glassmorphic Cards** — Semi-transparent with blur
- **Smooth Gradients** — Subtle background transitions
- **GSAP Animations** — Smooth interactions
- **Responsive Spacing** — Tailwind utility classes
- **Dark Theme** — Eye-friendly default

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Test Coverage

```bash
npm test -- --coverage
```

### Example Test

See [App.test.tsx](__tests__/App.test.tsx) for testing patterns.

---

## 🐛 Troubleshooting

### Development Server Won't Start

```bash
# Clear node_modules and cache
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 5173 Already in Use

```bash
# Vite will auto-select next available port
npm run dev
```

### Build Errors

```bash
# Clear build cache
npm run build -- --force
```

### Maps Not Loading

```bash
# Check D3 and TopoJSON versions
npm list d3 topojson-client
```

---

## 🔮 Future Scope

### Near Term (v1.1)

- [ ] Export salary report as PDF
- [ ] Personalized dashboard for users
- [ ] Email resume analysis summary
- [ ] WhatsApp integration for leads
- [ ] Advanced skill gap analysis
- [ ] Interview preparation module

### Medium Term (v1.5)

- [ ] Real-time job posting integration
- [ ] Live salary data from APIs
- [ ] Video interview practice
- [ ] Scholarship eligibility checker
- [ ] Company review and ratings
- [ ] Skill certification tracks

### Long Term (v2.0)

- [ ] Mobile native apps (iOS/Android)
- [ ] Live counselor video calls
- [ ] EFOS CRM integration
- [ ] WhatsApp Business API
- [ ] SMS notifications
- [ ] Advanced ML-based matching
- [ ] Regional language support
- [ ] Offline-first PWA

### Technical Improvements

- [ ] Move to TypeScript strict mode
- [ ] Add end-to-end tests (Cypress)
- [ ] Performance monitoring (Sentry)
- [ ] Analytics integration (GA4)
- [ ] Backend API for data
- [ ] Database for user profiles
- [ ] Authentication system

---

## 🛠️ Useful Git Commands

### Push Changes

```bash
git status
git add .
git commit -m "Feature: Add new functionality"
git push origin main
```

### Create New Branch

```bash
git checkout -b feature/feature-name
git add .
git commit -m "WIP: Working on feature"
git push origin feature/feature-name
```

### Switch Branches

```bash
git checkout main
git pull origin main
```

### View History

```bash
git log --oneline
git diff HEAD~1
```

---

## 🧠 Unique Selling Point

```text
Rozgar Radar is not just a map.

It is an intelligent job market analysis platform that combines:
- Geographic visualization of salary and demand data
- Resume assessment and career matching
- AI-powered career guidance
- Real-time market insights
- District-wise opportunity discovery

All designed for Indian students who want to make data-driven
career decisions aligned with regional market demand.
```

---

## 👥 Team

```text
Project: Rozgar Radar — Skill Salary Map
Built for: Competition/Hackathon
Developer/Team: [Your Name/Team Name]
Version: 1.0.0
```

---

## 📜 License

This project is created for hackathon, learning, and demonstration purposes.

All rights reserved. Competition use only.

---

## 🙏 Acknowledgments

- **EFOS.in** — Career guidance mission
- **Data Sources** — Rozgar market data
- **React Community** — Component patterns
- **Tailwind Labs** — CSS utilities
- **D3.js Community** — Visualization techniques
- **Vercel** — Deployment platform

---

## 📞 Support & Contact

For issues, feature requests, or questions:

1. Check [README_DEPLOYMENT.md](README_DEPLOYMENT.md) for deployment help
2. Review component code in [src/components/](src/components/)
3. Check tests in [src/__tests__/](src/__tests__/) for usage examples
4. Review data structure in [src/data/](src/data/)

---

<p align="center">
  Made with ❤️ for career clarity and data-driven decisions<br/><br/>
  <img src="https://img.shields.io/badge/Rozgar%20Radar-Job%20Market%20Intelligence-dc2626?style=for-the-badge" alt="Rozgar Radar" />
</p>

---

**Last Updated:** May 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
