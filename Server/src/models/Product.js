import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    productCode: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    productType: { type: String, required: true },
    subType: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
    productDesc: { type: String, required: true },
    brandName: { type: String, required: true },
    color: { type: String, required: true },
    material: { type: String, required: true },
    dimensions: {
      width: { type: Number, required: true, min: 0 },
      height: { type: Number, required: true, min: 0 },
      depth: { type: Number, required: true, min: 0 },
      weight: { type: Number, required: true, min: 0 },
      baseWidth: { type: Number, required: true, min: 0 },
    },
    style: { type: String, required: true },
    installationType: { type: String, required: true },
    doorType: { type: String, required: true },
    finishType: { type: String, required: true },
    sealMaterial: { type: String, required: true },
    shape: { type: String, required: true },
    productCareInstructions: { type: String, required: true },
    itemModelNumber: { type: String, required: true },
    asinNumber: { type: String, required: true },
    specialFeatures: { type: String, required: true },
    manufacturerDetails: { type: String, required: true },
    manufacturingDate: { type: Date, required: true },
    countryOfOrigin: { type: String, required: true },
    deliveryCharge: { type: Number, required: true, min: 0 },
    hasWarranty: { type: Boolean, required: true },
    hasISOCertificate: { type: Boolean, required: true },
    images: [{ type: String, required: true }],
    city: { type: String, },
    builtUpArea: { type: String,  },
    layout: { type: String,  },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
