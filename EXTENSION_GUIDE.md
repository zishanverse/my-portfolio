# Safe Extension Points

## Adding New Sections
The project uses a vertical stack layout in `app/page.tsx`. You can safely add new sections between existing components.

**Safe Locations in `app/page.tsx`:**
```tsx
export default function Home() {
  return (
    <div className="...">
      <SceneWrapper /> {/* DO NOT MOVE */}
      <Hero />
      <About />
      {/* SAFE: Add "Work Experience" or "Blog" here */}
      <Skills />
      <Projects />
      <Timeline />
      {/* SAFE: Add "Testimonials" here */}
      <Achievements />
      <Contact />
    </div>
  );
}
```

## Component Guidelines
- **Z-Index**: New sections usually don't need z-index unless they need to sit *above* the 3D model (unlikely, as the model is background). If you need interaction in your section to work, standard stacking context usually works because `HeroScene` is `pointer-events-none` (mostly). 
- **Theming**: Use `bg-background` and `text-foreground` to automatically support the updated premium light/dark themes.
