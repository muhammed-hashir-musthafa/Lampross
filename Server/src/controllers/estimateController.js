import {
  calculateConstructionCost,
  calculateInteriorCost,
} from "../services/estimationService.js";
import { EstimationError } from "../utils/errors.js";

export const calculateEstimate = async (req, res, next) => {
  try {
    const { state, city, area, areaUnit, constructionType } = req.body;

    if (!state || !city || !area || !constructionType) {
      throw new EstimationError("All fields are required.");
    }

    const areaInSqFt = areaUnit === "sqm" ? area * 10.764 : area;

    const constructionCost = calculateConstructionCost(
      areaInSqFt,
      state,
      constructionType
    );
    const interiorCost = calculateInteriorCost(areaInSqFt, constructionType);

    const costBreakdown = {
      foundation: 15,
      structure: 25,
      finishing: 20,
      plumbing: 10,
      electrical: 10,
      windows: 8,
      doors: 7,
      others: 5,
    };

    const maxCost = Math.max(constructionCost.max, interiorCost.max);

    res.status(200).json({
      success: true,
      constructionCost,
      interiorCost,
      costBreakdown,
      totalArea: areaInSqFt,
      unit: "sqft",
      maxCost: `₹${maxCost} Lakhs`,
    });
  } catch (error) {
    next(
      new EstimationError("Failed to calculate cost estimate.", error.message)
    );
  }
};
