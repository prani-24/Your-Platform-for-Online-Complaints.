import express from "express";
import Complaint from "../models/ComplaintModel.js";

const router = express.Router();

// GET all complaints for admin
router.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update complaint status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    console.log(`Updating complaint ${req.params.id} to status: ${status}`);
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedComplaint) return res.status(404).json({ message: "Complaint not found" });
    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
