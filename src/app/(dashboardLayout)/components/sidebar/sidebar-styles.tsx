// SidebarWrapper.tsx
import React, { ReactNode } from "react";
import clsx from "clsx";

interface SidebarProps {
  collapsed: boolean;
  children: ReactNode;
}

export const SidebarWrapper: React.FC<SidebarProps> = ({
  collapsed,
  children,
}) => {
  return (
    <div
      className={clsx(
        "bg-background transition-transform h-full fixed w-64 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen",
        collapsed ? "translate-x-0 ml-0" : "-translate-x-full"
      )}
    >
      {children}
    </div>
  );
};

// Overlay.tsx
export const Overlay: React.FC = () => {
  return (
    <div className="bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100"></div>
  );
};

// Header.tsx
interface HeaderProps {
  children: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <div className="flex gap-8 items-center px-6">{children}</div>;
};

// Body.tsx
interface BodyProps {
  children: ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className="flex flex-col gap-6 mt-9 px-2">{children}</div>;
};

// Footer.tsx
interface FooterProps {
  children: ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0">
      {children}
    </div>
  );
};
