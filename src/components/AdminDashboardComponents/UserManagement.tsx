"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { IUser } from "@/src/types";
import { Trash2 } from "lucide-react";
import { deleteUser, updateUserRole } from "@/src/services/UserApi"; // Import the server-side functions

// Utility function to get dynamic key-value
const getKeyValue = (obj: IUser, key: keyof IUser) => obj[key];

// Status color map with valid color types
const statusColorMap: Record<
  string,
  "success" | "danger" | "warning" | "default" | "primary" | "secondary"
> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const UserManagement = ({
  allUsers,
  token,
}: {
  allUsers: IUser[];
  token: string; // Pass token as a prop for server requests
}) => {
  const [users, setUsers] = useState<IUser[]>(allUsers);

  // Handle role update
  const handleRoleUpdate = async (userId: string, role: "admin" | "user") => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to update the role to "${role}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateUserRole(userId, role, token);

          // Update role in the local state
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, role } : user
            )
          );
          Swal.fire("Updated!", "User role updated successfully.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to update user role", "error");
        }
      }
    });
  };

  // Handle user deletion
  const handleDeleteUser = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are going to delete this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId, token);

          // Remove user from the local state
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );

          Swal.fire("Deleted!", "User deleted successfully.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete this user", "error");
        }
      }
    });
  };

  // Render individual table cells based on column
  const renderCell = (user: IUser, columnKey: keyof IUser | "actions") => {
    const cellValue = getKeyValue(user, columnKey as keyof IUser);

    if (columnKey === "actions") {
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Change Role">
            <Dropdown>
              <DropdownTrigger>
                <Button>{user?.role}</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="User roles"
                onAction={(roleKey) =>
                  handleRoleUpdate(user._id, roleKey as "admin" | "user")
                }
              >
                <DropdownItem key="user">User</DropdownItem>
                <DropdownItem key="admin">Admin</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Tooltip>
          <Tooltip color="danger" content="Delete User">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => handleDeleteUser(user._id)} // Trigger delete on click
            >
              <Trash2 />
            </span>
          </Tooltip>
        </div>
      );
    }

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user?.img }}
            description={user.email}
            name={cellValue as string}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <Chip
              className="capitalize"
              // color={statusColorMap[user?.role] || "default"}
              size="sm"
              variant="flat"
            >
              {user?.role}
            </Chip>
          </div>
        );
      default:
        return typeof cellValue === "string" || typeof cellValue === "number"
          ? cellValue
          : null;
    }
  };

  return (
    <div className="p-6">
      <h1 className="md:text-3xl font-bold mb-4">User Management</h1>
      <h4 className="md:text-xl font-bold mb-4">
        Total User(s) : {users.length}
      </h4>
      <Table aria-label="User management table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody items={users}>
          {(user) => (
            <TableRow key={user._id}>
              {(["name", "email", "role", "actions"] as const).map(
                (columnKey) => (
                  <TableCell key={columnKey}>
                    {renderCell(user, columnKey)}
                  </TableCell>
                )
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
