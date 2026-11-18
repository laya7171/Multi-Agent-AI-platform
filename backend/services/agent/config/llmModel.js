import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const groq = new ChatGroq({
  model: "openai/gpt-oss-20b",
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return groq;
    case "search":
      return groq;
    case "coding":
      return gemini;
    default:
      return groq;
  }
};
