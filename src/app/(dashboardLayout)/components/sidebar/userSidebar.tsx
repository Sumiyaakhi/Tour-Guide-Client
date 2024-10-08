import { Car, Cog, DollarSign, History, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItems } from "./collapse-items";
import { useSidebarContext } from "../../layout/layout-context";
import { useState } from "react";

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
        <div className="flex gap-8 items-center px-6">
          <Link href="/" className="flex items-center">
            <Cog />
            <p className="font-bold text-inherit px-4">APOLLO GEARS</p>
          </Link>
        </div>

        {/* Sidebar Body */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6 mt-9 px-2">
            {/* Sidebar items */}
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/dashboard/rent-car"}
                title="Rent Car"
                icon={<Car />}
                href="/dashboard/rent-car"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/payments"}
                title="Payments"
                icon={<DollarSign />}
                href="/dashboard/payments"
              />
              <CollapseItems
                icon={<History />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Rent History"
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
        </div>
      </div>
    </aside>
  );
};
