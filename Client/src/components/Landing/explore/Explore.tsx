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
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import CostEstimation from "../costEstimation/CostEstimation";

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

export default function ExploreSection() {
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    area: "",
    areaUnit: "sqft",
    constructionType: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleReset = () => {
    setFormData({
      state: "",
      city: "",
      area: "",
      areaUnit: "sqft",
      constructionType: "",
    });
    setIsSubmitted(false);
  };

  const handleCalculate = () => {
    console.log("Calculating with data:", formData);

    setIsSubmitted(true);
  };

  const constructionCost = {
    min: 10,
    max: 15,
  };

  const interiorCost = {
    min: 5,
    max: 8,
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
                  src={feature.image}
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

              <div className="md:w-[400px] space-y-3">
                <div className="relative">
                  <Select
                    value={formData.state}
                    onValueChange={(value) =>
                      setFormData({ ...formData, state: value })
                    }
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
                  <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                    Select state
                  </label>
                </div>

                <div className="relative">
                  <Select
                    value={formData.city}
                    onValueChange={(value) =>
                      setFormData({ ...formData, city: value })
                    }
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
                  <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                    Select city
                  </label>
                </div>

                <div className="relative">
                  <div className="flex border rounded-md shadow-sm items-center space-x-4">
                    <Input
                      type="text"
                      placeholder="Area"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      className="flex-1 h-14 border-0 shadow-none"
                    />
                    <div className="flex h-8">
                      <Separator orientation="vertical" />
                    </div>
                    <Select
                      value={formData.areaUnit}
                      onValueChange={(value) =>
                        setFormData({ ...formData, areaUnit: value })
                      }
                    >
                      <SelectTrigger className="w-[100px] h-14 border-0 shadow-none">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqft">Sq. feet</SelectItem>
                        <SelectItem value="sqm">Sq. meter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                    Area
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Type of construction"
                    value={formData.constructionType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        constructionType: e.target.value,
                      })
                    }
                    className="w-full h-14 border border-gray-200 shadow-sm"
                  />
                  <label className="absolute text-xs text-gray-500 -top-1.5 left-3 bg-section px-1">
                    Type of construction
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="px-6 h-12 border-primary hover:bg-gray-50 hover:text-black rounded-lg"
                  >
                    Reset
                  </Button>
                  <Button
                    className="flex-1 h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 rounded-lg"
                    onClick={handleCalculate}
                  >
                    Calculate cost
                  </Button>
                </div>
              </div>
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

        {isSubmitted && (
          <div className="mt-12">
            <CostEstimation
              constructionCost={constructionCost}
              interiorCost={interiorCost}
            />
          </div>
        )}
      </div>
    </section>
  );
}
