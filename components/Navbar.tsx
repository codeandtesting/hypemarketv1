import Link from "next/link";
import WalletButton from "./WalletButton";
import ThemeToggle from "./ThemeToggle";
import Ticker from "./Ticker";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-black border-b border-white/40">
            <div className="flex items-center justify-between px-6 py-5 lg:px-12">
                <Link href="/" className="text-4xl md:text-5xl font-black tracking-tighter text-white hover:text-accent uppercase leading-none transition-colors">
                    HYPEMARKET
                </Link>
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex gap-6 font-mono text-[10px] tracking-widest text-gray-500">
                        <Link href="/portfolio" className="hover:text-white uppercase transition-colors">
                            PORTFOLIO
                        </Link>
                        <Link href="/" className="hover:text-white uppercase transition-colors">
                            MARKETS
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <WalletButton />
                    </div>
                </div>
            </div>
            {/* Global Ticker */}
            <div className="border-t border-white/40">
                <Ticker />
            </div>
        </header>
    );
}
