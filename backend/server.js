import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import complaintRoutes from "./routes/complaints.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Add this: Handle 404 errors as JSON
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found on server` });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5001, () => console.log("Server running on port 5001"));
