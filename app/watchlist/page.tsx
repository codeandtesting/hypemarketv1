"use client";

import { useWatchlist } from "@/lib/watchlistContext";
import { MOCK_MARKETS } from "@/lib/mockData";
import MarketCard from "@/components/MarketCard";
import Link from "next/link";
import { Star } from "lucide-react";

export default function WatchlistPage() {
    const { watchlist } = useWatchlist();

    const watchedMarkets = MOCK_MARKETS.filter(market => watchlist.includes(market.id));

    return (
        <main className="min-h-screen bg-black text-white p-6 lg:p-12">
            <div className="flex items-center gap-4 mb-8">
                <Star className="w-8 h-8 text-accent fill-accent" />
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                    Watchlist <span className="text-accent text-2xl align-top">({watchedMarkets.length})</span>
                </h1>
            </div>

            {watchedMarkets.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {watchedMarkets.map(market => (
                        <div key={market.id} className="h-[320px] bg-black">
                            <MarketCard market={market} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 border border-white/10 rounded-xl bg-white/5">
                    <Star className="w-16 h-16 text-gray-700 mb-4" />
                    <h2 className="text-2xl font-bold uppercase mb-2">Your watchlist is empty</h2>
                    <p className="text-gray-500 font-mono mb-6">Star markets to track them here.</p>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-accent text-black font-bold uppercase tracking-widest rounded hover:bg-white transition-colors"
                    >
                        Browse Markets
                    </Link>
                </div>
            )}
        </main>
    );
}
