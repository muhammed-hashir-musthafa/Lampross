"use client";

import React, { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Duration = "1 Month" | "6 Month" | "1 Year";
type PlanFeature = {
  name: string;
  tooltip?: string;
  included: {
    free: boolean;
    premium: boolean;
  };
};

const PlanSelection = () => {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<Duration>("1 Month");
  const [selectedPlan, setSelectedPlan] = useState<"Free" | "Premium">("Free");

  const durations: Duration[] = ["1 Month", "6 Month", "1 Year"];

  const features: PlanFeature[] = [
    {
      name: "Enhanced profile",
      tooltip: "Customize your profile with additional information",
      included: { free: true, premium: true },
    },
    {
      name: "Unlimited product listing or Service listing",
      tooltip: "List as many products or services as you want",
      included: { free: true, premium: true },
    },
    {
      name: "Product Listing Priority",
      tooltip: "Get priority in product listings",
      included: { free: true, premium: true },
    },
    {
      name: "Analytics",
      tooltip: "Access detailed analytics about your profile",
      included: { free: true, premium: true },
    },
    {
      name: "Customized profile page",
      tooltip: "Create a unique profile page",
      included: { free: true, premium: true },
    },
    {
      name: "Training and webinar",
      tooltip: "Access to training materials and webinars",
      included: { free: true, premium: true },
    },
    {
      name: "Lead management",
      tooltip: "Manage your leads effectively",
      included: { free: true, premium: true },
    },
  ];

  const visibilityFeatures: PlanFeature[] = [
    {
      name: "Ad credits",
      tooltip: "Credits for running ads",
      included: { free: true, premium: true },
    },
    {
      name: "Custom promotional campaigns",
      tooltip: "Create custom promotional campaigns",
      included: { free: true, premium: true },
    },
    {
      name: "Networking events",
      tooltip: "Access to networking events",
      included: { free: true, premium: true },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          {[
            "Account creation",
            "Company Profile",
            "Plan selection",
            "Payment",
          ].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${index <= 2 ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              >
                {index + 1}
              </div>
              <span className="text-sm ml-2">{step}</span>
              {index < 3 && (
                <div
                  className={`h-1 w-24 mx-2 ${
                    index <= 1 ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">Select your Pro plan</h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur elit si. A aliquot tempus
            quidem. Pellentesque faucibus amet id in nulla neque aliquet
            maximus.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={`px-6 py-2 rounded-md ${
                selectedDuration === duration
                  ? "bg-orange-500 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              {duration}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div
            className={`bg-white p-6 rounded-lg border cursor-pointer ${
              selectedPlan === "Free" ? "border-orange-500" : ""
            }`}
            onClick={() => setSelectedPlan("Free")}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="text-gray-600 text-sm">
                Basic features for getting started
              </p>
            </div>
            <button className="w-full py-2 border border-orange-500 text-orange-500 rounded-md mb-4">
              Learn more
            </button>
          </div>

          <div
            className={`bg-white p-6 rounded-lg border cursor-pointer ${
              selectedPlan === "Premium" ? "border-orange-500" : ""
            }`}
            onClick={() => setSelectedPlan("Premium")}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                ₹ 4,999<span className="text-sm text-gray-500">/6M</span>
              </h3>
              <p className="text-gray-600 text-sm">
                Advanced features for professionals
              </p>
            </div>
            <button className="w-full py-2 border border-orange-500 text-orange-500 rounded-md mb-4">
              Learn more
            </button>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => router.back()}
            className="w-full bg-gray-500 text-white py-3 h-full rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => router.push("/signup/payment")}
            className="w-full bg-orange-500 text-white py-3 h-full rounded-md hover:bg-orange-600 transition-colors mb-8"
          >
            CONTINUE TO PAYMENT
          </button>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">PLAN DETAILS</h2>

          <div className="grid grid-cols-[1fr,auto,auto] gap-4">
            <div className="col-span-3 grid grid-cols-[1fr,auto,auto] gap-4">
              <div></div>
              <div className="font-medium">Free</div>
              <div className="font-medium">Premium</div>
            </div>

            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2">
                  {feature.name}
                  {feature.tooltip && (
                    <HelpCircle size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="text-center">
                  {feature.included.free && (
                    <Check size={20} className="text-green-500 mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {feature.included.premium && (
                    <Check size={20} className="text-green-500 mx-auto" />
                  )}
                </div>
              </React.Fragment>
            ))}

            <div className="col-span-3 bg-gray-900 text-white px-4 py-2 mt-4">
              Visibility
            </div>

            {visibilityFeatures.map((feature, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-2">
                  {feature.name}
                  {feature.tooltip && (
                    <HelpCircle size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="text-center">
                  {feature.included.free && (
                    <Check size={20} className="text-green-500 mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {feature.included.premium && (
                    <Check size={20} className="text-green-500 mx-auto" />
                  )}
                </div>
              </React.Fragment>
            ))}

            <div className="col-span-3 bg-gray-900 text-white px-4 py-2 mt-4">
              Cost
            </div>
            <div className="col-span-3 text-right pr-4">₹4,999</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
