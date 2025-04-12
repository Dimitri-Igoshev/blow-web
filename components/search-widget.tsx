"use client";

import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { FC, useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { useSearchParams } from "next/navigation";

import { MenIcon, WomenIcon } from "./icons";

import { cities } from "@/data/cities";

const ages = [
  { key: "18", label: "18" },
  { key: "19", label: "19" },
  { key: "20", label: "20" },
  { key: "21", label: "21" },
  { key: "22", label: "22" },
  { key: "23", label: "23" },
  { key: "24", label: "24" },
  { key: "25", label: "25" },
  { key: "26", label: "26" },
  { key: "27", label: "27" },
  { key: "28", label: "28" },
  { key: "29", label: "29" },
  { key: "30", label: "30" },
  { key: "31", label: "31" },
  { key: "32", label: "32" },
  { key: "33", label: "33" },
  { key: "34", label: "34" },
  { key: "35", label: "35" },
  { key: "36", label: "36" },
  { key: "37", label: "37" },
  { key: "38", label: "38" },
  { key: "39", label: "39" },
  { key: "40", label: "40" },
  { key: "41", label: "41" },
  { key: "42", label: "42" },
  { key: "43", label: "43" },
  { key: "44", label: "44" },
  { key: "45", label: "45" },
  { key: "46", label: "46" },
  { key: "47", label: "47" },
  { key: "48", label: "48" },
  { key: "49", label: "49" },
  { key: "50", label: "50" },
  { key: "51", label: "51" },
  { key: "52", label: "52" },
  { key: "53", label: "53" },
  { key: "54", label: "54" },
  { key: "55", label: "55" },
  { key: "56", label: "56" },
  { key: "57", label: "57" },
  { key: "58", label: "58" },
  { key: "59", label: "59" },
  { key: "60", label: "60" },
  { key: "61", label: "61" },
  { key: "62", label: "62" },
  { key: "63", label: "63" },
  { key: "64", label: "64" },
  { key: "65", label: "65" },
  { key: "66", label: "66" },
  { key: "67", label: "67" },
  { key: "68", label: "68" },
  { key: "69", label: "69" },
  { key: "70", label: "70" },
  { key: "73", label: "73" },
  { key: "74", label: "74" },
  { key: "75", label: "75" },
  { key: "76", label: "76" },
  { key: "77", label: "77" },
  { key: "78", label: "78" },
  { key: "79", label: "79" },
  { key: "80", label: "80" },
  { key: "81", label: "81" },
  { key: "82", label: "82" },
  { key: "83", label: "83" },
  { key: "84", label: "84" },
  { key: "85", label: "85" },
  { key: "86", label: "86" },
  { key: "87", label: "87" },
  { key: "88", label: "88" },
  { key: "89", label: "89" },
  { key: "90", label: "90" },
  { key: "91", label: "91" },
  { key: "92", label: "92" },
  { key: "93", label: "93" },
  { key: "94", label: "94" },
  { key: "95", label: "95" },
  { key: "96", label: "96" },
  { key: "97", label: "97" },
  { key: "98", label: "98" },
  { key: "99", label: "99" },
];

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
      ...ages.filter(({ key }) => parseInt(key) > parseInt(ageFrom)),
    ]);
  }, [ageFrom]);

  useEffect(() => {
    if (!ageTo) return;

    setAgeFromOptions([
      ...ages.filter(({ key }) => parseInt(key) < parseInt(ageTo)),
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
              <SelectItem key={age.key}>{age.label}</SelectItem>
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
              <SelectItem key={age.key}>{age.label}</SelectItem>
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
