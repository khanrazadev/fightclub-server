import mongoose from "mongoose";

// Set the strictQuery option to false to suppress the deprecation warning
mongoose.set("strictQuery", false);

export const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase the timeout to avoid premature errors
      family: 4, // Use IPv4
    };

    const { connection } = await mongoose.connect(
      process.env.MONGO_URI,
      options
    );
    console.log(`Mongo db is connected to ${connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
