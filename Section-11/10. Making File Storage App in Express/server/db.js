import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/storageApp";

const client = new MongoClient(url);


export async function connectDB() {
    
    const db = client.db();
    await client.connect();
    return db;
}

process.on("SIGINT", async () => {
    await client.close()
    console.log("Client Disconnected");
    process.exit(0)
})