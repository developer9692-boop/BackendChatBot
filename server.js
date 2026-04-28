const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow requests from anywhere (GitHub Pages, local, etc.)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Health check — so browser shows something at "/"
app.get('/', (req, res) => {
  res.send('SimpleBot backend is running! 🤖');
});

// Bot logic
function getBotReply(message) {
  const msg = message.toLowerCase().trim();
  if (msg.includes('hi') || msg.includes('hello')) return 'Hello! How can I help you?';
  if (msg.includes('price')) return 'Our services are affordable.';
  if (msg.includes('bye')) return 'Goodbye!';
  return "I am a simple bot, I don't understand that yet.";
}

// POST /chat
app.post('/chat', (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message' });
  }
  const reply = getBotReply(message);
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
