// import { logOut } from "@/app/(withComonLayout)/actions/auth";
// import { useAuth } from "@/lib/AuthProviders";
"use client";
import { ThemeSwitcher } from "@/src/components/shared/ThemeSwitcher";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { NavbarItem } from "@nextui-org/navbar";
import { useRouter } from "next/navigation";

export const UserDropdown = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  const logOutUser = async () => {
    await logout();
    setUser(null);
    router.push("/");
  };
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar as="button" color="secondary" size="md" src={user?.img} />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          onClick={() => logOutUser()}
          key="logout"
          color="danger"
          className="text-danger "
        >
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <ThemeSwitcher></ThemeSwitcher>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
