"use client";

import axiosInstance from "@/src/lib/AxiosInstance";
import { TFollower } from "@/src/types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { FieldValues } from "react-hook-form";

// Define a custom interface for your JWT payload
interface CustomJwtPayload extends JwtPayload {
  sub: string; // Add the required properties
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  img: string;
  bio: string;
  verified: boolean;
  followers: TFollower[]; // or the appropriate type
  followings: TFollower[]; // or the appropriate type
}

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    if (data.success) {
      // Store tokens in localStorage or sessionStorage
      localStorage.setItem("accessToken", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);
      // Alternatively, use sessionStorage if you want tokens to expire after the session
      // sessionStorage.setItem("accessToken", data?.data?.accessToken);
      // sessionStorage.setItem("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      // Store tokens in localStorage or sessionStorage
      localStorage.setItem("accessToken", data?.accessToken);
      localStorage.setItem("refreshToken", data?.refreshToken);
      // Alternatively, use sessionStorage if you want tokens to expire after the session
      // sessionStorage.setItem("accessToken", data?.accessToken);
      // sessionStorage.setItem("refreshToken", data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = localStorage.getItem("accessToken"); // or sessionStorage.getItem("accessToken");

  let decodedToken: CustomJwtPayload | null = null; // Use the custom payload type

  if (accessToken) {
    decodedToken = jwtDecode<CustomJwtPayload>(accessToken); // Decode using the custom type
    return {
      _id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
      phone: decodedToken.phone,
      role: decodedToken.role,
      address: decodedToken.address,
      img: decodedToken.img,
      bio: decodedToken.bio,
      verified: decodedToken.verified,
      followers: decodedToken.followers,
      followings: decodedToken.followings,
    };
  }

  return decodedToken;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // If using sessionStorage, you can clear those as well
  // sessionStorage.removeItem("accessToken");
  // sessionStorage.removeItem("refreshToken");
};
