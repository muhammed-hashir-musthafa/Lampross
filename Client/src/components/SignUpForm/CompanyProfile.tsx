"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const CompanyProfileSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Company name is too short")
    .max(100, "Company name is too long")
    .required("Company name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  gstNumber: Yup.string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST number"
    )
    .required("GST number is required"),
});

interface FormValues {
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  gstNumber: string;
}

const CompanyProfileForm = () => {
  const router = useRouter();
  const initialValues: FormValues = {
    companyName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    gstNumber: "",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 px-4">
          {[
            "Account creation",
            "Company Profile",
            "Plan selection",
            "Payment",
          ].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${index <= 1 ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              >
                {index + 1}
              </div>
              <span className="text-sm ml-2">{step}</span>
              {index < 3 && (
                <div
                  className={`h-1 w-24 mx-2 ${
                    index === 0 ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mx-4">
          <h2 className="text-xl font-semibold mb-6">Company profile</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={CompanyProfileSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              router.push("/signup/plan-selection");
              actions.setSubmitting(false);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <Field
                      name="companyName"
                      type="text"
                      placeholder="Enter your company name"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <PhoneInput
                      country={"in"}
                      value=""
                      onChange={(phone) => setFieldValue("phoneNumber", phone)}
                      containerClass="w-full"
                      inputClass="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-2">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      You can use a different mail than what you signed up with
                      to receive lead mails from Lampros.
                    </p>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-2">
                    <Field
                      name="address"
                      as="textarea"
                      rows={3}
                      placeholder="Enter your address"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      Providing an address can help us pinpoint your business on
                      the map so home owners can find you easily.
                    </p>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      name="city"
                      type="text"
                      placeholder="City"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Field
                      name="pincode"
                      type="text"
                      placeholder="Pincode"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="pincode"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-2">
                    <Field
                      name="gstNumber"
                      type="text"
                      placeholder="GST Number"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="gstNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-orange-50 p-4 rounded-md">
                  <HelpCircle
                    className="text-orange-500 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-medium">
                      Why this matters to home owners?
                    </p>
                    <p className="text-gray-600">
                      Your Lampros profile is the main source of information on
                      your business to home owners. Having a strong profile
                      helps in gaining trust from home owners who see it.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => router.back()}
                    className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
