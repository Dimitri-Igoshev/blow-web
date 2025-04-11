'use client'

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

import { Image } from "@heroui/image";
import { ROUTES } from "@/app/routes";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  
  return (
    <HeroUINavbar maxWidth="full" position="sticky" isBlurred={true} className="p-3 fixed bg-transparent">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt="BLOW"
              src="/logo.png"
              width={127}
              height={50}
              radius="none"
              onClick={() => router.push(ROUTES.HOME)}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <SearchIcon className="text-default-500 cursor-pointer" onClick={() => router.push(ROUTES.HOME)}/>
        <ThemeSwitch className="mr-3" />
        <NavbarItem className="hidden md:flex">
          <Button
            radius="full"
            className="text-sm px-6"
            variant="solid"
          >
            Есть страница
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            radius="full"
            className="text-sm  bg-primary text-white px-6"
            variant="solid"
          >
            Добавить себя
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent> */}

      {/* Мобильное меню */}
      {/* <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
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
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}
    </HeroUINavbar>
  );
};
