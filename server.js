import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No input text provided." });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI that turns normal text ideas into detailed, creative AI prompts optimized for image generation.",
        },
        { role: "user", content: text }
      ],
      max_tokens: 200,
    });

    res.json({ result: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating prompt." });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at: http://localhost:${PORT}`)
);
