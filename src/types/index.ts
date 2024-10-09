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

export type TFollower = {
  _id: string;
  name: string;
  img: string;
  email: string;
  address?: string;
  follower: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUser {
  _id: string;
  name: string;
  bio?: string;
  email: string;
  password?: string;
  phone: string;
  img?: string;
  role: "admin" | "user";
  address?: string;
  premium?: boolean;
  verified?: boolean;
  followers?: TFollower[];
  followings?: TFollower[];
  accesstoken?: number;
  refreshToken?: number;
  createdAt?: Date;
}
export interface IComment {
  _id?: string;
  length?: number;
  comment: string;
  commenter: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TPost {
  _id: string;

  title: string;
  content: string;
  images?: string[];
  category: string;
  user: IUser;
  upvote?: number;
  comments?: IComment[];
  downvote?: number;
  premium?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostFormData {
  title: string;
  content: string;
  category: "Adventure" | "Business Travel" | "Exploration"; // Categories
  isPremium: boolean;
  image: FileList | null; // File input for the image, or null if not uploaded
}
