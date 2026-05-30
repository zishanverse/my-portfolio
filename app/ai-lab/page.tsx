"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { HeroAI } from "@/components/ai/HeroAI";
import { NavigationTabs } from "@/components/ai/NavigationTabs";
import { SectionContainer } from "@/components/ai/SectionContainer";
import {
    ChevronDown,
    ExternalLink,
    Github,
    FileText,
    Brain,
    BarChart3,
    Network,
    Stethoscope,
    Truck,
    ShoppingCart,
    GitBranch,
    Zap,
    Shield,
    Globe,
    ArrowRight,
    X,
} from "lucide-react";

// --- Dynamic Client Components ---
const CnnArchitecture = dynamic(
    () => import("@/components/ai/CnnArchitecture").then((m) => m.CnnArchitecture),
    { ssr: false }
);
const TrainingReplay = dynamic(
    () => import("@/components/ai/TrainingReplay").then((m) => m.TrainingReplay),
    { ssr: false }
);
const LiveInference = dynamic(
    () => import("@/components/ai/LiveInference").then((m) => m.LiveInference),
    { ssr: false }
);
const AgenticCrew = dynamic(
    () => import("@/components/ai/AgenticCrew").then((m) => m.AgenticCrew),
    { ssr: false }
);
const TabularIntelligence = dynamic(
    () => import("@/components/ai/TabularIntelligence").then((m) => m.TabularIntelligence),
    { ssr: false }
);
const EdaLab = dynamic(
    () => import("@/components/ai/EdaLab").then((m) => m.EdaLab),
    { ssr: false }
);
const AprioriGraph = dynamic(
    () => import("@/components/ai/AprioriGraph").then((m) => m.AprioriGraph),
    { ssr: false }
);
const PipelineFlow = dynamic(
    () => import("@/components/ai/PipelineFlow").then((m) => m.PipelineFlow),
    { ssr: false }
);
const LearningTimeline = dynamic(
    () => import("@/components/ai/LearningTimeline").then((m) => m.LearningTimeline),
    { ssr: false }
);

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Thin label used for section sub-headings */
const Label = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
        {children}
    </p>
);

/** Clean card wrapper */
const Card = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`rounded-2xl border border-border bg-card backdrop-blur-sm ${className}`}
    >
        {children}
    </div>
);

/** System status badge */
const StatusBadge = ({
    text,
    color = "emerald",
}: {
    text: string;
    color?: "emerald" | "indigo" | "amber";
}) => {
    const colors = {
        emerald: "text-emerald-400 bg-emerald-400/8 border-emerald-400/20",
        indigo: "text-indigo-400 bg-indigo-400/8 border-indigo-400/20",
        amber: "text-amber-400 bg-amber-400/8 border-amber-400/20",
    };
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${colors[color]}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {text}
        </span>
    );
};

/** Tab switcher for the Featured System */
const FeatureTabs = ({
    tabs,
    active,
    onChange,
}: {
    tabs: string[];
    active: string;
    onChange: (t: string) => void;
}) => (
    <div className="flex border-b border-border overflow-x-auto no-visible-scrollbar">
        {tabs.map((tab) => (
            <button
                key={tab}
                onClick={() => onChange(tab)}
                className={`px-5 py-3 text-xs font-semibold tracking-wide transition-colors cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
                    active === tab
                        ? "border-white text-foreground"
                        : "border-transparent text-muted-foreground hover:text-muted-foreground"
                }`}
            >
                {tab}
            </button>
        ))}
    </div>
);

/** Expandable section for engineering notes */
const ExpandableNote = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-border rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/50 transition-colors cursor-pointer"
            >
                <span className="text-sm font-semibold text-foreground">{title}</span>
                <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ─────────────────────────────────────────────
// Secondary Project Card
// ─────────────────────────────────────────────
interface ProjectCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    title: string;
    description: string;
    tags: string[];
    content: React.ReactNode;
    accent?: string;
}

const ProjectCard = ({
    icon: Icon,
    label,
    title,
    description,
    tags,
    content,
    accent = "indigo",
}: ProjectCardProps) => {
    const [open, setOpen] = useState(false);
    const accentColors: Record<string, string> = {
        indigo: "text-indigo-400 bg-indigo-400/8 border-indigo-400/20",
        purple: "text-purple-400 bg-purple-400/8 border-purple-400/20",
        rose: "text-rose-400 bg-rose-400/8 border-rose-400/20",
        emerald: "text-emerald-400 bg-emerald-400/8 border-emerald-400/20",
        amber: "text-amber-400 bg-amber-400/8 border-amber-400/20",
    };
    const iconColor = accentColors[accent] ?? accentColors.indigo;
    const layoutId = title.replace(/\s+/g, "-").toLowerCase();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <>
            <motion.div
                layoutId={`card-container-${layoutId}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col h-full hover:border-border transition-colors"
            >
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <motion.div
                            layoutId={`card-icon-${layoutId}`}
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconColor}`}
                        >
                            <Icon className="w-5 h-5" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                            <Label>{label}</Label>
                            <motion.h3 
                                layoutId={`card-title-${layoutId}`}
                                className="text-base font-bold text-foreground mb-1.5"
                            >
                                {title}
                            </motion.h3>
                            <motion.p 
                                layoutId={`card-desc-${layoutId}`}
                                className="text-sm text-muted-foreground leading-relaxed"
                            >
                                {description}
                            </motion.p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-secondary border border-border text-[11px] font-mono text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-foreground/90 transition-colors"
                    >
                        Explore System
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            layoutId={`card-container-${layoutId}`}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-border bg-background shadow-2xl flex flex-col z-10"
                        >
                            <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/80 backdrop-blur-xl shrink-0">
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        layoutId={`card-icon-${layoutId}`}
                                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconColor}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.div>
                                    <div>
                                        <motion.h3 
                                            layoutId={`card-title-${layoutId}`}
                                            className="text-base sm:text-lg font-bold text-foreground leading-tight"
                                        >
                                            {title}
                                        </motion.h3>
                                        <p className="text-xs text-muted-foreground hidden sm:block">{label}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 sm:p-2.5 rounded-full hover:bg-secondary transition-colors bg-secondary border border-border flex shrink-0"
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto no-visible-scrollbar p-4 sm:p-8">
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {content}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function AiLabPage() {
    const [featuredTab, setFeaturedTab] = useState("Live Inference");

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── Hero ── */}
            <HeroAI />

            {/* ── Sticky Nav ── */}
            <NavigationTabs />

            {/* ═══════════════════════════════════
                SECTION 1: Featured System
                Pollution Risk CNN — centerpiece
            ═══════════════════════════════════ */}
            <SectionContainer
                id="featured-system"
                label="Featured System"
                title="Pollution Risk Prediction"
                description="A 1D Convolutional Neural Network trained on environmental telemetry data. Exported from Google Colab, executing entirely in the browser via TensorFlow.js."
            >
                {/* System meta row */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <StatusBadge text="Model Loaded" color="emerald" />
                    <StatusBadge text="TF.js Runtime" color="indigo" />
                    <span className="text-xs text-muted-foreground font-mono">Conv1D · 3,892 params · &lt;2ms latency</span>
                </div>

                {/* Main tab panel */}
                <Card>
                    <FeatureTabs
                        tabs={["Live Inference", "Architecture", "Training History"]}
                        active={featuredTab}
                        onChange={setFeaturedTab}
                    />
                    <div className="p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={featuredTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {featuredTab === "Live Inference" && <LiveInference />}
                                {featuredTab === "Architecture" && <CnnArchitecture />}
                                {featuredTab === "Training History" && <TrainingReplay />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </Card>

                {/* Quick fact strip below */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    {[
                        { label: "Model Type", value: "Conv1D" },
                        { label: "Input Shape", value: "[15, 1]" },
                        { label: "Train Accuracy", value: "89.1%" },
                        { label: "Val Accuracy", value: "71.9%" },
                    ].map((f) => (
                        <div
                            key={f.label}
                            className="rounded-xl border border-border bg-card px-4 py-3"
                        >
                            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                                {f.label}
                            </p>
                            <p className="text-sm font-bold text-foreground font-mono">{f.value}</p>
                        </div>
                    ))}
                </div>
            </SectionContainer>

            {/* ═══════════════════════════════════
                SECTION 2: Research Experiments
            ═══════════════════════════════════ */}
            <SectionContainer
                id="experiments"
                label="Research Experiments"
                title="More ML Systems"
                description="Additional machine learning systems built across different domains — from multi-agent orchestration to tabular regression and clinical EDA."
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <ProjectCard
                        icon={Brain}
                        label="Multi-Agent AI"
                        title="Agentic Game Developer"
                        description="Multi-agent system using CrewAI orchestrating specialized LLM agents to autonomously design, develop, and audit retro arcade games in Pygame."
                        tags={["CrewAI", "LLM", "Python", "Pygame"]}
                        accent="purple"
                        content={<AgenticCrew />}
                    />
                    <ProjectCard
                        icon={Truck}
                        label="Tabular Regression"
                        title="Delivery & Housing Price Lab"
                        description="Benchmarking SVR, Random Forest, Decision Tree, and KNN models on delivery logistics and California real estate pricing datasets."
                        tags={["SVR", "Random Forest", "KNN", "sklearn"]}
                        accent="indigo"
                        content={<TabularIntelligence />}
                    />
                    <ProjectCard
                        icon={Stethoscope}
                        label="Clinical EDA"
                        title="Cardiology Risk Visualizer"
                        description="Exploratory analysis of physiological attributes influencing coronary artery blockage. Visual correlation mapping of heart attack risk indicators."
                        tags={["EDA", "Pandas", "Correlation", "Seaborn"]}
                        accent="rose"
                        content={<EdaLab />}
                    />
                    <ProjectCard
                        icon={ShoppingCart}
                        label="Association Mining"
                        title="Apriori Rule Network"
                        description="Interactive graph of Apriori-mined association rules from a deforestation and transaction dataset. 42 rules visualized with support/confidence/lift filtering."
                        tags={["Apriori", "Association Rules", "SVG Graph"]}
                        accent="emerald"
                        content={<AprioriGraph />}
                    />
                </div>
            </SectionContainer>

            {/* ═══════════════════════════════════
                SECTION 3: Data Pipeline
            ═══════════════════════════════════ */}
            <SectionContainer
                id="pipeline-flow"
                label="System Architecture"
                title="End-to-End ML Pipeline"
                description="The complete data lifecycle from raw ingestion to browser inference — each stage animated and interactive."
            >
                <Card className="p-6 md:p-8">
                    <PipelineFlow />
                </Card>
            </SectionContainer>

            {/* ═══════════════════════════════════
                SECTION 4: Learning Timeline
            ═══════════════════════════════════ */}
            <SectionContainer
                id="learning-journey"
                label="Curriculum"
                title="ML Learning Journey"
                description="18 notebooks across Foundations, Classical ML, Statistics, Deep Learning, and Advanced Analytics — structured as an interactive progression map."
            >
                <Card className="p-6 md:p-8">
                    <LearningTimeline />
                </Card>
            </SectionContainer>

            {/* ═══════════════════════════════════
                SECTION 5: Engineering Notes
            ═══════════════════════════════════ */}
            <SectionContainer
                id="engineering-notes"
                label="Engineering Decisions"
                title="Why It's Built This Way"
                description="Key architectural tradeoffs and design choices that make this a production-quality engineering showcase."
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    {[
                        {
                            icon: Zap,
                            title: "Client-Side Inference",
                            body: "Running TF.js in the browser eliminates server round-trip latency. Predictions happen in <2ms vs ~150ms for an HTTP request — and at zero server cost.",
                        },
                        {
                            icon: Shield,
                            title: "No SSR, No Hydration Bugs",
                            body: "TensorFlow.js and canvas-heavy components are loaded via `next/dynamic` with `ssr: false`, ensuring clean hydration and optimal bundle splitting.",
                        },
                        {
                            icon: Globe,
                            title: "Python → JavaScript Bridge",
                            body: "Models trained in Google Colab (Keras) are exported to TensorFlow.js format and served as static JSON from `/public/models`, enabling zero-dependency inference.",
                        },
                    ].map(({ icon: Icon, title, body }) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.4 }}
                            className="rounded-2xl border border-border bg-card p-6 space-y-3"
                        >
                            <div className="w-9 h-9 rounded-xl bg-secondary border border-border flex items-center justify-center">
                                <Icon className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <h3 className="text-sm font-bold text-foreground">{title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Expandable deep-dives */}
                <div className="space-y-2">
                    <ExpandableNote title="How the Conv1D model was exported for the web">
                        <div className="pt-4 space-y-2">
                            <p>
                                The model was trained in Python using Keras (TensorFlow 2.x). After training,
                                the model was exported with <code className="text-indigo-400 bg-secondary px-1 rounded">tensorflowjs_converter</code> to
                                produce a <code className="text-indigo-400 bg-secondary px-1 rounded">model.json</code> topology file alongside binary weight shards.
                            </p>
                            <p>
                                These files are served statically from <code className="text-indigo-400 bg-secondary px-1 rounded">/public/models/</code> and loaded at runtime with{" "}
                                <code className="text-indigo-400 bg-secondary px-1 rounded">tf.loadLayersModel()</code>. The model is cached in memory after the first load
                                and reused across prediction calls.
                            </p>
                        </div>
                    </ExpandableNote>

                    <ExpandableNote title="Why TensorFlow.js instead of ONNX Runtime Web or WASM">
                        <div className="pt-4 space-y-2">
                            <p>
                                TF.js integrates directly with the existing Keras export pipeline and offers WebGL
                                GPU acceleration out of the box — no additional transpilation step is needed.
                                ONNX Runtime Web was considered but adds additional converter complexity for a model this size.
                            </p>
                            <p>
                                For a Conv1D model with 3,892 parameters, the performance difference is negligible.
                                TF.js's <code className="text-indigo-400 bg-secondary px-1 rounded">tf.tidy()</code> API also provides automatic memory cleanup,
                                preventing WebGL texture leaks.
                            </p>
                        </div>
                    </ExpandableNote>

                    <ExpandableNote title="Handling Next.js SSR with TensorFlow.js and canvas-heavy components">
                        <div className="pt-4 space-y-2">
                            <p>
                                TF.js accesses <code className="text-indigo-400 bg-secondary px-1 rounded">window</code> and WebGL APIs during initialization — both unavailable
                                in the Node.js SSR environment. Using{" "}
                                <code className="text-indigo-400 bg-secondary px-1 rounded">{"dynamic(() => import(...), { ssr: false })"}</code>{" "}
                                ensures these components are only evaluated in the browser after hydration.
                            </p>
                            <p>
                                This also improves initial page load performance by deferring the ~1.2MB TF.js bundle
                                until it's actually needed — keeping the server-rendered HTML lean and fast.
                            </p>
                        </div>
                    </ExpandableNote>

                    <ExpandableNote title="Apriori association mining: algorithm and data">
                        <div className="pt-4 space-y-2">
                            <p>
                                The Apriori algorithm was run in Python using the{" "}
                                <code className="text-indigo-400 bg-secondary px-1 rounded">mlxtend</code> library on a deforestation transaction dataset.
                                Rules were mined with <code className="text-indigo-400 bg-secondary px-1 rounded">min_support=0.1</code> and{" "}
                                <code className="text-indigo-400 bg-secondary px-1 rounded">min_confidence=0.5</code>, yielding 42 high-lift association rules.
                            </p>
                            <p>
                                The resulting rule set is embedded as static JSON in the client and rendered as a
                                draggable SVG force-graph with real-time support/confidence/lift threshold filtering.
                            </p>
                        </div>
                    </ExpandableNote>
                </div>
            </SectionContainer>

            {/* ═══════════════════════════════════
                FOOTER CTA
            ═══════════════════════════════════ */}
            <div className="border-t border-border py-16 md:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="text-center md:text-left space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                                Want to work together?
                            </h2>
                            <p className="text-muted-foreground text-base max-w-lg">
                                I'm actively looking for ML engineering and software engineering roles. Let's talk.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full md:w-auto mt-6 md:mt-0">
                            <a
                                href="/resume"
                                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:bg-foreground/90 transition-colors"
                            >
                                <FileText className="w-4 h-4" />
                                View Resume
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-secondary text-muted-foreground text-sm font-semibold hover:bg-secondary hover:text-foreground transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                GitHub Profile
                            </a>
                            <a
                                href="/#contact"
                                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-secondary text-muted-foreground text-sm font-semibold hover:bg-secondary hover:text-foreground transition-colors"
                            >
                                Contact Me
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
