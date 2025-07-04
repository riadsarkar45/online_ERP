const express = require('express');
const socketIo = require('socket.io');
const app = express();

const userRouters = require('./routes/dyeingOrders');
const summaryRouters = require('./routes/summary');
const cors = require('cors');
const Database = require('./config/database_wrong');
const db = new Database();
const http = require('http');
const speedMeter = require('./sockets/internetSpeedMeter');
const issueRoutes = require('./routes/raw-issue');

app.use(cors({
  origin: ['http://localhost:5173', 'https://south-dragon.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const server = http.createServer(app);

app.use('/api/', userRouters);
app.use('/api/', summaryRouters);
app.use('/api/', issueRoutes);

app.get('/', async (req, res) => {
  res.json({ message: 'Pinged MongoDB!' });
});

const io = socketIo(server, {
  cors: {
    origin: "*", // adjust origin for production
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  // console.log('Client connected:', socket.id);

  speedMeter(socket, io)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

(async () => {
  await db.connect();

  const PORT = process.env.PORT || 3000;

  // ⚠️ Listen on the HTTP server, NOT the Express app!
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
