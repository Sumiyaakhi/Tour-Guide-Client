import React, { ChangeEvent, useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useForm } from "react-hook-form";
import { Avatar } from "@nextui-org/avatar";
import { updateUserProfile } from "@/src/services/UserApi";
import Swal from "sweetalert2";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { logout } from "@/src/services/AuthService";
import { useRouter } from "next/navigation";

// TypeScript interface for form data
type FormData = {
  name: string;
  email: string;
  bio: string;
  postImages: FileList;
  phone: string;
  address: string;
};

const ProfileUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controls modal visibility
  const { register, handleSubmit } = useForm<FormData>();
  const { setUser, user } = useUser(); // Access user and setUser from context
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Image files state
  const router = useRouter();
  useEffect(() => {
    if (user?.img) {
      setImagePreviews([user.img]); // Set default image preview to the user's existing profile picture
    }
  }, [user]);

  // Handle image change for multiple image uploads
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files); // Set new image file
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews([reader.result as string]); // Preview new image
      };
      reader.readAsDataURL(file);
    });
  };

  // Submit updated profile information
  const onSubmit = async (data: FormData) => {
    const formData = new FormData(); // Create a FormData instance

    // Append the image only if a new one was uploaded
    if (imageFiles.length > 0) {
      imageFiles.forEach((imageFile) => {
        formData.append("postImages", imageFile); // Append new image if exists
      });
    }

    // Append the rest of the form data
    const updateData = {
      name: data.name,
      bio: data.bio,
      phone: data.phone,
      address: data.address,
      email: data.email,
    };

    formData.append("data", JSON.stringify(updateData));

    try {
      // Update profile through API
      const updatedUser = await updateUserProfile(
        user?._id as string,
        formData
      );

      setUser(updatedUser); // Immediately update user context with new data

      // Show SweetAlert with a "Login" button
      Swal.fire({
        title: "Profile updated successfully!",
        text: "Please log in again to continue.",
        icon: "success",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          // Log out and navigate to login page when "Login" button is clicked
          logout();
          router.push("/login");
        }
      });

      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating profile", error);
      Swal.fire("Error", "Failed to update profile!", "error");
    }
  };

  return (
    <>
      {/* Trigger Button to Open Modal */}
      <Button onPress={onOpen} className="btn-primary">
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <ModalHeader className="flex flex-col gap-1">
              Update Profile
            </ModalHeader>
            <ModalBody>
              {/* Profile Picture Update */}
              <div className="mb-4">
                <label className="block text-gray-700">Profile Picture</label>
                <div className="relative flex justify-center items-center">
                  <Avatar
                    src={imagePreviews[0] || user?.img}
                    className="w-32 h-32 rounded-md"
                    alt="Profile Picture"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    {...register("postImages")}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    aria-label="Upload profile picture"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  aria-label="Name"
                  defaultValue={user?.name}
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  aria-label="Phone"
                  defaultValue={user?.phone}
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  aria-label="Address"
                  defaultValue={user?.address}
                />
              </div>

              {/* Bio */}
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  {...register("bio")}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  aria-label="Bio"
                  defaultValue={user?.bio}
                ></textarea>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button className="btn-primary" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileUpdate;
