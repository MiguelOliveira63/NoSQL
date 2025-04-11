const { MongoClient, ObjectId } = require("mongodb");
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
    // Expect movie id as a query parameter (e.g., /.netlify/functions/movie?id=<movieId>)
    const movieId = event.queryStringParameters && event.queryStringParameters.id;
    if (!movieId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Movie id is required." }) };
    }
    const { db } = await connectToDatabase(uri);
    const movie = await db.collection("movies").findOne({ _id: ObjectId(movieId) });
    if (!movie) {
      return { statusCode: 404, body: JSON.stringify({ error: "Movie not found" }) };
    }
    const comments = await db.collection("comments").find({ movie_id: ObjectId(movieId) }).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify({ movie, comments }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
