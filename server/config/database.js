// config/Database.js
const { MongoClient, ServerApiVersion } = require('mongodb');

class Database {
  /**
   * @param {string} dbName - Optional database name
   */
  constructor(dbName = 'online_erp') {  // <-- Change 'online_erp' to your DB name
    this.uri = process.env.MONGO_URI || "mongodb+srv://online_erp:O3NzbBt0HHaNVdVl@cluster0.lu7tyzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.dbName = dbName;
    this.db = null;
    this.connected = false;
  }

  /**
   * Connect to MongoDB only if not already connected
   */
  async connect() {
    if (this.connected) return;

    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      this.connected = true;
      console.log(`✅ Connected to MongoDB [${this.dbName}]`);
    } catch (err) {
      console.error("❌ MongoDB connection error:", err.message);
      throw err;
    }
  }

  /**
   * Get active DB instance
   */
  getDB() {
    if (!this.connected || !this.db) {
      throw new Error("❗ DB not connected. Call connect() first.");
    }
    return this.db;
  }

  /**
   * Close DB connection
   */
  async close() {
    try {
      await this.client.close();
      this.connected = false;
      console.log("🔒 MongoDB connection closed");
    } catch (err) {
      console.error("❌ Error closing DB connection:", err.message);
    }
  }
}

module.exports = new Database();
