export type ViewMode = "landing" | "courses" | "arena" | "tools" | "architecture";

export type ContentFormat = "text" | "video";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  toolsCovered: string[];
  summary: string;
  textContent: {
    overview: string;
    keyConcepts: { title: string; detail: string; codeSnippet?: string }[];
    practicalExercise: string;
    bestPractices2026: string[];
  };
  videoContent: {
    videoUrl: string;
    durationSeconds: number;
    thumbnailUrl: string;
    chapters: { timestamp: string; title: string; timeInSeconds: number }[];
    transcript: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  category: "Prompting" | "Agents" | "Generative Media" | "Coding" | "Automation" | "MultiModal";
  description: string;
  iconName: string;
  best2026Tools: string[];
  lessons: Lesson[];
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: string;
}

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  category: "LLM & Reasoning" | "AI Agents" | "Video & Motion" | "Image & 3D" | "Code & Dev" | "Audio & Voice" | "Automation";
  rating: number;
  useCase: string;
  keyFeatures: string[];
  badge2026: string;
  pricing: "Free Tier" | "Freemium" | "Paid";
  websiteUrl: string;
  examplePrompt: string;
  isBookmarked?: boolean;
}

export interface UserProgressState {
  completedLessonIds: string[];
  activeCourseId: string;
  activeLessonId: string;
  notes: Record<string, string>;
  preferredFormat: ContentFormat;
  bookmarkedToolIds: string[];
  quizScores: Record<string, number>;
}
