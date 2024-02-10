import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category-design', // Reference to Category model
    required: true
  },
  description: {
    type: String,
    required: true
  },
}, { timestamps: true });


export default mongoose.model('Subcategory-design', subcategorySchema);