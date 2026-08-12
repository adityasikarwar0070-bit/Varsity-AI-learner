import React from "react";
import { Sparkles, Server } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand info */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span className="font-bold text-slate-200">AI Masterclass 2026</span>
          <span className="text-slate-600">•</span>
          <span>Global AI Education Platform</span>
        </div>

        {/* Server status indicator */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <Server className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-slate-300">Gemini 3.6 Flash Server Engine: Active</span>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-slate-500">
          © 2026 AI Education Hub. All rights reserved. Dual Text ⇄ Video Mode enabled.
        </div>

      </div>
    </footer>
  );
};
