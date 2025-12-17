"use client";

import { X, ArrowDown } from "lucide-react";

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111] border border-white/10 w-full max-w-md relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 rounded-xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-xl font-bold text-white">Deposit</h2>
                        <p className="text-xs text-gray-500 font-mono">My Balance: $420.69</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
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
                                {/* Simple CSS Pattern for QR Code */}
                                <div className="w-32 h-32 bg-black opacity-20"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                                        backgroundSize: '10px 10px'
                                    }}
                                />
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
    );
}
