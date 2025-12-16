"use client";

import { useState, useMemo } from "react";
import MarketCard from "@/components/MarketCard";
import FeaturedEvent from "@/components/FeaturedEvent";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";
import { MOCK_MARKETS, Market } from "@/lib/mockData";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    traderClass: "ALL",
    assetType: "ALL",
    eventType: "ALL",
    sortBy: "VOLUME"
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredMarkets = useMemo(() => {
    let result = [...MOCK_MARKETS];

    // Category Filter
    if (filters.traderClass !== "ALL") {
      result = result.filter(m => m.category === filters.traderClass);
    }

    // Asset Filter
    if (filters.assetType !== "ALL") {
      result = result.filter(m => m.assetType === filters.assetType);
    }

    // Event Filter
    if (filters.eventType !== "ALL") {
      result = result.filter(m => m.eventType === filters.eventType);
    }

    // Sorting
    if (filters.sortBy === 'NEWEST') {
      result.reverse();
    }

    return result;
  }, [filters]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">

      {/* Mobile Ops Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-black border-b border-white/40 flex items-center justify-between px-4 h-12">
        <div className="font-mono text-xs font-bold text-gray-400">
          LIVE MARKETS ({filteredMarkets.length})
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 bg-white/10 px-3 py-1.5 border border-white/20 text-[10px] font-mono font-bold uppercase hover:bg-white hover:text-black transition-colors"
        >
          <Filter className="w-3 h-3" />
          FILTER / SORT +
        </button>
      </div>

      {/* Layout Grid */}
      <div className="mx-auto w-full max-w-[1920px] flex-grow grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] border-t border-white/40">

        {/* Control Sidebar (Desktop) */}
        <div className="hidden md:block sticky top-0 h-[calc(100vh-80px)] overflow-hidden">
          <FilterSidebar filters={filters} setFilters={(update) => setFilters(prev => ({ ...prev, ...update }))} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col min-h-screen border-l border-white/40">

          {/* Header Section */}
          <div className="border-b border-white/40 px-6 py-10 md:px-10 lg:px-12 bg-black/50 backdrop-blur-sm sticky top-0 md:static z-30 relative overflow-hidden">
            {/* Decorative Gigs */}
            <div className="absolute top-0 right-10 w-px h-4 bg-white/50" />
            <div className="absolute top-0 right-12 w-px h-2 bg-white/50" />
            <div className="absolute bottom-4 right-6 text-[9px] font-mono text-white/20 hidden md:block">
              SYS.VER: 4.2.0 // NODE: HYPER_01
            </div>

            <div className="flex justify-between items-end mb-2 relative">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-block text-[10px] font-mono bg-accent text-black px-1.5 py-0.5 tracking-wider font-bold">
                                    /// LIVE_FEED_V4.2
                  </div>
                  <div className="h-px w-8 bg-accent/50 hidden sm:block" />
                  <div className="text-[9px] font-mono text-accent/70 hidden sm:block">
                    EST_LATENCY: 12ms
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-light leading-tight">
                  Tracking <span className="font-black text-highlight">social liquidity</span>.
                </h1>
              </div>

              {/* Stats */}
              <div className="hidden lg:flex gap-8 font-mono text-xs text-gray-500">
                <div>
                  <span className="text-gray-600 block text-[9px] uppercase tracking-wider mb-1">24h Volume</span>
                  <span className="text-white text-lg font-bold block">$42.1M</span>
                </div>
                <div>
                  <span className="text-gray-600 block text-[9px] uppercase tracking-wider mb-1">Active Mkts</span>
                  <span className="text-white text-lg font-bold block">{filteredMarkets.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Hero Event */}
          <FeaturedEvent />

          {/* Market Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-px bg-white/40 auto-rows-fr">
            {filteredMarkets.map((market) => (
              <div key={market.id} className="bg-black">
                <MarketCard market={market} />
              </div>
            ))}
            {filteredMarkets.length === 0 && (
              <div className="col-span-full py-20 text-center font-mono text-gray-500">
                NO_MARKETS_FOUND /// RESET_FILTERS
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer (Tactical Drawer) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="relative bg-black w-full max-h-[85vh] overflow-y-auto border-t-4 border-accent flex flex-col animate-in slide-in-from-bottom duration-300">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/40 bg-black sticky top-0 z-10">
              <span className="font-mono text-sm font-bold tracking-widest text-accent">/// TACTICAL_FILTERS</span>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-white hover:text-accent font-bold"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content (Reusing FilterSidebar logic but styled for Mobile) */}
            <div className="p-6 space-y-8 flex-grow">
              {/* Trader Class */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Trader Class</label>
                <div className="grid grid-cols-2 gap-2">
                  {["ALL", "WHALES", "SCALPERS", "ALGO_BOTS"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilters(prev => ({ ...prev, traderClass: opt }))}
                      className={cn(
                        "h-12 border text-xs font-mono font-bold uppercase transition-all",
                        filters.traderClass === opt
                          ? "bg-white text-black border-white"
                          : "border-white/20 text-gray-400"
                      )}
                    >
                      {opt.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Type */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Asset Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {["ALL", "BTC_ETH", "MEMES", "PERPS"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilters(prev => ({ ...prev, assetType: opt }))}
                      className={cn(
                        "h-12 border text-xs font-mono font-bold uppercase transition-all",
                        filters.assetType === opt
                          ? "bg-white text-black border-white"
                          : "border-white/20 text-gray-400"
                      )}
                    >
                      {opt.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Sort By</label>
                <div className="flex flex-col gap-2">
                  {["VOLUME", "ENDING", "NEWEST"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilters(prev => ({ ...prev, sortBy: opt }))}
                      className={cn(
                        "h-12 border text-xs font-mono font-bold uppercase transition-all flex items-center justify-between px-4",
                        filters.sortBy === opt
                          ? "bg-accent text-black border-accent"
                          : "border-white/20 text-gray-400"
                      )}
                    >
                      <span>{opt}</span>
                      {filters.sortBy === opt && <span className="text-[10px]">●</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/40 bg-black sticky bottom-0">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full h-14 bg-white text-black font-black text-lg uppercase tracking-wider hover:bg-accent transition-colors border border-white/10"
              >
                APPLY FILTERS &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
