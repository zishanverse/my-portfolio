# Portfolio Website

A modern, high-performance personal portfolio built with Next.js 15, featuring advanced 3D "scrollytelling" interactions and a polished, theme-aware UI.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: 
  - [GSAP](https://gsap.com/) & ScrollTrigger (Complex scroll-driven sequences)
  - [Framer Motion](https://www.framer.com/motion/) (Component entry/exit animations)
- **3D Integration**: [Spline](https://spline.design/) (`@splinetool/react-spline`)
- **Theming**: `next-themes` (Dark/Light mode support)
- **Icons**: `lucide-react`

## ✨ Core Features

### 1. Advanced 3D "Scrollytelling"
The standout feature is a persistent **Spline 3D model** that seamlessly travels across the page as the user scrolls, interacting with different content sections.
- **Global Layer**: Implemented as a `fixed` background element in `page.tsx` via `SceneWrapper`.
- **Logic**: `components/3d/HeroScene.tsx` uses a **Continuous GSAP Timeline** linked to `body` scroll for smooth, scrubbed movement.
- **Path**:
    - **Hero**: Model hangs on the **Right** (Initial Greeting).
    - **About**: Model moves to the **Left**, creating space for text.
    - **Skills**: Model moves far **Right** to avoid overlapping the grid.
    - **Experience**: Model remains **Right**, accompanying the timeline.

### 2. Modern Design System
- **Theme Toggle**: Fully integrated dark/light mode with smooth CSS transitions (`components/ui/ThemeToggle.tsx`).
- **Glassmorphism**: Heavy use of backdrop blurs and translucent borders.
- **Interactive Cards**: Skills section features 3D tilt effects on hover.
- **Dynamic Typography**: Hero section uses a flipping text animation (`ContainerTextFlip`) for role cycling.

## 📂 Project Structure

### Key Components

- **`app/page.tsx`**: The main orchestrator. It loads the `SceneWrapper` (Global 3D Layer) and stacks all vertical sections (`Hero`, `About`, `Skills`, `Timeline`).
- **`components/3d/HeroScene.tsx`**: Contains the GSAP ScrollTrigger logic. It calculates scroll progress and animates the Spline model's `x`, `y`, `scale`, and opacity.
- **`components/sections/Hero.tsx`**: First view. Features large typography and reserves space for the 3D model.
- **`components/sections/About.tsx`**: Contains the executive summary (synced with Resume).
- **`components/sections/Skills.tsx`**: Grid of technical skills with hover effects.
- **`components/sections/Timeline.tsx`**: Vertical timeline displaying professional experience.

### Configuration
- **`globals.css`**: Defines Tailwind v4 `@theme` variables and custom CSS variables for light/dark colors (`--background`, `--foreground`).

## 🛠️ Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📝 TODO List

1.  Add personal photo
2.  Project UI screenshost img with route for project description and prototype
3.  3d section
