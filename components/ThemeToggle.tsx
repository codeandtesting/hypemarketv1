"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [isClinical, setIsClinical] = useState(false);

    useEffect(() => {
        if (isClinical) {
            document.body.classList.add("clinical-mode");
        } else {
            document.body.classList.remove("clinical-mode");
        }
    }, [isClinical]);

    return (
        <button
            onClick={() => setIsClinical(!isClinical)}
            className="p-2 border border-white/20 hover:bg-white hover:text-black hover:border-transparent transition-colors flex items-center justify-center"
            title={isClinical ? "Switch to Dark Mode" : "Switch to Clinical Mode"}
        >
            {isClinical ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
    );
}
