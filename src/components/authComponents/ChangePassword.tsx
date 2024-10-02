"use client";

import { useForm } from "react-hook-form";
import { useUser } from "@/src/context/user.provider";

type FormData = {
  oldPassword: string;
  newPassword: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { user } = useUser();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accesstoken}`, // Use access token
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Password changed successfully");
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <input
              type="password"
              placeholder="Current Password"
              {...register("oldPassword", { required: true })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">
                Current password is required
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword", { required: true })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">New password is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
