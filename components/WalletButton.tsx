"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MOCK_WALLET } from "@/lib/mockData";

export default function WalletButton() {
    const [isConnected, setIsConnected] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    const handleClick = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
        setIsConnected(!isConnected);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "relative border px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-200",
                "hover:bg-white hover:text-black hover:border-white",
                isConnected
                    ? "bg-accent text-black border-accent hover:bg-white"
                    : "bg-black text-white border-white/20",
                isGlitching && "scale-95"
            )}
        >
            {isConnected ? (
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-black inline-block" />
                    {MOCK_WALLET.address}
                    <span className="text-black/50">//</span>
                    ${MOCK_WALLET.balance.toLocaleString()}
                </span>
            ) : (
                <span>CONNECT</span>
            )}
        </button>
    );
}
