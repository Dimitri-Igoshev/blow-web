"use client";

import Protected from "@/components/Protected";
import { Tab, Tabs } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "../routes";

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
            aria-label="Tabs"
            variant="bordered"
            radius="full"
            fullWidth
            classNames={{
              tabContent: "text-white",
            }}
            selectedKey={tab}
          >
            <Tab key="search" title="Поиск анкет" href={ROUTES.ACCOUNT.SEARCH} />
            <Tab key="guests" title="Кто смотрел" href={ROUTES.ACCOUNT.GUESTS} />
            <Tab key="mailings" title="Рассылки" href={ROUTES.ACCOUNT.MAILINGS} />
            <Tab key="profile" title="Профиль" href={ROUTES.ACCOUNT.PROFILE} />
            <Tab key="services" title="Услуги" href={ROUTES.ACCOUNT.SERVICES}/>
            <Tab key="notes" title="Заметки" href={ROUTES.ACCOUNT.NOTES} />
            <Tab key="dialogues" title="Диалоги" href={ROUTES.ACCOUNT.DIALOGUES} />
          </Tabs>
        </div>

        <div>{children}</div>
      </div>
    </Protected>
  );
}
