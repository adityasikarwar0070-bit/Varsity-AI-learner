import { useState, useEffect } from "react";
import { ViewMode, ContentFormat } from "./types";
import { CURRICULUM_MODULES } from "./data/curriculumData";
import { AI_TOOLS_DIRECTORY_2026 } from "./data/toolsData";
import { Navbar } from "./components/Navbar";
import { LandingHero } from "./components/LandingHero";
import { CourseCatalog } from "./components/CourseCatalog";
import { LearningArena } from "./components/LearningArena";
import { ToolsDirectory } from "./components/ToolsDirectory";
import { ArchitectureView } from "./components/ArchitectureView";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("landing");
  const [preferredFormat, setPreferredFormat] = useState<ContentFormat>(() => {
    return (localStorage.getItem("ai_preferred_format") as ContentFormat) || "text";
  });

  const [activeModuleId, setActiveModuleId] = useState<string>("mod-1");
  const [activeLessonId, setActiveLessonId] = useState<string>("les-1-1");

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("ai_completed_lessons");
      return saved ? JSON.parse(saved) : ["les-1-1"];
    } catch {
      return ["les-1-1"];
    }
  });

  const [bookmarkedToolIds, setBookmarkedToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("ai_bookmarked_tools");
      return saved ? JSON.parse(saved) : ["tool-1", "tool-4"];
    } catch {
      return ["tool-1", "tool-4"];
    }
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("ai_user_notes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist preferences
  useEffect(() => {
    localStorage.setItem("ai_preferred_format", preferredFormat);
  }, [preferredFormat]);

  useEffect(() => {
    localStorage.setItem("ai_completed_lessons", JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    localStorage.setItem("ai_bookmarked_tools", JSON.stringify(bookmarkedToolIds));
  }, [bookmarkedToolIds]);

  useEffect(() => {
    localStorage.setItem("ai_user_notes", JSON.stringify(notes));
  }, [notes]);

  // Toggle Text / Video format globally
  const toggleFormat = () => {
    setPreferredFormat((prev) => (prev === "text" ? "video" : "text"));
  };

  // Toggle Lesson Completion
  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  // Toggle Tool Bookmark
  const toggleBookmark = (toolId: string) => {
    setBookmarkedToolIds((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  // Save Note
  const saveNote = (lessonId: string, text: string) => {
    setNotes((prev) => ({ ...prev, [lessonId]: text }));
  };

  // Handler for selecting module and lesson from Catalog
  const handleSelectModuleLesson = (moduleId: string, lessonId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    setCurrentView("arena");
  };

  const totalLessons = CURRICULUM_MODULES.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        preferredFormat={preferredFormat}
        toggleFormat={toggleFormat}
        completedCount={completedLessonIds.length}
        totalLessons={totalLessons}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === "landing" && (
          <>
            <LandingHero
              setCurrentView={setCurrentView}
              preferredFormat={preferredFormat}
              toggleFormat={toggleFormat}
            />
            <CourseCatalog
              modules={CURRICULUM_MODULES}
              onSelectModuleLesson={handleSelectModuleLesson}
              completedLessonIds={completedLessonIds}
            />
          </>
        )}

        {currentView === "courses" && (
          <CourseCatalog
            modules={CURRICULUM_MODULES}
            onSelectModuleLesson={handleSelectModuleLesson}
            completedLessonIds={completedLessonIds}
          />
        )}

        {currentView === "arena" && (
          <LearningArena
            modules={CURRICULUM_MODULES}
            activeModuleId={activeModuleId}
            activeLessonId={activeLessonId}
            setActiveModuleAndLesson={(mId, lId) => {
              setActiveModuleId(mId);
              setActiveLessonId(lId);
            }}
            preferredFormat={preferredFormat}
            toggleFormat={toggleFormat}
            completedLessonIds={completedLessonIds}
            toggleLessonCompletion={toggleLessonCompletion}
            userNotes={notes}
            saveNote={saveNote}
          />
        )}

        {currentView === "tools" && (
          <ToolsDirectory
            tools={AI_TOOLS_DIRECTORY_2026}
            bookmarkedToolIds={bookmarkedToolIds}
            toggleBookmark={toggleBookmark}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "architecture" && <ArchitectureView />}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
