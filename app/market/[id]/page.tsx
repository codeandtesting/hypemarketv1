"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_MARKETS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronRight, Info, Clock, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";

export default function MarketPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const market = MOCK_MARKETS.find((m) => m.id === id);
    const [amount, setAmount] = useState("");
    const [selectedSide, setSelectedSide] = useState<"YES" | "NO" | null>("YES");
    const [isExecuting, setIsExecuting] = useState(false);

    if (!market) return notFound();

    // Determine if it's a binary Yes/No market for the simplified UI
    const isBinary = market.outcomes.length === 2 &&
        (market.outcomes[0].label.toUpperCase() === "YES" || market.outcomes[0].label.toUpperCase() === "LONG" || market.outcomes[0].label.toUpperCase() === "PUMP");

    // ... inside MarketPage ...
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayStep, setOverlayStep] = useState<"PROCESSING" | "SUCCESS">("PROCESSING");

    const handleExecute = () => {
        if (!amount || (isBinary && !selectedSide)) return;
        setIsExecuting(true);
        setShowOverlay(true);
        setOverlayStep("PROCESSING");

        // Use a longer delay to show the "generation" effect
        setTimeout(() => {
            setOverlayStep("SUCCESS");

            // Auto close after success
            setTimeout(() => {
                setIsExecuting(false);
                setShowOverlay(false);
                setAmount("");
                setSelectedSide("YES"); // Reset to default
            }, 1000); // Faster close
        }, 800); // Faster processing
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col font-sans relative overflow-hidden">
            {/* Transaction Overlay */}
            {showOverlay && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center cursor-wait">

                    {/* Background Grid/Noise */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    {/* Content Container */}
                    <div className="relative z-10 w-full max-w-md p-8 border-2 border-[#D4FF00] bg-black">

                        {/* Corner Decorations */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#D4FF00]" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#D4FF00]" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#D4FF00]" />
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#D4FF00]" />

                        {overlayStep === "PROCESSING" && (
                            <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                                <div className="text-[#D4FF00] font-mono text-xs tracking-[0.2em] animate-pulse">
                                    /// INITIATING_BLOCK_SEQUENCE
                                </div>

                                {/* Glitchy Loader */}
                                <div className="w-16 h-16 border-4 border-[#D4FF00] border-t-transparent rounded-full animate-spin" />

                                <div className="w-full space-y-2 font-mono text-[10px] text-gray-500 overflow-hidden h-24 border-t border-b border-white/10 py-2">
                                    <div className="animate-pulse">
                                        &gt; CONNECTING_TO_NODE_04... <span className="text-green-500">OK</span><br />
                                        &gt; VERIFYING_LIQUIDITY_POOLS... <span className="text-green-500">OK</span><br />
                                        &gt; SIGNING_TX: 0x7F...9A2<br />
                                        &gt; GAS_EST: 0.0004 ETH<br />
                                        &gt; MINING_BLOCK_HASH...
                                    </div>
                                </div>
                            </div>
                        )}

                        {overlayStep === "SUCCESS" && (
                            <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in-50 duration-200">
                                <div className="text-6xl text-[#D4FF00] animate-bounce">
                                    <CheckCircle className="w-20 h-20" />
                                </div>

                                <div className="text-center space-y-2">
                                    <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                                        ORDER EXECUTED
                                    </h2>
                                    <div className="bg-[#D4FF00] text-black px-4 py-1 font-mono text-sm font-bold inline-block transform -skew-x-12">
                                        POS_ID: #882910
                                    </div>
                                </div>

                                <div className="w-full border-t border-dashed border-white/20 pt-4 mt-4 grid grid-cols-2 gap-4 text-xs font-mono">
                                    <div className="text-gray-500">AMOUNT:</div>
                                    <div className="text-right text-white font-bold">${amount}</div>

                                    <div className="text-gray-500">SIDE:</div>
                                    <div className={cn("text-right font-bold", selectedSide === "NO" ? "text-red-500" : "text-[#D4FF00]")}>
                                        {isBinary ? selectedSide : "LONG"}
                                    </div>

                                    <div className="text-gray-500">SHARES:</div>
                                    <div className="text-right text-white">
                                        {(parseFloat(amount || "0") / (isBinary ? market.outcomes[selectedSide === "YES" ? 0 : 1].price : 0.5)).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Top Bar */}
            <div className="border-b border-white/20 p-4 flex items-center gap-4 bg-black z-50">
                <Link href="/" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white uppercase tracking-widest group">
                    <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                    Back_To_Feed
                </Link>
                <div className="h-4 w-px bg-white/20" />
                <span className="text-xs font-mono text-gray-600">MARKET_ID: {market.id}</span>
            </div>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 max-w-[1920px] mx-auto w-full">

                {/* LEFT CONTENT COLUMN (8/12) */}
                <div className="lg:col-span-8 border-r border-white/20 flex flex-col">

                    {/* Header Block */}
                    <div className="p-8 border-b border-white/20">
                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-gray-500">
                                    <span className="bg-white/10 px-2 py-0.5 text-white">Category: {market.traderName}</span>
                                    <span>//</span>
                                    <span className="text-accent">Live Trading</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tight">
                                    {market.question}
                                </h1>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className={cn("text-4xl font-mono font-bold", market.change.startsWith("+") ? "text-accent" : "text-red-500")}>
                                    {market.change}
                                </div>
                                <div className="text-[10px] text-gray-500 font-mono uppercase mt-1">24H Volume: {market.volume}</div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="min-h-[400px] relative p-8 border-b border-white/20 flex flex-col bg-white/[0.02]">
                        <div className="absolute top-4 left-4 text-[10px] font-mono text-gray-600 flex gap-4">
                            <span>CHART_VIEW: 1H</span>
                            <span>•</span>
                            <span>INDICATORS: OFF</span>
                        </div>

                        {/* Probability Chart */}
                        <div className="relative flex-grow mt-8 border-l border-b border-white/10 ml-8 mb-6 mr-8">
                            {/* Y-Axis Labels */}
                            <div className="absolute right-0 top-0 h-full flex flex-col justify-between translate-x-full pl-2">
                                {[100, 75, 50, 25, 0].map((val) => (
                                    <span key={val} className="text-[10px] font-mono text-gray-600 -translate-y-1/2">
                                        {val}%
                                    </span>
                                ))}
                            </div>

                            {/* X-Axis Labels */}
                            <div className="absolute bottom-0 left-0 w-full flex justify-between translate-y-full pt-2">
                                {["SEP", "OCT", "NOV", "DEC"].map((val) => (
                                    <span key={val} className="text-[10px] font-mono text-gray-600">
                                        {val}
                                    </span>
                                ))}
                            </div>

                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-full h-px bg-white/5" />
                                ))}
                            </div>

                            {(() => {
                                // --- CHART LOGIC START ---
                                // We'll generate synthetic data points for the visualization
                                // In a real app, this would come from an API
                                const isMultiLine = market.outcomes[0].label.toUpperCase() !== "YES";
                                const totalPoints = 100;
                                const width = 900;
                                const height = 300;

                                // Helper component for a single line
                                const ChartLine = ({ points, color, isActive, isDashed = false }: { points: any[], color: string, isActive: boolean, isDashed?: boolean }) => {
                                    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
                                    return (
                                        <>
                                            <polyline
                                                points={polylinePoints}
                                                fill="none"
                                                stroke={color}
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                                strokeLinecap="round"
                                                strokeDasharray={isDashed ? "4 4" : "none"}
                                                vectorEffect="non-scaling-stroke"
                                                filter={isActive ? "url(#glow)" : undefined}
                                                opacity={isActive ? 1 : 0.4}
                                            />
                                            {isActive && (
                                                <polygon
                                                    points={`0,${height} ${polylinePoints} ${width},${height}`}
                                                    fill={`url(#gradient-${color.replace('#', '')})`}
                                                    opacity="0.3"
                                                />
                                            )}
                                        </>
                                    );
                                };

                                // Helper for deterministic randomness
                                const simpleHash = (str: string) => {
                                    let hash = 0;
                                    for (let i = 0; i < str.length; i++) {
                                        hash = ((hash << 5) - hash) + str.charCodeAt(i);
                                        hash |= 0;
                                    }
                                    return Math.abs(hash);
                                };

                                const seededRandom = (seed: number) => {
                                    const x = Math.sin(seed) * 10000;
                                    return x - Math.floor(x);
                                };

                                // Generate points for all relevant outcomes
                                const allSeries = useMemo(() => {
                                    const outcomesToChart = isMultiLine ? market.outcomes : [market.outcomes[0]];
                                    const marketSeed = simpleHash(market.id);

                                    return outcomesToChart.map((outcome, idx) => {
                                        const points = [];
                                        let currentVal = 0.5; // Start at 50%

                                        // Create a unique seed base for this line
                                        const lineSeed = marketSeed + (idx * 9999);

                                        for (let i = 0; i < totalPoints; i++) {
                                            // Drift towards the target final price
                                            const progress = i / totalPoints;
                                            const target = outcome.price;

                                            // Deterministic random walk
                                            // Use i as part of seed for variation per point
                                            const r1 = seededRandom(lineSeed + i * 13.37);

                                            const noise = (r1 - 0.5) * 0.1;
                                            const bias = (target - currentVal) * 0.1;

                                            currentVal += noise + bias;
                                            // Clamp
                                            currentVal = Math.max(0.01, Math.min(0.99, currentVal));

                                            // Force the last few points to converge nicely to the actual price
                                            if (i > totalPoints - 5) {
                                                currentVal = target;
                                            }

                                            points.push({
                                                x: (i / (totalPoints - 1)) * width,
                                                y: (1 - currentVal) * height, // Invert Y (0 is top)
                                                val: currentVal,
                                                date: new Date(Date.now() - (totalPoints - i) * 86400000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                            });
                                        }
                                        return { outcome, points, color: idx === 0 ? "#D4FF00" : "#ffffff" };
                                    });
                                }, [market.id, market.outcomes, isMultiLine]);

                                const [hoverData, setHoverData] = useState<{ x: number, y: number, date: string, values: { label: string, val: number, color: string }[] } | null>(null);

                                const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const ratio = x / rect.width;
                                    const chartX = ratio * width;

                                    // Find nearest point index from the first series
                                    // Assumes all series have same x intervals
                                    const samplePoints = allSeries[0].points;
                                    let nearestIdx = 0;
                                    let minDiff = Infinity;

                                    samplePoints.forEach((p, i) => {
                                        const diff = Math.abs(p.x - chartX);
                                        if (diff < minDiff) {
                                            minDiff = diff;
                                            nearestIdx = i;
                                        }
                                    });

                                    const values = allSeries.map(s => ({
                                        label: s.outcome.label,
                                        val: s.points[nearestIdx].val,
                                        color: s.color
                                    }));

                                    setHoverData({
                                        x: samplePoints[nearestIdx].x,
                                        y: samplePoints[nearestIdx].y, // Not really used for multi-tooltip Y pos
                                        date: samplePoints[nearestIdx].date,
                                        values
                                    });
                                };

                                const handleMouseLeave = () => {
                                    setHoverData(null);
                                };

                                const isHovering = !!hoverData;

                                // For default display (end of chart), show current prices
                                const currentValues = allSeries.map(s => ({
                                    label: s.outcome.label,
                                    val: s.points[s.points.length - 1].val,
                                    color: s.color,
                                    y: s.points[s.points.length - 1].y,
                                    x: s.points[s.points.length - 1].x
                                }));

                                return (
                                    <div
                                        className="relative w-full h-full cursor-crosshair group"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="gradient-D4FF00" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#D4FF00" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#D4FF00" stopOpacity="0" />
                                                </linearGradient>
                                                <linearGradient id="gradient-ffffff" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                                </linearGradient>
                                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                            </defs>

                                            {/* Render Lines */}
                                            {allSeries.map((series, i) => (
                                                <ChartLine
                                                    key={i}
                                                    points={series.points}
                                                    color={series.color}
                                                    isActive={true}
                                                />
                                            ))}

                                            {/* Cursor Line */}
                                            {isHovering && (
                                                <line
                                                    x1={hoverData.x}
                                                    y1="0"
                                                    x2={hoverData.x}
                                                    y2={height}
                                                    stroke="white"
                                                    strokeWidth="1"
                                                    strokeDasharray="4 4"
                                                    opacity="0.5"
                                                />
                                            )}

                                            {/* Active Dots (Hover or Default) */}
                                            {(isHovering ? hoverData.values : currentValues).map((val, i) => {
                                                const yPos = isHovering
                                                    ? (1 - val.val) * height
                                                    : (val as any).y;
                                                const xPos = isHovering ? hoverData.x : (val as any).x;

                                                return (
                                                    <circle
                                                        key={i}
                                                        cx={xPos}
                                                        cy={yPos}
                                                        r={isHovering ? 5 : 4}
                                                        fill={val.color}
                                                        className={cn("transition-all duration-75", !isHovering && "animate-pulse")}
                                                    />
                                                );
                                            })}
                                        </svg>

                                        {/* Tooltip */}
                                        {isHovering && (
                                            <div
                                                className="absolute pointer-events-none transition-all duration-75 z-20 top-0"
                                                style={{ left: `${(hoverData.x / width) * 100}%` }}
                                            >
                                                <div className={cn(
                                                    "bg-black/90 border border-white/20 px-3 py-2 rounded-sm transform -translate-x-1/2 mt-4",
                                                    "shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm"
                                                )}>
                                                    <div className="text-[10px] font-mono text-gray-400 mb-2 border-b border-white/10 pb-1 text-center">
                                                        {hoverData.date}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        {hoverData.values.map((v, i) => (
                                                            <div key={i} className="flex items-center gap-2 justify-between min-w-[100px]">
                                                                <span className="text-[10px] font-bold" style={{ color: v.color }}>{v.label}</span>
                                                                <span className="font-mono text-sm font-bold text-white">{(v.val * 100).toFixed(1)}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Default Labels (Right Side) - Hidden on hover */}
                                        {!isHovering && currentValues.map((v, i) => (
                                            <div
                                                key={i}
                                                className="absolute right-0 translate-x-full pl-2 flex items-center"
                                                style={{ top: `${(v.y / height) * 100}%`, transform: 'translate(5px, -50%)' }}
                                            >
                                                <span className="text-xs font-mono font-bold" style={{ color: v.color }}>
                                                    {(v.val * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                        ))}

                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    {/* RULES & TIMELINE GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/20">
                        {/* Rules Section */}
                        <div className="p-8 border-r border-white/20">
                            <div className="flex items-center gap-2 mb-6 text-accent">
                                <Info className="w-4 h-4" />
                                <span className="font-mono text-xs font-bold uppercase tracking-widest">Rules Summary</span>
                            </div>
                            <div className="prose prose-invert prose-sm">
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    The market will resolve to <strong className="text-white">"YES"</strong> if {market.traderName} officially reports or on-chain data confirms the event "{market.question}" by the resolution date.
                                </p>
                                <div className="bg-white/5 p-4 border border-white/10 text-xs font-mono space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">SOURCE</span>
                                        <span className="text-white">HYPERLIQUID_DB / X_API</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">VERIFICATION</span>
                                        <span className="text-accent">ON-CHAIN ORACLE</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">EXPIRY</span>
                                        <span className="text-white">12 DEC 2025, 12:00 UTC</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Section */}
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-6 text-accent">
                                <Clock className="w-4 h-4" />
                                <span className="font-mono text-xs font-bold uppercase tracking-widest">Timeline</span>
                            </div>
                            <div className="relative pl-4 border-l border-white/20 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-accent rounded-full border-2 border-black" />
                                    <h4 className="text-sm font-bold text-white">Market Open</h4>
                                    <span className="text-xs text-gray-500 font-mono">12 DEC 2024, 10:00 AM</span>
                                </div>
                                <div className="relative opacity-50">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-600 rounded-full border-2 border-black" />
                                    <h4 className="text-sm font-bold text-white">Event Resolution</h4>
                                    <span className="text-xs text-gray-500 font-mono">Pending Outcome</span>
                                </div>
                                <div className="relative opacity-30">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-black" />
                                    <h4 className="text-sm font-bold text-white">Payout Distribution</h4>
                                    <span className="text-xs text-gray-500 font-mono">~30m after resolution</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageSquare className="w-4 h-4 text-gray-500" />
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">Live Intel (3)</span>
                        </div>
                        <div className="space-y-4 max-w-2xl">
                            {[
                                { user: "Whale_0x99", text: "On-chain flows suggest heavy accumulation. This is a clear YES.", time: "2m ago" },
                                { user: "FadeGod", text: "Fading this. The setup looks weak.", time: "15m ago" },
                                { user: "Sys_Admin", text: "Liquidity injection detected from unknown wallet.", time: "1h ago" }
                            ].map((comment, i) => (
                                <div key={i} className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
                                    <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center font-bold text-xs">
                                        {comment.user[0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-bold text-white">{comment.user}</span>
                                            <span className="text-[10px] text-gray-500 font-mono">{comment.time}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT INTERACTION COLUMN (4/12) - Sticky */}
                <div className="lg:col-span-4 flex flex-col h-full bg-black lg:border-l border-white/20 sticky top-0 font-sans">

                    {/* Header Tabs */}
                    <div className="flex border-b border-white/20">
                        {["Buy", "Sell"].map(tab => (
                            <button
                                key={tab}
                                className={cn(
                                    "flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors relative",
                                    "hover:bg-white/5",
                                    tab === "Buy" ? "text-white" : "text-gray-500" // For now, just styling Buy as active
                                )}
                            >
                                {tab}
                                {tab === "Buy" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 flex flex-col gap-6">

                        {/* Market Type Dropdown (Visual Only) */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-mono text-xs uppercase">Order Type</span>
                            <button className="flex items-center gap-2 text-sm font-bold hover:text-gray-300">
                                Market <ChevronRight className="w-4 h-4 rotate-90" />
                            </button>
                        </div>

                        {/* Outcome Toggle Buttons */}
                        {isBinary ? (
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setSelectedSide("YES")}
                                    className={cn(
                                        "py-4 px-2 rounded-lg border-2 flex flex-col items-center justify-center transition-all relative overflow-hidden",
                                        selectedSide === "YES"
                                            ? "bg-[#D4FF00] border-[#D4FF00] text-black shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                                    )}
                                >
                                    <span className="text-lg font-black uppercase mb-1">{market.outcomes[0].label}</span>
                                    <span className="font-mono text-sm font-bold">{Math.floor(market.outcomes[0].price * 100)}¢</span>
                                </button>
                                <button
                                    onClick={() => setSelectedSide("NO")}
                                    className={cn(
                                        "py-4 px-2 rounded-lg border-2 flex flex-col items-center justify-center transition-all relative overflow-hidden",
                                        selectedSide === "NO"
                                            ? "bg-[#D4FF00] border-[#D4FF00] text-black shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                                    )}
                                >
                                    <span className="text-lg font-black uppercase mb-1">{market.outcomes[1].label}</span>
                                    <span className="font-mono text-sm font-bold">{Math.floor(market.outcomes[1].price * 100)}¢</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {market.outcomes.map((outcome) => (
                                    <button
                                        key={outcome.id}
                                        className="w-full flex justify-between items-center p-4 border border-white/20 hover:bg-white hover:text-black transition-all"
                                    >
                                        <span className="font-mono text-sm font-bold">{outcome.label}</span>
                                        <span className="font-mono text-xl font-bold">{Math.floor(outcome.price * 100)}¢</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div>
                            <div className="flex justify-between items-baseline mb-3">
                                <label className="text-sm font-bold text-gray-300">Amount</label>
                                <span className="text-xs font-mono text-gray-500">Balance: $420.69</span>
                            </div>
                            <div className="relative group">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-black border border-white/20 p-4 pr-12 text-3xl font-mono text-white placeholder-gray-800 outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-all rounded-lg text-right"
                                    placeholder="0"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-gray-600 pointer-events-none group-focus-within:text-[#D4FF00] transition-colors">$</span>
                            </div>

                            {/* Quick Amounts */}
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                                {["+1", "+20", "+100", "Max"].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => {
                                            if (val === "Max") setAmount("420.69");
                                            else setAmount(prev => (parseFloat(prev || "0") + parseFloat(val.replace("+", ""))).toString());
                                        }}
                                        className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-bold hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                                    >
                                        {val === "Max" ? "Max" : `$${val.replace("+", "")}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="space-y-3 pt-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <span className="text-sm">To win</span>
                                    <span className="text-[10px] bg-green-500/20 text-green-500 px-1 rounded">
                                        {((parseFloat(amount || "0") / (isBinary ? market.outcomes[selectedSide === "YES" ? 0 : 1].price : 0.5)) - parseFloat(amount || "0")).toFixed(2)}%
                                    </span>
                                </div>
                                <span className="text-2xl font-bold text-[#D4FF00]">
                                    ${(parseFloat(amount || "0") / (isBinary ? market.outcomes[selectedSide === "YES" ? 0 : 1].price : 0.5)).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500 font-mono border-t border-white/10 pt-3">
                                <span>Avg. Price</span>
                                <span>{Math.floor((isBinary ? market.outcomes[selectedSide === "YES" ? 0 : 1].price : 0.5) * 100)}¢</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                                <span>Shares</span>
                                <span>{(parseFloat(amount || "0") / (isBinary ? market.outcomes[selectedSide === "YES" ? 0 : 1].price : 0.5)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                                <span>Est. Fee</span>
                                <span>$0.00</span>
                            </div>
                        </div>

                        {/* Main Action Button */}
                        <button
                            onClick={handleExecute}
                            disabled={!amount || isExecuting || (isBinary && !selectedSide)}
                            className={cn(
                                "w-full py-4 text-base font-black uppercase tracking-widest rounded-lg transition-all flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,255,0,0.1)]",
                                "bg-[#3B82F6] hover:bg-[#2563EB] text-white border-none" // Using Blue as per Polymarket requested style, or keep accent? User said "interface should act like this", implied visual similarity. Let's use Blue to standout as Action.
                            )}
                            style={{ backgroundColor: selectedSide === 'NO' ? '#EF4444' : '#22C55E' }} // Dynamic color based on side: Green for Yes, Red for No.
                        >
                            {isExecuting ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <span>Buy {isBinary ? (selectedSide === "YES" ? market.outcomes[0].label : market.outcomes[1].label) : "Position"}</span>
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-[10px] text-gray-600">By trading, you agree to the <span className="underline cursor-pointer hover:text-gray-400">Terms of Use</span>.</p>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
