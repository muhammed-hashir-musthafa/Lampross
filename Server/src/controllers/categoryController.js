// import { Category } from "../models/Category.js";
// import { slugify } from "../utils/helpers.js";

// export const categoryController = {
//   async create(req, res) {
//     try {
//       const { name, description, image } = req.body;
//       const category = new Category({
//         name,
//         slug: slugify(name),
//         description,
//         image,
//       });
//       await category.save();
//       res.status(201).json({ success: true, category });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   },

//   async getAll(req, res) {
//     try {
//       const categories = await Category.find({ isActive: true });
//       res.status(200).json({ success: true, categories });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   },
// };
