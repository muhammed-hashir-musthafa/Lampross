"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FeedbackFormValues {
  issue: string;
  email: string;
  feedback: string;
}

const validationSchema = Yup.object({
  issue: Yup.string().required("Please select an issue"),
  email: Yup.string().email("Invalid email address"),
  feedback: Yup.string().required("Please provide your feedback"),
});

const issueOptions = [
  "Product quality issues",
  "Website navigation problems",
  "Payment related issues",
  "Customer service experience",
  "Delivery related issues",
  "Other",
];

const FeedbackForm = () => {
  const initialValues: FeedbackFormValues = {
    issue: "",
    email: "",
    feedback: "",
  };

  const handleSubmit = (values: FeedbackFormValues) => {
    console.log("Form submitted:", values);
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({}) => (
          <Form className="space-y-6">
            <div>
              <label className="block mb-2">
                Choose an option that best describes your problem
              </label>
              <div className="relative">
                <Field
                  as="select"
                  name="issue"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                >
                  <option value="">Please select an issue</option>
                  {issueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <ErrorMessage
                name="issue"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2">
                Your feedback is valuable to us. Please share your experience so
                we can help improve Lampros for everyone
              </label>
              <Field
                as="textarea"
                name="feedback"
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <ErrorMessage
                name="feedback"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FeedbackForm;
