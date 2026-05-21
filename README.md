# VistechBot

VistechBot is a modern React + Vite website for an AI-powered customer support platform. The project includes responsive landing pages, product/features sections, documentation pages, pricing, contact flows, reusable UI components, and smooth GSAP-based animations.

## Tech Stack

- React 19
- Vite
- React Router DOM
- GSAP + ScrollTrigger
- Framer Motion
- Lucide React / React Icons
- Urbanist font
- CSS modules by page/section structure

## Project Structure

```txt
VistechBot/
├── public/                 # Static public assets
├── src/
│   ├── assets/images/      # Website images and graphics
│   ├── components/         # Reusable and page-specific components
│   ├── data/               # Shared content/data arrays
│   ├── hooks/              # Reusable React hooks
│   ├── pages/              # Route-level pages
│   ├── styles/             # Page/section CSS files
│   ├── utils/              # Animation helpers/utilities
│   ├── App.jsx             # App routes/layout
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

## GitHub Push Guide

Use these commands from the project root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

> Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your actual GitHub username and repository name.

## Deployment Notes

This is a Vite project. For most hosting platforms, use:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Repository Notes

- `node_modules` is intentionally excluded from GitHub.
- `dist` is intentionally excluded from GitHub because it is generated during build.
- Keep `package-lock.json` committed so dependency versions remain consistent.
