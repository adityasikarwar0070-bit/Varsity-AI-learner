import { CourseModule } from "../types";

export const CURRICULUM_MODULES: CourseModule[] = [
  {
    id: "mod-1",
    moduleNumber: 1,
    title: "Advanced Prompt Engineering & Chain-of-Thought",
    subtitle: "Prompt Engineering Fundamentals and 2026 Advanced Techniques",
    category: "Prompting",
    description: "Master System Prompts, Few-Shot Prompting, and Chain of Thought (CoT) reasoning to achieve maximum accuracy from frontier LLMs.",
    iconName: "Terminal",
    best2026Tools: ["DeepSeek V4", "Claude 4 Opus", "Gemini 3.6 Flash", "OpenAI o3 Pro"],
    level: "Beginner",
    estimatedHours: "2.5 Hours",
    lessons: [
      {
        id: "les-1-1",
        title: "Prompt Architecture & Role Framing in 2026",
        duration: "18 mins",
        toolsCovered: ["Gemini 3.6 Flash", "Claude 4 Opus"],
        summary: "Learn how to give precise roles and contextual boundaries to AI models to eliminate hallucinations.",
        textContent: {
          overview: "In 2026, prompt engineering has evolved from simple query crafting into 'System Persona & Constraint Framing.' In this lesson, you will learn how structural role assignments enhance AI response quality by up to 300%.",
          keyConcepts: [
            {
              title: "Role-Context-Constraint-Output (RCCO) Framework",
              detail: "Every effective prompt consists of 4 core elements: Role (Who the AI represents), Context (Background scenario), Constraints (Rules & Limitations), and Output Format (JSON/Markdown/Code).",
              codeSnippet: `// 2026 RCCO Prompt Template
SYSTEM: You are a Lead Software Architect specializing in Microservices.
CONTEXT: Analyzing a legacy Express app that suffers from cold start latency.
CONSTRAINTS: Do not use external caching libraries; limit response to 3 actionable steps.
OUTPUT_SCHEMA: Return markdown with [Problem, Solution, Refactored Code].`
            },
            {
              title: "Zero-Shot vs Few-Shot CoT Prompting",
              detail: "By providing 2–3 solved examples (Few-Shot), reasoning errors on complex logic tasks drop by over 90%.",
            }
          ],
          practicalExercise: "Use the AI Playground on the right panel to rewrite an unoptimized prompt into the RCCO framework and test the live execution.",
          bestPractices2026: [
            "Always specify explicit negative constraints ('Do NOT include conversational filler')",
            "Use Markdown headers inside prompts for structural clarity",
            "Leverage Reasoning Models (DeepSeek V4 / OpenAI o3) for multi-step logic"
          ]
        },
        videoContent: {
          videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
          durationSeconds: 1080,
          thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
          chapters: [
            { timestamp: "00:00", title: "Introduction & Modern Prompting Standards", timeInSeconds: 0 },
            { timestamp: "03:45", title: "The RCCO Framework Explained", timeInSeconds: 225 },
            { timestamp: "09:12", title: "Live Demo: Unoptimized vs 2026 Optimized Prompt", timeInSeconds: 552 },
            { timestamp: "14:30", title: "Few-Shot Chain of Thought Hands-On", timeInSeconds: 870 }
          ],
          transcript: "Welcome! In this video lesson, we will explore how to extract production-grade results from 2026 frontier LLMs like Gemini 3.6 Flash and Claude 4 Opus. Asking basic questions is no longer sufficient; we will implement the RCCO formula..."
        },
        quiz: [
          {
            question: "In the RCCO Framework, what does the letter 'C' represent?",
            options: ["Constraint & Context", "Calculation & Code", "Compiler & Class", "Command & Control"],
            correctAnswer: 0,
            explanation: "RCCO stands for Role, Context, Constraint, and Output Format."
          },
          {
            question: "What is the most effective technique to minimize hallucinations in complex reasoning tasks?",
            options: ["Explicit negative constraints & Few-Shot examples", "Writing the entire prompt in capital letters", "Repeating the same prompt 10 times", "Increasing text font size"],
            correctAnswer: 0,
            explanation: "Few-shot examples and precise constraint boundaries commit the model to exact expected output patterns."
          }
        ]
      },
      {
        id: "les-1-2",
        title: "Autonomous Agent Prompting & Tool Use Directives",
        duration: "24 mins",
        toolsCovered: ["DeepSeek V4", "Gemini 3.6 Flash"],
        summary: "Learn to prompt AI Agents for automated API function calls and multi-step decision loops.",
        textContent: {
          overview: "AI Agents make decisions independently and execute tools. In this lesson, you will learn to author function call declarations and tool-use directives.",
          keyConcepts: [
            {
              title: "Tool Definition Directive",
              detail: "Agents must understand when to trigger specific tools and how to handle unexpected API response values.",
              codeSnippet: `// Tool Directive Specification
TOOLS_AVAILABLE: [search_web, execute_sql, send_email]
DECISION_RULE: If query asks for real-time data, invoke 'search_web' FIRST before generating final response.`
            }
          ],
          practicalExercise: "Use the Agent simulator in the playground to build a decision prompt for an automated customer refund bot.",
          bestPractices2026: [
            "Always include a confirmation step before destructive actions",
            "Provide strict JSON schema for function return interpretation"
          ]
        },
        videoContent: {
          videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
          durationSeconds: 1440,
          thumbnailUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
          chapters: [
            { timestamp: "00:00", title: "Agentic Workflows Overview", timeInSeconds: 0 },
            { timestamp: "06:10", title: "Function Calling Directives", timeInSeconds: 370 },
            { timestamp: "16:20", title: "Handling Edge Cases in Agent Loops", timeInSeconds: 980 }
          ],
          transcript: "Modern AI agents solve tasks with zero human intervention. In this lesson, we will design robust decision matrices and tool execution rules..."
        },
        quiz: [
          {
            question: "What is the primary purpose of 'Function Declarations' in Agent Prompts?",
            options: ["Instructing the AI on when and how to call external tools & APIs", "Changing the user interface theme color", "Deleting database records", "Boosting hardware execution speed"],
            correctAnswer: 0,
            explanation: "Function declarations tell the model which APIs to query and what parameters to supply."
          }
        ]
      }
    ]
  },
  {
    id: "mod-2",
    moduleNumber: 2,
    title: "Autonomous AI Agents & Multi-Agent Swarms",
    subtitle: "Automating Enterprise Workflows with AI Agents and Multi-Agent Systems",
    category: "Agents",
    description: "Build 2026 autonomous agent systems equipped with self-reflection, live web browsing, code execution, and multi-agent swarm coordination.",
    iconName: "Bot",
    best2026Tools: ["Devin 2.0", "CrewAI 2026", "AutoGPT Enterprise", "LangGraph 3.0"],
    level: "Intermediate",
    estimatedHours: "4.0 Hours",
    lessons: [
      {
        id: "les-2-1",
        title: "Single Agent Architecture: Memory, Tools & Planning",
        duration: "30 mins",
        toolsCovered: ["Devin 2.0", "LangGraph 3.0"],
        summary: "Understand short-term and long-term memory architectures using Vector DBs and RAG.",
        textContent: {
          overview: "A true AI Agent consists of 3 core pillars: Planning (Task breakdown), Memory (Episodic & Semantic), and Tool Execution.",
          keyConcepts: [
            {
              title: "ReAct Pattern (Reason + Act)",
              detail: "The agent generates a Thought before taking an Action, updating its internal state based on the resulting Observation.",
              codeSnippet: `Thought: User needs weather for Tokyo.
Action: call_weather_api("Tokyo")
Observation: 22°C, Sunny
Thought: Now compile concise user response.`
            }
          ],
          practicalExercise: "Observe and test the ReAct loop execution inside the AI Playground.",
          bestPractices2026: [
            "Set Max Iteration limits (e.g., max 5 loops) to prevent infinite loops",
            "Log all agent actions for compliance and auditing"
          ]
        },
        videoContent: {
          videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
          durationSeconds: 1800,
          thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
          chapters: [
            { timestamp: "00:00", title: "ReAct Loop Deep Dive", timeInSeconds: 0 },
            { timestamp: "10:15", title: "Memory Management with Vector DBs", timeInSeconds: 615 },
            { timestamp: "22:00", title: "Building a Researcher Agent", timeInSeconds: 1320 }
          ],
          transcript: "In this lesson, we break down the ReAct architecture. Learn how autonomous agents reason, execute tools, and update memory dynamically..."
        },
        quiz: [
          {
            question: "What is the primary role of the 'Observation' step in the ReAct Architecture?",
            options: ["Reading the result of tool execution to determine the next action", "Rebooting the AI server", "Displaying an error message to the user", "Clearing vector memory"],
            correctAnswer: 0,
            explanation: "The observation step parses the output returned by a tool so the agent can execute the next logical reasoning step."
          }
        ]
      }
    ]
  },
  {
    id: "mod-3",
    moduleNumber: 3,
    title: "Generative Media: Text-to-Video & Photorealistic 3D",
    subtitle: "Creating High-Definition Video, Voice & 3D Assets with Modern AI",
    category: "Generative Media",
    description: "Produce Hollywood-grade video clips, hyper-realistic voiceovers, and 3D design assets using Sora Pro, Runway Gen-4, and Midjourney v7.",
    iconName: "Video",
    best2026Tools: ["Sora Pro", "Runway Gen-4", "Midjourney v7", "ElevenLabs Agent", "Luma Dream Machine 2"],
    level: "Intermediate",
    estimatedHours: "3.5 Hours",
    lessons: [
      {
        id: "les-3-1",
        title: "Text-to-Video Masterclass with Sora Pro & Runway Gen-4",
        duration: "35 mins",
        toolsCovered: ["Sora Pro", "Runway Gen-4"],
        summary: "Master cinematic camera movement, lighting control, and character consistency in AI video generation.",
        textContent: {
          overview: "2026 text-to-video models understand real-world physics, volumetric lighting, and multi-angle scene continuity directly from descriptive prompts.",
          keyConcepts: [
            {
              title: "Cinematic Camera Prompting",
              detail: "Control Shot Type (Close-up, Wide), Lens (35mm, Anamorphic), Motion (Dolly Zoom, FPV Drone Pan), and Lighting (Golden Hour, Cyberpunk Neon).",
              codeSnippet: `Prompt: Anamorphic 35mm shot of a futuristic cyberpunk cafe in Neo-Tokyo, golden hour sunlight reflecting off rain-slicked pavement, slow push-in dolly zoom, photorealistic 8k.`
            }
          ],
          practicalExercise: "Use the prompt builder technique to author a cinematic video scene description.",
          bestPractices2026: [
            "Specify frame rates and aspect ratios explicitly (16:9 for YouTube, 9:16 for Mobile Reels)",
            "Use Seed numbers for visual character consistency across scenes"
          ]
        },
        videoContent: {
          videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
          durationSeconds: 2100,
          thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
          chapters: [
            { timestamp: "00:00", title: "Modern AI Video Capabilities Overview", timeInSeconds: 0 },
            { timestamp: "12:00", title: "Camera Controls & Motion Syntax", timeInSeconds: 720 },
            { timestamp: "25:30", title: "Character Consistency Techniques", timeInSeconds: 1530 }
          ],
          transcript: "Welcome to the Generative Media masterclass! In this video, we explore the complete workflow of Sora Pro and Runway Gen-4 to maintain consistent characters and dynamic camera angles..."
        },
        quiz: [
          {
            question: "How does adding terms like 'Anamorphic 35mm' improve AI video prompts?",
            options: ["It instructs diffusion models to emulate cinematic lens blur and widescreen optical bokeh", "It speeds up video generation time by 2x", "It automatically adds sound effects", "It converts the video into monochrome"],
            correctAnswer: 0,
            explanation: "Cinematic camera and lens terminology guides generative models to emulate photorealistic optical traits."
          }
        ]
      }
    ]
  },
  {
    id: "mod-4",
    moduleNumber: 4,
    title: "AI-Assisted Software Development & Text-to-Code",
    subtitle: "Building Full-Stack Web Applications 10x Faster with AI",
    category: "Coding",
    description: "Architect, generate, and debug full-stack web applications, APIs, and database schemas using Devin 2.0, Cursor Pro, and Gemini 3.1 Pro.",
    iconName: "Code2",
    best2026Tools: ["Devin 2.0", "Cursor Pro 2026", "Gemini 3.1 Pro", "Claude 4 Sonnet"],
    level: "Advanced",
    estimatedHours: "5.0 Hours",
    lessons: [
      {
        id: "les-4-1",
        title: "Building Full-Stack Apps with Cursor AI & Gemini 3.1 Pro",
        duration: "40 mins",
        toolsCovered: ["Cursor Pro 2026", "Gemini 3.1 Pro"],
        summary: "Generate and debug complete React components, Express routes, and Prisma schemas from natural language instructions.",
        textContent: {
          overview: "In 2026, AI text-to-code centers around system-level refactoring, automated linting, unit test generation, and multi-file codebase updates.",
          keyConcepts: [
            {
              title: "Context-Aware Workspace Prompting",
              detail: "Configure project guidelines using `.cursorrules` or `AGENTS.md` files to enforce strict architectural conventions.",
              codeSnippet: `// Example AGENTS.md rule file
- Always use TypeScript with strict null checks
- Prefer Tailwind CSS utility classes
- Never expose API keys on client-side code`
            }
          ],
          practicalExercise: "Generate an Express route handler inside the AI Playground and execute a test run.",
          bestPractices2026: [
            "Iterate file-by-file rather than requesting complex multi-file changes in a single turn",
            "Run automated linters immediately after AI code generation"
          ]
        },
        videoContent: {
          videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
          durationSeconds: 2400,
          thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
          chapters: [
            { timestamp: "00:00", title: "Modern AI Coder Tooling Overview", timeInSeconds: 0 },
            { timestamp: "14:10", title: "Setting up AGENTS.md Rules", timeInSeconds: 850 },
            { timestamp: "28:40", title: "Debugging & Refactoring Workflows", timeInSeconds: 1720 }
          ],
          transcript: "In this coding module, we demonstrate effective pair programming with AI. Learn how Cursor Pro and Gemini 3.1 Pro accelerate full-stack application development..."
        },
        quiz: [
          {
            question: "What is the key benefit of adding an AGENTS.md file to your project root?",
            options: ["It enforces project-specific architecture rules and coding standards for AI coding assistants", "It doubles database query execution speed", "It automatically shuts down dev servers", "It increases project download speed"],
            correctAnswer: 0,
            explanation: "AGENTS.md rules guide AI coding agents to produce consistent code matching your exact architectural standards."
          }
        ]
      }
    ]
  }
];
