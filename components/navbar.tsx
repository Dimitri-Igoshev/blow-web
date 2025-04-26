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
import { RiCloseFill, RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";

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

  const [mobileMenu, setMobileMenu] = useState(false);

  const logout = () => {
    localStorage.setItem("access-token", "");
    router.replace(ROUTES.HOME);
    window.location.reload();
  };

  return (
    <>
      <HeroUINavbar
        className="p-0 sm:p-3 fixed bg-transparent"
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
                className="w-[102px] sm:w-[127px] h-[40px] sm:h-[50px]"
                radius="none"
                src="/logo.png"
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
                      src={
                        me?.photos[0]?.url
                          ? `${config.MEDIA_URL}/${me?.photos[0]?.url}`
                          : me?.sex === "male"
                            ? "/men.jpg"
                            : "/woman.jpg"
                      }
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

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <button onClick={() => setMobileMenu(true)}>
            <RiMenu4Fill color="white" size={32} />
          </button>
        </NavbarContent>

        {/* Мобильное меню */}
        {/* <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {/* {siteConfig.navMenuItems.map((item, index) => (
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

      {mobileMenu ? (
        <div className="h-screen w-screen fixed top-0 left-0 bottom-0 right-0 bg-white dark:bg-dark z-40 flex flex-col gap-3 p-3 px-5">
          <div className="flex justify-between">
            <ThemeSwitch className="" />
            <p className="text-[20px] font-semibold mt-[2px]">Меню</p>

            <RiCloseFill size={36} onClick={() => setMobileMenu(false)} />
          </div>

          {me ? (
            <ul className="flex flex-col gap-3 text-[18px] mt-4">
              <Link href={ROUTES.ACCOUNT.SEARCH}>
                <li>Поиск анкет</li>
              </Link>
              <Link href={ROUTES.ACCOUNT.PROFILE}>
                <li>Профиль</li>
              </Link>
              <Link href={ROUTES.ACCOUNT.DIALOGUES}>
                <li>Диалоги</li>
              </Link>

              <Link href={ROUTES.ACCOUNT.GUESTS}>
                <li>Кто смотрел</li>
              </Link>
              <Link href={ROUTES.ACCOUNT.SERVICES}>
                <li>Услуги</li>
              </Link>
              <Link href={ROUTES.ACCOUNT.NOTES}>
                <li>Заметки</li>
              </Link>
              <Link href={ROUTES.ACCOUNT.MAILINGS}>
                <li>Рассылки</li>
              </Link>

              <button className="mt-6" onClick={logout}>
                Выйти
              </button>
            </ul>
          ) : (
            <ul className="flex flex-col gap-3 text-[18px] mt-4">
              <button onClick={onLogin}>Есть страница</button>
              <button onClick={onRegister}>Добавить себя</button>
            </ul>
          )}
        </div>
      ) : null}

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
