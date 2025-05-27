// server.js
const express = require('express');
const app = express();
const db = require('./config/Database');
const userRouters = require('./routes/dyeingOrders');
const cors = require('cors');
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.use('/api/', userRouters)

app.get('/', async (req, res) => {
  
    res.json({ message: 'Pinged MongoDB!',  });
  
});

// Start server AFTER database connection
(async () => {
  await db.connect(); // <-- Wait for DB connection first

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})();
