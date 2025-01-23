"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ChevronDown, HelpCircle } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { userSignUpApi } from "@/api/auth";

interface AccountFormValues {
  name: string;
  role: string;
  phoneNumber: string;
  email: string;
  place: string;
  age: string;
  gender: string;
}

const AccountSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  role: Yup.string().required("Role is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  place: Yup.string().required("Place is required"),
  age: Yup.number()
    .min(18, "Must be at least 18 years")
    .required("Age is required"),
  gender: Yup.string().required("Gender is required"),
});

const initialValues: AccountFormValues = {
  name: "",
  role: "",
  phoneNumber: "",
  email: "",
  place: "",
  age: "",
  gender: "",
};

const AccountCreationForm = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: AccountFormValues, actions: any) => {
    setIsLoading(true);

    const userData = {
      name: values.name,
      role: values.role,
      phoneNumber: values.phoneNumber,
      email: values.email,
      place: values.place,
      age: Number(values.age),
      gender: values.gender,
    };

    try {
      const response: AxiosResponse<any> = await userSignUpApi(userData);

      if (response.status === 201) {
         setIsSubmitted(true);
        actions.setSubmitting(false);
        toast.success("Account Created Successfully");
        localStorage.setItem("id", response.data.user.id);
        actions.resetForm();
        router.push("/")
      } else {
        toast.error("Failed to create account. Please try again.");
        actions.setSubmitting(false);
        actions.resetForm();
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.response?.status === 400) {
        router.push("/login")
        toast.error("User already exist. Please Login");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      actions.setSubmitting(false);
      actions.resetForm();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 px-4">
          {[
            "Account Creation",
            "Company Profile",
            "Plan Selection",
            "Payment",
          ].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === 0 ? "bg-orange-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm ml-2">{step}</span>
              {index < 3 && (
                <div
                  className={`h-1 w-24 mx-2 ${
                    index < 0 ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mx-4">
          <h2 className="text-xl font-semibold mb-6">Account details</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={AccountSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="role"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Role
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full px-3 py-2 border rounded-md appearance-none"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="designer">Interior Designer</option>
                      <option value="architect">Architect</option>
                    </Field>
                    <ChevronDown
                      className="absolute right-3 top-3 text-gray-400"
                      size={16}
                    />
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <PhoneInput
                        country={"in"}
                        value={countryCode}
                        onChange={(value) => {
                          setCountryCode(value);
                          setFieldValue("phoneNumber", value);
                        }}
                        inputClass="!w-full !h-10 !pl-12 !pr-3 !border !border-gray-300 !rounded !focus:outline-none !focus:ring-2 !focus:ring-orange-500 !rounded-lg"
                        containerClass="!w-full"
                      />
                    </div>
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your mail id"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="place"
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Place
                    </label>
                    <Field
                      name="place"
                      type="text"
                      placeholder="Enter your location"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="place"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="age"
                        className="text-sm font-medium text-gray-700 mb-1"
                      >
                        Age
                      </label>
                      <Field
                        name="age"
                        type="text"
                        placeholder="Enter Age"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="gender"
                        className="text-sm font-medium text-gray-700 mb-1"
                      >
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="w-full px-3 py-2 border rounded-md appearance-none"
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Field>
                      <ChevronDown
                        className="absolute right-3 top-3 text-gray-400"
                        size={16}
                      />
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-orange-50 p-4 rounded-md">
                  <HelpCircle className="text-orange-500" size={20} />
                  <div>
                    <p className="font-medium">
                      Don't have enough time to finish the signup?
                    </p>
                    <p className="text-gray-600">
                      You can just create a profile and then come back later any
                      time to finish the whole process.
                    </p>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  By clicking the button below, you consent to our Terms of Use
                  and for the Lampros family of companies to call or text you
                  using automated technology at the phone numbers you provide,
                  regarding leads and other products and services that may be of
                  interest to you. Consent is not a condition of any purchase.
                  <a href="#" className="text-blue-500 ml-1">
                    Learn more
                  </a>
                </div>

                {isSubmitted ? (
                  <div className="flex flex-col gap-4 mt-6 w-full">
                    <button
                      onClick={() => router.push("/")}
                      className="bg-green-500 text-white w-full rounded-md px-6 py-3"
                    >
                      Go to Home
                    </button>
                    <button
                      onClick={() => router.push("/companyprofile")}
                      className="bg-orange-500 text-white w-full rounded-md px-6 py-3"
                    >
                      Next to Company Profile
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-orange-500 text-white rounded-md disabled:bg-gray-400"
                  >
                    {isLoading ? "Creating..." : "Create Account"}
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountCreationForm;
