require("dotenv").config();
console.log("API KEY:", process.env.OPENAI_API_KEY);
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
let chatHistory = [];
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    // Lưu tin nhắn người dùng
    chatHistory.push({ role: "user", content: userMessage });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatHistory,
    });
    const aiReply = completion.choices[0].message.content;
    // Lưu phản hồi AI
    chatHistory.push({ role: "assistant", content: aiReply });
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("LỖI CHI TIẾT:", error);
    res.status(500).json({ error: error.message });
  }
});
app.listen(3001, () => {
  console.log("Server đang chạy tại http://localhost:3001");
});
