const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";

const dbName = "example_db";
const collectionName = "example_collection";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const documents = [
      { name: "Alice", age: 25, city: "New York" },
      { name: "Bob", age: 30, city: "San Francisco" },
      { name: "Charlie", age: 35, city: "Chicago" },
    ];
    const insertResult = await collection.insertMany(documents);
    console.log("Inserted documents:", insertResult.insertedIds);

    const query = { age: { $gt: 28 } };
    const results = await collection.find(query).toArray();
    console.log("Documents with age > 28:", results);

    const updateFilter = { name: "Alice" };
    const updateDoc = { $set: { age: 26 } };
    const updateResult = await collection.updateOne(updateFilter, updateDoc);
    console.log("Updated document count:", updateResult.modifiedCount);
    const deleteFilter = { name: "Charlie" };
    const deleteResult = await collection.deleteOne(deleteFilter);
    console.log("Deleted document count:", deleteResult.deletedCount);

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}
run();
