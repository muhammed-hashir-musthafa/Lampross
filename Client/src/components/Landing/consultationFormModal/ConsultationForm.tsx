"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import toast from "react-hot-toast";
import { createBookingApi } from "@/api/booking";

interface BookingFormValues {
  name: string;
  phone: string;
  email: string;
  place: string;
}

const BookingSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name is too short").required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]/, "Please enter a valid phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  place: Yup.string().required("Place is required"),
});

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  if (!isOpen) return null;

  const initialValues: BookingFormValues = {
    name: "",
    phone: "",
    email: "",
    place: "",
  };

  const handleSubmit = async (
    values: { name: string; phone: string; email: string; place: string },
    actions: any
  ) => {
    try {
      const response = await createBookingApi(values);

      if (response.status === 201) {
        toast.success("Booking Created Successfully");
        actions.resetForm();
        onClose();
      } else {
        toast.error("Failed to create booking. Please try again.");
        actions.resetForm();
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("Booking already exists for this Phone Number.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full flex">
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="https://placehold.co/800x600"
            alt="Modern living room"
            width={500}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Book a free consultation</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={BookingSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="place"
                    placeholder="Koduvally, Kozhikode, Kerala"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <ErrorMessage
                    name="place"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
