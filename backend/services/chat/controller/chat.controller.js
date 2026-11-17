import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("User ID from header:", userId);
    const conversation = await Conversation.create({
      userId: userId,
    });
    return res.status(201).json(conversation);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to create conversation", error: err.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(id, { title });
    return res.status(201).json(conversation);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to update conversation", error: err.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("User ID from header:", userId);
    const conversation = await Conversation.find({
      userId: userId,
    }).sort({ updatedAt: -1 });
    return res.status(201).json(conversation);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to get conversation", error: err.message });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;
    const message = await Message.create({
      conversationId,
      content,
      role,
    });
    return res.status(201).json(message);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Save message failed", error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({ updatedAt: -1 });
    return res.status(201).json(message);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Get message failed", error: err.message });
  }
}
