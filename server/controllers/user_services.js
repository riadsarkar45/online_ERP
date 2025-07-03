const Database = require('../config/database_wrong');

class User_Services {
  constructor() {
    this.db = new Database(); // create one instance for the class
  }

  async insertToTheDatabase(data, collectionName) {
    try {
      await this.db.connect(); // ensure DB connection is ready
      const result = await this.db.getDB().collection(collectionName).insertOne(data);
      return result;
    } catch (err) {
      console.error("User insert failed:", err.message);
      throw err;
    }
  }

/**
 * Update a MongoDB document with dynamic update operators
 * @param {Object} filter - MongoDB query filter
 * @param {Object} updateFields - Object containing update operators like $inc, $set, $push
 * @param {String} collectionName - The name of the collection
 * @param {Object} options - Optional MongoDB update options (e.g., { upsert: true })
 */
async updateData(filter, updateFields, collectionName, options = {}) {
  if (!filter || typeof filter !== 'object') {
    throw new Error("Invalid or missing filter object");
  }

  if (!updateFields || typeof updateFields !== 'object') {
    throw new Error("Invalid or missing updateFields object");
  }

  if (!collectionName || typeof collectionName !== 'string') {
    throw new Error("Invalid or missing collection name");
  }

  try {
    await this.db.connect();
    const dbInstance = this.db.getDB();

    // Perform the update
    const result = await dbInstance.collection(collectionName).updateOne(
      filter,
      updateFields, // This should include $inc, $set, $push, etc.
      options
    );

    return result;
  } catch (err) {
    console.error(`[MongoDB Update Error] ${err.message}`);
    throw err;
  }
}


  async fetchData(collectionName, options = {}) {
    if (!collectionName) throw new Error("Collection name is required");

    try {
      await this.db.connect();
      const dbInstance = this.db.getDB();
      const collection = dbInstance.collection(collectionName);

      const {
        lookups = [],   // dynamic joins
        match = {},     // filters
        sort = {},      // sorting
        project = {},   // projection
        limit = 0       // pagination
      } = options;

      const pipeline = [];

      if (Object.keys(match).length) pipeline.push({ $match: match });
      for (const { from, localField, foreignField, as } of lookups) {
        if (!from || !localField || !foreignField || !as) continue;
        pipeline.push({ $lookup: { from, localField, foreignField, as } });
      }
      if (Object.keys(project).length) pipeline.push({ $project: project });
      if (Object.keys(sort).length) pipeline.push({ $sort: sort });
      if (limit > 0) pipeline.push({ $limit: limit });

      const result = pipeline.length
        ? await collection.aggregate(pipeline).toArray()
        : await collection.find(match).toArray();

      return result;
    } catch (err) {
      console.error("Fetch failed:", err.message);
      throw err;
    }
  }

  async findDataIfExist(collectionName, toCheck) {
    if (!collectionName || !toCheck) throw new Error('Collection name and to-check data should not be empty');

    try {
      await this.db.connect();
      const database = this.db.getDB();
      const result = await database.collection(collectionName).findOne(toCheck);
      return result;
    } catch (err) {
      console.error("Find data failed:", err.message);
      throw err;
    }
  }
}

module.exports = User_Services;
