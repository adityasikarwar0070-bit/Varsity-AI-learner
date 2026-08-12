export const TECH_STACK_RECOMMENDATION = {
  frontend: {
    framework: "React 19 / Vite + TypeScript",
    styling: "Tailwind CSS v4 (Utility-first, CSS variables)",
    animation: "Motion (framer-motion compatible for smooth UI transitions)",
    icons: "Lucide-React",
    stateManagement: "React Context API + LocalStorage persistence"
  },
  backend: {
    server: "Node.js + Express (TypeScript with `tsx` runner)",
    aiIntegration: "Server-side @google/genai SDK (Gemini 3.6 Flash)",
    apiDesign: "RESTful JSON API endpoints (/api/ai/playground, /api/ai/optimize-prompt)",
    security: "Server-side API key proxying (Zero client key exposure)"
  },
  database: {
    orm: "Prisma ORM / Drizzle ORM",
    engine: "PostgreSQL 16+ or MongoDB for flexible JSON course schemas",
    storage: "User progress, lesson logs, bookmarks, custom notes, quiz scores"
  },
  videoHosting: {
    provider: "Mux Video API / Cloudinary Video / YouTube Embed API",
    features: "Interactive HLS streaming, timestamp jump links, auto-scroll transcripts"
  }
};

export const PRISMA_DATABASE_SCHEMA = `// ==========================================
// PRISMA DATABASE SCHEMA (2026 AI LEARNING PLATFORM)
// ==========================================

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  name          String?
  avatarUrl     String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  progress      UserProgress[]
  notes         Note[]
  quizResults   QuizResult[]
  bookmarks     ToolBookmark[]
}

model Course {
  id            String         @id @default(uuid())
  title         String
  subtitle      String
  category      String
  description   String
  level         String         // Beginner, Intermediate, Advanced
  estimatedHours String
  modules       Module[]
  createdAt     DateTime       @default(now())
}

model Module {
  id            String         @id @default(uuid())
  courseId      String
  course        Course         @relation(fields: [courseId], references: [id], onDelete: Cascade)
  moduleNumber  Int
  title         String
  subtitle      String
  description   String
  best2026Tools String[]
  lessons       Lesson[]
}

model Lesson {
  id                 String     @id @default(uuid())
  moduleId           String
  module             Module     @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  title              String
  duration           String
  toolsCovered       String[]
  summary            String
  
  // Dual Content Fields
  textContent        Json       // { overview, keyConcepts, practicalExercise, bestPractices2026 }
  videoContent       Json       // { videoUrl, durationSeconds, chapters, transcript }
  quizQuestions      Json       // Array of quiz items
  
  userProgress       UserProgress[]
}

model UserProgress {
  id                 String     @id @default(uuid())
  userId             String
  user               User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId           String
  lesson             Lesson     @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  isCompleted        Boolean    @default(false)
  preferredFormat    String     @default("text") // "text" | "video"
  completedAt        DateTime?
  
  @@unique([userId, lessonId])
}

model Note {
  id                 String     @id @default(uuid())
  userId             String
  user               User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId           String
  content            String
  updatedAt          DateTime   @updatedAt
}

model QuizResult {
  id                 String     @id @default(uuid())
  userId             String
  user               User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  moduleId           String
  score              Int
  totalQuestions     Int
  passed             Boolean
  completedAt        DateTime   @default(now())
}

model ToolBookmark {
  id                 String     @id @default(uuid())
  userId             String
  user               User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  toolId             String
  createdAt          DateTime   @default(now())
  
  @@unique([userId, toolId])
}
`;
