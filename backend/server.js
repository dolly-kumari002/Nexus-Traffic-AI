require('dotenv').config();
const mongoose = require('mongoose'); // MongoDB connection

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const TrafficController = require('./TrafficController');

const app = express();
const server = http.createServer(app);

// ✅ CORS config (important for frontend)
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ['GET', 'POST']
  }
});

const trafficController = new TrafficController(io);

// 🚦 API endpoint for AI Service
app.post('/api/traffic/update', (req, res) => {
  const { lane, count, emergency } = req.body;

  if (!lane) {
    return res.status(400).json({ error: 'Lane is required' });
  }

  trafficController.updateLane(lane, count, emergency);

  res.json({
    success: true,
    message: 'Traffic data updated',
    state: trafficController.getState()
  });
});

// 🌐 WebSocket connection for frontend
io.on('connection', (socket) => {
  console.log('Frontend connected:', socket.id);

  // Send initial state
  socket.emit('traffic_state', trafficController.getState());

  socket.on('disconnect', () => {
    console.log('Frontend disconnected:', socket.id);
  });
});

// 🚀 Start server
const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`Smart Traffic Backend running on port ${PORT}`);
});
