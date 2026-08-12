import React, { useState } from "react";
import { CourseModule } from "../types";
import { Terminal, Bot, Video, Code2, Clock, CheckCircle2, ArrowRight, Sparkles, Filter } from "lucide-react";

interface CourseCatalogProps {
  modules: CourseModule[];
  onSelectModuleLesson: (moduleId: string, lessonId: string) => void;
  completedLessonIds: string[];
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  modules,
  onSelectModuleLesson,
  completedLessonIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Prompting", "Agents", "Generative Media", "Coding"];

  const filteredModules = selectedCategory === "All"
    ? modules
    : modules.filter((m) => m.category === selectedCategory);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "Terminal": return <Terminal className="h-6 w-6 text-cyan-400" />;
      case "Bot": return <Bot className="h-6 w-6 text-purple-400" />;
      case "Video": return <Video className="h-6 w-6 text-pink-400" />;
      case "Code2": return <Code2 className="h-6 w-6 text-emerald-400" />;
      default: return <Sparkles className="h-6 w-6 text-indigo-400" />;
    }
  };

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/60 px-3.5 py-1 rounded-full text-xs font-semibold text-indigo-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            Curriculum Blueprint (2026 Edition)
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            A to Z AI Skills Masterclass Catalog
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            From Prompt Engineering to Autonomous AI Agents, Photorealistic Video Generation, and AI Coding — complete dual Text & Video masterclasses.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2">
            <Filter className="h-4 w-4" />
            Filter By:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredModules.map((module) => {
            const completedCount = module.lessons.filter((l) =>
              completedLessonIds.includes(l.id)
            ).length;

            return (
              <div
                key={module.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />

                <div>
                  {/* Module Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-700/80 flex items-center justify-center shadow-md">
                        {getModuleIcon(module.iconName)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                          Module {module.moduleNumber} • {module.level}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {module.title}
                        </h3>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {module.estimatedHours}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {module.description}
                  </p>

                  <div className="text-xs text-slate-400 font-medium mb-4">
                    <span className="text-slate-500">Subtitle: </span>
                    <span className="text-cyan-200/90 italic">{module.subtitle}</span>
                  </div>

                  {/* 2026 Tools Covered Pills */}
                  <div className="mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Best 2026 Tools Taught:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {module.best2026Tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 px-2.5 py-0.5 rounded-full font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lesson List Preview */}
                  <div className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Lessons in this Module ({module.lessons.length}):
                    </div>
                    {module.lessons.map((lesson, idx) => {
                      const isDone = completedLessonIds.includes(lesson.id);
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => onSelectModuleLesson(module.id, lesson.id)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/60 cursor-pointer transition-all text-xs"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <span className="text-slate-500 font-mono text-[11px]">
                              0{idx + 1}.
                            </span>
                            <span className="font-medium text-slate-200 truncate">
                              {lesson.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                              {lesson.duration}
                            </span>
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <ArrowRight className="h-3.5 w-3.5 text-slate-500 hover:text-cyan-400" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  <div className="text-xs text-slate-400">
                    Progress:{" "}
                    <span className="font-bold text-emerald-400">
                      {completedCount}/{module.lessons.length} Completed
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      onSelectModuleLesson(module.id, module.lessons[0].id)
                    }
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/30"
                  >
                    Start Module
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
