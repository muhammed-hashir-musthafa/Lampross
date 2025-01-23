import Joi from "joi";
import { ValidationError } from "../../utils/errors.js";

export const bookingSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid  phone number",
      "any.required": "Phone number is required",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),

  place: Joi.string().required().messages({
    "any.required": "Place is required",
  }),
});

const validateBooking = async (req, res, next) => {
  try {
    await bookingSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(new ValidationError("Invalid estimation parameters", error));
  }
};

export default validateBooking;
