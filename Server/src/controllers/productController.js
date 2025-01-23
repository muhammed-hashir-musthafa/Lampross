import productSchema from "../models/Product.js";
import categorySchema from "../models/Category.js";
import subCategorySchema from "../models/SubCategory.js";
import { validateProduct } from "../middlewares/JoiValidation/productValidation.js";
import { cloudinary } from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const {
      type,
      category,
      city,
      builtUpArea,
      layout,
      minPrice,
      maxPrice,
      sortBy,
    } = req.query;

    const filter = {};

    // Apply filter conditions based on query parameters
    if (type) filter.style = type;
    if (category) filter.category = category;
    if (city) filter.city = city;
    if (builtUpArea) filter.builtUpArea = builtUpArea;
    if (layout) filter.layout = layout;

    // Apply price range filter if minPrice or maxPrice are provided
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting options
    const sortOptions = {
      featured: { tags: -1 },
      priceLowToHigh: { price: 1 },
      priceHighToLow: { price: -1 },
    };

    // Apply filtering and sorting
    const products = await productSchema
      .find(filter)
      .sort(sortOptions[sortBy] || {}) // Default to no sorting if sortBy is not valid
      .populate("category")
      .populate("subCategory");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const dimensions = JSON.parse(req.body.dimensions);

    const { error } = validateProduct({
      ...req.body,
      dimensions,
      images: req.files?.map((file) => file.path),
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }

    let category = await categorySchema.findOne({
      name: { $regex: new RegExp(`^${req.body.category}$`, "i") },
    });

    if (!category) {
      category = new categorySchema({ name: req.body.category });
      await category.save();
    }

    let subCategory = await subCategorySchema.findOne({
      name: req.body.subCategory,
      category: category._id,
    });

    if (!subCategory) {
      subCategory = new subCategorySchema({
        name: req.body.subCategory,
        category: category._id,
      });
      await subCategory.save();
    }

    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
    }

    const product = new productSchema({
      ...req.body,
      dimensions,
      category: category._id,
      subCategory: subCategory._id,
      images: imageUrls,
    });

    const savedProduct = await product.save();
    await savedProduct.populate("category subCategory");

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

// export const getFilteredAndSortedProducts = async (req, res) => {
//   try {
//     const {
//       type,
//       category,
//       city,
//       builtUpArea,
//       layout,
//       minPrice,
//       maxPrice,
//       sortBy,
//       page = 1,
//       limit = 12,
//     } = req.query;

//     console.log("req");
//     const filter = {};

//     if (type) filter.style = type;
//     if (category) filter.category = category;
//     if (city) filter.city = city;
//     if (builtUpArea) filter.builtUpArea = builtUpArea;
//     if (layout) filter.layout = layout;

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     const sortOptions = {
//       featured: { tags: -1 },
//       priceLowToHigh: { price: 1 },
//       priceHighToLow: { price: -1 },
//     };

//     const products = await productSchema
//       .find(filter)
//       .sort(sortOptions[sortBy] || {})
//       .skip((page - 1) * limit)
//       .limit(Number(limit))
//       .populate("category")
//       .populate("subCategory");

//     const total = await productSchema.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       products,
//       pagination: {
//         currentPage: Number(page),
//         totalPages: Math.ceil(total / limit),
//         totalProducts: total,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Errozldxfjr: ${error.message}`,
//     });
//   }
// };

// export const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const product = await productSchema.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error: ${error.message}`,
//     });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await productSchema.findByIdAndDelete(id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error: ${error.message}`,
//     });
//   }
// };

// export const getProductsByCategory = async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const products = await productSchema
//       .find({ category: categoryId })
//       .populate("category")
//       .populate("subCategory");

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error: ${error.message}`,
//     });
//   }
// };

// export const getProductsBySubCategory = async (req, res) => {
//   try {
//     const { subCategoryId } = req.params;
//     const products = await productSchema
//       .find({ subCategory: subCategoryId })
//       .populate("category")
//       .populate("subCategory");

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error: ${error.message}`,
//     });
//   }
// };

// export const search = async (req, res) => {
//   try {
//     const {
//       query,
//       category,
//       subCategory,
//       minPrice,
//       maxPrice,
//       sort = "createdAt",
//       order = "desc",
//       page = 1,
//       limit = 20,
//     } = req.query;

//     const filter = {};

//     if (query) {
//       filter.$text = { $search: query };
//     }

//     if (category) {
//       filter.category = category;
//     }

//     if (subCategory) {
//       filter.subCategory = subCategory;
//     }

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     const products = await productSchema
//       .find(filter)
//       .sort({ [sort]: order === "desc" ? -1 : 1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .populate("category")
//       .populate("subCategory");

//     const total = await productSchema.countDocuments(filter);

//     res.status(200).json({
//       success: true,
//       products,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(total / limit),
//         count: products.length,
//         total,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error: ${error.message}`,
//     });
//   }
// };

// export const getCategories = async (req, res) => {
//   try {
//     const categories = await categorySchema.find();
//     res.json({
//       status: true,
//       data: categories,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };

// export const getSubCategories = async (req, res) => {
//   try {
//     const subCategories = await subCategorySchema
//       .find({
//         category: req.params.categoryId,
//       })
//       .populate("category");

//     res.json({
//       status: true,
//       data: subCategories,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message,
//     });
//   }
// };
