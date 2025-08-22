import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_API_KEY,
});

const model = google("gemini-2.5-flash");
const agent = new Agent(components.agent, {
  name: "SALES-AI",
  languageModel: model,
  instructions: "You are a proffesional sales person",
});

export default agent;
