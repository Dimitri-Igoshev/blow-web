"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { ROUTES } from "@/app/routes";
import { Avatar, useDisclosure } from "@heroui/react";
import { RegisterModal } from "./register-modal";
import { LoginModal } from "./login-modal";
import { use, useEffect, useState } from "react";

export const Navbar = () => {
  const router = useRouter();

  const [me, setMe] = useState(false);

  const {
    isOpen: isLogin,
    onOpen: onLogin,
    onOpenChange: onLoginChange,
  } = useDisclosure();
  const {
    isOpen: isRegister,
    onOpen: onRegister,
    onOpenChange: onRegisterChange,
  } = useDisclosure();

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => console.log(data.ip));
  });

  return (
    <>
      <HeroUINavbar
        className="p-3 fixed bg-transparent"
        isBlurred={true}
        maxWidth="full"
        position="sticky"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Image
                alt="BLOW"
                height={50}
                radius="none"
                src="/logo.png"
                width={127}
                onClick={() => router.push(ROUTES.HOME)}
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <SearchIcon
            className="text-white cursor-pointer"
            onClick={() => router.push(ROUTES.HOME)}
          />
          <ThemeSwitch className="mr-3" />

          {me ? (
            <>
              <p className="text-white">Светлана</p>
              <NavbarItem className="hidden md:flex">
                <div className="rounded-full border-[2px] border-white">
                  <Avatar src="/photos/1.png" />
                </div>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden md:flex">
                <Button
                  className="text-sm px-6"
                  radius="full"
                  variant="solid"
                  onPress={onLogin}
                >
                  Есть страница
                </Button>
              </NavbarItem>
              <NavbarItem className="hidden md:flex">
                <Button
                  className="text-sm  bg-primary text-white px-6"
                  radius="full"
                  variant="solid"
                  onPress={onRegister}
                >
                  Добавить себя
                </Button>
              </NavbarItem>
            </>
          )}
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

      <LoginModal
        isOpen={isLogin}
        onOpenChange={onLoginChange}
        onRegister={onRegister}
      />
      <RegisterModal
        isOpen={isRegister}
        onOpenChange={onRegisterChange}
        onLogin={onLogin}
      />
    </>
  );
};
