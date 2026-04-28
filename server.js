// server.js — SimpleBot backend
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve index.html from the same folder as this file
app.use(express.static(path.join(__dirname)));

// ── Bot logic ─────────────────────────────────────────────────
function getBotReply(message) {
  const msg = message.toLowerCase().trim();

  if (msg.includes('hi') || msg.includes('hello')) {
    return 'Hello! How can I help you?';
  }
  if (msg.includes('price')) {
    return 'Our services are affordable.';
  }
  if (msg.includes('bye')) {
    return 'Goodbye!';
  }
  return "I am a simple bot, I don't understand that yet.";
}

// ── POST /chat ────────────────────────────────────────────────
app.post('/chat', (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message' });
  }

  const reply = getBotReply(message);
  res.json({ reply });
});

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`SimpleBot server running → http://localhost:${PORT}`);
});
