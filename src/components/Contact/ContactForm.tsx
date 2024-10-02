"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission, send data to backend or display success message
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-white w-full max-w-6xl p-8 rounded-lg shadow-md flex flex-col lg:flex-row"
      >
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 pr-0 lg:pr-8"
        >
          <h2 className="text-center text-2xl font-semibold text-gray-700 mb-8">
            ONLINE INQUIRY
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                placeholder="Name"
                className={`w-full border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
                placeholder="Email"
                className={`w-full border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  minLength: {
                    value: 10,
                    message: "Phone must be at least 10 digits",
                  },
                })}
                type="text"
                id="phone"
                placeholder="Phone"
                className={`w-full border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Interest Field */}
            <div>
              <label htmlFor="interest" className="sr-only">
                Interest
              </label>
              <select
                {...register("interest", {
                  required: "Please select an interest",
                })}
                id="interest"
                className="w-full border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <option value="">Select An Interest</option>
                <option value="buying">Buying</option>
                <option value="selling">Selling</option>
                <option value="renting">Renting</option>
              </select>
              {errors.interest && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.interest.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                id="message"
                placeholder="Message"
                rows={4}
                className={`w-full border-gray-300 rounded-md shadow-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.message ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none"
              >
                Submit Inquiry
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-bold uppercase text-gray-500">
              Contact Details
            </h2>
            <p className="mt-4 text-gray-700">
              michelle@signaturerealtynj.com
              <br />
              (908) 686-1200
            </p>
            <div className="mt-8">
              <h3 className="font-bold">Westfield</h3>
              <p className="text-gray-700">
                233 North Avenue E. Westfield, NJ 07090
              </p>
            </div>
            <div className="mt-8">
              <h3 className="font-bold">Summit</h3>
              <p className="text-gray-700">
                357 Springfield Ave. Short Hills, NJ 07901
              </p>
            </div>
            <div className="mt-8">
              <h3 className="font-bold">Short Hills Office</h3>
              <p className="text-gray-700">
                549 Millburn Ave. Short Hills, NJ 07078
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
