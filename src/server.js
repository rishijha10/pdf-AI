const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// process.env.LANGUAGE_MODEL_API_KEY;
const LANGUAGE_MODEL_API_KEY = "AIzaSyC5PokSoUqjGM9sGE7MuOjDAh2jGfd4KcA";
const LANGUAGE_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${LANGUAGE_MODEL_API_KEY}`;

app.get("/trial/:text", async (req, res) => {
  const { text } = req.params;

  const payload = {
    prompt: { messages: [{ content: text }] },
    temperature: 0.1,
    candidate_count: 1,
  };

  const request = await fetch(LANGUAGE_MODEL_URL, {
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });
  const data = await request.json();
  res.send(data);
});
