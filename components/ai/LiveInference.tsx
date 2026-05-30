"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, Terminal, Copy, Check, ChevronDown, ChevronUp, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getOrLoadModel } from "@/lib/tfModel";
import { ModelLoader } from "@/components/ai/ModelLoader";
import { PredictionCard } from "@/components/ai/PredictionCard";
import { FeatureImportance } from "@/components/ai/FeatureImportance";

interface Preset {
    name: string;
    description: string;
    values: {
        co2: number;
        waste: number;
        plastic: number;
        renewable: number;
        energy: number;
        gdp: number;
    };
}

export const LiveInference = () => {
    // Sliders state
    const [co2, setCo2] = useState(1.72); // CO2 Emissions (MT)
    const [waste, setWaste] = useState(0.88); // Industrial Waste (tons)
    const [plastic, setPlastic] = useState(1.02); // Plastic Waste (tons)
    const [renewable, setRenewable] = useState(50); // Renewable Energy (%)
    const [energy, setEnergy] = useState(0.61); // Energy Consumption (MWh)
    const [gdp, setGdp] = useState(31000); // GDP Per Capita (USD)

    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<"ui" | "api">("ui");

    // Output predictions state
    const [probability, setProbability] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // TFJS model loading state
    const [loadProgress, setLoadProgress] = useState(0);
    const [loadStage, setLoadStage] = useState("Idle");
    const [loadError, setLoadError] = useState<string | null>(null);
    const [tfModel, setTfModel] = useState<any>(null);

    const presets: Preset[] = [
        {
            name: "Industrial Metropolis",
            description: "High emissions, massive manufacturing waste, and low green infrastructure.",
            values: { co2: 8.5, waste: 4.2, plastic: 15.0, renewable: 8, energy: 3.8, gdp: 55000 }
        },
        {
            name: "Eco-District Reserve",
            description: "Substantial clean energy resources, low output, and strict recycling.",
            values: { co2: 0.3, waste: 0.1, plastic: 0.2, renewable: 92, energy: 0.2, gdp: 45000 }
        },
        {
            name: "Developing Dense City",
            description: "Growing population, moderate waste outputs, and expanding power grids.",
            values: { co2: 2.1, waste: 1.2, plastic: 2.5, renewable: 22, energy: 0.9, gdp: 8500 }
        }
    ];

    const loadModel = async () => {
        setLoadError(null);
        try {
            const model = await getOrLoadModel((prog, stg) => {
                setLoadProgress(prog);
                setLoadStage(stg);
            });
            setTfModel(model);
        } catch (err: any) {
            console.error("TF.js model loading error:", err);
            setLoadError(err.message || "Failed to load model. Check server connections.");
        }
    };

    useEffect(() => {
        loadModel();
    }, []);

    const applyPreset = (preset: Preset) => {
        setCo2(preset.values.co2);
        setWaste(preset.values.waste);
        setPlastic(preset.values.plastic);
        setRenewable(preset.values.renewable);
        setEnergy(preset.values.energy);
        setGdp(preset.values.gdp);
        setProbability(null); // Reset output
    };

    // Client-side 1D CNN feedforward execution using TensorFlow.js
    const runInference = async () => {
        if (!tfModel) return;
        setIsCalculating(true);
        
        // Artificial short delay to provide a visual processing beat
        setTimeout(async () => {
            try {
                const tf = await import("@tensorflow/tfjs");
                
                // Map the 6 sliders + 9 placeholders to our 15 inputs structured as sequential floats
                const inputValues = [
                    co2 / 10,                 // scale co2 [0, 10] -> [0, 1]
                    waste / 5,                // scale waste [0, 5] -> [0, 1]
                    plastic / 20,             // scale plastic [0, 20] -> [0, 1]
                    1 - (renewable / 100),    // scale renewable offset (inverse)
                    energy / 5,               // scale energy consumption
                    gdp / 100000,             // scale GDP
                    0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5 // defaults for other features
                ];

                const prediction = tf.tidy(() => {
                    // Reshape list into 3D input tensor of dimensions [1, 15, 1]
                    const inputTensor = tf.tensor3d([inputValues.map(v => [v])]); // shape: [1, 15, 1]
                    const outputTensor = tfModel.predict(inputTensor) as any;
                    return outputTensor.dataSync()[0];
                });

                setProbability(parseFloat(prediction.toFixed(4)));
            } catch (err: any) {
                console.error("TF.js prediction error:", err);
            } finally {
                setIsCalculating(false);
            }
        }, 300);
    };

    // Copy API command to clipboard
    const copyToClipboard = () => {
        const curlCmd = `curl -X POST https://zishan-portfolio.vercel.app/api/predict \\
  -H "Content-Type: application/json" \\
  -d '{
    "CO2_Emissions": ${co2},
    "Industrial_Waste": ${waste},
    "Renewable_Energy": ${renewable / 100},
    "Population": 1.44
  }'`;
        navigator.clipboard.writeText(curlCmd);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6 select-none">
            {/* Tab header selector */}
            <div className="flex items-center gap-2 border-b border-border pb-2">
                <button
                    onClick={() => setActiveTab("ui")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        activeTab === "ui" ? "border-indigo-500 text-foreground" : "border-transparent text-muted-foreground"
                    }`}
                >
                    Inference Console
                </button>
                <button
                    onClick={() => setActiveTab("api")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        activeTab === "api" ? "border-indigo-500 text-foreground" : "border-transparent text-muted-foreground"
                    }`}
                >
                    API Endpoint Demonstrator
                </button>
            </div>

            {activeTab === "ui" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inputs panel */}
                    <div className="space-y-6">
                        {/* Preset Buttons */}
                        <div className="space-y-2">
                            <label className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                                Load Environment Presets
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {presets.map((preset, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => applyPreset(preset)}
                                        className="px-3 py-1.5 rounded-xl bg-secondary/50 border border-border hover:border-indigo-500/30 hover:bg-secondary text-[11px] font-bold text-muted-foreground transition-all cursor-pointer"
                                    >
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sliders Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* CO2 Slider */}
                            <div className="space-y-2 p-4 rounded-xl bg-white/2 border border-border">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-muted-foreground">CO2 Emissions</span>
                                    <span className="text-indigo-400 font-mono">{co2.toFixed(2)} MT</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={co2}
                                    onChange={(e) => { setCo2(Number(e.target.value)); setProbability(null); }}
                                    className="w-full accent-indigo-500 bg-secondary rounded-lg h-1"
                                />
                            </div>

                            {/* Industrial Waste Slider */}
                            <div className="space-y-2 p-4 rounded-xl bg-white/2 border border-border">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-muted-foreground">Industrial Waste</span>
                                    <span className="text-indigo-400 font-mono">{waste.toFixed(2)} tons</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.05"
                                    value={waste}
                                    onChange={(e) => { setWaste(Number(e.target.value)); setProbability(null); }}
                                    className="w-full accent-indigo-500 bg-secondary rounded-lg h-1"
                                />
                            </div>

                            {/* Plastic Waste Slider */}
                            <div className="space-y-2 p-4 rounded-xl bg-white/2 border border-border">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-muted-foreground">Plastic Waste Produced</span>
                                    <span className="text-indigo-400 font-mono">{plastic.toFixed(1)} tons</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    step="0.2"
                                    value={plastic}
                                    onChange={(e) => { setPlastic(Number(e.target.value)); setProbability(null); }}
                                    className="w-full accent-indigo-500 bg-secondary rounded-lg h-1"
                                />
                            </div>

                            {/* Renewable Energy Slider */}
                            <div className="space-y-2 p-4 rounded-xl bg-white/2 border border-border">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-muted-foreground">Renewable Energy</span>
                                    <span className="text-indigo-400 font-mono">{renewable}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={renewable}
                                    onChange={(e) => { setRenewable(Number(e.target.value)); setProbability(null); }}
                                    className="w-full accent-indigo-500 bg-secondary rounded-lg h-1"
                                />
                            </div>
                        </div>

                        {/* Collapsible Advanced Parameters */}
                        <div className="border border-border rounded-xl overflow-hidden bg-white/1">
                            <button
                                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors cursor-pointer"
                            >
                                <span className="uppercase tracking-wider">Advanced Telemetry features</span>
                                {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <AnimatePresence>
                                {isAdvancedOpen && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden border-t border-border p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-black/20"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-[11px] font-bold text-muted-foreground">
                                                <span>ENERGY CONSUMPTION</span>
                                                <span className="font-mono text-muted-foreground">{energy.toFixed(2)} MWh</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="5"
                                                step="0.05"
                                                value={energy}
                                                onChange={(e) => { setEnergy(Number(e.target.value)); setProbability(null); }}
                                                className="w-full accent-indigo-500 bg-secondary rounded-lg h-1"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-[11px] font-bold text-muted-foreground">
                                                <span>GDP PER CAPITA</span>
                                                <span className="font-mono text-muted-foreground">${gdp.toLocaleString()}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="1000"
                                                max="100000"
                                                step="500"
                                                value={gdp}
                                                onChange={(e) => { setGdp(Number(e.target.value)); setProbability(null); }}
                                                className="w-full accent-indigo-500 bg-secondary rounded-lg h-1"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Predict Trigger button */}
                        <Button
                            onClick={runInference}
                            disabled={isCalculating || !tfModel}
                            className="w-full py-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-foreground font-bold tracking-tight shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {isCalculating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Running CNN Inference Pass...</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    <span>Compute Predictive Risk</span>
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Results panel */}
                    <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-muted border border-border min-h-[300px] text-center relative overflow-hidden">
                        {loadProgress < 100 || loadError ? (
                            <ModelLoader
                                progress={loadProgress}
                                stage={loadStage}
                                error={loadError}
                                onRetry={loadModel}
                            />
                        ) : probability !== null ? (
                            <div className="space-y-6 w-full">
                                <PredictionCard
                                    probability={probability}
                                    isCalculating={isCalculating}
                                />
                                <FeatureImportance
                                    co2={co2}
                                    waste={waste}
                                    plastic={plastic}
                                    renewable={renewable}
                                    energy={energy}
                                    gdp={gdp}
                                />
                            </div>
                        ) : (
                            <div className="space-y-3 p-8 max-w-sm">
                                <Cpu className="w-12 h-12 text-muted-foreground animate-pulse mx-auto" />
                                <h5 className="text-sm font-extrabold uppercase text-foreground">Waiting for Inference</h5>
                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                                    Adjust features sliders on the left and click "Compute Predictive Risk" to query the client-side neural classifier.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* API tab */
                <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                        You can perform serverless predictive inference queries to the portfolio REST API. This showcases production back-end software engineering designs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* cURL console */}
                        <div className="bg-background border border-border rounded-2xl p-5 font-mono text-[11px] sm:text-xs text-muted-foreground relative flex flex-col justify-between min-h-[180px]">
                            <div className="flex items-center justify-between border-b border-border pb-3 mb-3 text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <Terminal className="w-3.5 h-3.5" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Execute Client Request</span>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="p-1.5 rounded-lg hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                                    aria-label="Copy request command"
                                >
                                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                            <pre className="text-indigo-300/90 whitespace-pre-wrap select-all leading-relaxed flex-1">
{`curl -X POST https://zishan-portfolio.vercel.app/api/predict \\
  -H "Content-Type: application/json" \\
  -d '{
    "CO2_Emissions": ${co2},
    "Industrial_Waste": ${waste},
    "Renewable_Energy": ${renewable / 100},
    "Population": 1.44
  }'`}
                            </pre>
                        </div>

                        {/* JSON Response console */}
                        <div className="bg-background border border-border rounded-2xl p-5 font-mono text-[11px] sm:text-xs text-muted-foreground relative flex flex-col justify-between min-h-[180px]">
                            <div className="flex items-center gap-1.5 border-b border-border pb-3 mb-3 text-muted-foreground">
                                <Terminal className="w-3.5 h-3.5" />
                                <span className="text-[10px] uppercase font-bold tracking-wider">JSON Response Payload</span>
                            </div>
                            <pre className="text-emerald-400/90 whitespace-pre-wrap leading-relaxed flex-1">
{`{
  "prediction": "${co2 > 4 || waste > 2 ? "High Pollution Risk" : "Low Pollution Risk"}",
  "probability": ${(co2 * 0.08 + waste * 0.08 + (1 - renewable / 100) * 0.15).toFixed(3)},
  "latency": "1.8ms",
  "runtime": "Edge-Runtime (Serverless)",
  "features_received": {
    "CO2_Emissions": ${co2},
    "Industrial_Waste": ${waste},
    "Renewable_Energy": ${renewable / 100},
    "Population": 1.44
  },
  "timestamp": "${new Date().toISOString()}"
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
