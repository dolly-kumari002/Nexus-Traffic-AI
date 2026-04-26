require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const TrafficController = require('./TrafficController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const trafficController = new TrafficController(io);

// API endpoint for AI Service to update traffic
app.post('/api/traffic/update', (req, res) => {
  const { lane, count, emergency } = req.body;
  if (!lane) return res.status(400).json({ error: 'Lane is required' });

  trafficController.updateLane(lane, count, emergency);
  res.json({ success: true, message: 'Traffic data updated', state: trafficController.getState() });
});

// WebSocket connections for Frontend Dashboard
io.on('connection', (socket) => {
  console.log('Frontend connected:', socket.id);
  
  // Emit initial state immediately upon connection
  socket.emit('traffic_state', trafficController.getState());

  socket.on('disconnect', () => {
    console.log('Frontend disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5005;
server.listen(PORT, () => {
  console.log(`Smart Traffic Backend running on port ${PORT}`);
});
