"use client";

import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Image } from "@heroui/image";

import { ROUTES } from "../routes";

import Protected from "@/components/Protected";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    switch (pathname) {
      case ROUTES.ACCOUNT.SEARCH:
        setTab("search");

        return;
      case ROUTES.ACCOUNT.GUESTS:
        setTab("guests");

        return;
      case ROUTES.ACCOUNT.MAILINGS:
        setTab("mailings");

        return;
      case ROUTES.ACCOUNT.PROFILE:
        setTab("profile");

        return;
      case ROUTES.ACCOUNT.SERVICES:
        setTab("services");

        return;
      case ROUTES.ACCOUNT.NOTES:
        setTab("notes");

        return;
      case ROUTES.ACCOUNT.DIALOGUES:
        setTab("dialogues");

        return;
      default:
        return;
    }
  }, [pathname]);

  return (
    <Protected>
      <div className="relative">
        <img
          alt=""
          className="rounded-b-[50px] flex flex-col fixed z-10 w-full h-[210px] object-cover"
          src="/bg-min.png"
        />

        <div className="fixed z-10 px-9 mt-[128px] w-full">
          <Tabs
            fullWidth
            aria-label="Tabs"
            classNames={{
              tabContent: "text-white",
            }}
            radius="full"
            selectedKey={tab}
            variant="bordered"
          >
            <Tab
              key="search"
              href={ROUTES.ACCOUNT.SEARCH}
              title="Поиск анкет"
            />
            <Tab
              key="guests"
              href={ROUTES.ACCOUNT.GUESTS}
              title="Кто смотрел"
            />
            <Tab
              key="mailings"
              href={ROUTES.ACCOUNT.MAILINGS}
              title="Рассылки"
            />
            <Tab key="profile" href={ROUTES.ACCOUNT.PROFILE} title="Профиль" />
            <Tab key="services" href={ROUTES.ACCOUNT.SERVICES} title="Услуги" />
            <Tab key="notes" href={ROUTES.ACCOUNT.NOTES} title="Заметки" />
            <Tab
              key="dialogues"
              href={ROUTES.ACCOUNT.DIALOGUES}
              title="Диалоги"
            />
          </Tabs>
        </div>

        <div className="pt-[160px]">{children}</div>

        <footer className="bg-gray dark:bg-black w-full">
              <div className="bg-dark rounded-t-[50px] px-12 py-[28px] grid grid-cols-3 text-white items-center">
                <p>
                  {new Date().getFullYear()} © BLOW. Сайт для лиц старше 18-ти
                  лет.
                </p>
                <div className="flex justify-center">
                  <Image
                    alt="BLOW"
                    height={40}
                    radius="none"
                    src="/logo.png"
                    width={101}
                  />
                </div>
                <div className="flex items-center justify-end gap-6">
                  <div className="underline cursor-pointer hover:text-primary text-nowrap">
                    Свяжись с нами
                  </div>
                  <div className="underline cursor-pointer hover:text-primary text-nowrap">
                    Правила
                  </div>
                  <div className="underline cursor-pointer hover:text-primary text-nowrap">
                    Договор оферта
                  </div>
                </div>
              </div>
            </footer>
      </div>
    </Protected>
  );
}
