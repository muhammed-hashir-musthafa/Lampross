import {
  calculateConstructionCost,
  calculateInteriorCost,
  calculateCostBreakdown,
} from "../services/estimationService.js";
import { EstimationError } from "../utils/errors.js";

export const calculateEstimate = async (req, res, next) => {
  try {
    const { state, city, area, areaUnit, constructionType } = req.body;

    if (!state || !city || !area || !areaUnit || !constructionType) {
      throw new EstimationError("All fields are required.");
    }

    const areaInSqFt = areaUnit === "sqm" ? area * 10.764 : area;

    const constructionCost = calculateConstructionCost(
      areaInSqFt,
      state,
      constructionType
    );
    const interiorCost = calculateInteriorCost(areaInSqFt, constructionType);

    const totalCost = Math.max(constructionCost.max, interiorCost.max);
    const costBreakdown = calculateCostBreakdown(totalCost);

    res.status(200).json({
      success: true,
      constructionCost,
      interiorCost,
      costBreakdown,
      totalArea: areaInSqFt,
      unit: "sqft",
      maxCost: `₹${totalCost} Lakhs`,
    });
  } catch (error) {
    next(
      new EstimationError("Failed to calculate cost estimate.", error.message)
    );
  }
};
