"use client";

import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { FC, useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { useSearchParams } from "next/navigation";

import { MenIcon, WomenIcon } from "./icons";

import { cities } from "@/data/cities";
import { ages } from "@/data/ages";

interface SearchWidgetProps {
  className?: string;
}

export const SearchWidget: FC<SearchWidgetProps> = ({ className }) => {
  const searchParams = useSearchParams();

  const [men, setMen] = useState(false);
  const [woman, setWoman] = useState(false);
  const [ageFromOptions, setAgeFromOptions] = useState([...ages]);
  const [ageFrom, setAgeFrom] = useState("");
  const [ageToOptions, setAgeToOptions] = useState([...ages]);
  const [ageTo, setAgeTo] = useState("");
  const [city, setCity] = useState(searchParams.get("city") || "");

  useEffect(() => {
    if (!searchParams.get("city")) return;
    setCity(searchParams.get("city") as string);
  }, [searchParams.get("city")]);

  useEffect(() => {
    if (!ageFrom) return;

    setAgeToOptions([
      ...ages.filter(({ value }) => parseInt(value) > parseInt(ageFrom)),
    ]);
  }, [ageFrom]);

  useEffect(() => {
    if (!ageTo) return;

    setAgeFromOptions([
      ...ages.filter(({ value }) => parseInt(value) < parseInt(ageTo)),
    ]);
  }, [ageTo]);

  return (
    <div
      className={cn(
        "w-[400px] rounded-[32px] bg-primary/50 p-[30px] flex flex-col gap-5",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm text-white">Найти</p>
        <div className="flex items-center gap-4">
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

      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm mr-4 text-white">Возраст</p>
        <div className="flex items-center gap-4">
          <Select
            className="w-[119px] text-primary"
            placeholder="от"
            radius="full"
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
            selectedKeys={[ageTo]}
            onChange={(el: any) => setAgeTo(el.target.value)}
          >
            {ageToOptions.map((age) => (
              <SelectItem key={age.value}>{age.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm mr-4 text-white">Откуда</p>
        <Select
          className="max-w-[254px] text-primary"
          placeholder="выберите город"
          radius="full"
          selectedKeys={[city]}
          onChange={(el: any) => setCity(el.target.value)}
        >
          {cities.map((city) => (
            <SelectItem key={city.value}>{city.label}</SelectItem>
          ))}
        </Select>
      </div>

      <Button
        className="font-semibold text-white dark:bg-black bg-dark mt-2"
        radius="full"
      >
        НАЙТИ
      </Button>
    </div>
  );
};
