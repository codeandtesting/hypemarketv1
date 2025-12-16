import { useState } from "react";
import { Market } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TrendingUp, X } from "lucide-react";

interface MarketCardProps {
    market: Market;
}

// Deterministic pseudo-random number generator
function mulberry32(a: number) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export default function MarketCard({ market }: MarketCardProps) {
    // Generate unique pattern based on market ID
    const seed = parseInt(market.id.replace(/\D/g, '') || '0');
    const rand = mulberry32(seed);

    const [amount, setAmount] = useState("10");
    const [expandedOutcome, setExpandedOutcome] = useState<string | null>(null);
    const [executionStep, setExecutionStep] = useState<"IDLE" | "PROCESSING" | "SUCCESS">("IDLE");

    // 1. Randomize Grid Density (4x4, 8x8, or 12x12)
    const gridDensity = [4, 8, 12][Math.floor(rand() * 3)];
    const cellSize = 100 / gridDensity;

    // ... shapes generation ...
    // (Keep shapes generation logic here as is, lines 31-82)
    // To minimize context, I will just provide the new handler and updated return structure logic in the next chunk.
    // However, I need to make sure I don't lose the shape logic if I replace the top block.
    // I will replace the state definition and add the handler.

    const handleExecuteTrade = () => {
        setExecutionStep("PROCESSING");

        // Fast, aggressive timing
        setTimeout(() => {
            setExecutionStep("SUCCESS");

            setTimeout(() => {
                setExpandedOutcome(null);
                setExecutionStep("IDLE");
                setAmount("10");
            }, 1000);
        }, 800);
    };

    // 2. Generate Random Shapes
    const numShapes = Math.floor(rand() * 8) + 4; // 4 to 12 shapes
    const shapes = Array.from({ length: numShapes }).map((_, i) => {
        const isLine = rand() > 0.7;
        let width, height;

        if (isLine) {
            // Thin lines
            if (rand() > 0.5) { // Horizontal
                width = (Math.floor(rand() * gridDensity) + 1) * cellSize;
                height = cellSize / 4; // Very thin
            } else { // Vertical
                width = cellSize / 4;
                height = (Math.floor(rand() * gridDensity) + 1) * cellSize;
            }
        } else {
            // Blocks
            width = (Math.floor(rand() * (gridDensity / 2)) + 1) * cellSize;
            height = (Math.floor(rand() * (gridDensity / 2)) + 1) * cellSize;
        }

        const top = Math.floor(rand() * gridDensity) * cellSize;
        const left = Math.floor(rand() * gridDensity) * cellSize;

        // Colors & Textures
        const typeRoll = rand();
        let fill = '#111'; // Default
        let opacity = rand() * 0.4 + 0.1;
        let hasPattern = false;

        if (typeRoll > 0.96) { // Ultra Rare (Red/Orange Warning)
            fill = '#ff3333';
            opacity = 0.6;
        } else if (typeRoll > 0.90) { // Rare Accent (Acid Green)
            fill = '#c2fe0c';
            opacity = 0.5;
        } else if (typeRoll > 0.85) { // Rare Accent (Electric Blue)
            fill = '#0044ff';
            opacity = 0.5;
        } else if (typeRoll > 0.70) { // Light Grey / White Overlay
            fill = '#333';
            opacity = 0.2;
        } else if (typeRoll > 0.50) { // Patterned Block
            hasPattern = true;
            opacity = 0.15;
        } else {
            // Dark Base Blocks
            const val = Math.floor(rand() * 20); // 0-20
            fill = `rgb(${val},${val},${val})`;
            opacity = 0.8;
        }

        return { width, height, top, left, fill, opacity, hasPattern, isLine };
    });

    // Determine if binary (same logic as page)
    const isBinary = market.outcomes.length === 2 &&
        (market.outcomes[0].label.toUpperCase() === "YES" || market.outcomes[0].label.toUpperCase() === "LONG" || market.outcomes[0].label.toUpperCase() === "PUMP");

    const getOutcomeColor = (label: string) => {
        const l = label.toUpperCase();
        if (l === "YES" || l === "LONG" || l === "PUMP") return "bg-[#D4FF00] text-black border-[#D4FF00]";
        if (l === "NO" || l === "SHORT" || l === "DUMP") return "bg-red-500 text-black border-red-500";
        return "bg-white text-black border-white";
    };

    const handleQuickBet = (e: React.MouseEvent, outcomeId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedOutcome(outcomeId);
    };

    const selectedOutcomeObj = expandedOutcome ? market.outcomes.find(o => o.id === expandedOutcome) : null;

    return (
        <div className="group block h-full relative">
            {/* Main Background Link */}
            <Link href={`/market/${market.id}`} className="absolute inset-0 z-0" />

            <div
                className={cn(
                    "relative flex h-full flex-col justify-between overflow-hidden bg-black p-6 transition-all duration-200 border border-transparent",
                    "hover:border-accent hover:bg-accent/5"
                )}
            >
                {/* Generative Background Pattern (remains same) */}
                <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                    {/* ... (svg content remains same) ... */}
                    <svg width="100%" height="100%" preserveAspectRatio="none">
                        <defs>
                            <pattern id={`grid-${market.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
                            </pattern>
                            <pattern id={`hatch-${market.id}`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <rect width="2" height="4" transform="translate(0,0)" fill="white" opacity="0.3"></rect>
                            </pattern>
                            <filter id='noiseFilter'>
                                <feTurbulence type='fractalNoise' baseFrequency='0.6' stitchTiles='stitch' />
                                <feColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0' />
                            </filter>
                        </defs>
                        <rect width='100%' height='100%' filter='url(#noiseFilter)' opacity='0.4' />
                        {shapes.map((block, i) => (
                            <rect
                                key={i}
                                x={`${block.left}%`}
                                y={`${block.top}%`}
                                width={`${block.width}%`}
                                height={`${block.height}%`}
                                fill={block.hasPattern ? (i % 2 === 0 ? `url(#grid-${market.id})` : `url(#hatch-${market.id})`) : block.fill}
                                opacity={block.opacity}
                            />
                        ))}
                    </svg>
                </div>

                {/* Content Wrapper (z-10 to sit above overlay) */}
                <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none w-full">

                    {expandedOutcome && selectedOutcomeObj ? (
                        // QUICK BET INTERFACE
                        <div className="flex flex-col h-full justify-between pointer-events-auto bg-black absolute inset-0 z-20 p-6 animate-in fade-in zoom-in-95 duration-200">

                            {executionStep === "IDLE" ? (
                                <>
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex flex-col">
                                            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1">
                                                Placing Order
                                            </div>
                                            <h3 className="font-sans font-bold text-lg leading-tight text-white line-clamp-2">
                                                {market.question}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setExpandedOutcome(null);
                                            }}
                                            className="text-gray-500 hover:text-white transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Controls */}
                                    <div className="space-y-4">
                                        {/* Amount Input Row */}
                                        <div className="flex gap-2">
                                            <div className="flex-1 relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">$</div>
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/20 rounded-lg py-2 pl-6 pr-2 text-white font-mono font-bold focus:outline-none focus:border-accent transition-colors"
                                                />
                                            </div>
                                            <button onClick={() => setAmount((prev) => (parseInt(prev || "0") + 1).toString())} className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-xs font-mono font-bold hover:bg-white/10 transition-colors">+1</button>
                                            <button onClick={() => setAmount((prev) => (parseInt(prev || "0") + 10).toString())} className="px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-xs font-mono font-bold hover:bg-white/10 transition-colors">+10</button>
                                        </div>

                                        {/* Slider Visual */}
                                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-1/3" />
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            onClick={handleExecuteTrade}
                                            className={cn(
                                                "w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center gap-0.5",
                                                getOutcomeColor(selectedOutcomeObj.label)
                                            )}
                                        >
                                            <span>Buy {selectedOutcomeObj.label}</span>
                                            <span className="text-[10px] opacity-70 font-mono">To win ${(parseFloat(amount || "0") / selectedOutcomeObj.price).toFixed(2)}</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // ANIMATION STATE
                                <div className="flex flex-col items-center justify-center h-full space-y-4">
                                    {executionStep === "PROCESSING" && (
                                        <>
                                            <div className="w-8 h-8 border-2 border-white/20 border-t-accent rounded-full animate-spin" />
                                            <div className="font-mono text-xs text-accent animate-pulse">
                                                EXECUTING...
                                            </div>
                                        </>
                                    )}

                                    {executionStep === "SUCCESS" && (
                                        <>
                                            <div className="text-4xl">
                                                ✅
                                            </div>
                                            <div className="text-center">
                                                <div className="font-black italic text-2xl uppercase text-white">
                                                    FILLED
                                                </div>
                                                <div className="font-mono text-xs text-gray-400 mt-1">
                                                    {selectedOutcomeObj.label} // ${amount}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        // REGULAR CARD CONTENT
                        <>
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4 pointer-events-auto">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] text-gray-500 group-hover:text-gray-400 uppercase tracking-widest transition-colors">
                                            m{market.id.replace('m00', '')}
                                        </span>
                                        <span className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors">{"//"}</span>
                                        <span className="font-mono text-[10px] text-gray-500 group-hover:text-gray-400 uppercase transition-colors">
                                            {market.traderName}
                                        </span>
                                    </div>
                                </div>
                                {market.isHot && (
                                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold font-mono">
                                        <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
                                        <span className="text-accent">LIVE</span>
                                    </div>
                                )}
                            </div>

                            {/* Main Content */}
                            <div className="flex-grow mb-6 pointer-events-auto">
                                <Link href={`/market/${market.id}`} className="block">
                                    <h3 className="font-sans font-bold text-lg md:text-xl leading-tight uppercase text-white group-hover:text-accent transition-colors">
                                        {market.question}
                                    </h3>
                                </Link>
                            </div>

                            {/* Footer Data */}
                            <div className="space-y-4 pointer-events-auto">

                                {/* Interactive Outcomes */}
                                {isBinary ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => handleQuickBet(e, market.outcomes[0].id)}
                                            className="flex-1 flex justify-between items-center px-3 py-2 bg-white/5 border border-white/10 hover:bg-[#D4FF00] hover:border-[#D4FF00] hover:text-black group/btn transition-all group-hover:translate-y-0 translate-y-0"
                                        >
                                            <span className="font-mono text-xs font-bold uppercase transition-colors text-green-500 group-hover/btn:text-black">{market.outcomes[0].label}</span>
                                            <span className="font-mono text-sm font-bold">{Math.floor(market.outcomes[0].price * 100)}¢</span>
                                        </button>
                                        <button
                                            onClick={(e) => handleQuickBet(e, market.outcomes[1].id)}
                                            className="flex-1 flex justify-between items-center px-3 py-2 bg-white/5 border border-white/10 hover:bg-red-500 hover:border-red-500 hover:text-black group/btn transition-all"
                                        >
                                            <span className="font-mono text-xs font-bold uppercase transition-colors text-red-500 group-hover/btn:text-black">{market.outcomes[1].label}</span>
                                            <span className="font-mono text-sm font-bold">{Math.floor(market.outcomes[1].price * 100)}¢</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1.5 max-h-[85px] overflow-y-auto pr-2 no-scrollbar hover:scrollbar-thumb-white/20 scrollbar-thin scrollbar-track-transparent">
                                        {market.outcomes.map((outcome, i) => (
                                            <button
                                                key={outcome.id || i}
                                                onClick={(e) => handleQuickBet(e, outcome.id)}
                                                className="flex justify-between items-center px-2 py-1.5 bg-white/5 border border-white/5 hover:bg-white hover:text-black transition-all text-left group/item"
                                            >
                                                <div className="text-[10px] font-mono text-gray-400 group-hover/item:text-black uppercase truncate max-w-[120px]">
                                                    {outcome.label}
                                                </div>
                                                <div className="text-xs font-mono font-bold text-white group-hover/item:text-black">
                                                    {Math.floor(outcome.price * 100)}¢
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Meta & Verification */}
                                <div className="flex items-end justify-between pt-2 transition-colors relative">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 group-hover:text-accent/80 transition-colors" title="Data Verified On-Chain">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 border border-green-500" />
                                            <span className="font-mono tracking-wider text-[9px]">VERIFIED: HYPERLIQUID_DB</span>
                                        </div>
                                        <div className="flex items-center gap-2 font-mono text-[10px] text-gray-600 group-hover:text-gray-500 transition-colors">
                                            <span>VOL: {market.volume}</span>
                                            <span className="text-gray-800">•</span>
                                            <span className={cn(
                                                "font-bold",
                                                market.change.startsWith("+") ? "text-accent" : "text-red-500"
                                            )}>
                                                {market.change}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Industrial "Gigs" (Decorations) */}
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50 group-hover:border-accent transition-colors" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50 group-hover:border-accent transition-colors" />

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}

