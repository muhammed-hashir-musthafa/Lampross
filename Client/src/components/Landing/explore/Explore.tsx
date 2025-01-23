"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldInputProps,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import CostEstimation from "../costEstimation/CostEstimation";
import { calculateEstimateApi } from "@/api/estimate";
import { useState } from "react";

interface FormValues {
  state: string;
  city: string;
  area: string;
  areaUnit: "sqft" | "sqm";
  constructionType: string;
}

interface CostData {
  constructionCost: {
    min: number;
    max: number;
  };
  interiorCost: {
    min: number;
    max: number;
  };
  costBreakdown: Record<string, number>;
  maxCost: string;
}

const transformApiResponse = (
  response: CalculateEstimateResponse
): CostData => {
  return {
    constructionCost: {
      min: response.constructionCost?.min ?? 0,
      max: response.constructionCost?.max ?? 0,
    },
    interiorCost: {
      min: response.interiorCost?.min ?? 0,
      max: response.interiorCost?.max ?? 0,
    },
    costBreakdown: response.costBreakdown ?? {},
    maxCost: response.maxCost ?? "0",
  };
};

interface CalculateEstimateResponse {
  constructionCost?: {
    min?: number | null;
    max?: number | null;
  };
  interiorCost?: {
    min?: number | null;
    max?: number | null;
  };
  costBreakdown?: Record<string, number> | null;
  maxCost?: string | null;
}

const features = [
  {
    title: "Explore Designs",
    description:
      "Thousands of unique and stylish designs for kitchen, bedroom, dining areas and much more are available to suite every taste and need.",
    image: "https://placehold.co/160",
  },
  {
    title: "Find Professionals",
    description:
      "Thousands of unique and stylish designs for kitchen, bedroom, dining areas and much more are available to suite every taste and need.",
    image: "https://placehold.co/160",
  },
  {
    title: "Find Products & Materials",
    description:
      "Thousands of unique and stylish designs for kitchen, bedroom, dining areas and much more are available to suite every taste and need.",
    image: "https://placehold.co/160",
  },
  {
    title: "Properties & Lands",
    description:
      "Thousands of unique and stylish designs for kitchen, bedroom, dining areas and much more are available to suite every taste and need.",
    image: "https://placehold.co/160",
  },
];

const validationSchema = Yup.object().shape({
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  area: Yup.number()
    .positive("Area must be positive")
    .required("Area is required"),
  areaUnit: Yup.string()
    .oneOf(["sqft", "sqm"], "Invalid area unit")
    .required("Area unit is required"),
  constructionType: Yup.string().required("Construction type is required"),
});

export default function ExploreSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [costData, setCostData] = useState<CostData | null>(null);

  const initialValues: FormValues = {
    state: "",
    city: "",
    area: "",
    areaUnit: "sqft",
    constructionType: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await calculateEstimateApi({
        ...values,
        area: Number.parseFloat(values.area),
      });

      const transformedData = transformApiResponse(
        response.data as CalculateEstimateResponse
      );
      setCostData(transformedData);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error during estimation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-6 bg-section">
      <div className="container max-w-6xl lg:max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Explore Lampros
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-16 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="max-md:justify-items-center max-md:text-center">
              <h2 className="text-xl md:text-3xl font-bold mb-6">
                Estimate Your Work
              </h2>
              <p className="text-md md:text-xl font-normal mb-8">
                Get an estimate amount for your home construction
              </p>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, resetForm }) => (
                  <Form className="md:w-[400px] space-y-3">
                    <div className="relative">
                      <Field name="state">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<string>;
                          form: FormikProps<FormValues>;
                        }) => (
                          <Select
                            onValueChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            value={field.value}
                          >
                            <SelectTrigger className="w-full h-14 border border-gray-200 shadow-sm">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="state1">State 1</SelectItem>
                              <SelectItem value="state2">State 2</SelectItem>
                              <SelectItem value="state3">State 3</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                        Select state
                      </label>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="relative">
                      <Field name="city">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<string>;
                          form: FormikProps<FormValues>;
                        }) => (
                          <Select
                            onValueChange={(value) =>
                              form.setFieldValue(field.name, value)
                            }
                            value={field.value}
                          >
                            <SelectTrigger className="w-full h-14 border border-gray-200 shadow-sm">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="city1">City 1</SelectItem>
                              <SelectItem value="city2">City 2</SelectItem>
                              <SelectItem value="city3">City 3</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                        Select city
                      </label>
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="relative">
                      <div className="flex border rounded-md shadow-sm items-center space-x-4">
                        <Field name="area">
                          {({ field }: { field: FieldInputProps<string> }) => (
                            <Input
                              type="text"
                              placeholder="Area"
                              {...field}
                              className="flex-1 h-14 border-0 shadow-none"
                            />
                          )}
                        </Field>
                        <div className="flex h-8">
                          <Separator orientation="vertical" />
                        </div>
                        <Field name="areaUnit">
                          {({
                            field,
                            form,
                          }: {
                            field: FieldInputProps<string>;
                            form: FormikProps<FormValues>;
                          }) => (
                            <Select
                              onValueChange={(value) =>
                                form.setFieldValue(field.name, value)
                              }
                              value={field.value}
                            >
                              <SelectTrigger className="w-[100px] h-14 border-0 shadow-none">
                                <SelectValue placeholder="Unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sqft">Sq. feet</SelectItem>
                                <SelectItem value="sqm">Sq. meter</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </Field>
                      </div>
                      <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                        Area
                      </label>
                      <ErrorMessage
                        name="area"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                      <ErrorMessage
                        name="areaUnit"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="relative">
                      <Field name="constructionType">
                        {({ field }: { field: FieldInputProps<string> }) => (
                          <Input
                            type="text"
                            placeholder="Type of construction"
                            {...field}
                            className="w-full h-14 border border-gray-200 shadow-sm"
                          />
                        )}
                      </Field>
                      <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                        Type of construction
                      </label>
                      <ErrorMessage
                        name="constructionType"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          resetForm();
                          setIsSubmitted(false);
                        }}
                        className="px-6 h-12 border-primary hover:bg-gray-50 hover:text-black rounded-lg"
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-lg"
                      >
                        {isSubmitting ? "Calculating..." : "Calculate cost"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <div className="relative h-full">
              <Image
                src="https://placehold.co/600x400"
                alt="Construction cost calculator illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {isSubmitted && costData && (
          <div className="mt-12">
            <CostEstimation costData={costData} />
          </div>
        )}
      </div>
    </section>
  );
}
