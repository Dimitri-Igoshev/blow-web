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
import { Avatar, useDisclosure } from "@heroui/react";
import { useState } from "react";

import { RegisterModal } from "./register-modal";
import { LoginModal } from "./login-modal";
import { EmailModal } from "./email-password";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { ROUTES } from "@/app/routes";
import { useGetMeQuery } from "@/redux/services/userApi";
import { config } from "@/common/env";
import { CameraIcon } from "@/common/icons";

export const Navbar = () => {
  const router = useRouter();

  const [newUser, setNewUser] = useState(null);

  const { data: me } = useGetMeQuery(null);

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
  const {
    isOpen: isEmail,
    onOpen: onEmail,
    onOpenChange: onEmailChange,
  } = useDisclosure();

  const onNext = (value: any) => {
    setNewUser(value);

    onEmail();
  };

  const registration = () => {};

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
          <ThemeSwitch className="mr-6" />

          {me?._id ? (
            <>
              <NavbarItem
                className="hidden md:flex cursor-pointer"
                onClick={() => router.push(ROUTES.ACCOUNT.PROFILE)}
              >
                <div className="flex items-center gap-3">
                  <p className="text-white hover:underline">
                    {me?.firstName
                      ? me.firstName
                      : me?.sex === "male"
                        ? "Мужчина"
                        : "Девушка"}
                  </p>
                  <div className="rounded-full border-white">
                    <Avatar
                      showFallback
                      fallback={
                        <CameraIcon
                          className="animate-pulse w-6 h-6 text-default-500"
                          fill="currentColor"
                          size={20}
                        />
                      }
                      src={`${config.MEDIA_URL}/${me?.photos[0]?.url}` || ""}
                    />
                  </div>
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
        onLogin={onLogin}
        onNext={onNext}
        onOpenChange={onRegisterChange}
      />
      <EmailModal
        isOpen={isEmail}
        newUser={newUser}
        onLogin={onLoginChange}
        onOpenChange={onEmailChange}
        onRegister={registration}
      />
    </>
  );
};
