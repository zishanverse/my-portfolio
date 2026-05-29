import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Simple parameter validation
        const { CO2_Emissions, Industrial_Waste, Renewable_Energy, Population } = body;
        
        if (CO2_Emissions === undefined || Industrial_Waste === undefined) {
            return NextResponse.json(
                { error: "Missing required parameters: CO2_Emissions, Industrial_Waste" },
                { status: 400 }
            );
        }

        // Lightweight mock model computation for demonstration
        const co2 = Number(CO2_Emissions);
        const waste = Number(Industrial_Waste);
        const renewable = Number(Renewable_Energy || 0.5);
        const pop = Number(Population || 1.0);

        // A simple linear combination simulating pollution severity logic
        const score = (co2 * 0.4) + (waste * 0.35) - (renewable * 0.2) + (pop * 0.1);
        const probability = Math.min(Math.max(1 / (1 + Math.exp(-score)), 0.01), 0.99);
        const prediction = probability > 0.5 ? "High Pollution Risk" : "Low Pollution Risk";

        return NextResponse.json({
            prediction,
            probability: parseFloat(probability.toFixed(3)),
            latency: "1.8ms",
            runtime: "Edge-Runtime (Serverless)",
            features_received: {
                CO2_Emissions: co2,
                Industrial_Waste: waste,
                Renewable_Energy: renewable,
                Population: pop
            },
            timestamp: new Date().toISOString()
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: "Invalid JSON payload in request body", details: err.message },
            { status: 400 }
        );
    }
}
