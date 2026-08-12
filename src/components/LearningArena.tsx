import React, { useState, useEffect } from "react";
import { CourseModule, Lesson, ContentFormat } from "../types";
import { 
  FileText, Video, Play, Pause, FastForward, CheckCircle2, Circle, 
  Sparkles, Send, Copy, RefreshCw, Wand2, BookOpen, HelpCircle, 
  ChevronRight, Volume2, Clock, ShieldAlert, Cpu, Terminal
} from "lucide-react";

interface LearningArenaProps {
  modules: CourseModule[];
  activeModuleId: string;
  activeLessonId: string;
  setActiveModuleAndLesson: (modId: string, lesId: string) => void;
  preferredFormat: ContentFormat;
  toggleFormat: () => void;
  completedLessonIds: string[];
  toggleLessonCompletion: (lessonId: string) => void;
  userNotes: Record<string, string>;
  saveNote: (lessonId: string, text: string) => void;
}

export const LearningArena: React.FC<LearningArenaProps> = ({
  modules,
  activeModuleId,
  activeLessonId,
  setActiveModuleAndLesson,
  preferredFormat,
  toggleFormat,
  completedLessonIds,
  toggleLessonCompletion,
  userNotes,
  saveNote,
}) => {
  // Find current module & lesson
  const currentModule = modules.find((m) => m.id === activeModuleId) || modules[0];
  const currentLesson = currentModule.lessons.find((l) => l.id === activeLessonId) || currentModule.lessons[0];

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);

  // Right Panel Tab State
  const [rightTab, setRightTab] = useState<"playground" | "notes" | "quiz">("playground");

  // AI Playground State
  const [promptInput, setPromptInput] = useState<string>("");
  const [playgroundMode, setPlaygroundMode] = useState<"standard" | "optimizer" | "agent">("standard");
  const [playgroundOutput, setPlaygroundOutput] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Notes state
  const [noteContent, setNoteContent] = useState<string>(userNotes[currentLesson.id] || "");

  useEffect(() => {
    setNoteContent(userNotes[currentLesson.id] || "");
    setSelectedAnswers({});
    setQuizSubmitted(false);
    // Populate default playground prompt based on current lesson
    setPromptInput(`// Practice prompt for ${currentLesson.title}\nSYSTEM: Act as a Senior AI Architect in 2026.\nTASK: Explain how to implement ${currentLesson.title} in a production microservice.`);
  }, [currentLesson.id]);

  // Video Chapter click handler
  const handleChapterClick = (seconds: number) => {
    setCurrentTimestamp(seconds);
    setIsPlaying(true);
  };

  // Run AI Playground
  const handleRunPlayground = async () => {
    if (!promptInput.trim()) return;
    setIsLoadingAi(true);
    setPlaygroundOutput("");

    try {
      if (playgroundMode === "optimizer") {
        const res = await fetch("/api/ai/optimize-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userPrompt: promptInput,
            targetTool: currentModule.best2026Tools[0] || "Gemini 3.6 Flash",
          }),
        });
        const data = await res.json();
        setPlaygroundOutput(data.optimizedOutput || "Optimization complete.");
      } else {
        const res = await fetch("/api/ai/playground", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: promptInput,
            toolType: playgroundMode,
            systemInstruction: `You are an expert AI Masterclass Instructor teaching ${currentLesson.title}. Provide structured, clear, highly practical output in English.`,
          }),
        });
        const data = await res.json();
        setPlaygroundOutput(data.output || "Execution finished.");
      }
    } catch (err: any) {
      setPlaygroundOutput("Error executing AI query: " + (err?.message || "Unknown error"));
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(playgroundOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCompleted = completedLessonIds.includes(currentLesson.id);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Top Learning Arena Sub-Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Module & Lesson Title */}
        <div className="flex items-center gap-3">
          <span className="bg-indigo-950 text-indigo-300 border border-indigo-700/60 text-xs font-bold px-2.5 py-1 rounded-md">
            Mod {currentModule.moduleNumber}
          </span>
          <div className="truncate max-w-md sm:max-w-xl">
            <h1 className="text-sm sm:text-base font-bold text-white truncate">
              {currentLesson.title}
            </h1>
            <p className="text-xs text-slate-400 truncate">
              {currentModule.title} • {currentLesson.duration}
            </p>
          </div>
        </div>

        {/* CORE FEATURE: Dual-Learning Mode Toggle Switch */}
        <div className="flex items-center gap-3">
          
          <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => preferredFormat !== "text" && toggleFormat()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                preferredFormat === "text"
                  ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Text Format
            </button>
            <button
              onClick={() => preferredFormat !== "video" && toggleFormat()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                preferredFormat === "video"
                  ? "bg-purple-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Video className="h-3.5 w-3.5" />
              Video Format
            </button>
          </div>

          {/* Mark Completed Button */}
          <button
            onClick={() => toggleLessonCompletion(currentLesson.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isCompleted
                ? "bg-emerald-950 text-emerald-300 border border-emerald-700/80"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Lesson Completed
              </>
            ) : (
              <>
                <Circle className="h-4 w-4 text-slate-400" />
                Mark as Complete
              </>
            )}
          </button>

        </div>
      </div>

      {/* Main 3-Column Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT COLUMN: Sidebar Topics & Lessons (2.5 / 12 cols) */}
        <div className="lg:col-span-3 bg-slate-900/60 border-r border-slate-800 p-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Course Navigation</span>
            <span className="text-[10px] text-indigo-400 font-mono">
              {completedLessonIds.length} Done
            </span>
          </div>

          <div className="space-y-4">
            {modules.map((mod) => (
              <div key={mod.id} className="bg-slate-950/80 border border-slate-800/80 rounded-xl overflow-hidden">
                <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-200">
                    Mod {mod.moduleNumber}: {mod.title}
                  </div>
                </div>

                <div className="p-1 space-y-1">
                  {mod.lessons.map((les) => {
                    const isLesActive = les.id === currentLesson.id;
                    const isLesDone = completedLessonIds.includes(les.id);

                    return (
                      <div
                        key={les.id}
                        onClick={() => setActiveModuleAndLesson(mod.id, les.id)}
                        className={`p-2.5 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-all ${
                          isLesActive
                            ? "bg-indigo-600/20 border border-indigo-500/50 text-cyan-300 font-semibold"
                            : "hover:bg-slate-800/60 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {isLesDone ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 flex-shrink-0 ml-1">
                          {les.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER COLUMN: Main Content Player (Text or Video Format) (6.5 / 12 cols) */}
        <div className="lg:col-span-6 bg-slate-950 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
          
          {/* Format Mode Header Notice */}
          <div className="mb-4 flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="text-slate-400">Current View:</span>
              <span className="font-bold text-cyan-300 uppercase">
                {preferredFormat === "text" ? "Text Lesson Mode" : "Video Lesson Mode"}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Toggle anytime via top switch ⇄
            </span>
          </div>

          {/* DUAL CONTENT DISPLAY */}
          {preferredFormat === "text" ? (
            
            /* ================= TEXT FORMAT ================= */
            <div className="space-y-6">
              
              {/* Overview Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-cyan-400" />
                  Lesson Overview
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentLesson.textContent.overview}
                </p>
                
                <div className="mt-3 text-xs bg-cyan-950/40 border border-cyan-800/40 p-2.5 rounded-xl text-cyan-200">
                  <span className="font-bold text-cyan-300">Lesson Summary: </span>
                  {currentLesson.summary}
                </div>
              </div>

              {/* Key Concepts */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Core Concepts & Code Architecture
                </h3>

                {currentLesson.textContent.keyConcepts.map((concept, idx) => (
                  <div key={idx} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-cyan-950 border border-cyan-700 flex items-center justify-center text-[10px] text-cyan-300">
                        {idx + 1}
                      </span>
                      {concept.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {concept.detail}
                    </p>

                    {concept.codeSnippet && (
                      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto relative">
                        <pre>{concept.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 2026 Best Practices Checklist */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-indigo-400" />
                  2026 Industry Best Practices Checklist
                </h3>
                <ul className="space-y-2">
                  {currentLesson.textContent.bestPractices2026.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Exercise Box */}
              <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-2xl p-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  Practical Exercise (Try in Right Panel AI Playground)
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {currentLesson.textContent.practicalExercise}
                </p>
              </div>

            </div>

          ) : (

            /* ================= VIDEO FORMAT ================= */
            <div className="space-y-6">
              
              {/* Simulated / Embedded Video Player Container */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
                
                {/* Video Stage / Canvas */}
                <div className="relative aspect-video bg-black flex items-center justify-center group">
                  <img
                    src={currentLesson.videoContent.thumbnailUrl}
                    alt={currentLesson.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  
                  {/* Overlay Play Controls */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="h-16 w-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 transform hover:scale-110 transition-all"
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </button>
                  </div>

                  {/* Top Bar Overlay */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-cyan-300 border border-slate-800 flex items-center gap-2">
                    <Volume2 className="h-3.5 w-3.5" />
                    Interactive Video Lesson
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-slate-300 hover:text-white"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <span className="text-xs text-slate-400 font-mono">
                      {Math.floor(currentTimestamp / 60)}:{(currentTimestamp % 60).toString().padStart(2, "0")} / {Math.floor(currentLesson.videoContent.durationSeconds / 60)}:00
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Speed:</span>
                    {[1, 1.25, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => setPlaybackSpeed(s)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          playbackSpeed === s
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Video Chapters List */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  Video Chapters & Timestamps (Click to Jump)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentLesson.videoContent.chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChapterClick(ch.timeInSeconds)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800/80 text-left text-xs transition-all group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-purple-400 font-bold group-hover:text-cyan-300">
                          {ch.timestamp}
                        </span>
                        <span className="text-slate-300 truncate">{ch.title}</span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Transcript */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Synchronized Video Transcript
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  {currentLesson.videoContent.transcript}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Interactive AI Playground, Notes & Knowledge Quiz (3.0 / 12 cols) */}
        <div className="lg:col-span-3 bg-slate-900/60 border-l border-slate-800 flex flex-col max-h-[calc(100vh-8rem)]">
          
          {/* Right Panel Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900 p-1">
            <button
              onClick={() => setRightTab("playground")}
              className={`flex-1 py-2 text-xs font-bold text-center rounded-lg transition-all flex items-center justify-center gap-1 ${
                rightTab === "playground"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              AI Playground
            </button>
            <button
              onClick={() => setRightTab("notes")}
              className={`flex-1 py-2 text-xs font-bold text-center rounded-lg transition-all flex items-center justify-center gap-1 ${
                rightTab === "notes"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              Notes
            </button>
            <button
              onClick={() => setRightTab("quiz")}
              className={`flex-1 py-2 text-xs font-bold text-center rounded-lg transition-all flex items-center justify-center gap-1 ${
                rightTab === "quiz"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Quiz
            </button>
          </div>

          {/* TAB 1: INTERACTIVE AI PLAYGROUND */}
          {rightTab === "playground" && (
            <div className="p-4 space-y-4 overflow-y-auto flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                    <Cpu className="h-3.5 w-3.5" />
                    Gemini 3.6 Flash Sandbox
                  </span>
                  <span className="text-[10px] text-slate-500">Server API Proxy</span>
                </div>

                {/* Playground Mode Selector */}
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-3 text-[11px]">
                  <button
                    onClick={() => setPlaygroundMode("standard")}
                    className={`py-1 rounded font-semibold ${
                      playgroundMode === "standard" ? "bg-indigo-600 text-white" : "text-slate-400"
                    }`}
                  >
                    Assistant
                  </button>
                  <button
                    onClick={() => setPlaygroundMode("optimizer")}
                    className={`py-1 rounded font-semibold ${
                      playgroundMode === "optimizer" ? "bg-indigo-600 text-white" : "text-slate-400"
                    }`}
                  >
                    Optimizer
                  </button>
                  <button
                    onClick={() => setPlaygroundMode("agent")}
                    className={`py-1 rounded font-semibold ${
                      playgroundMode === "agent" ? "bg-indigo-600 text-white" : "text-slate-400"
                    }`}
                  >
                    ReAct Agent
                  </button>
                </div>

                {/* Prompt Input Box */}
                <div className="space-y-2">
                  <textarea
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    rows={5}
                    placeholder="Type your prompt here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 transition-all resize-none"
                  />

                  <button
                    onClick={handleRunPlayground}
                    disabled={isLoadingAi}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20"
                  >
                    {isLoadingAi ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-white" />
                        Generating Response...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" />
                        {playgroundMode === "optimizer" ? "Optimize Prompt" : "Execute in Playground"}
                      </>
                    )}
                  </button>
                </div>

                {/* AI Output Window */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Output Terminal:</span>
                    {playgroundOutput && (
                      <button
                        onClick={handleCopyOutput}
                        className="flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                      >
                        <Copy className="h-3 w-3" />
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono min-h-[160px] max-h-[220px] overflow-y-auto whitespace-pre-wrap">
                    {playgroundOutput || (
                      <span className="text-slate-600 italic">
                        Result will appear here. Click 'Execute in Playground' to run live Gemini 3.6 Flash!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NOTES & SUMMARY */}
          {rightTab === "notes" && (
            <div className="p-4 space-y-3 overflow-y-auto flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Personal Study Notes
              </div>
              <p className="text-[11px] text-slate-400">
                Write key learnings or code snippets. Auto-saved for this lesson.
              </p>

              <textarea
                value={noteContent}
                onChange={(e) => {
                  setNoteContent(e.target.value);
                  saveNote(currentLesson.id, e.target.value);
                }}
                rows={12}
                placeholder="Write your notes here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-sans focus:outline-none focus:border-indigo-500 transition-all resize-none"
              />
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Notes automatically saved in local browser storage.
              </div>
            </div>
          )}

          {/* TAB 3: MODULE KNOWLEDGE QUIZ */}
          {rightTab === "quiz" && (
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                <HelpCircle className="h-4 w-4 text-cyan-400" />
                Lesson Knowledge Check
              </div>

              {currentLesson.quiz.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                  <div className="text-xs font-bold text-slate-200">
                    Q{qIdx + 1}: {q.question}
                  </div>

                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctAnswer === optIdx;

                      let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                      if (quizSubmitted) {
                        if (isCorrect) btnStyle = "bg-emerald-950 border-emerald-700 text-emerald-300 font-bold";
                        else if (isSelected) btnStyle = "bg-rose-950 border-rose-700 text-rose-300";
                      } else if (isSelected) {
                        btnStyle = "bg-indigo-900/80 border-indigo-600 text-cyan-300 font-semibold";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() =>
                            !quizSubmitted &&
                            setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
                          }
                          className={`w-full text-left text-xs p-2 rounded-lg border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800 italic">
                      Explanation: {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => setQuizSubmitted(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/30"
              >
                Submit Answers
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
