"use client";

import { config } from "@/common/env";
import { useGetMeQuery } from "@/redux/services/userApi";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";
import { PiWaveform } from "react-icons/pi";
import { BsFillCameraFill } from "react-icons/bs";
import { Input, Textarea } from "@heroui/input";
import { Checkbox, Select, SelectItem } from "@heroui/react";
import { cities } from "@/data/cities";
import { ages } from "@/data/ages";
import { heights } from "@/data/heights";
import { weights } from "@/data/weights";
import { HeartIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { IoTrash } from "react-icons/io5";

export default function editProfile() {
  const router = useRouter();

  const [user, setUser] = useState<any>();

  const { data: me } = useGetMeQuery(null);

  useEffect(() => {
    if (!me) return;

    setUser(me);
  }, [me]);

  return (
    <div className="flex w-full flex-col px-9 h-screen pt-[84px] gap-[30px]">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-semibold text-[36px]">Редактирование профиля</h1>

        <Button
          className="z-0 relative"
          color="secondary"
          radius="full"
          variant="solid"
          startContent={<PiWaveform className="w-5 h-5" />}
        >
          {me?.voice ? "Прослушать голос" : "Записать голос"}
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-5 w-full">
        <Input
          label="Имя"
          className="z-0 relative"
          classNames={{ input: "font-semibold" }}
          placeholder=""
          radius="lg"
        />

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Город"
        >
          {cities.map((city: any) => (
            <SelectItem key={city.value}>{city.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Возраст (лет)"
        >
          {ages.map((age: any) => (
            <SelectItem key={age.value}>{age.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Рост (см)"
        >
          {heights.map((height: any) => (
            <SelectItem key={height.value}>{height.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Вес (кг)"
        >
          {weights.map((weight: any) => (
            <SelectItem key={weight.value}>{weight.label}</SelectItem>
          ))}
        </Select>
      </div>

      <h2 className="font-semibold text-[24px] mt-5">Фото профиля</h2>

      <div className="grid grid-cols-5 gap-5 w-full">
        {me?.photos?.map((photo: any) => (
          <div
            className="col-span-1 rounded-[27px] overflow-hidden relative group"
            key={photo.url}
          >
            <Image
              alt=""
              className="z-0 relative"
              height={"100%"}
              radius="none"
              src={`${config.MEDIA_URL}/${photo?.url}` || ""}
              width={"100%"}
            />

            <div className="hidden group-hover:flex absolute top-2.5 left-2.5 w-[40px] h-[40px] rounded-full bg-white/50 dark:bg-dark/50 cursor-pointer items-center justify-center hover:bg-primary hover:text-white hover:dark:bg-primary hover:dark:text-white transition-all">
              <TiStarFullOutline size={24} />
            </div>

            <div className="hidden group-hover:flex absolute top-2.5 right-2.5 w-[40px] h-[40px] rounded-full bg-white/50 dark:bg-dark/50 cursor-pointer items-center justify-center hover:bg-primary hover:text-white hover:dark:bg-primary hover:dark:text-white transition-all">
              <IoTrash size={20} />
            </div>
          </div>
        ))}
        <button className="col-span-1 bg-white dark:bg-foreground-100 rounded-[27px] flex justify-center items-center group z-0 relative">
          <div className="flex flex-col items-center gap-3 group-hover:text-primary transition-all">
            <BsFillCameraFill size={36} />
            <p className="font-semibold">Добавить фото</p>
          </div>
        </button>
      </div>

      <h2 className="font-semibold text-[24px] mt-5">Цели знакомства</h2>

      <div className="flex flex-wrap gap-[50px] w-full">
        <Checkbox
          defaultSelected
          className="-mt-5 z-0 relative"
          classNames={{
            wrapper: "bg-white dark:bg-foreground-300",
          }}
          icon={<HeartIcon />}
          isSelected={!!user?.sponsor}
          onChange={(e) => setUser({ ...user, sponsor: !!e.target.checked })}
        >
          {user?.sex === "men" ? "я спонсор" : "ищу спонсора"}
        </Checkbox>
        <Checkbox
          defaultSelected
          className="-mt-5 z-0 relative"
          classNames={{
            wrapper: "bg-white dark:bg-foreground-300",
          }}
          icon={<HeartIcon />}
          isSelected={!!user?.traveling}
          onChange={(e) => setUser({ ...user, traveling: !!e.target.checked })}
        >
          совместные путешествия
        </Checkbox>
        <Checkbox
          defaultSelected
          className="-mt-5 z-0 relative"
          classNames={{
            wrapper: "bg-white dark:bg-foreground-300",
          }}
          icon={<HeartIcon />}
          isSelected={!!user?.relationships}
          onChange={(e) =>
            setUser({ ...user, relationships: !!e.target.checked })
          }
        >
          постоянные отношения
        </Checkbox>
        <Checkbox
          defaultSelected
          className="-mt-5 z-0 relative"
          classNames={{
            wrapper: "bg-white dark:bg-foreground-300",
          }}
          icon={<HeartIcon />}
          isSelected={!!user?.evening}
          onChange={(e) => setUser({ ...user, evening: !!e.target.checked })}
        >
          провести вечер
        </Checkbox>
      </div>

      <h2 className="font-semibold text-[24px] mt-5">О себе</h2>

      <Textarea
        className="w-full z-0 relative"
        classNames={{input: "p-3" }}
        label=""
        radius="lg"
        placeholder="Пользователь предпочёл не указывать информацию о себе "
      />

      <div className="flex justify-end w-full">
        <Button
          radius="full"
          variant="solid"
          color="primary"
          className="z-0 relative"
          onPress={() => null}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}
