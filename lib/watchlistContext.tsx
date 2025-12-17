"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WatchlistContextType {
    watchlist: string[]; // Array of Market IDs
    addToWatchlist: (marketId: string) => void;
    removeFromWatchlist: (marketId: string) => void;
    isInWatchlist: (marketId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
    const [watchlist, setWatchlist] = useState<string[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("hypermarket_watchlist");
        if (saved) {
            try {
                setWatchlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse watchlist", e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem("hypermarket_watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (marketId: string) => {
        setWatchlist((prev) => {
            if (prev.includes(marketId)) return prev;
            return [...prev, marketId];
        });
    };

    const removeFromWatchlist = (marketId: string) => {
        setWatchlist((prev) => prev.filter((id) => id !== marketId));
    };

    const isInWatchlist = (marketId: string) => {
        return watchlist.includes(marketId);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    const context = useContext(WatchlistContext);
    if (context === undefined) {
        throw new Error("useWatchlist must be used within a WatchlistProvider");
    }
    return context;
}
