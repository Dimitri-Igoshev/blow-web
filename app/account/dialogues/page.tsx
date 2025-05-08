"use client";

import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";

export default function AccountDialogues() {
	return (
		<div className="flex w-full flex-col px-3 md:px-9 pt-[84px] gap-[30px] h-screen">
			<div className="flex w-full items-center justify-between">
				<h1 className="font-semibold text-[36px]">Диалоги</h1>
			</div>

			<div className="grid grid-cols-5 h-[100%]">
				<div className="col-span-1 flex flex-col gap-1 w-full">
					<div className="h-[60px] flex gap-2.5 rounded-[24px] bg-white dark:bg-foreground-100 p-[3px] justify-between mr-6  transition-all">
						<Image
							alt=""
							className="rounded-[20px] z-0 relative min-w-[54px]"
							height={54}
							// src={
							// 	me?.photos[0]?.url
							// 		? `${config.MEDIA_URL}/${me?.photos[0]?.url}`
							// 		: me?.sex === "male"
							// 			? "/men.jpg"
							// 			: "/woman.jpg"
							// }
							src={"/woman.jpg"}
							style={{ objectFit: "cover" }}
							width={54}
						/>

						<div className="flex flex-col justify-center text-sm w-full">
							<p className="font-semibold">Вероника</p>
							<p className="-mt-[2px]">35, Москва</p>
						</div>
					</div>

					<div className="h-[60px] flex gap-2.5 rounded-[24px] bg-white dark:bg-foreground-100 p-[3px] justify-between mr-6  transition-all">
						<Image
							alt=""
							className="rounded-[20px] z-0 relative min-w-[54px]"
							height={54}
							src={"/woman.jpg"}
							style={{ objectFit: "cover" }}
							width={54}
						/>

						<div className="flex flex-col justify-center text-sm w-full">
							<p className="font-semibold">Кристина</p>
							<p className="-mt-[2px]">27, Москва</p>
						</div>

						<div className="w-5 h-5 min-w-5 rounded-full bg-primary flex items-center justify-center mt-1.5 mr-1.5">
							<p className="text-[10px] font-semibold text-white">2</p>
						</div>
					</div>

					<div className="h-[60px] flex gap-2.5 rounded-[24px] bg-white dark:bg-foreground-100 p-[3px] justify-between rounded-r-none  transition-all">
						<Image
							alt=""
							className="rounded-[20px] z-0 relative min-w-[54px]"
							height={54}
							src={"/woman.jpg"}
							style={{ objectFit: "cover" }}
							width={54}
						/>

						<div className="flex flex-col justify-center text-sm w-full">
							<p className="font-semibold">Ольга</p>
							<p className="-mt-[2px]">27, Москва</p>
						</div>
					</div>

					<div className="h-[60px] flex gap-2.5 rounded-[24px] bg-white dark:bg-foreground-100 p-[3px] justify-between mr-6 transition-all">
						<Image
							alt=""
							className="rounded-[20px] z-0 relative min-w-[54px]"
							height={54}
							src={"/woman.jpg"}
							style={{ objectFit: "cover" }}
							width={54}
						/>

						<div className="flex flex-col justify-center text-sm w-full">
							<p className="font-semibold">Вероника</p>
							<p className="-mt-[2px]">27, Москва</p>
						</div>
					</div>
				</div>

				<div className="col-span-4 border-[7px] p-3 border-white dark:border-foreground-100 w-full h-[70%] rounded-[36px] relative overflow-y-scroll hide-scroll text-[14px]">
					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-3 items-end">
							<div className="flex items-center gap-2">
								<Image
									alt=""
									className="rounded-full z-0 relative min-w-[30px]"
									height={30}
									src={"/men.jpg"}
									style={{ objectFit: "cover" }}
									width={30}
								/>
								<p className="font-semibold">Вы</p>
							</div>

							<div className="flex flex-col justify-between bg-white dark:bg-foreground-100 rounded-[24px] rounded-tr-none px-5 p-3">
                <p >Привет! Встретимся сегодня?</p>
                <p className="text-[10px] text-right mt-1">22:30</p>
							</div>
						</div>

            <div className="flex flex-col gap-3 items-start">
							<div className="flex items-center gap-2">
								<Image
									alt=""
									className="rounded-full z-0 relative min-w-[30px]"
									height={30}
									src={"/woman.jpg"}
									style={{ objectFit: "cover" }}
									width={30}
								/>
								<p className="font-semibold">Ольга</p>
							</div>

							<div className="flex flex-col justify-between bg-white dark:bg-foreground-100 rounded-[24px] rounded-tl-none px-5 p-3">
								<p>Да, конечно)</p>
                <p className="text-[10px] text-right mt-1">22:35</p>
							</div>
						</div>
            <div className="flex flex-col gap-3 items-start">
							{/* <div className="flex items-center gap-2">
								<Image
									alt=""
									className="rounded-full z-0 relative min-w-[30px]"
									height={30}
									src={"/woman.jpg"}
									style={{ objectFit: "cover" }}
									width={30}
								/>
								<p className="font-semibold">Ольга</p>
							</div> */}

							<div className="flex flex-col justify-between bg-white dark:bg-foreground-100 rounded-[24px] rounded-tl-none px-5 p-3">
								<p>Во сколько ты заедешь?</p>
                <p className="text-[10px] text-right mt-1">22:36</p>
							</div>
						</div>
					</div>

					<div className="absolute left-3 right-3 bottom-3 flex items-center gap-3">
						<Input
							classNames={{
								input: "bg-transparent dark:text-white",
								inputWrapper: "dark:bg-foreground-200",
							}}
							placeholder="Текст сообщения"
							radius="full"
							type="text"
						/>
						<Button className="" color="primary" variant="solid" radius="full">
							Отправить
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
