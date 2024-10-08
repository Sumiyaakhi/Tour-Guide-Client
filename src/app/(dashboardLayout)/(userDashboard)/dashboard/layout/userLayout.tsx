"use client";

import { NavbarWrapper } from "../../../components/sidebar/dashboardNavbar/dashboardNavbar";
import { SidebarWrapper } from "../../../components/sidebar/userSidebar";

interface Props {
  children: React.ReactNode;
}

export const UserLayout = ({ children }: Props) => {
  return (
    <section className="flex">
      <SidebarWrapper></SidebarWrapper>

      <NavbarWrapper>{children}</NavbarWrapper>
    </section>
  );
};
