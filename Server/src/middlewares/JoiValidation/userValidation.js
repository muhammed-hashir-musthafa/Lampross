import Joi from "joi";
import { ValidationError } from "../../utils/errors.js";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("user", "admin").required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  place: Joi.string().required(),
  age: Joi.number().integer().min(18).max(100).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
});

export const validateUser = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.details.map((detail) => detail.message);
    next(new ValidationError("Invalid user parameters", errors));
  }
};
