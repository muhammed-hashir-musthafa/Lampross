import Joi from "joi";

export const validateProduct = (data) => {
  const schema = Joi.object({
    productName: Joi.string().required().trim(),
    productCode: Joi.string().required(),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
    productType: Joi.string().required(),
    subType: Joi.string().required(),
    price: Joi.number().required().min(0),
    stockQuantity: Joi.number().required().min(0),
    productDesc: Joi.string().required(),
    brandName: Joi.string().required(),
    color: Joi.string().required(),
    material: Joi.string().required(),
    dimensions: Joi.object({
      width: Joi.number().required().min(0),
      height: Joi.number().required().min(0),
      depth: Joi.number().required().min(0),
      weight: Joi.number().required().min(0),
      baseWidth: Joi.number().required().min(0),
    }).required(),
    style: Joi.string().required(),
    installationType: Joi.string().required(),
    doorType: Joi.string().required(),
    finishType: Joi.string().required(),
    sealMaterial: Joi.string().required(),
    shape: Joi.string().required(),
    productCareInstructions: Joi.string().required(),
    itemModelNumber: Joi.string().required(),
    asinNumber: Joi.string().required(),
    specialFeatures: Joi.string().required(),
    manufacturerDetails: Joi.string().required(),
    manufacturingDate: Joi.date().required(),
    countryOfOrigin: Joi.string().required(),
    deliveryCharge: Joi.number().required().min(0),
    hasWarranty: Joi.boolean().required(),
    hasISOCertificate: Joi.boolean().required(),
    images: Joi.array().items(Joi.string()),
  });

  return schema.validate(data, { abortEarly: false });
};
