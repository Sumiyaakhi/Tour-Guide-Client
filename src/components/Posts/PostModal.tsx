"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@nextui-org/button";
import { ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2"; // For SweetAlert
import { useCreatePost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  const [content, setContent] = useState<string>(""); // Store quill content as string
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For multiple images
  const {
    mutate: createPost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost(); // Use the mutation hook
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Updated to handle multiple image files
  const { user } = useUser();

  // Handle image change for multiple image uploads
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // Convert FileList to an array

    // Update image files state
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    // Create previews for each selected image
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prevPreviews) => [
          ...prevPreviews,
          reader.result as string,
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Extract plain text from ReactQuill HTML string
      const textContent = extractTextFromHTML(content);

      // Create form data
      const formData = new FormData();
      const postData = {
        title: data.title,
        content: textContent,
        category: data.category,
        user: user!._id,
      };
      formData.append("data", JSON.stringify(postData));

      // Append each image file to the form data
      imageFiles.forEach((imageFile) => {
        formData.append("postImages", imageFile);
      });
      console.log(formData);
      // Submit the form data
      createPost(formData);

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "Post created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Close modal after submission
      closeModal();
    } catch (error) {
      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "Failed to create post. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Function to extract plain text from HTML string
  const extractTextFromHTML = (html: string) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  useEffect(() => {
    setValue("content", content); // Manually set content in react-hook-form
  }, [content, setValue]);

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Create New Post</ModalHeader>
      <ModalBody>
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
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block font-medium">
              Images
            </label>
            <input
              type="file"
              {...register("image")}
              accept="image/*"
              multiple // Allow multiple image selection
              className="w-full"
              onChange={handleImageChange} // Handle multiple image change
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl, index) => (
                  <div
                    key={index}
                    className="relative  w-full rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <Image
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <ModalFooter>
            <Button
              type="button"
              color="danger"
              variant="light"
              onPress={closeModal}
            >
              Cancel
            </Button>
            <Button type="submit" color="primary" isLoading={createPostPending}>
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalBody>
    </>
  );
};
