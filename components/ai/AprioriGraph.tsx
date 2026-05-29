"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Network, ArrowRight } from "lucide-react";
import { RuleInspector } from "./RuleInspector";
import { AssociationControls } from "./AssociationControls";
import { InsightGenerator } from "./InsightGenerator";
import { GraphLegend } from "./GraphLegend";

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
    size: number;
    color: string;
    glowingColor: string;
}

interface Edge {
    source: string;
    target: string;
    support: number;
    confidence: number;
    lift: number;
}

const INITIAL_NODES: Node[] = [
    { id: "logging", label: "Wood Logging", x: 100, y: 150, size: 14, color: "fill-blue-400", glowingColor: "rgba(96, 165, 250, 0.4)" },
    { id: "agriculture", label: "Agri Expansion", x: 180, y: 80, size: 12, color: "fill-yellow-400", glowingColor: "rgba(250, 204, 21, 0.4)" },
    { id: "deforestation", label: "Deforestation", x: 300, y: 150, size: 20, color: "fill-red-400", glowingColor: "rgba(248, 113, 113, 0.5)" },
    { id: "co2", label: "CO2 Rise", x: 420, y: 100, size: 15, color: "fill-purple-400", glowingColor: "rgba(192, 132, 252, 0.4)" },
    { id: "fire", label: "Forest Fire", x: 260, y: 240, size: 13, color: "fill-amber-400", glowingColor: "rgba(251, 146, 60, 0.4)" },
    { id: "erosion", label: "Soil Erosion", x: 400, y: 220, size: 12, color: "fill-teal-400", glowingColor: "rgba(45, 212, 191, 0.4)" }
];

const EDGES: Edge[] = [
    { source: "logging", target: "deforestation", support: 0.38, confidence: 0.88, lift: 2.15 },
    { source: "agriculture", target: "deforestation", support: 0.29, confidence: 0.74, lift: 1.82 },
    { source: "deforestation", target: "co2", support: 0.45, confidence: 0.92, lift: 3.10 },
    { source: "fire", target: "deforestation", support: 0.22, confidence: 0.81, lift: 2.30 },
    { source: "deforestation", target: "erosion", support: 0.31, confidence: 0.85, lift: 2.65 },
    { source: "logging", target: "fire", support: 0.15, confidence: 0.62, lift: 1.55 }
];

export const AprioriGraph = () => {
    const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
    const [minSupport, setMinSupport] = useState(0.20);
    const [minConfidence, setMinConfidence] = useState(0.60);
    const [minLift, setMinLift] = useState(1.50);

    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [hoveredEdge, setHoveredEdge] = useState<Edge | null>(null);
    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

    const [activeDragNode, setActiveDragNode] = useState<string | null>(null);

    const svgRef = useRef<SVGSVGElement | null>(null);

    const getCoordinates = (nodeId: string) => {
        const node = nodes.find(n => n.id === nodeId);
        return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
    };

    const getNodeLabel = (nodeId: string) => {
        return nodes.find(n => n.id === nodeId)?.label ?? nodeId;
    };

    // Filter edges dynamically based on Support, Confidence, and Lift threshold settings
    const activeEdges = EDGES.filter(edge => 
        edge.support >= minSupport &&
        edge.confidence >= minConfidence &&
        edge.lift >= minLift
    );

    // Draggable nodes logic: translates page mouse coordinates to SVG 500x300 viewBox grid
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
        if (!activeDragNode) return;
        const svg = svgRef.current;
        if (!svg) return;

        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

        const rect = svg.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 500;
        const y = ((clientY - rect.top) / rect.height) * 300;

        setNodes(prev => prev.map(node => 
            node.id === activeDragNode 
                ? { ...node, x: Math.max(15, Math.min(485, x)), y: Math.max(15, Math.min(285, y)) } 
                : node
        ));
    };

    const handleMouseUpOrLeave = () => {
        setActiveDragNode(null);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 select-none">
            {/* SVG Graph Network Screen */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between backdrop-blur-md min-h-[350px] relative">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2">
                    <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Interactive Rule Association Map
                        </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-950 font-mono text-[9px] text-zinc-500">
                        drag nodes to restructure layout
                    </span>
                </div>

                <svg
                    ref={svgRef}
                    viewBox="0 0 500 300"
                    className="w-full h-auto overflow-visible cursor-grab active:cursor-grabbing"
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onTouchEnd={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >
                    {/* Active filtered edges lines */}
                    {activeEdges.map((edge, idx) => {
                        const start = getCoordinates(edge.source);
                        const end = getCoordinates(edge.target);
                        
                        const isHovered = hoveredEdge === edge || selectedEdge === edge;
                        const isNodeHighlighted = hoveredNode && (edge.source === hoveredNode || edge.target === hoveredNode);
                        const isHighlighted = isHovered || isNodeHighlighted;
                        const isDimmed = (hoveredNode && edge.source !== hoveredNode && edge.target !== hoveredNode) ||
                                         (hoveredEdge && hoveredEdge !== edge) ||
                                         (selectedEdge && selectedEdge !== edge && !hoveredEdge);

                        return (
                            <g key={idx} className="cursor-pointer" onClick={() => setSelectedEdge(edge)}>
                                <line
                                    x1={start.x}
                                    y1={start.y}
                                    x2={end.x}
                                    y2={end.y}
                                    stroke={isHighlighted ? "#10b981" : "rgba(255,255,255,0.08)"}
                                    strokeWidth={isHighlighted ? 3.5 : 1.5}
                                    opacity={isDimmed ? 0.15 : 1}
                                    className="transition-all duration-150"
                                    onMouseEnter={() => setHoveredEdge(edge)}
                                    onMouseLeave={() => setHoveredEdge(null)}
                                />
                                
                                {/* Direction signal packet */}
                                {!isDimmed && (
                                    <circle
                                        cx={(start.x + end.x) / 2}
                                        cy={(start.y + end.y) / 2}
                                        r="3.5"
                                        className="fill-emerald-400/90"
                                    />
                                )}
                            </g>
                        );
                    })}

                    {/* Nodes group circles */}
                    {nodes.map((node) => {
                        const isConnected = activeEdges.some(e => e.source === node.id || e.target === node.id);
                        
                        const isHovered = hoveredNode === node.id;
                        const isEdgeHighlighted = (hoveredEdge && (hoveredEdge.source === node.id || hoveredEdge.target === node.id)) ||
                                                  (selectedEdge && (selectedEdge.source === node.id || selectedEdge.target === node.id));
                        const isHighlighted = isHovered || isEdgeHighlighted;
                        
                        const isDimmed = !isConnected || 
                                         ((hoveredNode && hoveredNode !== node.id) && !isEdgeHighlighted) ||
                                         ((hoveredEdge || selectedEdge) && !isEdgeHighlighted);

                        return (
                            <g
                                key={node.id}
                                className="cursor-pointer"
                                onMouseDown={() => setActiveDragNode(node.id)}
                                onTouchStart={() => setActiveDragNode(node.id)}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                {/* Glowing backdrop circle */}
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={node.size + (isHighlighted ? 9 : 4)}
                                    fill={isHighlighted ? node.glowingColor : "transparent"}
                                    className="transition-all duration-300"
                                />

                                {/* Main Node Circle */}
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={node.size}
                                    className={`${node.color} transition-all duration-300`}
                                    opacity={isDimmed ? 0.25 : 1}
                                />

                                {/* Node Title */}
                                <text
                                    x={node.x}
                                    y={node.y + node.size + 12}
                                    textAnchor="middle"
                                    fill={isHighlighted ? "#fff" : "#999"}
                                    fontSize="8.5"
                                    fontFamily="monospace"
                                    fontWeight="bold"
                                    opacity={isDimmed ? 0.25 : 1}
                                    className="transition-all duration-300"
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Config controls and detail inspectors */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6 min-h-[350px]">
                <AssociationControls
                    minSupport={minSupport}
                    setMinSupport={setMinSupport}
                    minConfidence={minConfidence}
                    setMinConfidence={setMinConfidence}
                    minLift={minLift}
                    setMinLift={setMinLift}
                    activeCount={activeEdges.length}
                    totalCount={EDGES.length}
                />

                <RuleInspector
                    edge={hoveredEdge || selectedEdge}
                    nodeLabel={hoveredNode ? getNodeLabel(hoveredNode) : null}
                    getNodeLabel={getNodeLabel}
                />

                <InsightGenerator
                    minSupport={minSupport}
                    minConfidence={minConfidence}
                />

                <GraphLegend />
            </div>
        </div>
    );
};
