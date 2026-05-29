"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sliders, HelpCircle, BarChart3, Database, Home, Truck } from "lucide-react";

interface ModelPrediction {
    name: string;
    prediction: number;
    color: string;
}

export const TabularIntelligence = () => {
    const [activeSubTab, setActiveSubTab] = useState<"delivery" | "california">("delivery");

    // --- FOOD DELIVERY STATES ---
    const [dashersBusyRatio, setDashersBusyRatio] = useState<number>(0.4);
    const [subtotal, setSubtotal] = useState<number>(35);
    const [items, setItems] = useState<number>(4);
    const [outstandingOrders, setOutstandingOrders] = useState<number>(12);

    // --- CALIFORNIA HOUSING STATES ---
    const [medianIncome, setMedianIncome] = useState<number>(4.5); // in $10k
    const [latitude, setLatitude] = useState<number>(37.7); // Bay Area/LA ranges
    const [households, setHouseholds] = useState<number>(800);

    // Delivery predictions math
    const deliveryPredictions = useMemo<ModelPrediction[]>(() => {
        // Base time in seconds (e.g. 1200s = 20 mins)
        const baseTime = 900;
        
        // Linear regression weights:
        // busy_dashers_ratio = +600s
        // subtotal = +4s per dollar
        // items = +30s per item
        // outstanding_orders = +10s per order
        const lr = baseTime + (dashersBusyRatio * 900) + (subtotal * 5) + (items * 45) + (outstandingOrders * 12);
        
        // SVR captures slightly lower values (non-linear penalty)
        const svr = baseTime + (Math.tanh(dashersBusyRatio) * 850) + (Math.log2(subtotal + 1) * 140) + (items * 40) + (outstandingOrders * 9);
        
        // Random Forest captures step patterns (decision trees)
        const rf = Math.round(lr / 60) * 60 + (outstandingOrders > 25 ? 200 : 0) - (dashersBusyRatio < 0.2 ? 120 : 0);

        // Ridge (L2 regularized) - slightly shrunken weights
        const ridge = baseTime + (dashersBusyRatio * 850) + (subtotal * 4.8) + (items * 42) + (outstandingOrders * 11.5);

        return [
            { name: "Linear Regression", prediction: Math.max(lr, 300) / 60, color: "bg-blue-500" },
            { name: "Ridge Regressor", prediction: Math.max(ridge, 300) / 60, color: "bg-indigo-500" },
            { name: "SVR (RBF Kernel)", prediction: Math.max(svr, 300) / 60, color: "bg-purple-500" },
            { name: "Random Forest", prediction: Math.max(rf, 300) / 60, color: "bg-emerald-500" }
        ];
    }, [dashersBusyRatio, subtotal, items, outstandingOrders]);

    // California housing predictions math
    const californiaPredictions = useMemo<ModelPrediction[]>(() => {
        // base price in $100k
        const basePrice = 120000; // $120k
        
        // Location multiplier based on Latitude (e.g. LA ~ 34.05, SF ~ 37.77 are peaks)
        // distance to SF (37.77)
        const distSF = Math.abs(latitude - 37.77);
        const distLA = Math.abs(latitude - 34.05);
        const locationBonus = Math.max(0, 3 - distSF) * 45000 + Math.max(0, 2.5 - distLA) * 35000;

        // KNN estimate: Averaging simulated near points
        const knn = basePrice + (medianIncome * 42000) + locationBonus + (households * 8);

        // SVR output: smooth radial boundary estimation
        const svr = basePrice + (Math.pow(medianIncome, 1.25) * 36000) + (locationBonus * 0.95) + (Math.sqrt(households) * 450);

        // Decision Tree output: blocky step function regions
        let dt = basePrice + locationBonus;
        if (medianIncome > 8.0) {
            dt += 320000;
        } else if (medianIncome > 4.5) {
            dt += 180000;
        } else {
            dt += 60000;
        }
        if (households > 2000) {
            dt += 20000;
        }

        return [
            { name: "K-Nearest Neighbors", prediction: knn, color: "bg-pink-500" },
            { name: "Support Vector Regressor", prediction: svr, color: "bg-violet-500" },
            { name: "Decision Tree Regressor", prediction: dt, color: "bg-amber-500" }
        ];
    }, [medianIncome, latitude, households]);

    return (
        <div className="flex flex-col gap-6">
            {/* Header sub-tabs selector */}
            <div className="flex justify-center border-b border-white/5 pb-1">
                <div className="flex gap-2 p-1 bg-black/40 border border-white/5 rounded-2xl">
                    <button
                        onClick={() => setActiveSubTab("delivery")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                            activeSubTab === "delivery"
                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                : "bg-transparent text-zinc-500 hover:text-zinc-300 border border-transparent"
                        }`}
                    >
                        <Truck className="w-4 h-4" />
                        <span>Food Delivery Time Capstone</span>
                    </button>
                    <button
                        onClick={() => setActiveSubTab("california")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                            activeSubTab === "california"
                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                : "bg-transparent text-zinc-500 hover:text-zinc-300 border border-transparent"
                        }`}
                    >
                        <Home className="w-4 h-4" />
                        <span>California Housing Estimator</span>
                    </button>
                </div>
            </div>

            {/* Layout Panels */}
            {activeSubTab === "delivery" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sliders Deck */}
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-6 backdrop-blur-md">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                            <Sliders className="w-4 h-4 text-indigo-400" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Marketplace Telemetry Inputs
                            </h4>
                        </div>

                        {/* Slider 1: Dashers Busy Ratio */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-400 flex items-center gap-1" title="Proportion of online couriers currently delivering orders.">
                                    Busy Dashers Ratio
                                    <HelpCircle className="w-3 h-3 text-zinc-600" />
                                </span>
                                <span className="font-mono text-indigo-300 font-bold">{Math.round(dashersBusyRatio * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min={0.0}
                                max={1.0}
                                step={0.05}
                                value={dashersBusyRatio}
                                onChange={(e) => setDashersBusyRatio(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>

                        {/* Slider 2: Subtotal */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-400">Subtotal ($)</span>
                                <span className="font-mono text-indigo-300 font-bold">${subtotal}</span>
                            </div>
                            <input
                                type="range"
                                min={5}
                                max={150}
                                step={1}
                                value={subtotal}
                                onChange={(e) => setSubtotal(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>

                        {/* Slider 3: Number of Items */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-400">Items Ordered</span>
                                <span className="font-mono text-indigo-300 font-bold">{items} items</span>
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={20}
                                step={1}
                                value={items}
                                onChange={(e) => setItems(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>

                        {/* Slider 4: Outstanding Orders */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-400">Outstanding Partner Orders</span>
                                <span className="font-mono text-indigo-300 font-bold">{outstandingOrders} orders</span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={80}
                                step={1}
                                value={outstandingOrders}
                                onChange={(e) => setOutstandingOrders(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Chart panel */}
                    <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between backdrop-blur-md gap-6">
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-emerald-400" />
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Model Comparison Predictions
                                </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[9px] text-zinc-500">
                                unit: Minutes
                            </span>
                        </div>

                        {/* Custom SVG Bar Chart */}
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            {deliveryPredictions.map((model, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-zinc-300">{model.name}</span>
                                        <span className="font-mono font-extrabold text-white">
                                            {model.prediction.toFixed(1)} mins
                                        </span>
                                    </div>
                                    <div className="w-full bg-black/40 h-3 rounded-md overflow-hidden border border-white/5">
                                        <motion.div
                                            className={`h-full ${model.color}`}
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${Math.min(100, (model.prediction / 45) * 100)}%` }}
                                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pipeline Insight */}
                        <div className="p-4 rounded-xl bg-black/30 border border-white/5 flex gap-3 items-start">
                            <Database className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wide">
                                    Telemetry Capstone Stats
                                </p>
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                                    Trained on 10,000+ delivery records. SVR handles extreme spikes (highly busy dashers) with non-linear kernel boundaries, while Random Forest enforces decision tree bins.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sliders Deck */}
                    <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-6 backdrop-blur-md">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                            <Sliders className="w-4 h-4 text-pink-400" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                California District Parameters
                            </h4>
                        </div>

                        {/* Slider 1: Median Income */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-400 flex items-center gap-1" title="Median household income in block group (in tens of thousands).">
                                    Median Income ($)
                                    <HelpCircle className="w-3 h-3 text-zinc-600" />
                                </span>
                                <span className="font-mono text-pink-300 font-bold">${(medianIncome * 10000).toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min={1.5}
                                max={15.0}
                                step={0.2}
                                value={medianIncome}
                                onChange={(e) => setMedianIncome(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                        </div>

                        {/* Slider 2: Latitude */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-400">Latitude</span>
                                <span className="font-mono text-pink-300 font-bold">{latitude}° N ({latitude > 36 ? "NorCal" : "SoCal"})</span>
                            </div>
                            <input
                                type="range"
                                min={32.5}
                                max={42.0}
                                step={0.1}
                                value={latitude}
                                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                        </div>

                        {/* Slider 3: Households */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-400">Block Households count</span>
                                <span className="font-mono text-pink-300 font-bold">{households.toLocaleString()} families</span>
                            </div>
                            <input
                                type="range"
                                min={100}
                                max={5000}
                                step={50}
                                value={households}
                                onChange={(e) => setHouseholds(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                        </div>
                    </div>

                    {/* Chart panel */}
                    <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between backdrop-blur-md gap-6">
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-violet-400" />
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Model Comparison Predictions
                                </h4>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[9px] text-zinc-500">
                                unit: Median House Value ($)
                            </span>
                        </div>

                        {/* Custom SVG Bar Chart */}
                        <div className="flex-1 flex flex-col justify-center gap-4">
                            {californiaPredictions.map((model, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-zinc-300">{model.name}</span>
                                        <span className="font-mono font-extrabold text-white">
                                            ${Math.round(model.prediction).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-black/40 h-3 rounded-md overflow-hidden border border-white/5">
                                        <motion.div
                                            className={`h-full ${model.color}`}
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${Math.min(100, (model.prediction / 500000) * 100)}%` }}
                                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pipeline Insight */}
                        <div className="p-4 rounded-xl bg-black/30 border border-white/5 flex gap-3 items-start">
                            <Database className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wide">
                                    KNN vs Decision Tree Estimation
                                </p>
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                                    KNN computes weights based on proximity in Latitude/Income dimensions. The Decision Tree fits hard horizontal segments, producing step-like pricing jumps at split thresholds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
