import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    name_of_design: {
      type: String,
      required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category-design', // Reference to Category model
        required: true
      },
      subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory-design', // Reference to Subcategory model
        required: true
      },
    description: {
      type: String,
      required: true,
    },
    price_per_squarefeet: {
      type: Number,
      required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
      },
    layout: {
      type: String, 
      required: true,
    },
    room_dimension: {
      type: Number,
      required: true,
    },
  },
);

export default mongoose.model("Design", designSchema); 

