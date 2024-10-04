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
      label: "News Feed ",
      href: "/news-feed",
    },
    {
      label: "Contact ",
      href: "/contact",
    },

    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "My Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },

    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
