"use client";

import Link from "next/link";
import React, { useEffect, Suspense } from "react"; // Import Suspense
import { useForm } from "react-hook-form";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 70 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 40 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <>
      {isPending && <Loading />}
      <motion.div
        className="flex justify-center items-center h-screen bg-gray-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex w-3/4 max-w-4xl shadow-lg">
          {/* Left side (Sign In) */}
          <motion.div
            className="w-1/2 bg-white p-8 flex flex-col justify-center"
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-center text-green-600 ">
                Sign in to Account
              </h2>
              <div className="bg-green-600 w-16 h-1 my-3 mx-auto" />
            </div>

            <div className="flex justify-center space-x-4 mb-4">
              <motion.button
                className="border border-gray-300 rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebookF />
              </motion.button>
              <motion.button
                className="border border-gray-300 rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedinIn />
              </motion.button>
              <motion.button
                className="border border-gray-300 rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGoogle />
              </motion.button>
            </div>

            <p className="text-center text-gray-500 mb-4">
              or use your email account
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">Email is required</p>
                )}
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">Password is required</p>
                )}
              </motion.div>

              <div className="flex justify-between items-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-500"
                >
                  Forgot Password?
                </Link>

                <Link href="/reset-password" className="text-sm text-green-500">
                  Reset Password
                </Link>
              </div>

              <motion.button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 transition duration-300 text-white"
                whileHover={buttonVariants.hover}
                whileTap={buttonVariants.tap}
              >
                Sign In
              </motion.button>
            </form>
          </motion.div>

          {/* Right side (Sign Up prompt) */}
          <motion.div
            className="w-1/2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 text-white p-8 flex flex-col justify-center items-center"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Hello, Friend!</h2>
            <p className="mb-4">
              Fill up personal information and start your journey with us.
            </p>
            <Link href="/register">
              <motion.button
                className="px-8 py-2 bg-white text-green-500 font-semibold rounded-full transition duration-300 hover:bg-green-600 hover:border-2 hover:text-white border-2 border-green-600 hover:border-white"
                whileHover={buttonVariants.hover}
                whileTap={buttonVariants.tap}
              >
                Sign Up
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

// Wrap the SignIn component in Suspense
const WrappedSignIn = () => (
  <Suspense fallback={<Loading />}>
    <SignIn />
  </Suspense>
);

export default WrappedSignIn;
