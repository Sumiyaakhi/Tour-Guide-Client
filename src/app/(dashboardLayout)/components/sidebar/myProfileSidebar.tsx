import { Tooltip } from "@nextui-org/tooltip";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";
import { Car, Cog, Home, User } from "lucide-react";
import { useSidebarContext } from "../../layout/layout-context";

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
        <div className="flex gap-8 items-center px-6">
          <Link className="flex items-center" href="/">
            <Cog />
            <p className="font-bold text-inherit px-4">APOLLO GEARS</p>
          </Link>
        </div>

        {/* Sidebar Body */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6 mt-9 px-2">
            {/* Sidebar Items */}
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/admin-dashboard"}
              href="/admin-dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/admin-dashboard/cars-management"}
                title="Cars Manage"
                icon={<Car />}
                href="/admin-dashboard/cars-management"
              />
              <SidebarItem
                isActive={pathname === "/admin-dashboard/users-management"}
                title="Users Manage"
                icon={<User />}
                href="/admin-dashboard/users-management"
              />
              <CollapseItems
                icon={<Home />}
                items={["Banks Accounts", "Credit Cards"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<Home />}
                href="/customers"
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<Home />}
                href="/products"
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<Home />}
                href="/reports"
              />
            </SidebarMenu>

            {/* General Settings */}
            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<Home />}
                href="/developers"
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<Home />}
                href="/view"
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<Home />}
                href="/settings"
              />
            </SidebarMenu>

            {/* Updates Section */}
            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<Home />}
                href="/changelog"
              />
            </SidebarMenu>
          </div>

          {/* Sidebar Footer */}
          <div className="flex items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0">
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <Home />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <Home />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
