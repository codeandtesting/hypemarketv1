"use client";

import SignalAvatar from "@/components/SignalAvatar";
import MarketCardVariant from "@/components/MarketCardVariant";
import { MOCK_MARKETS } from "@/lib/mockData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Import all icons used in the system
import {
    TrendingUp, TrendingDown, Bitcoin, Bot, BarChart3, Activity, CircleDollarSign, Landmark,
    AlertTriangle, DollarSign, Flame, Crosshair, Fish, Timer, Rocket, ArrowUpRight, ArrowDownRight,
    Building2, Hexagon, Sun, Scale, Clock, CalendarDays
} from "lucide-react";

// Define all icons with their categories
const ICON_CATEGORIES = [
    {
        title: "event types",
        description: "what kind of bet is this?",
        icons: [
            { icon: AlertTriangle, label: "liq_risk", desc: "liquidation warning" },
            { icon: TrendingUp, label: "roi", desc: "return metrics" },
            { icon: DollarSign, label: "pnl", desc: "profit/loss" },
        ]
    },
    {
        title: "asset types",
        description: "what is being traded?",
        icons: [
            { icon: Bitcoin, label: "btc_eth", desc: "major cryptos" },
            { icon: Flame, label: "memes", desc: "meme coins" },
            { icon: Crosshair, label: "perps", desc: "perpetuals" },
        ]
    },
    {
        title: "trader categories",
        description: "who is trading?",
        icons: [
            { icon: Fish, label: "whales", desc: "large holders" },
            { icon: Bot, label: "algo_bots", desc: "algorithmic" },
            { icon: Timer, label: "scalpers", desc: "fast trades" },
        ]
    },
    {
        title: "direction keywords",
        description: "parsed from question",
        icons: [
            { icon: Rocket, label: "pump/moon", desc: "bullish movement" },
            { icon: TrendingDown, label: "dump/crash", desc: "bearish movement" },
            { icon: ArrowUpRight, label: "long", desc: "long position" },
            { icon: ArrowDownRight, label: "short", desc: "short position" },
        ]
    },
    {
        title: "macro/external",
        description: "external events",
        icons: [
            { icon: Landmark, label: "fed/rate/cpi", desc: "federal reserve" },
            { icon: Building2, label: "etf", desc: "etf products" },
        ]
    },
    {
        title: "specific assets",
        description: "asset keywords",
        icons: [
            { icon: Bitcoin, label: "bitcoin/btc", desc: "bitcoin" },
            { icon: Hexagon, label: "ethereum/eth", desc: "ethereum" },
            { icon: Sun, label: "solana/sol", desc: "solana" },
        ]
    },
    {
        title: "metrics",
        description: "data types",
        icons: [
            { icon: CircleDollarSign, label: "price", desc: "price data" },
            { icon: BarChart3, label: "volume/vol", desc: "volume data" },
            { icon: Scale, label: "ratio", desc: "ratio metrics" },
        ]
    },
    {
        title: "time-based",
        description: "temporal keywords",
        icons: [
            { icon: Clock, label: "24h/hour", desc: "hourly timeframe" },
            { icon: CalendarDays, label: "eod", desc: "end of day" },
        ]
    },
    {
        title: "default",
        description: "fallback icon",
        icons: [
            { icon: Activity, label: "activity", desc: "generic pulse" },
        ]
    },
];

export default function TestPage() {
    const markets = MOCK_MARKETS.slice(0, 8);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-12 flex items-center gap-4">
                    <Link href="/" className="p-2 bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-mono font-medium lowercase text-white mb-1 tracking-tighter">visual prototype</h1>
                        <p className="font-mono text-gray-500 text-xs tracking-wider">graphic realism // cards + icons</p>
                    </div>
                </div>

                {/* SECTION 1: MARKET CARDS */}
                <section className="mb-20">
                    <div className="mb-6 pb-3 border-b border-[#D4FF00]/40">
                        <h2 className="font-mono text-sm lowercase text-[#D4FF00] tracking-widest">market cards</h2>
                        <p className="font-mono text-[10px] text-gray-600 mt-1">icons integrated into headers</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {markets.map((market) => (
                            <div key={market.id} className="h-[300px]">
                                <MarketCardVariant market={market} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2: ICON LIBRARY */}
                <section>
                    <div className="mb-6 pb-3 border-b border-[#D4FF00]/40">
                        <h2 className="font-mono text-sm lowercase text-[#D4FF00] tracking-widest">icon library</h2>
                        <p className="font-mono text-[10px] text-gray-600 mt-1">all available signal avatars</p>
                    </div>

                    <div className="space-y-12">
                        {ICON_CATEGORIES.map((category) => (
                            <div key={category.title}>
                                {/* Category Header */}
                                <div className="mb-6 pb-4 border-b border-white/10">
                                    <h2 className="font-mono text-sm lowercase text-[#D4FF00] tracking-widest">{category.title}</h2>
                                    <p className="font-mono text-xs text-gray-600 mt-1">{category.description}</p>
                                </div>

                                {/* Icons Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                    {category.icons.map((item) => (
                                        <div key={item.label} className="flex flex-col items-center gap-3 group">
                                            {/* Icon Container */}
                                            <SignalAvatar icon={item.icon} alt={item.label} size={64} />

                                            {/* Label */}
                                            <div className="text-center">
                                                <div className="font-mono text-xs text-white lowercase tracking-wide">{item.label}</div>
                                                <div className="font-mono text-[10px] text-gray-600 mt-0.5">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <div className="mt-24 pt-8 border-t border-white/10 text-center">
                    <p className="font-mono text-xs text-gray-700">hypemarket // signal avatar icon system v1.0</p>
                </div>
            </div>
        </div>
    );
}
