"use client";

import { cn } from "@/lib/utils";
import { Filter, Users, Coins, Activity, ArrowUpDown, PanelLeftClose } from "lucide-react";

export interface FilterState {
    traderClass: string;
    assetType: string;
    eventType: string;
    sortBy: string;
}

interface FilterSidebarProps {
    filters: FilterState;
    setFilters: (update: Partial<FilterState>) => void;
    onToggle?: () => void;
}

// ... (FilterSection helper remains the same) ...

// Helper for rendering a filter section
const FilterSection = ({
    title,
    icon: Icon,
    options,
    value,
    setFilter,
    field
}: {
    title: string;
    icon: any;
    options: { label: string; value: string }[];
    value: string;
    setFilter: (val: string) => void;
    field: keyof FilterState;
}) => (
    <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase text-gray-500 tracking-widest">
            <Icon className="w-3 h-3" />
            {title}
        </div>
        <div className="flex flex-col gap-1">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    className={cn(
                        "text-left px-3 py-2 text-xs font-mono transition-all duration-200 border border-transparent",
                        value === opt.value
                            ? "bg-accent text-black font-bold border-accent"
                            : "text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/40"
                    )}
                >
                    [{opt.label}]
                </button>
            ))}
        </div>
    </div>
);

export default function FilterSidebar({ filters, setFilters, onToggle }: FilterSidebarProps) {

    return (
        <aside className="w-full h-full bg-black md:border-r border-white/40 p-6 flex flex-col">
            <div className="mb-6 flex items-center justify-between pb-6 border-b border-white/40">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-accent" />
                    <span className="font-mono text-xs font-bold text-white tracking-widest">SYSTEM_FILTERS</span>
                </div>
                {onToggle && (
                    <button
                        onClick={onToggle}
                        className="text-gray-500 hover:text-white transition-colors"
                        title="Collapse Sidebar"
                    >
                        <PanelLeftClose className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <FilterSection
                    title="TRADER CLASS"
                    icon={Users}
                    field="traderClass"
                    value={filters.traderClass}
                    setFilter={(val) => setFilters({ traderClass: val })}
                    options={[
                        { label: "ALL CLASS", value: "ALL" },
                        { label: "WHALES", value: "WHALES" },
                        { label: "SCALPERS", value: "SCALPERS" },
                        { label: "ALGO BOTS", value: "ALGO_BOTS" },
                    ]}
                />

                <FilterSection
                    title="ASSET TYPE"
                    icon={Coins}
                    field="assetType"
                    value={filters.assetType}
                    setFilter={(val) => setFilters({ assetType: val })}
                    options={[
                        { label: "ALL ASSETS", value: "ALL" },
                        { label: "BTC / ETH", value: "BTC_ETH" },
                        { label: "MEME COINS", value: "MEMES" },
                        { label: "PERPS", value: "PERPS" },
                    ]}
                />

                <FilterSection
                    title="EVENT TYPE"
                    icon={Activity}
                    field="eventType"
                    value={filters.eventType}
                    setFilter={(val) => setFilters({ eventType: val })}
                    options={[
                        { label: "ALL EVENTS", value: "ALL" },
                        { label: "PnL MILESTONES", value: "PNL" },
                        { label: "LIQ RISK", value: "LIQ_RISK" },
                        { label: "ROI TARGETS", value: "ROI" },
                    ]}
                />

                <FilterSection
                    title="SORT BY"
                    icon={ArrowUpDown}
                    field="sortBy"
                    value={filters.sortBy}
                    setFilter={(val) => setFilters({ sortBy: val })}
                    options={[
                        { label: "HIGHEST VOLUME", value: "VOLUME" },
                        { label: "ENDING SOON", value: "ENDING" },
                        { label: "NEWEST", value: "NEWEST" },
                    ]}
                />
            </div>

            <div className="pt-6 border-t border-white/40 text-[10px] text-gray-600 font-mono text-center">
                CONTROL_DECK v2.1.0
            </div>
        </aside>
    );
}
