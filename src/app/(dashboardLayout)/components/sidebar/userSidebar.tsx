import {
  Car,
  DollarSign,
  HeartCrackIcon,
  HeartHandshake,
  History,
  Home,
} from "lucide-react";
import img from "../../../../assets/travel logo.png";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItems } from "./collapse-items";
import { useSidebarContext } from "../../layout/layout-context";
import { useState } from "react";
import Image from "next/image";
import { AiFillProfile } from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";
import { HeartFilledIcon } from "@/src/components/icons";

// Sidebar component
export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext(); // Custom hook to check collapse status
  const [isMobile, setIsMobile] = useState(false); // For mobile view handling

  // Toggle mobile sidebar on small screens
  const toggleMobile = () => setIsMobile(!isMobile);

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {/* Overlay for mobile view */}
      {isMobile && (
        <div
          className="bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-background transition-transform fixed h-full w-64 z-[202] overflow-y-auto border-r border-divider py-6 px-3 ${
          isMobile || collapsed ? "translate-x-0" : "-translate-x-full"
        } md:ml-0 md:translate-x-0 md:static md:h-screen`}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col justify-center gap-2 items-center px-6">
          {/* Center Brand Logo */}

          <Image
            className=""
            src={img}
            alt="travel logo"
            width={50}
            height={50}
          />
          <p className="md:text-xl text-teal-700 font-brand">Wayfarer World</p>
        </div>

        {/* Sidebar Body */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6 mt-9 px-2">
            {/* Sidebar items */}
            <SidebarItem
              title="Home"
              icon={<Home />}
              // isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="User Dashboard Route">
              <SidebarItem
                isActive={pathname === "/dashboard/profile"}
                title="My Profile"
                icon={<AiFillProfile />}
                href="/dashboard/profile"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/posts"}
                title="My Posts"
                icon={<BsCardImage />}
                href="/dashboard/posts"
              />

              <SidebarItem
                isActive={pathname === "/dashboard/followers"}
                title="My Followers"
                icon={<HeartHandshake />}
                href="/dashboard/followers"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/followings"}
                title="My Followings"
                icon={<HeartFilledIcon />}
                href="/dashboard/followings"
              />
              {/* <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<Home />}
                href="/reports"
              /> */}
            </SidebarMenu>

            {/* Updates Section */}
            {/* <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<Home />}
                href="/changelog"
              />
            </SidebarMenu> */}
          </div>
        </div>
      </div>
    </aside>
  );
};
