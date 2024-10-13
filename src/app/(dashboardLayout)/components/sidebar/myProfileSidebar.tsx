import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import img from "../../../../assets/travel logo.png";
import { usePathname } from "next/navigation";
import { ContainerIcon, HandCoins, Home, User } from "lucide-react";
import { useSidebarContext } from "../../layout/layout-context";
import Image from "next/image";

export const AdminSidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext(); // Get collapsed state from context

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {/* Overlay for collapsed sidebar */}
      {collapsed && (
        <div className="bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 md:hidden"></div>
      )}
      {/* Sidebar wrapper */}
      <div
        className={`bg-background transition-transform fixed h-full w-64 z-[202] overflow-y-auto border-r border-divider py-6 px-3 ${
          collapsed ? "translate-x-0" : "-translate-x-full"
        } md:ml-0 md:translate-x-0 md:static md:h-screen`}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col justify-center gap-2 items-center px-6">
          {/* Center Brand Logo */}

          <Image
            className="h-12 w-auto" // Tailwind classes to control height and maintain aspect ratio
            src={img}
            alt="travel logo"
            height={50}
          />
          <p className="md:text-xl text-teal-500 font-brand">Wayfarer World</p>
        </div>

        {/* Sidebar Body */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6 mt-9 px-2">
            {/* Sidebar Items */}
            <SidebarItem
              title="Back Home"
              icon={<Home />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarItem
              title="Dashboard"
              icon={<Home />}
              isActive={pathname === "/admin-dashboard"}
              href="/admin-dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/admin-dashboard/user-management"}
                title="Users Manage"
                icon={<User />}
                href="/admin-dashboard/user-management"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/content-management"}
                title="Content Manage"
                icon={<ContainerIcon />}
                href="/admin-dashboard/content-management"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/payment-management"}
                title="Payment Manage"
                icon={<HandCoins />}
                href="/admin-dashboard/payment-management"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
