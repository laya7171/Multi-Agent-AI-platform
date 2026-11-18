import { getModel } from "../config/llmModel.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const systemPrompt = "You are VectorGrid a an intelligent Ai assistant";
  const res = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: state.prompt,
    },
  ]);
  return {
    ...state,
    aiResponse: res.content,
  };
};
