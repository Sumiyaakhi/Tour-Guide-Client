export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Wayfarer world",
  description: "This is a Tour Guide Site for travellers",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Contact ",
      href: "/contact",
    },

    {
      label: "About",
      href: "/about",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
