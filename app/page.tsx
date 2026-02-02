import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { ArrowRight } from "lucide-react";

import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Timeline } from "@/components/sections/Timeline";
import SceneWrapper from "@/components/3d/SceneWrapper";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <SceneWrapper />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Achievements />
      <Contact />
    </div>
  );
}
