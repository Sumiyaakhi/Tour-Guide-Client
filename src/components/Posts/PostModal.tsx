import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";

type FormData = {
  title: string;
  content: string;
  category: string;
  isPremium: boolean;
  image: FileList;
};

type Props = {
  closeModal: () => void;
};

export const PostModal = ({ closeModal }: Props) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
    closeModal(); // Close modal after submission
  };

  // Watch for image changes to preview
  const imageFile = watch("image");
  if (imageFile && imageFile.length) {
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(imageFile[0]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block font-medium">
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: true })}
              className="w-full border p-2 rounded-md"
            >
              <option value="Adventure">Adventure</option>
              <option value="Business Travel">Business Travel</option>
              <option value="Exploration">Exploration</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block font-medium">
              Content
            </label>
            <ReactQuill value={content} onChange={setContent} />
            <input
              type="hidden"
              {...register("content", { required: true })}
              value={content}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block font-medium">
              Image
            </label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              className="w-full"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 h-32" />
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" {...register("isPremium")} />
              <span className="ml-2">Premium Post</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="py-2 px-4 bg-gray-400 text-white rounded-md"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
