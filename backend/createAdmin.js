import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/AdminModel.js";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo error ❌", err));

const createAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("Admin already exists!");
      return;
    }

    const admin = new Admin({
      email: "admin@example.com",
      password: "admin123"
    });
    await admin.save();
    console.log("Admin created successfully!");
  } catch (error) {
    console.log("Error creating admin:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
