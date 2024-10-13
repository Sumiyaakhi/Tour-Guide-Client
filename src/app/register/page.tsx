"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";

type FormData = {
  name: string;
  email: string;
  phone: string;
  img: string;
  role: string;
  password: string;
  address: string;
};

const Register = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const redirect = searchParams.get("redirect");
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "Sumiya Akhi",
      email: "sumiya@gmail.com",
      phone: "01985456451",
      img: "https://i.ibb.co/jVyWt6g/Whats-App-Image-2024-08-27-at-00-48-32-92819247.jpg",
      role: "user",
      password: "akhi",
      address: "123 Main Street, City, Country",
    },
  });

  const onSubmit = (data: FormData) => {
    handleUserRegistration(data);
    userLoading(true);
    // Send data to your backend or API here
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <motion.div
        className="flex w-3/4 max-w-4xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left side (Register) */}
        <motion.div
          className="w-1/2 bg-white p-8 flex flex-col justify-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-center text-green-600">
              Create Account
            </h2>
            <motion.div
              className="bg-green-600 w-16 h-1 my-3 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <motion.div
            className="flex justify-center space-x-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button className="border border-gray-300 rounded-full p-2">
              <FaFacebookF />
            </button>
            <button className="border border-gray-300 rounded-full p-2">
              <FaLinkedinIn />
            </button>
            <button className="border border-gray-300 rounded-full p-2">
              <FaGoogle />
            </button>
          </motion.div>

          <p className="text-center text-gray-500 mb-4">
            or use your email for registration
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { name: "name", placeholder: "Name", error: errors.name },
              { name: "email", placeholder: "Email", error: errors.email },
              { name: "phone", placeholder: "Phone", error: errors.phone },
              {
                name: "img",
                placeholder: "Profile Image URL",
                error: errors.img,
              },
              { name: "role", placeholder: "Role", error: errors.role },
              {
                name: "password",
                placeholder: "Password",
                error: errors.password,
              },
              {
                name: "address",
                placeholder: "Address",
                error: errors.address,
              },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <input
                  type={field.name === "password" ? "password" : "text"}
                  placeholder={field.placeholder}
                  {...register(field.name as keyof FormData, {
                    required: true,
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {field.error && (
                  <p className="text-red-500 text-xs">
                    {field.placeholder} is required
                  </p>
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 transition duration-300 text-white"
              whileHover={{ scale: 1.05 }}
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>

        {/* Right side (Sign In prompt) */}
        <motion.div
          className="w-1/2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white p-8 flex flex-col justify-center items-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
          <p className="mb-4">
            To keep connected with us, please login with your personal info
          </p>
          <Link href="/login">
            <motion.button
              className="px-8 py-2 bg-white text-green-500 font-semibold rounded-full transition duration-300 hover:bg-green-600 hover:border-2 hover:text-white border-2 border-green-600 hover:border-white"
              whileHover={{ scale: 1.05 }}
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
