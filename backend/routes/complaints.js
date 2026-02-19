import express from "express";
import Complaint from "../models/ComplaintModel.js";

const router = express.Router();

// GET all complaints (for Admin)
router.get("/all", async (req, res) => {
  console.log("[BACKEND] Fetching all complaints...");
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    console.log(`[BACKEND] Found ${complaints.length} complaints`);
    res.json(complaints);
  } catch (err) {
    console.error("[BACKEND] Error fetching all:", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("[BACKEND] Received new complaint submission:", req.body);
  try {
    const { title, description, customerEmail } = req.body;

    if (!title || !description || !customerEmail) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newComplaint = new Complaint({ title, description, customerEmail });
    await newComplaint.save();
    console.log("[BACKEND] Complaint saved successfully ID:", newComplaint._id);
    res.status(201).json(newComplaint); // send back created complaint
  } catch (error) {
    console.error("[BACKEND] Error saving complaint:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/mycomplaints/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const complaints = await Complaint.find({
      customerEmail: { $regex: new RegExp(`^${email}$`, "i") }
    }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Status update for admins (Moved here for reliability)
router.patch("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    console.log(`[BACKEND] Updating status for ${req.params.id} to ${status}`);
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Complaint not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
