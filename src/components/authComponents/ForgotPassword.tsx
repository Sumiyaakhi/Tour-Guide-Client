"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import envConfig from "@/src/config/envConfig";

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      // Send email to backend to trigger password reset email
      const response = await fetch(
        `${envConfig.baseApi}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setMessage("Password reset email sent.");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold">Forgot Password?</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">Email is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="text-center text-green-500 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
