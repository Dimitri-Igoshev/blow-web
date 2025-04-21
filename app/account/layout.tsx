"use client";

import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
          className="rounded-b-[50px] flex flex-col relative z-10 w-full h-[210px] object-cover"
          src="/bg-min.png"
        />

        <div className="relative z-10 px-9 -mt-[84px] w-full">
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

        <div>{children}</div>
      </div>
    </Protected>
  );
}
