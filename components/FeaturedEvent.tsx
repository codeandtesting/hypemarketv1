import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedEvent() {
    return (
        <section className="border-b border-white/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Grid/Noise (Optional texture) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="p-4 md:p-5 lg:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between relative z-10">

                {/* Main Text Content */}
                <div className="flex-grow max-w-[70vw]">
                    <div className="font-mono text-accent text-[10px] md:text-xs mb-2 tracking-[0.2em] font-bold">
                        /// FEATURED_EVENT_ID: GENESIS_01
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                        <span className="inline md:block">Bitcoin </span>
                        <span className="inline md:block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">To Break </span>
                        <span className="inline md:block text-accent">$100,000?</span>
                    </h2>
                </div>

                {/* Interactive / Bet Box */}
                <div className="w-full md:w-auto flex flex-col gap-2 min-w-[240px]">
                    <div className="border border-white/40 p-3 md:p-4 bg-black/50 backdrop-blur-sm hover:border-accent transition-colors">
                        <div className="flex justify-between items-end mb-2">
                            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Current Odds</span>
                            <span className="font-mono text-[10px] text-accent uppercase tracking-widest animate-pulse">● Live</span>
                        </div>

                        <div className="flex gap-3 mb-3">
                            <div className="flex-1">
                                <div className="text-xl md:text-2xl font-black text-white">42¢</div>
                                <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Yes</div>
                            </div>
                            <div className="w-px bg-white/20" />
                            <div className="flex-1 text-right">
                                <div className="text-xl md:text-2xl font-black text-gray-500">58¢</div>
                                <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">No</div>
                            </div>
                        </div>

                        <Link href="/market/featured-01" className="block w-full">
                            <button className="w-full bg-white text-black font-black uppercase text-sm py-2 hover:bg-accent transition-colors flex items-center justify-center gap-2 group/btn">
                                Bets Open
                                <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    <div className="font-mono text-[9px] text-gray-500 text-right">
                        VOL: $14,204,912 // ENDS: 31 DEC 2025
                    </div>
                </div>
            </div>

            {/* Decorative Large Text Background - "MARATHON" style */}
            <div className="absolute -bottom-4 -left-4 text-[12vw] font-black text-white/5 leading-none pointer-events-none whitespace-nowrap select-none">
                PREDICTION
            </div>
        </section>
    );
}
