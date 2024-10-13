"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from "@/src/assets/travel logo.png";
const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-gradient-to-r from-green-700 via-emerald-500 to-teal-600 shadow-md py-10 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Programs Section */}
        <motion.div
          className="space-y-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex justify-center items-center my-auto">
            <Image
              className="h-12 w-auto" // Tailwind classes to control height and maintain aspect ratio
              src={img}
              alt="travel logo"
              height={50}
            />
            <h3 className="text-xl font-bold font-brand ">Wayfarer World</h3>
          </div>
        </motion.div>
        {/* Programs Section */}
        <motion.div
          className="space-y-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold ">Programs</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Corporate
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Individual
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Consulting
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Service Section */}
        <motion.div
          className="space-y-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold ">Service</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Training
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Coaching
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Consulting
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="space-y-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold ">Contact</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <p>
              <i className="fas fa-phone-alt"></i> +123 456 7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> email@example.com
            </p>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="space-y-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold ">Newsletter</h3>
          <div className="flex space-x-2">
            <input
              type="email"
              className="w-full px-3 py-2 text-black rounded focus:outline-none"
              placeholder="Email Address"
            />
            <button className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="text-2xl hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="text-2xl hover:text-white">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="text-2xl hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link href="#" className="text-2xl hover:text-white">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" className="text-2xl hover:text-white">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="text-center py-4 mt-6 border-t border-gray-600">
        <p>&copy; 2024 CrossCulture Connects. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
