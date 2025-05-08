"use client";

import { ServiceCard } from "@/components/ServiceCard";

export default function accountServices() {
	return (
		<div className="flex w-full flex-col px-9 pt-[84px] gap-[30px]">
			<div className="flex w-full items-center justify-between">
				<h1 className="font-semibold text-[36px]">Услуги</h1>
			</div>

			<ServiceCard
				title="Кошелек"
				subtile="3000 ₽"
				list={[
					"При оплате картой в выписке и личном кабинете не будет указано, что платеж связан с сайтом знакомств.",
					"Ваши данные карты остаются конфиденциальными. Мы их не видим, и банк не передает эту информацию третьим лицам.",
					"Мы не подключаем автоподписки и не выполняем повторные списания.",
				]}
				oneTime
				onClick={(value: any) => console.log(value)}
				buttonText="Пополнить"
				defaultVlue={{ period: "", price: "5000" }}
			/>

			<ServiceCard
				title="Премиум аккаунт"
				subtile="осталось 3 дня"
				text="Чтобы продолжить знакомиться с новыми девушками после окончания пробного периода, необходимо активировать премиум-аккаунт. Пробный период длится 24 часа с момента начала общения, давая вам возможность оценить, насколько вам интересно знакомство и встречи на нашем сайте."
				onClick={(value: any) => console.log(value)}
				buttonText="Продлить"
				defaultVlue={{ period: "month", price: "7900" }}
			/>

			<ServiceCard
				title="Поднятие анкеты"
				subtile="Вы на 145 месте"
				text='Поднятие анкеты выведет ее в поиске на первое место после анкет из раздела "ТОП". Если у вас уже оплачено размещение в "ТОП", поднятие сделает вашу анкету первой в этой категории.'
				onClick={(value: any) => console.log(value)}
				buttonText="Поднять"
				oneTime
				defaultVlue={{ period: "", price: "200" }}
			/>

			<ServiceCard
				title="В топ"
				subtile=""
				text='Для закрепления анкеты в "ТОП" требуется активный премиум-аккаунт. Это необходимо, потому что без премиум-аккаунта вы не сможете отвечать на сообщения девушек, и вложенные средства не принесут желаемого результата.'
				onClick={(value: any) => console.log(value)}
				buttonText="В топ"
				defaultVlue={{ period: "month", price: "1000" }}
			/>
		</div>
	);
}
