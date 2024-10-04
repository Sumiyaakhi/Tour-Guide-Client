"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import Swal from "sweetalert2"; // Import SweetAlert

export default function NavbarDropdown() {
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    // Show SweetAlert confirmation before logging out
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Proceed with logout if confirmed
        userLoading(true); // Optionally show a loading state
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been logged out successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/login"); // Redirect to login page after logout
      }
    });
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" src={user?.img} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/profile")}>
          My Profile
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/dashboard")}>
          Dashboard
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/create-post")}>
          Create Post
        </DropdownItem>
        <DropdownItem
          onClick={() => handleLogout()}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
