import { getModel } from "../config/llmModel.js";

export const router = async (state) => {
  const llm = await getModel("router");
  const prompt = `You are an agent router.
  
  Available agents are:
  -chat
  -search
  -code
  -pdf
  -ppt
  -vision
  
  Rules:
  
  chat-general conversation, answering questions, and providing information.
  search- searching the web for information and providing relevant results.
  code- writing and debugging code, providing programming assistance.
  pdf- extracting information from PDF documents, summarizing content, and answering questions based on the document.
  ppt- creating and editing PowerPoint presentations, providing design suggestions, and generating slide content.
  vision- generating images based on text prompts, providing image editing suggestions, and assisting with visual content creation.
  
  Return ONLY one word:
  chat 
  search
  code
  pdf
  vision

  User Query: ${state.prompt}
  `;

  const res = await llm.invoke(prompt);
  console.log("Router response:", res.content.trim().toLowerCase());
  return {
    ...state,
    agent: res.content.trim().toLowerCase(),
  };
};

export default router;
