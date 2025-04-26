"use client";

import { ProfilePreview } from "@/components/ProfilePreview";
import { useGetUsersQuery } from "@/redux/services/userApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountSearch() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState({
    sex: searchParams.get("sex") || "",
    minage: parseInt(searchParams.get("minage") || ""),
    maxage: parseInt(searchParams.get("maxage") || ""),
    city: searchParams.get("city") || "",
  });

  useEffect(() => {
    setSearch({
      sex: searchParams.get("sex") || "",
      minage: parseInt(searchParams.get("minage") || ""),
      maxage: parseInt(searchParams.get("maxage") || ""),
      city: searchParams.get("city") || "",
    });
  }, [searchParams]);

  const { data: users } = useGetUsersQuery(search);

  return (
    <div className="flex w-full flex-col px-9 pt-[220px] gap-[30px]">
      {users ? (
        <>
          <div className="flex w-full items-center justify-between">
            <h1 className="font-semibold text-[36px]">Результаты поиска</h1>
          </div>

          <div className="grid grid-cols-2 gap-[34px]">
            {users.map((item: any) => (
              <ProfilePreview item={item} key={item._id} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
