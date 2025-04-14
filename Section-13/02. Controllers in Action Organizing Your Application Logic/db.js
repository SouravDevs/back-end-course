import mongoose from "mongoose";


export async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoApp")
    console.log('Database connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
  
}

await connectDB()

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  process.exit(0);
  console.log('Database disconnected');

});
