import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy init Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Playground Execution Endpoint
app.post("/api/ai/playground", async (req, res) => {
  const { prompt, systemInstruction, toolType, model = "gemini-3.6-flash" } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt string is required" });
  }

  try {
    const ai = getGeminiClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are an expert AI tutor for 2026 AI tools. Provide detailed, helpful, clear responses in professional English.",
        },
      });

      return res.json({
        success: true,
        output: response.text || "No response text generated.",
        modelUsed: "gemini-3.6-flash",
      });
    } else {
      // Intelligent simulated response fallback if key is missing in dev mode
      const simulatedOutput = `[2026 AI Playground Simulation Output]
System Mode: ${toolType || "Generative Assistant"}
Prompt Analyzed: "${prompt}"

Response:
Hello! This is an offline simulated response from the AI Playground. In 2026, frontier LLMs and AI Agents perform seamless multi-step reasoning, tool usage, and direct code execution.

Key Takeaways for this Prompt:
1. Clear Context: You provided a specific role and goal in the prompt.
2. Output Format: Prefer structured tables, JSON schemas, or clean bullet points.
3. Iterative Prompting: Provide explicit edge-case test rules in subsequent iterations.

(Note: Connect your GEMINI_API_KEY in Secrets for live 2026 Gemini 3.6 Flash execution!)`;

      return res.json({
        success: true,
        output: simulatedOutput,
        modelUsed: "Simulated Gemini 3.6 Flash (Offline Mode)",
      });
    }
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({
      error: "AI generation failed: " + (err?.message || "Unknown error"),
      fallback: "Try rephrasing your prompt or checking your Gemini API Key.",
    });
  }
});

// AI Prompt Optimizer Endpoint
app.post("/api/ai/optimize-prompt", async (req, res) => {
  const { userPrompt, targetTool } = req.body;
  if (!userPrompt) {
    return res.status(400).json({ error: "userPrompt is required" });
  }

  try {
    const ai = getGeminiClient();
    const systemPrompt = `You are a World-Class 2026 Prompt Engineering Specialist. 
Analyze the user's raw prompt and rewrite it using advanced 2026 Prompt Architecture (Role, Context, Constraints, Step-by-Step Reasoning, Expected Output Format).
Target Tool: ${targetTool || "General LLM (Claude 4 / DeepSeek V4 / Gemini 3.6)"}.
Provide the response in clear, professional English format with:
1. Enhanced Optimized Prompt (Ready to copy)
2. Explanation of improvements made (Why this works better)
3. Suggested System Instructions`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Raw User Prompt: "${userPrompt}"`,
        config: { systemInstruction: systemPrompt },
      });

      return res.json({
        success: true,
        optimizedOutput: response.text,
      });
    } else {
      return res.json({
        success: true,
        optimizedOutput: `### 🚀 Optimized Prompt (2026 Standard)

**Role:** You are a Principal AI Automation Engineer.
**Context:** The goal is to solve: "${userPrompt}".
**Instructions:** 
1. Break down the task into logical sub-tasks.
2. Specify constraints (e.g., zero external dependencies, high code efficiency).
3. Validate output against edge cases.

**Output Format:** Return concise Markdown with clear section headers.

---
💡 **Why this works in 2026:**
- System Roles enforce persona-based reasoning.
- Explicit constraints reduce hallucination by up to 85%.
- Direct output schemas ensure integration compatibility with AI Agents.`,
      });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Prompt optimization failed" });
  }
});

// Vite & Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Masterclass 2026 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
