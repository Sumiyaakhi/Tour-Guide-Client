"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset(); // Reset form after submission
  };

  return (
    <div className="px-6 mt-24 font-body max-w-7xl mx-auto">
      {/* About Us Section */}
      <section className="text-center mb-12">
        <h2 className=" text-2xl md:text-4xl font-bold text-teal-600">
          About Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-xl">
          HubSpot's company and culture are a lot like our product. They're
          crafted, not cobbled, for a delightful experience.
        </p>
        <motion.img
          src="https://static.tacdn.com/img2/trips/home-gai-entry-gateway-dv.jpg"
          //   src="https://d1c96a4wcgziwl.cloudfront.net/thumb_1f3fScreenshot2022-01-055.01.46PM.png"
          alt="Team Photo"
          className="rounded-xl mt-6 shadow-lg mx-auto"
        />
      </section>

      {/* Our Mission Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mb-12">
        <motion.div
          className="w-full md:w-1/2 p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="https://d1c96a4wcgziwl.cloudfront.net/thumb_f1bfd80229d4-34b3-4296-b2b8-5fa28148222c.jpg"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
            height={800}
            width={800}
          />
        </motion.div>
        <div className="w-full md:w-1/2 px-6">
          <h3 className="text-2xl md:text-4xl md:pb-6 font-bold text-teal-600">
            Our Mission: Helping Millions of Organizations Grow Better
          </h3>
          <p className="text-gray-600 mt-4 md:text-xl">
            We believe not just in growing bigger, but in growing better.
            Aligning the success of your own business with the success of your
            customers is our mission.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between mb-12">
        <motion.div
          className="w-full md:w-1/2 p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="https://d1c96a4wcgziwl.cloudfront.net/thumb_1f3fScreenshot2022-01-055.01.46PM.png"
            alt="Our Story"
            width={800}
            height={800}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <div className="w-full md:w-1/2 px-6">
          <h3 className="text-2xl md:text-4xl pb-4 md:pb-8 font-bold text-teal-600">
            Our Story
          </h3>
          <p className="text-gray-600 mt-4 md:text-xl ">
            Founded by MIT students in 2004, HubSpot transformed the way
            businesses grow by providing inbound marketing tools to align the
            goals of customers and businesses.
          </p>
        </div>
      </section>

      {/* By The Numbers Section */}
      <section className="text-center mb-12">
        <h3 className="text-2xl font-bold text-teal-600">
          HubSpot By the Numbers
        </h3>
        <div className="flex flex-wrap justify-center mt-6">
          <div className="p-6 m-4 border rounded-lg w-60">
            <h4 className="text-2xl font-semibold">12 Global Offices</h4>
            <p className="text-gray-600 mt-2">Learn more</p>
          </div>
          <div className="p-6 m-4 border rounded-lg w-60">
            <h4 className="text-2xl font-semibold">7,600+ Employees</h4>
            <p className="text-gray-600 mt-2">Learn more</p>
          </div>
          <div className="p-6 m-4 border rounded-lg w-60">
            <h4 className="text-2xl font-semibold">205,000+ Customers</h4>
            <p className="text-gray-600 mt-2">Learn more</p>
          </div>
        </div>
      </section>

      {/* Contact Us Form */}
      <section className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl mx-auto md:mb-8">
        <h3 className="text-2xl font-bold text-teal-600 text-center mb-4">
          Contact Us
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3">
              <label className=" text-gray-700">Name</label>
              <input
                {...register("name", { required: true })}
                className="mt-2 p-2 w-full border rounded-md"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700">Email</label>
              <input
                {...register("email", { required: true })}
                className="mt-2 p-2 w-full border rounded-md"
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block text-gray-700">Message</label>
              <textarea
                {...register("message", { required: true })}
                className="mt-2 p-2 w-full border rounded-md"
                rows={5}
              />
            </div>
          </div>

          <div className="text-center">
            <motion.button
              type="submit"
              className="bg-teal-600 text-white py-2 px-6 rounded-md"
              whileHover={{ scale: 1.05 }}
            >
              Submit
            </motion.button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AboutPage;
