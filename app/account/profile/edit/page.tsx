"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";
import { PiWaveform } from "react-icons/pi";
import { BsFillCameraFill } from "react-icons/bs";
import { Input, Textarea } from "@heroui/input";
import { Checkbox, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { IoTrash } from "react-icons/io5";

import { cities } from "@/data/cities";
import { ages } from "@/data/ages";
import { heights } from "@/data/heights";
import { weights } from "@/data/weights";
import { HeartIcon } from "@/components/icons";
import { useGetMeQuery } from "@/redux/services/userApi";
import { config } from "@/common/env";

export default function EditProfile() {
  const router = useRouter();

  const [user, setUser] = useState<any>();

  const { data: me } = useGetMeQuery(null);

  const [city, setCity] = useState("");
  const [sponsor, setSponsor] = useState(true);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<any>();
  const [imgSrc, setImgSrc] = useState<string>("");

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
          startContent={<PiWaveform className="w-5 h-5" />}
          variant="solid"
        >
          {me?.voice ? "Прослушать голос" : "Записать голос"}
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-5 w-full">
        <Input
          className="z-0 relative"
          classNames={{ input: "font-semibold" }}
          label="Имя"
          placeholder=""
          radius="lg"
          value={user?.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Город"
          selectedKeys={[user?.city]}
          onChange={(el: any) => setUser({ ...user, city: el.target.value })}
        >
          {cities.map((city: any) => (
            <SelectItem key={city.value}>{city.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Возраст (лет)"
          selectedKeys={[user?.age]}
          onChange={(el: any) => setUser({ ...user, age: el.target.value })}
        >
          {ages.map((age: any) => (
            <SelectItem key={age.value}>{age.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Рост (см)"
          selectedKeys={[user?.height]}
          onChange={(el: any) => setUser({ ...user, height: el.target.value })}
        >
          {heights.map((height: any) => (
            <SelectItem key={height.value}>{height.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="text-primary z-0 relative"
          classNames={{ value: "font-semibold" }}
          label="Вес (кг)"
          selectedKeys={[user?.weight]}
          onChange={(el: any) => setUser({ ...user, weight: el.target.value })}
        >
          {weights.map((weight: any) => (
            <SelectItem key={weight.value}>{weight.label}</SelectItem>
          ))}
        </Select>
      </div>

      <h2 className="font-semibold text-[24px] mt-5">Фото профиля</h2>

      <div className="grid grid-cols-5 gap-5 w-full">
        {user?.photos?.map((photo: any) => (
          <div
            key={photo.url}
            className="col-span-1 rounded-[27px] overflow-hidden relative group"
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
        classNames={{ input: "p-3" }}
        label=""
        placeholder="Пользователь предпочёл не указывать информацию о себе "
        radius="lg"
        value={user?.about}
          onChange={(e) => setUser({ ...user, about: e.target.value })}
      />

      <div className="flex justify-end w-full">
        <Button
          className="z-0 relative"
          color="primary"
          radius="full"
          variant="solid"
          onPress={() => null}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}
