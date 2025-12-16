"use client";

import { cn } from "@/lib/utils";

const MOCK_TICKER_ITEMS = [
    { user: "USER_0x2a", action: "BOUGHT", outcome: "YES", market: "GCR_LIQ", price: "34¢", type: "buy" },
    { user: "USER_0x9f", action: "SOLD", outcome: "NO", market: "ANSEM_PNL", price: "12¢", type: "sell" },
    { user: "USER_0xb4", action: "BOUGHT", outcome: "LONG", market: "COBIE_DIR", price: "55¢", type: "buy" },
    { user: "USER_0x1c", action: "BOUGHT", outcome: "YES", market: "HSAKA_ROI", price: "89¢", type: "buy" },
    { user: "USER_0x7d", action: "SOLD", outcome: "SHORT", market: "ETH_BTC", price: "42¢", type: "sell" },
    { user: "USER_0xe3", action: "BOUGHT", outcome: ">95K", market: "BTC_PRICE", price: "15¢", type: "buy" }
];

export default function Ticker() {
    return (
        <div className="w-full overflow-hidden border-b border-white/10 bg-black py-1.5 hidden md:block">
            <div className="animate-marquee whitespace-nowrap font-mono text-[10px] tracking-wide text-gray-400">
                {[...MOCK_TICKER_ITEMS, ...MOCK_TICKER_ITEMS].map((item, i) => (
                    <span key={i} className="mx-6 inline-block">
                        <span className="text-gray-600">[{item.user}]</span>
                        <span className={cn(
                            "mx-2 font-bold",
                            item.type === 'buy' ? "text-accent" : "text-red-500"
                        )}>
                            {item.action}
                        </span>
                        <span className="text-white">[{item.outcome}]</span>
                        <span className="mx-2">ON</span>
                        <span className="text-white border-b border-gray-800">[{item.market}]</span>
                        <span className="ml-2 text-gray-500">@ {item.price}</span>
                    </span>
                ))}
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
