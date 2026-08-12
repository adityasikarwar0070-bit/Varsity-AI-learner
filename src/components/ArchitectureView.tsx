import React, { useState } from "react";
import { TECH_STACK_RECOMMENDATION, PRISMA_DATABASE_SCHEMA } from "../data/architectureData";
import { CURRICULUM_MODULES } from "../data/curriculumData";
import { Code, Database, Server, Video, Layers, Copy, Check, Terminal, FileText } from "lucide-react";

export const ArchitectureView: React.FC = () => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<"stack" | "schema" | "blueprint">("blueprint");

  const handleCopySchema = () => {
    navigator.clipboard.writeText(PRISMA_DATABASE_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-700/60 px-3.5 py-1 rounded-full text-xs font-semibold text-indigo-300 mb-3">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            System Architecture & DB Specs
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Technical Architecture & Content Blueprint
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Full-stack tech stack recommendations, Prisma/SQL database schemas, and the 2026 A-to-Z curriculum blueprint.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-xl">
            <button
              onClick={() => setActiveTab("blueprint")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "blueprint"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="h-4 w-4" />
              Curriculum Blueprint
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "stack"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Server className="h-4 w-4" />
              Tech Stack
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "schema"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Database className="h-4 w-4" />
              Prisma / SQL Schema
            </button>
          </div>
        </div>

        {/* TAB 1: CURRICULUM BLUEPRINT TABLE */}
        {activeTab === "blueprint" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cyan-400" />
                  2026 A to Z AI Skills Blueprint Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Text vs Video lesson outlines for every module in the 2026 curriculum.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="p-3.5">Module Name</th>
                    <th className="p-3.5">Skill Taught</th>
                    <th className="p-3.5">Best 2026 Tools</th>
                    <th className="p-3.5">Text Lesson Outline</th>
                    <th className="p-3.5">Video Lesson Outline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {CURRICULUM_MODULES.map((mod) => (
                    <tr key={mod.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-bold text-cyan-300">
                        Module {mod.moduleNumber}: <br />
                        <span className="text-slate-100">{mod.title}</span>
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-xs">
                        {mod.description}
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {mod.best2026Tools.map((t) => (
                            <span key={t} className="bg-indigo-950 text-indigo-300 text-[10px] px-2 py-0.5 rounded border border-indigo-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-xs">
                        <span className="font-semibold text-slate-200">Text Summary:</span> <br />
                        {mod.lessons[0]?.textContent.overview.slice(0, 110)}...
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-xs">
                        <span className="font-semibold text-slate-200">Video Transcript:</span> <br />
                        {mod.lessons[0]?.videoContent.transcript.slice(0, 110)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TECH STACK RECOMMENDATION */}
        {activeTab === "stack" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Frontend */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-cyan-400">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Frontend Architecture</h3>
                  <span className="text-xs text-slate-400">Client-Side UI Engine</span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-800">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Framework:</span>
                  <span className="font-semibold text-cyan-300">{TECH_STACK_RECOMMENDATION.frontend.framework}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Styling System:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.frontend.styling}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Animations:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.frontend.animation}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Icons:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.frontend.icons}</span>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Backend Architecture</h3>
                  <span className="text-xs text-slate-400">Server & Gemini Proxy</span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-800">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Server Runtime:</span>
                  <span className="font-semibold text-purple-300">{TECH_STACK_RECOMMENDATION.backend.server}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">AI Integration:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.backend.aiIntegration}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">API Design:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.backend.apiDesign}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Security Model:</span>
                  <span className="font-semibold text-emerald-400">{TECH_STACK_RECOMMENDATION.backend.security}</span>
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Database Engine</h3>
                  <span className="text-xs text-slate-400">ORM & Relational Schemas</span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-800">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">ORM Mapping:</span>
                  <span className="font-semibold text-cyan-300">{TECH_STACK_RECOMMENDATION.database.orm}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Database Engine:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.database.engine}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Persistent Entities:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.database.storage}</span>
                </div>
              </div>
            </div>

            {/* Video Hosting */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-pink-950 border border-pink-800 flex items-center justify-center text-pink-400">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Video Streaming Engine</h3>
                  <span className="text-xs text-slate-400">Interactive Video & Transcripts</span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-800">
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Video Provider:</span>
                  <span className="font-semibold text-pink-300">{TECH_STACK_RECOMMENDATION.videoHosting.provider}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-400">Capabilities:</span>
                  <span className="font-semibold text-slate-200">{TECH_STACK_RECOMMENDATION.videoHosting.features}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PRISMA SCHEMA VIEWER */}
        {activeTab === "schema" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="h-5 w-5 text-cyan-400" />
                  Prisma Database Schema Specification
                </h3>
                <p className="text-xs text-slate-400">
                  SQL/Prisma models for Users, Courses, Lessons, UserProgress, Notes, and ToolBookmarks.
                </p>
              </div>

              <button
                onClick={handleCopySchema}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all shadow"
              >
                {copiedSchema ? (
                  <>
                    <Check className="h-4 w-4" /> Schema Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Schema
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto max-h-[500px]">
              <pre>{PRISMA_DATABASE_SCHEMA}</pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
