import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SignalAvatarProps {
    src?: string;
    icon?: LucideIcon;
    alt: string;
    className?: string;
    size?: number;
}

export default function SignalAvatar({ src, icon: Icon, alt, className, size = 48 }: SignalAvatarProps) {
    return (
        <div
            className={cn("relative group bg-[#09090b] flex items-center justify-center", className)}
            style={{ width: size, height: size }}
        >
            {/* 1. Technical Border Frame (Top-Left & Bottom-Right Brackets) */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4FF00]/40 group-hover:border-[#D4FF00] transition-colors z-20" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4FF00]/40 group-hover:border-[#D4FF00] transition-colors z-20" />

            {/* 2. Secondary Brackets (Top-Right & Bottom-Left - Thinner/Darker) */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-white/40 transition-colors z-20" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-white/40 transition-colors z-20" />

            {/* 3. Content Layer */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5">
                {src ? (
                    // We treat images as "Data feeds" - saturated, sharp, high contrast
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    />
                ) : Icon ? (
                    // Icon: Sharp, Acid Green, No Glow (Tactile)
                    <Icon
                        className="w-full h-full text-[#D4FF00] transition-transform duration-200 group-hover:scale-110"
                        strokeWidth={2}
                    />
                ) : (
                    <div className="w-full h-full bg-[#111]" />
                )}
            </div>

            {/* 4. Subtle Inner Grid Background */}
            <div
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
                    backgroundSize: '8px 8px'
                }}
            />
        </div>
    );
}
