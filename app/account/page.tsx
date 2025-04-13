"use client";

import { Tab, Tabs } from "@heroui/react";

export default function account() {
  return (
    <>
      <div className="relative">
        <img
          alt=""
          className="rounded-b-[50px] flex flex-col relative z-10 w-full h-[210px] object-cover"
          src="/bg-min.png"
        />

        <div className="relative z-10 px-9 -mt-[84px] w-full">
          <Tabs aria-label="Tabs" variant="bordered" radius="full" fullWidth classNames={{
            tabContent: "text-white"
          }}>
            <Tab key="photos" title="Поиск анкет" />
            <Tab key="music" title="Кто смотрел" />
            <Tab key="videos" title="Рассылки" />
            <Tab key="videos2" title="Профиль" />
            <Tab key="videos3" title="Услуги" />
            <Tab key="videos4" title="Заметки" />
            <Tab key="videos5" title="Диалоги" />
          </Tabs>
        </div>
      </div>
    </>
  );
}
