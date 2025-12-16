"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowDown, ArrowUp, SlidersHorizontal, ChevronDown, Wallet, DollarSign, Activity, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_POSITIONS = [
    {
        id: "p1",
        marketId: "m1",
        market: "Will Trump release the Epstein files by December 19?",
        outcome: "No",
        shares: 4.3,
        avgPrice: 0.35,
        currentPrice: 0.35,
        invested: 1.50,
        toWin: 4.29,
        value: 1.50,
        pnl: 0.00,
        pnlPercent: 0.06
    },
    {
        id: "p2",
        marketId: "m2",
        market: "Will Anthropic have the best AI model for coding at the end of 2025?",
        outcome: "Yes",
        shares: 4.2,
        avgPrice: 0.24,
        currentPrice: 0.23,
        invested: 1.00,
        toWin: 4.17,
        value: 0.96,
        pnl: -0.04,
        pnlPercent: -4.09
    }
];



const MOCK_HISTORY = [
    {
        id: "h1",
        type: "Bought",
        market: "Will Trump release the Epstein files by December 19?",
        outcome: "No",
        value: "-$1.50",
        time: "2 hours ago"
    },
    {
        id: "h2",
        type: "Bought",
        market: "Will Anthropic have the best AI model for coding at the end of 2025?",
        outcome: "Yes",
        value: "-$1.00",
        time: "2 hours ago"
    },
    {
        id: "h3",
        type: "Deposited",
        market: "Deposited funds via MetaMask",
        outcome: "USDC",
        value: "+$2.90",
        time: "2 hours ago"
    }
];

export default function PortfolioPage() {
    const [activeTab, setActiveTab] = useState<"POSITIONS" | "ORDERS" | "HISTORY">("POSITIONS");
    const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "ALL">("1M");
    const [selectedPosition, setSelectedPosition] = useState<any>(null);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    return (
        <main className="min-h-screen bg-black text-white font-sans pb-20">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/20 border-b border-white/20">

                {/* Main Content Column */}
                <div className="lg:col-span-12 bg-black min-h-[calc(100vh-140px)]">

                    {/* Top Stats Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/20">
                        {/* Left: Portfolio Balance */}
                        <div className="bg-black p-8 md:p-12 flex flex-col justify-between min-h-[300px]">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest">
                                        <Wallet className="w-4 h-4" />
                                        <span>Portfolio Value</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-mono font-bold">CONNECTED: 0x71C...9A2</span>
                                    </div>
                                </div>
                                <div className="text-6xl md:text-7xl font-black tracking-tighter mb-2">
                                    $420.69
                                </div>
                                <div className="text-sm font-mono text-green-500 flex items-center gap-2">
                                    <span>+$69.42 (19.4%)</span>
                                    <span className="text-gray-600 uppercase">Today</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    onClick={() => setShowDepositModal(true)}
                                    className="h-14 bg-accent text-black font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 text-sm border border-accent"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                    Deposit
                                </button>
                                <button
                                    onClick={() => setShowWithdrawModal(true)}
                                    className="h-14 bg-black text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm border border-white/20"
                                >
                                    <ArrowUp className="w-4 h-4" />
                                    Withdraw
                                </button>
                            </div>
                        </div>

                        {/* Right: Profit/Loss Chart Placeholder */}
                        <div className="bg-black p-8 md:p-12 flex flex-col min-h-[300px] relative overflow-hidden group">
                            <div className="flex justify-between items-start z-10 relative">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">
                                        <Activity className="w-4 h-4" />
                                        <span>Profit / Loss</span>
                                    </div>
                                    <div className="text-4xl font-bold tracking-tight text-white mb-1">
                                        +$1,294.00
                                    </div>
                                    <div className="text-xs font-mono text-gray-500 uppercase">
                                        Past Month
                                    </div>
                                </div>
                                <div className="flex gap-px bg-white/20 border border-white/20">
                                    {["1D", "1W", "1M", "ALL"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTimeframe(t as any)}
                                            className={cn(
                                                "px-3 py-1 text-[10px] font-mono font-bold transition-colors bg-black hover:bg-white/10",
                                                timeframe === t ? "text-accent bg-white/5" : "text-gray-500"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Abstract Chart Background */}
                            <div className="absolute inset-0 top-20 opacity-30 group-hover:opacity-50 transition-opacity">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path
                                        d="M0 80 Q 25 70, 50 40 T 100 20 L 100 100 L 0 100 Z"
                                        fill="url(#chartGradientPortfolio)"
                                    />
                                    <path
                                        d="M0 80 Q 25 70, 50 40 T 100 20"
                                        fill="none"
                                        stroke="#D4FF00"
                                        strokeWidth="0.5"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <defs>
                                        <linearGradient id="chartGradientPortfolio" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#D4FF00" stopOpacity="0.1" />
                                            <stop offset="100%" stopColor="#D4FF00" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Positions / Actions Section */}
                    <div className="mt-px bg-black min-h-[500px]">

                        {/* Tabs Bar */}
                        <div className="border-b border-white/20 px-8 flex gap-8">
                            {["POSITIONS", "OPEN ORDERS", "HISTORY"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={cn(
                                        "py-6 text-sm font-bold font-mono tracking-widest relative transition-colors",
                                        activeTab === tab
                                            ? "text-white"
                                            : "text-gray-500 hover:text-gray-300"
                                    )}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent shadow-[0_0_10px_#D4FF00]" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Functional Toolbar */}
                        <div className="px-8 py-6 flex flex-col md:flex-row gap-4 justify-between items-center border-b border-white/10">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="SEARCH_POSITIONS..."
                                    className="w-full bg-white/5 border border-white/20 pl-10 pr-4 py-2 text-sm font-mono text-white placeholder-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                />
                            </div>
                            <div className="flex gap-4 w-full md:w-auto">
                                <button className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 text-[10px] font-mono font-bold uppercase hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                                    <SlidersHorizontal className="w-3 h-3" />
                                    Filter Current
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 text-[10px] font-mono font-bold uppercase hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                                    Value: USD
                                    <ChevronDown className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 px-8 py-4 border-b border-white/10 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                            <div className="col-span-5">Market Outcome</div>
                            <div className="col-span-2 text-right">Price (Avg → Now)</div>
                            <div className="col-span-2 text-right">Invested</div>
                            <div className="col-span-2 text-right">To Win</div>
                            <div className="col-span-1 text-right">Value</div>
                        </div>

                        {/* Content Area */}
                        {activeTab === "POSITIONS" && (
                            <div className="divide-y divide-white/10">
                                {MOCK_POSITIONS.map((pos) => (
                                    <div key={pos.id} className="grid grid-cols-1 md:grid-cols-12 px-8 py-4 items-center gap-4 hover:bg-white/5 transition-colors group">
                                        {/* Market Info */}
                                        <div className="col-span-1 md:col-span-5 flex items-start gap-4">
                                            <div className={cn(
                                                "w-12 h-12 flex-shrink-0 flex items-center justify-center font-black text-xl bg-gray-800 text-gray-500",
                                                pos.outcome === "Yes" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                            )}>
                                                {pos.outcome === "Yes" ? "Y" : "N"}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm text-white hover:text-accent cursor-pointer line-clamp-2 md:line-clamp-1 mb-1">
                                                    {pos.market}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className={cn(
                                                        "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase",
                                                        pos.outcome === "Yes" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                                                    )}>
                                                        {pos.outcome} {Math.floor(pos.currentPrice * 100)}¢
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 font-mono">{pos.shares} shares</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Grid for Mobile / Columns for Desktop */}
                                        <div className="col-span-1 md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
                                            {/* Price */}
                                            <div className="col-span-1 md:col-span-2 text-left md:text-right font-mono text-xs">
                                                <span className="text-gray-500">{Math.floor(pos.avgPrice * 100)}¢</span>
                                                <span className="text-gray-600 mx-1">→</span>
                                                <span className={cn("font-bold", pos.currentPrice > pos.avgPrice ? "text-accent" : "text-white")}>
                                                    {Math.floor(pos.currentPrice * 100)}¢
                                                </span>
                                            </div>

                                            {/* Invested */}
                                            <div className="col-span-1 md:col-span-2 text-right font-mono text-xs text-white">
                                                ${pos.invested.toFixed(2)}
                                            </div>

                                            {/* To Win */}
                                            <div className="col-span-1 md:col-span-2 text-right font-mono text-xs text-white">
                                                <span className="hidden md:inline text-gray-600 mr-1">Max:</span>
                                                ${pos.toWin.toFixed(2)}
                                            </div>

                                            {/* Value / PnL */}
                                            <div className="col-span-1 md:col-span-1 text-right">
                                                <div className="font-mono text-xs font-bold text-white">
                                                    ${pos.value.toFixed(2)}
                                                </div>
                                                <div className={cn("text-[10px] font-mono", pos.pnl >= 0 ? "text-accent" : "text-red-500")}>
                                                    {pos.pnl >= 0 ? "+" : ""}{pos.pnl.toFixed(2)} ({pos.pnlPercent}%)
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons (Hover Only on Desktop) */}
                                        <div className="col-span-1 md:col-span-12 flex justify-end gap-2 pt-2 md:pt-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setSelectedPosition(pos)}
                                                className="px-3 py-1 bg-white/10 hover:bg-white hover:text-black text-[10px] font-mono font-bold uppercase border border-white/10 transition-colors"
                                            >
                                                Sell
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "HISTORY" && (
                            <div className="divide-y divide-white/10">
                                {MOCK_HISTORY.map((item) => (
                                    <div key={item.id} className="grid grid-cols-12 px-8 py-4 items-center gap-4 hover:bg-white/5 transition-colors">
                                        <div className="col-span-2 flex items-center gap-2">
                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center",
                                                item.type === "Bought" ? "bg-blue-500/20 text-blue-500" :
                                                    item.type === "Sold" ? "bg-amber-500/20 text-amber-500" :
                                                        "bg-gray-500/20 text-gray-500"
                                            )}>
                                                {item.type === "Bought" ? <ArrowDown className="w-3 h-3" /> :
                                                    item.type === "Sold" ? <ArrowUp className="w-3 h-3" /> :
                                                        <Activity className="w-3 h-3" />}
                                            </div>
                                            <span className="text-xs font-bold uppercase text-white">{item.type}</span>
                                        </div>

                                        <div className="col-span-6">
                                            <div className="font-bold text-sm text-white mb-0.5">{item.market}</div>
                                            <div className="flex items-center gap-2">
                                                <span className={cn(
                                                    "text-[9px] font-mono px-1 rounded-sm uppercase border",
                                                    item.outcome === "Yes" ? "border-green-500/30 text-green-500" :
                                                        item.outcome === "No" ? "border-red-500/30 text-red-500" :
                                                            "border-gray-500/30 text-gray-500"
                                                )}>
                                                    {item.outcome}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-span-2 text-right font-mono text-xs font-bold text-white">
                                            {item.value}
                                        </div>

                                        <div className="col-span-2 text-right font-mono text-[10px] text-gray-500">
                                            {item.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "ORDERS" && (
                            <div className="flex flex-col items-center justify-center py-32 text-gray-500">
                                <div className="w-12 h-12 border border-dashed border-white/20 flex items-center justify-center mb-4 rounded-full">
                                    <Activity className="w-5 h-5 opacity-50" />
                                </div>
                                <span className="font-mono text-xs uppercase tracking-widest">No Open Orders</span>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* SELL MODAL */}
            {selectedPosition && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#111] border border-white/10 w-full max-w-md relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedPosition(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8 flex flex-col items-center text-center">

                            {/* Header Icon */}
                            <div className={cn(
                                "w-16 h-16 rounded-lg flex items-center justify-center font-black text-3xl mb-4 shadow-lg",
                                selectedPosition.outcome === "Yes" ? "bg-green-500 text-black shadow-green-500/20" : "bg-red-500 text-black shadow-red-500/20"
                            )}>
                                {selectedPosition.outcome === "Yes" ? "Y" : "N"}
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-bold text-white mb-1">
                                Sell {selectedPosition.outcome}
                            </h2>
                            <p className="text-xs text-gray-500 font-mono px-4 line-clamp-2 mb-6">
                                {selectedPosition.market}
                            </p>

                            {/* Receive Box */}
                            <div className="w-full bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-2">Receive</span>
                                <div className="text-4xl font-black text-[#D4FF00] mb-2 flex items-center justify-center gap-1">
                                    <span className="text-2xl opacity-50">$</span>
                                    {(selectedPosition.shares * selectedPosition.currentPrice).toFixed(2)}
                                </div>
                                <div className="text-[10px] font-mono text-gray-500">
                                    Selling {selectedPosition.shares} shares @ {Math.floor(selectedPosition.currentPrice * 100)}¢
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => {
                                    alert("Sold!");
                                    setSelectedPosition(null);
                                }}
                                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-green-900/20 transition-all active:scale-95 mb-4"
                            >
                                Cash Out
                            </button>

                            {/* Footer Link */}
                            <Link
                                href={`/market/${selectedPosition.marketId}`}
                                className="text-xs text-gray-500 hover:text-white transition-colors underline font-mono"
                            >
                                Edit Order
                            </Link>

                        </div>
                    </div>
                </div>
            )}
            {/* DEPOSIT MODAL */}
            {showDepositModal && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#111] border border-white/10 w-full max-w-md relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 rounded-xl">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <div>
                                <h2 className="text-xl font-bold text-white">Deposit</h2>
                                <p className="text-xs text-gray-500 font-mono">My Balance: $420.69</p>
                            </div>
                            <button onClick={() => setShowDepositModal(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="border border-accent/20 bg-accent/5 rounded-lg p-4 mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center font-bold">
                                        <ArrowDown className="w-4 h-4" />
                                    </div>
                                    <div className="font-bold text-white">Transfer Crypto</div>
                                </div>
                                <p className="text-xs text-gray-400">Deposit USDC via supported networks.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Select Network</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            className="flex items-center gap-2 p-3 rounded-lg border border-accent bg-accent/10 text-white transition-all"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="font-bold text-sm">Solana</span>
                                        </button>
                                        {["Ethereum", "BNB Chain", "Avalanche"].map(net => (
                                            <button key={net} disabled className="flex items-center gap-2 p-3 rounded-lg border border-white/5 bg-white/5 text-gray-600 cursor-not-allowed opacity-50">
                                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                                <span className="font-bold text-sm">{net}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-center py-4">
                                    <div className="bg-white p-2 rounded-lg">
                                        <div className="w-32 h-32 bg-black pattern-grid-lg opacity-20" />
                                        {/* Placeholder for QR Code - using a pattern for now */}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Your Deposit Address (Solana)</label>
                                    <div className="flex gap-2">
                                        <input
                                            readOnly
                                            value="Solana_Address_Example_8829...x99"
                                            className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-gray-400 focus:outline-none"
                                        />
                                        <button className="px-3 py-2 bg-white/10 hover:bg-white hover:text-black rounded-lg text-xs font-bold transition-all">
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* WITHDRAW MODAL */}
            {showWithdrawModal && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#111] border border-white/10 w-full max-w-md relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 rounded-xl">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">Withdraw</h2>
                            <button onClick={() => setShowWithdrawModal(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Recipient Address</label>
                                <input
                                    placeholder="Enter Solana address..."
                                    className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder-gray-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Amount</label>
                                    <span className="text-xs font-mono text-gray-500">Available: $420.69 USDC</span>
                                </div>
                                <div className="relative">
                                    <input
                                        placeholder="0.00"
                                        className="w-full bg-black border border-white/20 rounded-lg pl-4 pr-16 py-3 text-lg font-mono text-white placeholder-gray-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/10 hover:bg-white hover:text-black rounded text-[10px] font-bold uppercase transition-colors">
                                        Max
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Network</label>
                                <div className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 flex items-center justify-between cursor-not-allowed opacity-80">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="font-bold text-sm text-white">Solana</span>
                                    </div>
                                    <span className="text-[10px] text-accent font-mono uppercase">Active</span>
                                </div>
                                <p className="text-[10px] text-gray-600 mt-2">
                                    * Only Solana withdrawals are currently enabled for this MVP. Other networks are under maintenance.
                                </p>
                            </div>

                            <button className="w-full py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                Enter Recipient Address
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
