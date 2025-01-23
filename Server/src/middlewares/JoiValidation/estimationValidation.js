import Joi from "joi";
import { ValidationError } from "../../utils/errors.js";

const estimationSchema = Joi.object({
  state: Joi.string(),
  city: Joi.string(),
  area: Joi.number().positive().required(),
  areaUnit: Joi.string().valid("sqft", "sqm").required(),
  constructionType: Joi.string().required(),
});

const validateEstimation = async (req, res, next) => {
  try {
    await estimationSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(new ValidationError("Invalid estimation parameters", error));
  }
};

export default validateEstimation;
