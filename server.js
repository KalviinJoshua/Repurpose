require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/debug", (req, res) => {
  res.json({
    dirname: __dirname,
    publicExists: require("fs").existsSync(path.join(__dirname, "public")),
    previewExists: require("fs").existsSync(path.join(__dirname, "public", "preview.png")),
    faviconExists: require("fs").existsSync(path.join(__dirname, "public", "favicon.ico")),
  });
});

app.get("/files", (req, res) => {
  const fs = require("fs");
  res.json(fs.readdirSync(path.join(__dirname, "public")));
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/repurpose", async (req, res) => {
  try {
    const { system, content } = req.body;

    if (!system || !content) {
      return res.status(400).json({
        error: "Missing system or content.",
      });
    }

    const prompt = `${system}\n\n${content}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      text: response.text,
    });
  } catch (err) {
    console.error("Gemini Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

console.log("Serving static files from:");
console.log(path.join(__dirname, "public"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});