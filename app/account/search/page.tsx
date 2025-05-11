"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { ProfilePreview } from "@/components/ProfilePreview";
import { useGetUsersQuery } from "@/redux/services/userApi";

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
		<Suspense>
			<div className="flex w-full flex-col px-3 sm:px-9 pt-[400px] xl:pt-[220px] gap-[30px]">
				{users ? (
					<>
						<div className="hidden sm:flex w-full items-center justify-between">
							<h1 className="font-semibold text-[36px]">Результаты поиска</h1>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-5 sm:gap-[34px] mt-[16px] sm:mt-0">
							{users.map((item: any) => (
								<ProfilePreview key={item._id} item={item} />
							))}
						</div>
					</>
				) : null}
			</div>
		</Suspense>
	);
}
