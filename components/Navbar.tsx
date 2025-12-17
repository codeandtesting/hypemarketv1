"use client";

import { useState } from "react";
import Link from "next/link";
import WalletButton from "./WalletButton";
import Ticker from "./Ticker";
import DepositModal from "./DepositModal";
import { ArrowDown } from "lucide-react";

export default function Navbar() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-black border-b border-white/40">
            <div className="flex items-center justify-between px-6 py-5 lg:px-12">
                <Link href="/" className="text-2xl md:text-5xl font-black tracking-tighter text-white hover:text-accent uppercase leading-none transition-colors">
                    HYPEMARKET
                </Link>
                <div className="flex items-center gap-3 md:gap-6">
                    <nav className="hidden md:flex gap-6 font-mono text-[10px] tracking-widest text-gray-500">
                        <Link href="/portfolio" className="hover:text-white uppercase transition-colors">
                            PORTFOLIO
                        </Link>
                        <Link href="/" className="hover:text-white uppercase transition-colors">
                            MARKETS
                        </Link>
                    </nav>
                    <div className="flex items-center gap-2 md:gap-3">
                        {isWalletConnected && (
                            <button
                                onClick={() => setShowDepositModal(true)}
                                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-accent text-black text-[10px] font-mono font-bold uppercase tracking-widest border border-accent hover:bg-white hover:border-white transition-all"
                            >
                                <ArrowDown className="w-4 h-4 md:w-3 md:h-3" />
                                <span className="hidden md:inline">Deposit</span>
                            </button>
                        )}
                        <WalletButton
                            isConnected={isWalletConnected}
                            onToggle={() => setIsWalletConnected(!isWalletConnected)}
                            onDeposit={() => setShowDepositModal(true)}
                        />
                    </div>
                </div>
            </div>
            {/* Global Ticker */}
            <div className="border-t border-white/40">
                <Ticker />
            </div>

            <DepositModal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} />
        </header>
    );
}
