"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

type PaymentMethod = "Credit card" | "Net banking";

const CreditCardPaymentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry must be in MM/YY format")
    .required("Expiry date is required"),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const BankPaymentSchema = Yup.object().shape({
  accountHolderName: Yup.string().required("Account holder name is required"),
  accountNumber: Yup.string()
    .matches(/^\d{9,18}$/, "Account number must be between 9 and 18 digits")
    .required("Account number is required"),
  ifscCode: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
    .required("IFSC code is required"),
  branch: Yup.string().required("Branch is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const PaymentForm = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Credit card");

  const initialCardValues = {
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
  };

  const initialBankValues = {
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",
    email: "",
  };

  const handleSubmit = (values: any, actions: any) => {
    router.push("/");
    console.log(values);
    actions.setSubmitting(false);
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= 3
                    ? "bg-orange-500 text-white"
                    : index < 3
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm ml-2">{step}</span>
              {index < 3 && (
                <div
                  className={`h-1 w-24 mx-2 ${
                    index < 3 ? "bg-orange-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mx-4">
          <h2 className="text-xl font-semibold mb-2">
            Final step: Make the payment
          </h2>
          <p className="text-gray-600 mb-6">
            To finalize your subscription, kindly complete your payment using
            valid credentials.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-2 rounded-md">
            {(["Credit card", "Net banking"] as PaymentMethod[]).map(
              (method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 text-center rounded ${
                    paymentMethod === method
                      ? "bg-white shadow-sm"
                      : "text-gray-500"
                  }`}
                >
                  {method}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Formik
              initialValues={
                paymentMethod === "Credit card"
                  ? initialCardValues
                  : initialBankValues
              }
              validationSchema={
                paymentMethod === "Credit card"
                  ? CreditCardPaymentSchema
                  : BankPaymentSchema
              }
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-4">
                  {paymentMethod === "Credit card" ? (
                    <>
                      <div>
                        <Field
                          name="name"
                          type="text"
                          placeholder="Name"
                          className={`w-full px-3 py-2 border rounded-md`}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          name="cardNumber"
                          type="text"
                          placeholder="Card number"
                          className={`w-full px-3 py-2 border rounded-md `}
                        />
                        <ErrorMessage
                          name="cardNumber"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Field
                            name="expiry"
                            type="text"
                            placeholder="Expiry"
                            className={`w-full px-3 py-2 border rounded-md `}
                          />
                          <ErrorMessage
                            name="expiry"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <Field
                            name="cvv"
                            type="password"
                            placeholder="CVV"
                            className={`w-full px-3 py-2 border rounded-md `}
                          />
                          <ErrorMessage
                            name="cvv"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Field
                          name="accountHolderName"
                          type="text"
                          placeholder="Account holder's name"
                          className={`w-full px-3 py-2 border rounded-md `}
                        />
                        <ErrorMessage
                          name="accountHolderName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Field
                          name="accountNumber"
                          type="text"
                          placeholder="Account number"
                          className={`w-full px-3 py-2 border rounded-md`}
                        />
                        <ErrorMessage
                          name="accountNumber"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Field
                            name="ifscCode"
                            type="text"
                            placeholder="IFSC code"
                            className={`w-full px-3 py-2 border rounded-md `}
                          />
                          <ErrorMessage
                            name="ifscCode"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <Field
                            name="branch"
                            type="text"
                            placeholder="Branch"
                            className={`w-full px-3 py-2 border rounded-md `}
                          />
                          <ErrorMessage
                            name="branch"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className={`w-full px-3 py-2 border rounded-md `}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
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
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : "Pay Now"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="space-y-4">
              <div className="mb-6">
                <div className="text-gray-600 mb-2">You have to pay</div>
                <div className="text-3xl font-semibold text-orange-500">
                  ₹ 4,999.00
                </div>
              </div>

              <p className="text-sm text-gray-600">
                I authorize Lampros Pvt to save this payment method and
                automatically charge this payment method whenever a subscription
                is associated with it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
