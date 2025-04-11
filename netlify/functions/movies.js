const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("mflix");
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

exports.handler = async (event, context) => {
  try {
    const { db } = await connectToDatabase(uri);
    // Return only the _id, title, and year fields
    const movies = await db
      .collection("movies")
      .find({}, { projection: { title: 1, year: 1 } })
      .limit(50)
      .toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(movies),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
