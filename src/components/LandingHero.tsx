import React from "react";
import { ViewMode, ContentFormat } from "../types";
import { Sparkles, ArrowRight, PlayCircle, FileText, CheckCircle2, ShieldCheck, Zap, Bot, Terminal, Cpu, Flame } from "lucide-react";

interface LandingHeroProps {
  setCurrentView: (view: ViewMode) => void;
  preferredFormat: ContentFormat;
  toggleFormat: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  setCurrentView,
  preferredFormat,
  toggleFormat,
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100 py-12 md:py-20 border-b border-slate-800">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-indigo-500/30 px-4 py-1.5 rounded-full shadow-lg shadow-indigo-950/50">
            <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
            <span className="text-xs font-medium text-slate-200">
              2026 Future-Ready Curriculum: <span className="text-cyan-300 font-semibold">DeepSeek V4, Claude 4, Sora Pro & Autonomous AI Agents</span>
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            A to Z AI Tools & Skills <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Text ⇄ Video Dual-Learning Platform
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            A comprehensive, modern full-stack hub for mastering AI skills! <span className="text-cyan-300 font-semibold">Instantly switch</span> between interactive Text and Video formats, experiment with top 2026 AI tools, and master prompt engineering in the live AI Playground.
          </p>

          {/* Format Toggle Highlight Bar */}
          <div className="mt-8 inline-flex items-center gap-3 bg-slate-900 border border-slate-700/80 p-2 rounded-2xl shadow-xl">
            <span className="text-xs font-semibold text-slate-400 pl-3">Active Format Mode:</span>
            <button
              onClick={toggleFormat}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/30"
            >
              {preferredFormat === "text" ? (
                <>
                  <FileText className="h-4 w-4" />
                  Text Format Active
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  Video Format Active
                </>
              )}
              <span className="bg-slate-950/60 px-2 py-0.5 rounded text-[11px] text-cyan-200 border border-cyan-400/30">
                Click to Switch ⇄
              </span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView("arena")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-5 w-5" />
              Enter Learning Arena
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => setCurrentView("tools")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all"
            >
              <Cpu className="h-5 w-5 text-indigo-400" />
              Explore 2026 AI Tools Directory
            </button>

            <button
              onClick={() => setCurrentView("architecture")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium px-5 py-3.5 rounded-xl border border-slate-800 text-sm transition-all"
            >
              <Terminal className="h-4 w-4 text-emerald-400" />
              Tech Architecture & DB Schema
            </button>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-900/70 border border-slate-800/80 p-6 rounded-2xl hover:border-indigo-500/40 transition-all">
            <div className="h-10 w-10 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center mb-4">
              <Zap className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1">Dual-Learning Toggle</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Switch between Text and Video formats with a single click. Full transcripts, jump timestamps, and code blocks included.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-6 rounded-2xl hover:border-indigo-500/40 transition-all">
            <div className="h-10 w-10 rounded-xl bg-purple-950 border border-purple-800/60 flex items-center justify-center mb-4">
              <Bot className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1">Live AI Playground</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Test prompts, agent decision logic, and prompt optimization powered by the server-side Gemini 3.6 Flash engine.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-6 rounded-2xl hover:border-indigo-500/40 transition-all">
            <div className="h-10 w-10 rounded-xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center mb-4">
              <Cpu className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1">2026 AI Directory</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Comprehensive guides and copyable prompts for cutting-edge tools like DeepSeek V4, Claude 4, Sora Pro, Devin 2.0, and Midjourney v7.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800/80 p-6 rounded-2xl hover:border-indigo-500/40 transition-all">
            <div className="h-10 w-10 rounded-xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center mb-4">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1">Interactive Quizzes & Notes</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Take instant knowledge check quizzes after each module, save custom study notes, and track your overall learning progress.
            </p>
          </div>

        </div>

        {/* 2026 AI Industry Readiness Stats Banner */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <CheckCircle2 className="h-4 w-4" />
              2026 AI Industry Benchmark
            </div>
            <h4 className="text-xl font-bold text-white">Why Learn 2026 Multi-Modal & Agentic AI?</h4>
            <p className="text-xs text-slate-300 max-w-xl">
              In 2026, over 82% of enterprise workflows rely on Autonomous AI Agents and Multi-Modal Video/Code pipelines rather than simple static chatbots.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8">
            <div>
              <div className="text-2xl font-black text-cyan-400">100%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Hands-On Practice</div>
            </div>
            <div>
              <div className="text-2xl font-black text-indigo-400">4+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Core Modules</div>
            </div>
            <div>
              <div className="text-2xl font-black text-purple-400">2026</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Future-Ready Stack</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
