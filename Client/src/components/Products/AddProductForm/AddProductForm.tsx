"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { addProductApi } from "@/api/product";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ProductFormValues {
  productName: string;
  productCode: string;
  category: string;
  subCategory: string;
  productType: string;
  subType: string;
  price: number;
  stockQuantity: number;
  productDesc: string;
  brandName: string;
  color: string;
  material: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    weight: number;
    baseWidth: number;
  };
  style: string;
  installationType: string;
  doorType: string;
  sealMaterial: string;
  productCareInstructions: string;
  itemModelNumber: string;
  asinNumber: string;
  specialFeatures: string;
  manufacturerDetails: string;
  manufacturingDate: string;
  countryOfOrigin: string;
  deliveryCharge: string;
  hasWarranty: boolean;
  hasISOCertificate: boolean;
  images: File[];
}

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  productCode: Yup.string().required("Product code is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub-category is required"),
  productType: Yup.string().required("Product type is required"),
  subType: Yup.string().required("Sub-type is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  stockQuantity: Yup.number()
    .required("Stock quantity is required")
    .integer("Stock quantity must be a whole number")
    .min(0, "Stock quantity cannot be negative"),
  productDesc: Yup.string().required("Product description is required"),
  brandName: Yup.string().required("Brand name is required"),
  color: Yup.string().required("Color is required"),
  material: Yup.string().required("Material is required"),
  dimensions: Yup.object().shape({
    width: Yup.number()
      .required("Width is required")
      .positive("Width must be positive"),
    height: Yup.number()
      .required("Height is required")
      .positive("Height must be positive"),
    depth: Yup.number()
      .required("Depth is required")
      .positive("Depth must be positive"),
    weight: Yup.number()
      .required("Weight is required")
      .positive("Weight must be positive"),
    baseWidth: Yup.number()
      .required("Base width is required")
      .positive("Base width must be positive"),
  }),
  style: Yup.string().required("Style is required"),
  installationType: Yup.string().required("Installation type is required"),
  doorType: Yup.string().required("Door type is required"),
  sealMaterial: Yup.string().required("Seal material is required"),
  productCareInstructions: Yup.string().required(
    "Product care instructions are required"
  ),
  itemModelNumber: Yup.string().required("Item model number is required"),
  asinNumber: Yup.string().required("ASIN number is required"),
  specialFeatures: Yup.string().required("Special features are required"),
  manufacturerDetails: Yup.string().required(
    "Manufacturer details are required"
  ),
  manufacturingDate: Yup.date().required("Manufacturing date is required"),
  countryOfOrigin: Yup.string().required("Country of origin is required"),
  deliveryCharge: Yup.number()
    .required("Delivery charge is required")
    .min(0, "Delivery charge cannot be negative"),
  hasWarranty: Yup.boolean().required("Warranty information is required"),
  hasISOCertificate: Yup.boolean().required(
    "ISO certificate information is required"
  ),
  images: Yup.array()
    .min(1, "At least 1 image is required")
    .required("Images are required"),
});

const AddProductForm = () => {
  const router = useRouter();
  const [previews, setPreviews] = useState<string[]>([]);

  const initialValues: ProductFormValues = {
    productName: "",
    productCode: "",
    category: "",
    subCategory: "",
    productType: "",
    subType: "",
    price: 0,
    stockQuantity: 0,
    productDesc: "",
    brandName: "",
    color: "",
    material: "",
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0,
      baseWidth: 0,
    },
    style: "",
    installationType: "",
    doorType: "",
    sealMaterial: "",
    productCareInstructions: "",
    itemModelNumber: "",
    asinNumber: "",
    specialFeatures: "",
    manufacturerDetails: "",
    manufacturingDate: "",
    countryOfOrigin: "",
    deliveryCharge: "",
    hasWarranty: false,
    hasISOCertificate: false,
    images: [],
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: keyof ProductFormValues, value: File[]) => void,
    setFieldError: (
      field: keyof ProductFormValues,
      message: string | undefined
    ) => void
  ) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFieldValue("images", fileArray);
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);

      if (fileArray.length < 4) {
        setFieldError("images", "At least 4 images are required");
      } else {
        setFieldError("images", undefined);
      }
    }
  };

  const removeImage = (
    index: number,
    setFieldValue: (field: keyof ProductFormValues, value: File[]) => void,
    values: ProductFormValues
  ) => {
    const newImages = [...values.images];
    newImages.splice(index, 1);
    setFieldValue("images", newImages);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (
    values: ProductFormValues,
    { setSubmitting, setStatus, resetForm }: FormikHelpers<ProductFormValues>
  ) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (key === "images") {
          (values.images as File[]).forEach((image) => {
            formData.append("images", image);
          });
        } else if (key === "dimensions") {
          formData.append("dimensions", JSON.stringify(values.dimensions));
        } else if (
          values[key as keyof ProductFormValues] !== undefined &&
          values[key as keyof ProductFormValues] !== null
        ) {
          formData.append(
            key,
            values[key as keyof ProductFormValues] as string
          );
        }
      });

      const response = await addProductApi(formData);
      toast.success("Product added successfully!");
      resetForm();
      setStatus({
        success: true,
        message: response.message || "Product added successfully!",
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else if (error.response?.status === 400) {
          toast.error("Product already exists");
        } else if (error.response?.status === 401) {
          toast.error(
            "Product validation error. Please ensure inputs are correct "
          );
        } else if (error.response?.status === 402) {
          toast.error("Something went wrong. Please try again");
        } else {
          toast.error("An error occurred. Please try again.");
        }
        setStatus({
          success: false,
          message: error.response?.data?.message || "Product addition failed",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleReset,
          setFieldValue,
          setFieldError,
          isSubmitting,
        }) => (
          <Form>
            <div className="grid grid-cols-12 gap-6 ">
              <div className="col-span-12 lg:col-span-4 space-y-6 bg-gray-100 p-4 rounded-lg">
                <div className="bg-gray-100 rounded-lg p-6 shadow-sm border  ">
                  <h2 className="text-lg font-semibold mb-4">Product Image</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                      <input
                        type="file"
                        multiple
                        name="images"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(e, setFieldValue, setFieldError)
                        }
                        className="hidden"
                        id="images"
                      />
                      <label
                        htmlFor="images"
                        className="cursor-pointer text-center"
                      >
                        <div className="w-8 h-8 mb-2 mx-auto border-2 border-gray-400 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xl">+</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Drop your image here
                        </p>
                        <p className="text-xs text-blue-500">
                          or click to Browse
                        </p>
                      </label>
                    </div>
                    {previews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden"
                      >
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index, setFieldValue, values)
                          }
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                        >
                          <X size={16} className="text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    You need to add at least 4 photos. Please pay attention to
                    the quality of the images you add*
                  </p>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>

                <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Additional Info
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Field
                        name="manufacturerDetails"
                        as="textarea"
                        placeholder="Manufacturer Details"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="manufacturerDetails"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="manufacturingDate"
                        type="date"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="manufacturingDate"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="countryOfOrigin"
                        type="text"
                        placeholder="Country of Origin"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="countryOfOrigin"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="deliveryCharge"
                        type="text"
                        placeholder="Delivery Charge"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="deliveryCharge"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <p className="mb-2">Does this Product have warranty?</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <Field
                            type="radio"
                            name="hasWarranty"
                            value={true}
                            className="form-radio"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Field
                            type="radio"
                            name="hasWarranty"
                            value={false}
                            className="form-radio"
                          />
                          <span>No</span>
                        </label>
                      </div>
                      <ErrorMessage
                        name="hasWarranty"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <p className="mb-2">
                        Does this Product have ISO Certificate?
                      </p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <Field
                            type="radio"
                            name="hasISOCertificate"
                            value={true}
                            className="form-radio"
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Field
                            type="radio"
                            name="hasISOCertificate"
                            value={false}
                            className="form-radio"
                          />
                          <span>No</span>
                        </label>
                      </div>
                      <ErrorMessage
                        name="hasISOCertificate"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Product Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        name="productName"
                        type="text"
                        placeholder="Product Name"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="productName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="productCode"
                        type="text"
                        placeholder="Product Code"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="productCode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="category"
                        as="select"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      >
                        <option value="">Select Category</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="subCategory"
                        as="select"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      >
                        <option value="">Select Sub-Category</option>
                        <option value="subCategory1">Sub-Category 1</option>
                        <option value="subCategory2">Sub-Category 2</option>
                      </Field>
                      <ErrorMessage
                        name="subCategory"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="productType"
                        as="select"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      >
                        <option value="">Select Product Type</option>
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                      </Field>
                      <ErrorMessage
                        name="productType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="subType"
                        as="select"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      >
                        <option value="">Select Sub Type</option>
                        <option value="subType1">Sub Type 1</option>
                        <option value="subType2">Sub Type 2</option>
                      </Field>
                      <ErrorMessage
                        name="subType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="price"
                        type="text"
                        placeholder="Price"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="stockQuantity"
                        type="text"
                        placeholder="Stock Quantity"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="stockQuantity"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <Field
                        name="productDesc"
                        as="textarea"
                        placeholder="Product Description"
                        className="w-full p-3 rounded-lg border border-gray-200 h-24"
                      />
                      <ErrorMessage
                        name="productDesc"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Technical Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        name="brandName"
                        type="text"
                        placeholder="Brand Name"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="brandName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="color"
                        type="text"
                        placeholder="Color"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="color"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="material"
                        as="select"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      >
                        <option value="">Select Material</option>
                        <option value="material1">Material 1</option>
                        <option value="material2">Material 2</option>
                      </Field>
                      <ErrorMessage
                        name="material"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="dimensions.width"
                        type="text"
                        placeholder="Width (mm)"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="dimensions.width"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="dimensions.height"
                        type="text"
                        placeholder="Height (mm)"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="dimensions.height"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="dimensions.depth"
                        type="text"
                        placeholder="Depth (mm)"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="dimensions.depth"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="dimensions.weight"
                        type="text"
                        placeholder="Weight (kg)"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="dimensions.weight"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="dimensions.baseWidth"
                        type="text"
                        placeholder="Base Width (mm)"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="dimensions.baseWidth"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="style"
                        as="select"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      >
                        <option value="">Select Style</option>
                        <option value="style1">Style 1</option>
                        <option value="style2">Style 2</option>
                      </Field>
                      <ErrorMessage
                        name="style"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="installationType"
                        type="text"
                        placeholder="Installation Type"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="installationType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="doorType"
                        type="text"
                        placeholder="Door Type"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="doorType"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="sealMaterial"
                        type="text"
                        placeholder="Seal Material"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="sealMaterial"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="itemModelNumber"
                        type="text"
                        placeholder="Item Model Number"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="itemModelNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="asinNumber"
                        type="text"
                        placeholder="ASIN Number"
                        className="w-full p-3 rounded-lg border border-gray-200"
                      />
                      <ErrorMessage
                        name="asinNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <Field
                        name="specialFeatures"
                        as="textarea"
                        placeholder="Special Features"
                        className="w-full p-3 rounded-lg border border-gray-200 h-24"
                      />
                      <ErrorMessage
                        name="specialFeatures"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        name="productCareInstructions"
                        as="textarea"
                        placeholder="Product Care Instructions"
                        className="w-full p-3 rounded-lg border border-gray-200 h-24"
                      />
                      <ErrorMessage
                        name="productCareInstructions"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-white text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear All
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {isSubmitting ? "Adding Product..." : "Add Product"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
