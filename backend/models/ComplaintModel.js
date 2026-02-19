import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  customerEmail: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
