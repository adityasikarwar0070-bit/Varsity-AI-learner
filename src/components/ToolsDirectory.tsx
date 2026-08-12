import React, { useState } from "react";
import { AITool, ViewMode } from "../types";
import { Search, Star, ExternalLink, Bookmark, BookmarkCheck, Sparkles, Copy, Check } from "lucide-react";

interface ToolsDirectoryProps {
  tools: AITool[];
  bookmarkedToolIds: string[];
  toggleBookmark: (toolId: string) => void;
  setCurrentView: (view: ViewMode) => void;
}

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({
  tools,
  bookmarkedToolIds,
  toggleBookmark,
  setCurrentView,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const categories = [
    "All",
    "LLM & Reasoning",
    "AI Agents",
    "Video & Motion",
    "Image & 3D",
    "Code & Dev",
    "Audio & Voice",
  ];

  const filteredTools = tools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.useCase.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === "All" || t.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleCopyPrompt = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-cyan-950 border border-cyan-700/60 px-3.5 py-1 rounded-full text-xs font-semibold text-cyan-300 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            2026 Edition Directory
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Best 2026 AI Tools Directory
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Categorized directory of frontier 2026 AI tools with ratings, primary use cases, copyable prompts, and direct Playground practice.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g., Sora, DeepSeek)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const isBookmarked = bookmarkedToolIds.includes(tool.id);

            return (
              <div
                key={tool.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-xl relative group"
              >
                <div>
                  {/* Top Badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
                      {tool.badge2026}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {tool.rating}
                      </div>

                      <button
                        onClick={() => toggleBookmark(tool.id)}
                        className="text-slate-400 hover:text-cyan-300 transition-colors"
                        title="Bookmark tool"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 text-cyan-400" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tool Title & Tagline */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
                    {tool.tagline}
                  </p>

                  {/* Primary Use Case */}
                  <div className="mt-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="font-bold text-indigo-300">Primary Use Case: </span>
                    <span className="text-slate-300">{tool.useCase}</span>
                  </div>

                  {/* Key Features */}
                  <div className="mt-4 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Key Capabilities:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tool.keyFeatures.map((feat, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Example Prompt */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>Ready-to-Use Prompt:</span>
                      <button
                        onClick={() => handleCopyPrompt(tool.id, tool.examplePrompt)}
                        className="flex items-center gap-1 text-cyan-400 hover:underline"
                      >
                        {copiedPromptId === tool.id ? (
                          <>
                            <Check className="h-3 w-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[11px] text-indigo-200 overflow-x-auto">
                      "{tool.examplePrompt}"
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 border-t border-slate-800 pt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    {tool.pricing}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentView("arena")}
                      className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition-all shadow-md"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Try in Arena
                    </button>

                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-950 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white border border-slate-800 transition-all"
                      title="Open Tool Website"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
