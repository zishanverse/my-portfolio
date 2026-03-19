# Portfolio Website

A modern, interactive personal portfolio built with Next.js App Router, advanced animations, and a persistent 3D scrollytelling layer.

This README explains how the current interface looks and behaves, section by section, along with all technologies, tools, and packages used.

## Overview

The website presents a premium, animated experience where:

- A global Spline 3D object follows the user through the page while scrolling.
- The layout is theme-aware (light/dark) with a custom design token system.
- Motion is layered: GSAP for scroll choreography, Framer Motion for component reveals, and custom UI effects.
- Content is split into focused sections: Hero, About, Skills, AI Systems, Projects, Timeline, Achievements, and Contact.

## How The Interface Looks

### Global Visual Identity

- Fixed animated navigation bar with glass effect and hide/show behavior while scrolling.
- Theme-aware particle background across the full viewport.
- Custom ink cursor replacing the default cursor.
- High-contrast typography using Outfit font.
- Soft gradients, blur layers, and glassmorphism cards for depth.

### 3D Scrollytelling Layer

The 3D object is loaded as a global fixed layer and animated across sections:

- Hero: starts on the right.
- About: moves to the left.
- Skills: moves far right to avoid content overlap.
- AI Systems: moves back left and briefly holds.
- Timeline/Experience: moves right.
- Achievements: returns closer to center.
- End of page: fades out.

Implementation details:

- Spline scene is loaded dynamically on client side only.
- GSAP timeline is scrubbed to total page scroll for continuous movement.
- 3D layer is disabled on smaller screens for performance and usability.

## Section-By-Section UI Breakdown

### 1) Hero Section

- Full-screen intro with name, rotating role text, and strong headline hierarchy.
- Animated role text flip (Full-Stack Dev, AI Integration, DevOps, Agentic AI).
- Two call-to-actions:
  - View Projects (scroll target)
  - Resume (separate route)
- Decorative glow area that visually balances the global 3D scene.

### 2) About Section

- Two-column storytelling layout (header + narrative body).
- Sticky section heading behavior on larger screens.
- Executive summary focused on full-stack + AI engineering profile.
- Highlighted text treatment for premium emphasis.

### 3) Skills & Expertise

- Large marquee-style logo loops in opposite directions.
- Technical stack displayed as branded icons (React, Next.js, TypeScript, Tailwind, Node, Python, MongoDB, PostgreSQL, Prisma, Docker, etc.).
- Separate scrolling badge loop for soft skills and concepts (Problem Solving, Prompt Engineering, RAG, CI/CD, Agentic AI).
- Gradient blob background to avoid flat visual blocks.

### 4) Next-Gen AI Systems

- Animated heading reveal on scroll.
- Tabbed showcase area with perspective styling.
- Tab 1: AI Agent UI demo (chat-style interaction, typing state, assistant responses).
- Tab 2: Automation & Workflow demos (agent swarms, Make workflows, n8n pipelines, RAG concepts).
- Card depth/tilt interactions to reinforce interactive system-design narrative.

### 5) Featured Projects

- Responsive project card grid.
- Each card includes short summary and tags.
- Clicking opens detailed modal with expanded context and external project links.
- Current projects include AI diagnostics, digital platform engineering, and MCP-based learning path generation.

### 6) Experience & Education Timeline

- Center-line vertical timeline with alternating left/right cards on desktop.
- Motion-based reveal for each item as it enters viewport.
- Covers professional roles and education milestones.

### 7) Awards & Recognition

- Animated card stagger on scroll.
- Rich visual cards with image banners and achievement tags.
- Clickable modal for full details and external proof links.
- Designed to communicate credibility and real-world impact quickly.

### 8) Contact Section

- Clear hiring CTA and direct email action.
- Resume shortcut.
- Interactive social dock for GitHub, LinkedIn, LeetCode, and email.
- Additional Hire Me modal from the navbar with form fields:
  - Name
  - Email
  - Project details

## Main Routes

- `/` - Main portfolio landing page.
- `/resume` - Detailed, animated resume page with print/download workflow.
- `/design-system` - Internal design token and component showcase page.
- `/api/contact` - API endpoint used by the contact modal form.

## Complete Tech Stack

### Core Framework

- Next.js 16 (App Router)
- React 19
- TypeScript 5

### Styling and UI

- Tailwind CSS v4
- CSS custom properties and Tailwind theme mapping in global styles
- clsx + tailwind-merge for class composition
- Lucide React, React Icons, Tabler Icons

### Animation and Motion

- GSAP + ScrollTrigger
- @gsap/react (React integration)
- Framer Motion
- motion package

### 3D and Visual Effects

- @splinetool/react-spline + @splinetool/runtime
- three + @react-three/fiber + @react-three/drei
- ogl (shader/graphics utility)
- Custom particles, glass surfaces, 3D cards, moving borders, spotlight, dock magnification, and animated tabs

### Theme and UX

- next-themes for light/dark/system theme handling
- Theme-aware particle color switching
- Custom cursor layer

### Backend Utility

- Next.js Route Handler for contact form
- nodemailer for email delivery

## Packages Used

### Production Dependencies

- @gsap/react
- @react-three/drei
- @react-three/fiber
- @splinetool/react-spline
- @splinetool/runtime
- @tabler/icons-react
- clsx
- framer-motion
- gsap
- lucide-react
- motion
- next
- next-themes
- nodemailer
- ogl
- react
- react-dom
- react-icons
- tailwind-merge
- three

### Development Dependencies

- @tailwindcss/postcss
- @types/node
- @types/nodemailer
- @types/react
- @types/react-dom
- eslint
- eslint-config-next
- tailwindcss
- typescript

## Architecture Summary

- Global app shell:
  - Root layout mounts theme provider, particles, custom cursor, navbar, page content, and footer.
- Page composition:
  - Home page stacks reusable section components in a single vertical narrative flow.
- Motion strategy:
  - GSAP for timeline-level choreography, Framer Motion for entrance/interactions.
- Data strategy:
  - Section content currently uses local in-file data arrays for fast iteration.
- Client/Server split:
  - Interactive sections are client components.
  - Contact API runs server-side via route handler.

## Contact API Behavior

`POST /api/contact` expects:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Your message"
}
```

Behavior:

- Validates required fields.
- Sends email through Nodemailer (Gmail transporter).
- Returns JSON success/error response.

Required environment variables:

```env
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

## Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

Open `http://localhost:3000` in your browser.

## Current Status

The website is already a complete, premium animated portfolio with:

- Global 3D storytelling
- Multi-section content architecture
- Advanced interaction system
- Theme-aware visual language
- Working contact pipeline

Planned future enhancements can now be tracked separately as issues/tasks.














