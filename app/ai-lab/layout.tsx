import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "AI/ML Lab | Zishan Khan Portfolio",
    description: "Interactive AI/ML Engineering Research Lab showcasing custom neural network telemetry classifiers, multi-agent game synthesis pipelines, tabular models, and exploratory clinical data analytics.",
    keywords: [
        "AI Engineering", 
        "Machine Learning Portfolio", 
        "TensorFlow.js", 
        "Next.js", 
        "React", 
        "CrewAI", 
        "Apriori Rule Mining", 
        "Data Science Showcase"
    ],
    openGraph: {
        title: "AI/ML Lab | Zishan Khan Portfolio",
        description: "Interactive AI/ML Engineering Research Lab showcasing custom neural network telemetry classifiers, multi-agent game synthesis pipelines, and exploratory clinical data analytics.",
        type: "website",
        locale: "en_US",
        url: "https://zishan-portfolio.vercel.app/ai-lab",
        siteName: "Zishan Khan Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI/ML Lab | Zishan Khan Portfolio",
        description: "Interactive AI/ML Engineering Research Lab showcasing custom neural network telemetry classifiers, multi-agent game synthesis pipelines, and exploratory clinical data analytics.",
    }
};

export default function AiLabLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
