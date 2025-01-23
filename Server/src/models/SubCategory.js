import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
