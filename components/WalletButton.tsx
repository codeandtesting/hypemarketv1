"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MOCK_WALLET } from "@/lib/mockData";
import { LogOut, LayoutDashboard, ArrowDown, Box, Star } from "lucide-react";
import Link from "next/link";

interface WalletButtonProps {
    isConnected: boolean;
    onToggle: () => void;
    onDeposit?: () => void;
}

export default function WalletButton({ isConnected, onToggle, onDeposit }: WalletButtonProps) {
    const [isGlitching, setIsGlitching] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleConnect = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
        onToggle();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // 5-Color Palette
    const PIXEL_COLORS = [
        "#c2fe0c", // Neon Lime
        "#000000", // Black
        "#ffffff", // White
        "#5200ff", // Electric Blue
        "#8e8e8e", // Grey
    ];

    // 8x8 Pixel Art Avatar (64 total pixels)
    // In a real app, seed this with the wallet address
    const Avatar = () => (
        <div className="w-6 h-6 md:w-7 md:h-7 grid grid-cols-8 grid-rows-8 border border-white/20 relative">
            {/* Grid Lines Overlay */}
            <div className="absolute inset-0 z-10 grid grid-cols-8 grid-rows-8 pointer-events-none">
                {Array.from({ length: 64 }).map((_, i) => (
                    <div key={`grid-${i}`} className="border-[0.5px] border-white/10" />
                ))}
            </div>

            {Array.from({ length: 64 }).map((_, i) => (
                <div
                    key={i}
                    className="w-full h-full"
                    style={{
                        backgroundColor: PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
                    }}
                />
            ))}
        </div>
    );

    if (!isConnected) {
        return (
            <button
                onClick={handleConnect}
                className={cn(
                    "relative border px-3 py-2 md:px-5 md:py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-200",
                    "hover:bg-white hover:text-black hover:border-white bg-black text-white border-white/20",
                    isGlitching && "scale-95"
                )}
            >
                <span>CONNECT</span>
            </button>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 border border-white/20 bg-black hover:bg-white/5 transition-colors p-1 rounded-sm group active:scale-95 duration-100"
            >
                <div className="relative">
                    <Avatar />
                </div>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#09090b] border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100 flex flex-col">

                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                        <div className="scale-125">
                            <Avatar />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white leading-none">FAAZYBABY</span>
                            <span className="text-[10px] font-mono text-gray-500 mt-1">{MOCK_WALLET.address}</span>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="p-4 bg-white/5 border-b border-white/10">
                        <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Total Balance</div>
                        <div className="text-xl font-bold text-[#D4FF00]">${MOCK_WALLET.balance.toLocaleString()}</div>
                    </div>



                    {/* Menu Items */}
                    <div className="p-2 flex flex-col gap-1">
                        <Link
                            href="/portfolio"
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wide">Portfolio</span>
                        </Link>
                        <Link
                            href="/watchlist"
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <Star className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wide">Watchlist</span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <Box className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wide">Markets</span>
                        </Link>
                        <button
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded text-gray-300 hover:text-white transition-colors w-full text-left"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                if (onDeposit) onDeposit();
                            }}
                        >
                            <ArrowDown className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wide">Deposit</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-white/10">
                        <button
                            onClick={() => {
                                onToggle();
                                setIsDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-red-500/10 rounded text-gray-400 hover:text-red-500 transition-colors w-full text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-xs font-mono font-bold uppercase tracking-wide">Disconnect</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
