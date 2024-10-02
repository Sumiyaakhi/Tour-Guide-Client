import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface NavItem {
  href: string;
  label: string;
}

export interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  img?: string;
  role: "admin" | "user";
  address?: string;
  accesstoken?: number;
  refreshToken?: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: "Adventure" | "Business Travel" | "Exploration"; // Define allowed categories
  isPremium: boolean;
  imageUrl?: string; // URL of the image, if provided
  createdAt: Date;
  updatedAt: Date;
  author: string; // User who created the post
}
export interface PostFormData {
  title: string;
  content: string;
  category: "Adventure" | "Business Travel" | "Exploration"; // Categories
  isPremium: boolean;
  image: FileList | null; // File input for the image, or null if not uploaded
}
