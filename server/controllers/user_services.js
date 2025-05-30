const db = require('../config/Database');

class User_Services {
  async insertToTheDatabase(data, collectionName) {
    try {
      await db.connect(); // Ensure DB is connected
      const result = await db.getDB().collection(collectionName).insertOne(data);
      return result;
    } catch (err) {
      console.error("User insert failed:", err.message);
      throw err;
    }
  }

  async updateData(filter, updateFields, collectionName) {
    await db.connect();
    const dbInstance = db.getDB();

    return dbInstance.collection(collectionName).updateOne(
      filter,
      { $inc: updateFields }
    );
  }



  async fetchData(collectionName, options = {}) {
    if (!collectionName) throw new Error("Collection name is required");

    try {
      await db.connect();
      const dbInstance = db.getDB();
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
    const database = db.getDB();
    const result = await database.collection(collectionName).findOne(toCheck);
    return result;
  }




}

module.exports = User_Services;
