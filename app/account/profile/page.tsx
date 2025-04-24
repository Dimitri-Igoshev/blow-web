"use client";

import { Image } from "@heroui/image";

import { config } from "@/common/env";
import { useGetMeQuery } from "@/redux/services/userApi";
import { getCityString } from "@/helper/getCityString";
import { MdOutlineHeight, MdOutlineLogout } from "react-icons/md";
import { GiWeight } from "react-icons/gi";
import { Button } from "@heroui/button";
import { PiWaveform } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { LuCrown, LuWallet } from "react-icons/lu";
import { IoArrowUp } from "react-icons/io5";
import { LuTrash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/routes";
import Link from "next/link";

export default function accountProfile() {
  const router = useRouter();

  const { data: me } = useGetMeQuery(null);

  const logout = () => {
    localStorage.setItem("access-token", "");
    router.replace(ROUTES.HOME);
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-4 px-9 h-screen pt-[94px] gap-[50px]">
      <div className="col-span-1 flex flex-col gap-[50px]">
        <div className="relative">
          <Image
            alt="BLOW"
            className="border-[7px] border-white dark:border-foreground-100 z-0 relative"
            height={"100%"}
            radius="full"
            src={`${config.MEDIA_URL}/${me?.photos[0]?.url}` || ""}
            width={"100%"}
          />
          {/* <div className="absolute rounded-full w-10 h-10 bg-primary cursor-pointer flex justify-center items-center right-[40px] bottom-[40px] border-[2px] border-white z-20">
					<IoCameraOutline className="text-white mb-px" />
					</div> */}
        </div>

        <div className="bg-white dark:bg-foreground-100 p-[30px] rounded-[32px] flex flex-col gap-5">
          <Link href={ROUTES.ACCOUNT.PROFILE_EDIT}>
            <div className="flex gap-2.5 cursor-pointer group transition-all">
              <FiEdit className="text-primary min-w-4" size={16} />
              <p className="-mt-[3px] group-hover:text-primary">
                Редактировать профиль
              </p>
            </div>
          </Link>

          {me?.sex?.male ? (
            <div className="flex gap-2.5 cursor-pointer group transition-all">
              <LuCrown className="text-primary min-w-4" size={16} />
              <p className="-mt-[3px] group-hover:text-primary">
                {me?.premium ? "Продлить премиум" : "Купить премиум"}
              </p>
            </div>
          ) : null}

          <div className="flex gap-2.5 cursor-pointer group transition-all">
            <IoArrowUp className="text-primary min-w-4" size={16} />
            <p className="-mt-[3px] group-hover:text-primary">Поднять анкету</p>
          </div>

          <div className="flex gap-2.5 cursor-pointer group transition-all">
            <LuWallet className="text-primary min-w-4" size={16} />
            <p className="-mt-[3px] group-hover:text-primary">Пополнить кошелек</p>
          </div>

          <div className="flex gap-2.5 cursor-pointer group transition-all">
            <LuTrash className="text-primary min-w-4" size={16} />
            <p className="-mt-[3px] group-hover:text-primary">Удалить анкету</p>
          </div>

          <button
            className="flex gap-2.5 cursor-pointer group transition-all"
            onClick={logout}
          >
            <MdOutlineLogout className="text-primary" size={16} />
            <p className="-mt-[3px] group-hover:text-primary">Выйти</p>
          </button>
        </div>
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="bg-white dark:bg-foreground-100 p-9 rounded-[32px] flex flex-col gap-5">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
              <p className="text-[36px] font-semibold -mt-1.5">
                {me?.firstName
                  ? me.firstName
                  : me?.sex == "male"
                    ? "Мужчина"
                    : "Девушка"}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <p>сейчас онлайн</p>
              </div>
            </div>

            <p className="text-[24px]">
              {me?.age ? me.age + ", " : ""}
              {getCityString(me?.city)}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10 -ml-2">
              <div className="flex items-center gap-1">
                <MdOutlineHeight className="w-[22px] text-primary" size={22} />
                <p>рост - {me?.height ? me.height + " см" : ""}</p>
              </div>
              <div className="flex items-center gap-1">
                <GiWeight className="w-[22px] text-primary mr-1" size={18} />
                <p>вес - {me?.weight ? me.weight + " кг" : ""}</p>
              </div>
            </div>

            <div>
              <Button
                className="w-full z-0 relative"
                color="primary"
                radius="full"
                variant="bordered"
                startContent={<PiWaveform className="w-5 h-5" />}
              >
                {me?.voice ? "Прослушать голос" : "Записать голос"}
              </Button>
            </div>
          </div>

          <div className="text-[20px] font-semibold mt-3">Цели знакомства</div>

          <ul className="flex flex-wrap w-full gap-6 pl-4">
            {!me?.sponsor ? null : (
              <li className="list-disc">
                {me?.sex.male ? "Стану спонсором" : "Ищу спонсора"}
              </li>
            )}
          </ul>

          <div className="text-[20px] font-semibold mt-6">О себе</div>

          <p>
            {me?.description
              ? me.description
              : "Пользователь предпочел не указывать информацию о себе."}
          </p>
        </div>
      </div>
    </div>
  );
}
