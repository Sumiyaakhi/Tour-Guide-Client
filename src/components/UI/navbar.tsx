"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation"; // Use usePathname for route detection
import { siteConfig } from "@/src/config/site";
import Image from "next/image";
import img from "../../assets/travel logo.png";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/context/user.provider";
import NavbarDropdown from "./NavbarDropdown";

export const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 shadow-md font-body md:py-3 fixed"
    >
      {/* Left Side Menu and Search Icon */}
      <NavbarContent className="flex justify-start items-center gap-4 pl-4">
        {/* Menu Icon for Mobile */}
        <NavbarMenuToggle className="lg:hidden " />

        {/* Contact Us Button */}
        <Button
          as={NextLink}
          href="/contact"
          className="border md:text-xl hidden lg:block border-black text-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition"
        >
          Contact Us
        </Button>
      </NavbarContent>

      {/* Center Brand Logo */}
      <NavbarContent className="flex justify-center items-center basis-full lg:basis-auto">
        <NavbarBrand as="li" className="md:gap-3 max-w-fit">
          <NextLink className="flex items-center md:gap-2" href="/">
            <Image
              className="h-12 w-auto" // Tailwind classes to control height and maintain aspect ratio
              src={img}
              alt="travel logo"
              height={50}
            />
            <p className="md:text-2xl text-white font-brand">Wayfarer World</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Right Side Menu Items */}
      <NavbarContent className="hidden lg:flex justify-end items-center gap-4 pr-4">
        {/* Navigation Links */}
        <ul className="flex gap-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                passHref
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "text-white text-xl ",
                  isActive(item.href) && "font-bold underline"
                )}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>

        {/* login button */}
        {user?.email ? (
          <NavbarDropdown />
        ) : (
          <div className="">
            <Link href="/login">
              <Button className="text-xl py-2  bg-green-600 hover:bg-white hover:text-green-600 transition duration-300 text-white">
                Log In
              </Button>
            </Link>
          </div>
        )}
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      <NavbarMenu>
        <div className="p-4 mt-2 font-semi flex flex-col gap-2 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
