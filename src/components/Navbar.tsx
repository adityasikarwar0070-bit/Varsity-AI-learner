import React from "react";
import { ViewMode, ContentFormat } from "../types";
import { Sparkles, BookOpen, Layers, Cpu, Code, CheckCircle, Video, FileText } from "lucide-react";

interface NavbarProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  preferredFormat: ContentFormat;
  toggleFormat: () => void;
  completedCount: number;
  totalLessons: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  preferredFormat,
  toggleFormat,
  completedCount,
  totalLessons
}) => {
  const percentage = Math.round((completedCount / (totalLessons || 1)) * 100);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentView("landing")}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                AI Masterclass 2026
              </span>
              <span className="text-[10px] font-semibold tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.5 rounded-full">
                GLOBAL AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">A to Z AI Tools & Skills Hub</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setCurrentView("landing")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentView === "landing"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView("courses")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              currentView === "courses"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Curriculum
          </button>
          <button
            onClick={() => setCurrentView("arena")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              currentView === "arena"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 text-cyan-300"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Layers className="h-4 w-4 text-cyan-400" />
            Learning Arena
          </button>
          <button
            onClick={() => setCurrentView("tools")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              currentView === "tools"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Cpu className="h-4 w-4" />
            2026 AI Tools
          </button>
          <button
            onClick={() => setCurrentView("architecture")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              currentView === "architecture"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Code className="h-4 w-4" />
            Tech Architecture
          </button>
        </nav>

        {/* Right Actions & Global Mode Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Format Toggle Pill */}
          <button
            onClick={toggleFormat}
            title="Switch dual-learning mode between Text & Video format"
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all shadow-inner group"
          >
            <span className="text-slate-400 text-[10px] uppercase tracking-wider hidden sm:inline">Format:</span>
            <span className="flex items-center gap-1 bg-indigo-950/80 text-indigo-300 border border-indigo-700/60 px-2 py-0.5 rounded-md group-hover:border-cyan-400">
              {preferredFormat === "text" ? (
                <>
                  <FileText className="h-3.5 w-3.5 text-cyan-400" />
                  Text Mode
                </>
              ) : (
                <>
                  <Video className="h-3.5 w-3.5 text-purple-400" />
                  Video Mode
                </>
              )}
            </span>
            <span className="text-cyan-400 font-bold text-xs">⇄</span>
          </button>

          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <div className="text-xs">
              <span className="text-slate-400">Progress: </span>
              <span className="font-bold text-emerald-400">{percentage}%</span>
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden bg-slate-950 border-t border-slate-800 px-2 py-1.5 overflow-x-auto gap-2">
        <button
          onClick={() => setCurrentView("landing")}
          className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap ${
            currentView === "landing" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentView("courses")}
          className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap ${
            currentView === "courses" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          Curriculum
        </button>
        <button
          onClick={() => setCurrentView("arena")}
          className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap ${
            currentView === "arena" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          Learning Arena
        </button>
        <button
          onClick={() => setCurrentView("tools")}
          className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap ${
            currentView === "tools" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          2026 AI Directory
        </button>
        <button
          onClick={() => setCurrentView("architecture")}
          className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap ${
            currentView === "architecture" ? "bg-indigo-600 text-white" : "text-slate-400"
          }`}
        >
          Architecture
        </button>
      </div>
    </header>
  );
};
