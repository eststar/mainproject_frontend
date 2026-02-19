# Neural Interface - Analytic Dashboard Frontend

A modern, high-performance web application built with **Next.js 16 (App Router)** for visualizing fashion trend data, managing inventory, and handling user profiles. This project features a premium UI design with glassmorphism effects and dynamic interactive charts.

## 🛠 Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Jotai](https://jotai.org/) (Atomic state management)
- **Visualizations**: 
  - [Plotly.js](https://plotly.com/javascript/react-plotly.js/) (t-SNE Neural Map) via dynamic import
  - Custom SVG/CSS Charts
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome 6, Simple Icons)

## 🚀 Key Features

### 1. Analytics Dashboard (`/main/dashboard`)
- **Real-time Metrics**: Displays internal inventory and Naver shopping product counts using async polling with retry logic.
- **Trend Analysis**: Visualizes shopping trends with custom style distribution cards.
- **Interactive t-SNE Map**: A 2D projection of high-dimensional style vectors using `react-plotly.js`. Supports zoom, pan, and interactive tooltips.
- **Sales Ranking**: Best-selling items tracking with sorting capabilities.

### 2. Member Management (`/main/memberinfo`)
- **Profile Customization**: Update nickname, password (local auth), and profile image with real-time preview.
- **OAuth2 Integration**: Seamless identity management for social login users (Google, Naver, Kakao).
- **Account Security**: Secure withdrawal process with double-verification modal.
- **Session Handling**: Automatic token verification and secure logout flows.

### 3. Authentication System
- **AuthHandler**: Centralized handling of OAuth2 tokens via URL parameters.
- **Protected Routes**: Middleware or client-side checks to ensure secure access to internal pages.

## 📂 Project Structure

```bash
src/
├── app/
│   ├── api/             # API Service Layer (fetch wrappers for backend)
│   ├── main/            
│   │   ├── dashboard/   # Dashboard Page & Components
│   │   ├── memberinfo/  # Member Profile Page
│   │   └── studio/      # Studio/Creation Tools
│   ├── login/           # Login Page
│   ├── signup/          # Registration Page
│   └── layout.tsx       # Root Layout (Theme & Global Styles)
├── components/          # Shared Reusable UI Components
├── jotai/               # Global State Atoms (Auth, User Prefs)
└── types/               # TypeScript Interfaces (API Responses, Props)
```

## 🏗 Architecture & Build Strategy

This project utilizes the **Static Shell + Client Hydration** pattern provided by Next.js App Router.

- **Static Shell (SSR/SSG)**:
  - The build output shows pages (`/main/dashboard`, etc.) as **Static (○)**.
  - The skeleton structure (Sidebar, Header, Layout) is pre-rendered at build time for optimal TTFB (Time to First Byte) and SEO.

- **Client Hydration (CSR)**:
  - Dynamic data (Charts, User Profile, Inventory Counts) is fetched client-side after the page loads.
  - **Dynamic Imports**: Heavy libraries like `react-plotly.js` are loaded dynamically (`ssr: false`) to reduce initial bundle size and avoid server-side window errors.

```bash
Route (app)
┌ ○ /main/dashboard  # Static Shell
└ ○ /main/memberinfo # Static Shell
```

## 📦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at [http://localhost:3000](http://localhost:3000).

3. **Build for Production**
   ```bash
   npm run build
   ```
   This generates an optimized production build using Turbopack.

## 📝 License

This project is proprietary software. All rights reserved.
