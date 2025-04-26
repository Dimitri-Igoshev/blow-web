"use client";

import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { FC, useEffect, useState } from "react";
import { Select, SelectItem, useDisclosure } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

import { MenIcon, WomenIcon } from "./icons";

import { cities } from "@/data/cities";
import { ages } from "@/data/ages";
import { useGetMeQuery } from "@/redux/services/userApi";
import { ROUTES } from "@/app/routes";
import { LoginModal } from "./login-modal";
import { RegisterModal } from "./register-modal";
import { EmailModal } from "./email-password";

interface SearchWidgetProps {
  horizontal?: boolean;
  className?: string;
}

export const SearchWidget: FC<SearchWidgetProps> = ({
  horizontal = false,
  className,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: me } = useGetMeQuery(null);

  const [men, setMen] = useState(searchParams?.get("sex") === "male");
  const [woman, setWoman] = useState(searchParams?.get("sex") === "female");
  const [ageFromOptions, setAgeFromOptions] = useState([...ages]);
  const [ageFrom, setAgeFrom] = useState(
    !!searchParams?.get("minage") ? searchParams.get("minage") : ""
  );
  const [ageToOptions, setAgeToOptions] = useState([...ages]);
  const [ageTo, setAgeTo] = useState(
    !!searchParams?.get("maxage") ? searchParams.get("maxage") : ""
  );
  const [city, setCity] = useState(!!searchParams?.get("city") || "");

  useEffect(() => {
    if (!searchParams.get("city")) return;
    setCity(searchParams.get("city") as string);
  }, [searchParams.get("city")]);

  useEffect(() => {
    if (!ageFrom) return;

    setAgeToOptions([
      ...ages.filter(({ value }) => parseInt(value) >= parseInt(ageFrom)),
    ]);
  }, [ageFrom]);

  useEffect(() => {
    if (!ageTo) return;

    setAgeFromOptions([
      ...ages.filter(({ value }) => parseInt(value) <= parseInt(ageTo)),
    ]);
  }, [ageTo]);

  const [newUser, setNewUser] = useState(null);

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

  const search = () => {
    if (!me) {
      onLogin();
    } else {
      router.push(
        `${ROUTES.ACCOUNT.SEARCH}?sex=${men && woman ? "" : men ? "male" : woman ? "female" : ""}&minage=${ageFrom ? ageFrom.toString() : ""}&maxage=${ageTo ? ageTo.toString() : ""}&city=${city || ""}`
      );
    }
  };

  return (
    <div
      className={cn(
        "p-[20px] sm:p-[30px] gap-4 sm:gap-5 bg-primary/50 mx-2.5 sm:mx-0",
        {
          "grid grid-cols-4 w-full rounded-[32px] ": horizontal,
          "flex flex-col rounded-[32px] sm:w-[400px] ": !horizontal,
        },
        className
      )}
    >
      <div
        className={cn("flex items-center justify-between", {
          "justify-start": horizontal,
          "justify-between": !horizontal,
        })}
      >
        <p className="font-semibold text-sm text-white mr-4">Найти</p>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Button
            className={cn("text-xs font-regular", {
              "bg-dark dark:bg-black text-white": men,
            })}
            radius="full"
            startContent={<MenIcon className="text-danger" />}
            onPress={() => setMen(!men)}
          >
            мужчину
          </Button>
          <Button
            className={cn("text-xs  font-regular", {
              "bg-dark dark:bg-black text-white": woman,
            })}
            radius="full"
            startContent={<WomenIcon className="text-danger" />}
            onPress={() => setWoman(!woman)}
          >
            девушку
          </Button>
        </div>
      </div>

      <div
        className={cn("flex items-center", {
          "justify-start": horizontal,
          "justify-between": !horizontal,
        })}
      >
        <p className="font-semibold text-sm mr-4 text-white">Возраст</p>
        <div className="flex items-center gap-2.5 sm:gap-4">
          <Select
            className="w-[119px] text-primary"
            placeholder="от"
            radius="full"
            // @ts-ignore
            selectedKeys={[ageFrom]}
            onChange={(el: any) => setAgeFrom(el.target.value)}
          >
            {ageFromOptions.map((age) => (
              <SelectItem key={age.value}>{age.label}</SelectItem>
            ))}
          </Select>
          <Select
            className="w-[119px] text-primary"
            placeholder="до"
            radius="full"
            // @ts-ignore
            selectedKeys={[ageTo]}
            onChange={(el: any) => setAgeTo(el.target.value)}
          >
            {ageToOptions.map((age) => (
              <SelectItem key={age.value}>{age.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div
        className={cn("flex items-center", {
          "justify-start": horizontal,
          "justify-between": !horizontal,
        })}
      >
        <p className="font-semibold text-sm mr-4 text-white">Откуда</p>
        <Select
          className="max-w-[248px] sm:max-w-[254px] text-primary"
          placeholder="выберите город"
          radius="full"
          // @ts-ignore
          selectedKeys={[city]}
          onChange={(el: any) => setCity(el.target.value)}
        >
          {cities.map((city) => (
            <SelectItem key={city.value}>{city.label}</SelectItem>
          ))}
        </Select>
      </div>

      <Button
        className={cn("font-semibold text-white dark:bg-black bg-dark ", {
          "mt-2": !horizontal,
        })}
        radius="full"
        onPress={search}
      >
        НАЙТИ
      </Button>

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
    </div>
  );
};
