const express = require('express');
const app = express();

const userRouters = require('./routes/dyeingOrders');
const summaryRouters = require('./routes/summary');
const cors = require('cors');
const Database = require('./config/database_wrong');
const db = new Database;

app.use(cors({
  origin: ['http://localhost:5173', 'https://south-dragon.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());



app.use('/api/', userRouters);
app.use('/api/', summaryRouters);

app.get('/', async (req, res) => {
  res.json({ message: 'Pinged MongoDB!' });
});

// Start server AFTER database connection
(async () => {
  await db.connect(); // ✅ Now this works correctly

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
