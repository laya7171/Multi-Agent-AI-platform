import agentState from "./state.js";
import { StateGraph, START, END } from "@langchain/langgraph";
import router from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);
workflow.addNode("chat", chatAgent);
workflow.addNode("code", chatAgent);
workflow.addNode("search", chatAgent);
workflow.addNode("pdf", chatAgent);
workflow.addNode("vision", chatAgent);
workflow.addNode("ppt", chatAgent);

workflow.addEdge(START, "router");
workflow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":
        return "chat";
      case "code":
        return "code";
      case "search":
        return "search";
      case "pdf":
        return "pdf";
      case "vision":
        return "vision";
      case "ppt":
        return "ppt";
      default:
        return "chat";
    }
  },
  {
    // Return value mapping to the nodes the above function only returns the value not the node
    chat: "chat",
    code: "code",
    search: "search",
    pdf: "pdf",
    vision: "vision",
    ppt: "ppt",
  },
);

workflow.addEdge("search", "chat");

workflow.addEdge("chat", END);
workflow.addEdge("code", END);
workflow.addEdge("pdf", END);
workflow.addEdge("vision", END);
workflow.addEdge("ppt", END);

const graph = workflow.compile();

export default graph;
