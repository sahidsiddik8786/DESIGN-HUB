import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    slot: { type: String, required: true },
   
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
  
  );

export default mongoose.model("Appointment", appointmentSchema);

