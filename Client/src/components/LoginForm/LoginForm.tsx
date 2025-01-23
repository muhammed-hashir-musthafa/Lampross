"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import { userLoginApi } from "@/api/auth";
import Link from "next/link";
import Image from "next/image";

const validationSchema = Yup.object({
  phoneNumber: Yup.string().required("Phone number is required"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const LoginForm: React.FC = () => {
  const [countryCode, setCountryCode] = useState<string>("+91");
  const router = useRouter();

  const initialValues = {
    phoneNumber: "",
    otp: "",
  };

  const handleSubmit = async (values: { phoneNumber: string; otp: string }) => {
    try {
      const response = await userLoginApi({
        phoneNumber: values.phoneNumber,
        otp: values.otp,
      });

      console.log("Login successful:", response);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-2xl font-semibold mb-6">Welcome back!</h1>
          <p className="text-gray-600 mb-8">
            Enter your Credentials to access your Lampros Seller account
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
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
                      inputClass="!w-full !h-12 !pl-12 !pr-3 !border !border-gray-300 !rounded !focus:outline-none !focus:ring-2 !focus:ring-blue-500"
                      containerClass="!w-full"
                      buttonClass="!h-12 !border-gray-300 !focus:ring-blue-500"
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
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    OTP
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="w-full h-12 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  <button
                    type="button"
                    className="text-blue-600 text-sm mt-2 hover:underline"
                  >
                    Resend the OTP
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition-colors"
                >
                  CONTINUE
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Become a partner
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2">
        <div className="h-full w-full relative">
          <Image
            src="https://placehold.co/800x600"
            alt="Modern house with garden"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
