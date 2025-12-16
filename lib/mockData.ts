export interface Outcome {
    id: string;
    label: string;
    price: number;
}

export interface Market {
    id: string;
    traderName: string;
    traderHandle: string;
    avatarUrl?: string;
    question: string;
    outcomes: Outcome[];
    volume: string;
    change: string;
    isHot?: boolean;
    category: 'WHALES' | 'SCALPERS' | 'ALGO_BOTS' | 'ALL';
    assetType: 'BTC_ETH' | 'MEMES' | 'PERPS';
    eventType: 'PNL' | 'LIQ_RISK' | 'ROI';
}

const BASE_MARKETS: Market[] = [
    {
        id: "m001",
        traderName: "Ansem",
        traderHandle: "@blknoiz06",
        question: "ANSEM PNL > 35% BY 12:00 UTC?",
        outcomes: [{ id: "o1", label: "YES", price: 0.85 }, { id: "o2", label: "NO", price: 0.15 }],
        volume: "$4.2M",
        change: "+12%",
        isHot: true,
        category: 'WHALES',
        assetType: 'MEMES',
        eventType: 'PNL'
    },
    {
        id: "m002",
        traderName: "GCR",
        traderHandle: "@GCRClassic",
        question: "GCR: PREDICTED LIQUIDATION PRICE",
        outcomes: [{ id: "o1", label: "< $90K", price: 0.30 }, { id: "o2", label: "$90K+", price: 0.70 }],
        volume: "$12.5M",
        change: "-5%",
        category: 'WHALES',
        assetType: 'BTC_ETH',
        eventType: 'LIQ_RISK'
    },
    {
        id: "m003",
        traderName: "Cobie",
        traderHandle: "@cobie",
        question: "COBIE: NEXT TRADE DIRECTION?",
        outcomes: [{ id: "o1", label: "LONG", price: 0.60 }, { id: "o2", label: "SHORT", price: 0.40 }],
        volume: "$890K",
        change: "+2%",
        category: 'WHALES',
        assetType: 'PERPS',
        eventType: 'ROI'
    },
    {
        id: "m004",
        traderName: "Hsaka",
        traderHandle: "@HsakaTrades",
        question: "HSAKA: 24H ROI > 100%?",
        outcomes: [{ id: "o1", label: "YES", price: 0.10 }, { id: "o2", label: "NO", price: 0.90 }],
        volume: "$2.1M",
        change: "+8%",
        isHot: true,
        category: 'SCALPERS',
        assetType: 'PERPS',
        eventType: 'ROI'
    },
    {
        id: "m005",
        traderName: "Mural",
        traderHandle: "@Mural",
        question: "ETH/BTC RATIO END OF DAY",
        outcomes: [{ id: "o1", label: "< 0.05", price: 0.25 }, { id: "o2", label: "> 0.05", price: 0.75 }],
        volume: "$5.6M",
        change: "-1%",
        category: 'ALGO_BOTS',
        assetType: 'BTC_ETH',
        eventType: 'PNL'
    },
];

const FINAL_MARKETS = [
    {
        id: "featured-01",
        traderName: "Satoshi",
        traderHandle: "@nakedSatoshi",
        question: "BITCOIN: PUMP OR DUMP BY DEC 31?",
        outcomes: [{ id: "o1", label: "PUMP", price: 0.56 }, { id: "o2", label: "DUMP", price: 0.44 }],
        volume: "$420.0M",
        change: "+69%",
        isHot: true,
        category: 'WHALES',
        assetType: 'BTC_ETH',
        eventType: 'PNL'
    },
    ...BASE_MARKETS
] as Market[];

// Generate 32+ item dataset
export const MOCK_MARKETS: Market[] = Array.from({ length: 32 }).map((_, i) => {
    if (i < FINAL_MARKETS.length) return FINAL_MARKETS[i];

    const base = BASE_MARKETS[i % BASE_MARKETS.length];
    return {
        ...base,
        id: `m${String(i + 1).padStart(3, '0')}`,
        volume: `$${(Math.random() * 10 + 0.5).toFixed(1)}M`,
        change: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 20)}%`,
        isHot: Math.random() > 0.8,
        // Rotate categories/types for filter testing
        category: ['WHALES', 'SCALPERS', 'ALGO_BOTS'][i % 3] as any,
        assetType: ['BTC_ETH', 'MEMES', 'PERPS'][i % 3] as any,
    };
});

export const MOCK_WALLET = {
    address: "0x71C...9A2",
    balance: 420.69,
    isConnected: false
};
