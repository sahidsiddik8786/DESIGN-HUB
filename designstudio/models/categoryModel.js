import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  }]
});

export default mongoose.model("Category", categorySchema);