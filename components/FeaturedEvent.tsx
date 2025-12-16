import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedEvent() {
    return (
        <section className="border-b border-white/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Grid/Noise (Optional texture) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="p-6 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 items-end justify-between relative z-10">

                {/* Main Text Content */}
                <div className="flex-grow max-w-[80vw]">
                    <div className="font-mono text-accent text-xs md:text-sm mb-4 tracking-[0.2em] font-bold">
                        /// FEATURED_EVENT_ID: GENESIS_01
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase">
                        <span className="block">Bitcoin</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">To Break</span>
                        <span className="block text-accent">$100,000?</span>
                    </h2>
                </div>

                {/* Interactive / Bet Box */}
                <div className="w-full md:w-auto flex flex-col gap-6 min-w-[300px]">
                    <div className="border border-white/40 p-6 bg-black/50 backdrop-blur-sm hover:border-accent transition-colors">
                        <div className="flex justify-between items-end mb-4">
                            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Current Odds</span>
                            <span className="font-mono text-xs text-accent uppercase tracking-widest animate-pulse">● Live</span>
                        </div>

                        <div className="flex gap-4 mb-6">
                            <div className="flex-1">
                                <div className="text-4xl font-black text-white">42¢</div>
                                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Yes</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="flex-1 text-right">
                                <div className="text-4xl font-black text-gray-500">58¢</div>
                                <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">No</div>
                            </div>
                        </div>

                        <Link href="/market/featured-01" className="block w-full">
                            <button className="w-full bg-white text-black font-black uppercase text-xl py-4 hover:bg-accent transition-colors flex items-center justify-center gap-2 group/btn">
                                Bets Open
                                <ArrowUpRight className="w-5 h-5 group-hover/btn:rotate-45 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    <div className="font-mono text-[10px] text-gray-500 text-right">
                        VOL: $14,204,912 // ENDS: 31 DEC 2025
                    </div>
                </div>
            </div>

            {/* Decorative Large Text Background - "MARATHON" style */}
            <div className="absolute -bottom-10 -left-10 text-[20vw] font-black text-white/5 leading-none pointer-events-none whitespace-nowrap select-none">
                PREDICTION
            </div>
        </section>
    );
}
