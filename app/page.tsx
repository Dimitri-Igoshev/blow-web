import { PreviewWidget } from "@/components/preview-widget";
import { SearchWidget } from "@/components/search-widget";
import { cn } from "@heroui/theme";
import { Image } from "@heroui/image";

const soderjanki = [
  {
    _id: "1",
    online: true,
    name: "Светлана",
    age: "24",
    city: "Москва",
    photo: "/1.png",
  },
  {
    _id: "2",
    online: false,
    name: "Алена",
    age: "32",
    city: "Москва",
    photo: "/2.png",
  },
  {
    _id: "3",
    online: false,
    name: "София",
    age: "23",
    city: "Москва",
    photo: "/3.png",
  },
  {
    _id: "4",
    online: true,
    name: "Дарья",
    age: "25",
    city: "Москва",
    photo: "/4.png",
  },
  {
    _id: "5",
    online: false,
    name: "Наташа",
    age: "28",
    city: "Москва",
    photo: "/5.png",
  },
  {
    _id: "6",
    online: true,
    name: "Юля",
    age: "24",
    city: "Москва",
    photo: "/6.png",
  },
  {
    _id: "7",
    online: false,
    name: "Вероника",
    age: "35",
    city: "Москва",
    photo: "/7.png",
  },
  {
    _id: "8",
    online: true,
    name: "Анна",
    age: "25",
    city: "Москва",
    photo: "/8.png",
  },
  {
    _id: "9",
    online: true,
    name: "Кристина",
    age: "25",
    city: "Москва",
    photo: "/9.png",
  },
  {
    _id: "10",
    online: false,
    name: "Виктория",
    age: "36",
    city: "Москва",
    photo: "/10.png",
  },
  {
    _id: "11",
    online: true,
    name: "Эмма",
    age: "23",
    city: "Москва",
    photo: "/11.png",
  },
  {
    _id: "12",
    online: false,
    name: "Мэри",
    age: "32",
    city: "Москва",
    photo: "/12.png",
  },
  {
    _id: "13",
    online: false,
    name: "Виктория",
    age: "37",
    city: "Москва",
    photo: "/13.png",
  },
  {
    _id: "14",
    online: true,
    name: "Екатерина",
    age: "27",
    city: "Москва",
    photo: "/14.png",
  },
  {
    _id: "15",
    online: false,
    name: "Валерия",
    age: "37",
    city: "Москва",
    photo: "/15.png",
  },
  {
    _id: "16",
    online: false,
    name: "Диана",
    age: "29",
    city: "Москва",
    photo: "/16.png",
  },
];

const sponsors = [
  {
    _id: "17",
    online: true,
    name: "Август",
    age: "24",
    city: "Москва",
    photo: "/17.png",
  },
  {
    _id: "18",
    online: false,
    name: "Дмитрий",
    age: "32",
    city: "Москва",
    photo: "/18.png",
  },
  {
    _id: "19",
    online: false,
    name: "Сергей",
    age: "23",
    city: "Москва",
    photo: "/19.png",
  },
  {
    _id: "44",
    online: true,
    name: "Алексей",
    age: "25",
    city: "Москва",
    photo: "/20.png",
  },
  {
    _id: "45",
    online: false,
    name: "Роман",
    age: "28",
    city: "Москва",
    photo: "/21.png",
  },
  {
    _id: "46",
    online: true,
    name: "Михаил",
    age: "24",
    city: "Москва",
    photo: "/22.png",
  },
  {
    _id: "47",
    online: false,
    name: "Андрей",
    age: "35",
    city: "Москва",
    photo: "/23.png",
  },
  {
    _id: "48",
    online: true,
    name: "Владимир",
    age: "25",
    city: "Москва",
    photo: "/24.png",
  },
  {
    _id: "49",
    online: true,
    name: "Денис",
    age: "25",
    city: "Москва",
    photo: "/25.png",
  },
  {
    _id: "410",
    online: false,
    name: "Артем",
    age: "36",
    city: "Москва",
    photo: "/26.png",
  },
  {
    _id: "411",
    online: true,
    name: "Никита",
    age: "23",
    city: "Москва",
    photo: "/27.png",
  },
  {
    _id: "412",
    online: false,
    name: "Майк",
    age: "32",
    city: "Москва",
    photo: "/28.png",
  },
  {
    _id: "413",
    online: false,
    name: "Игорь",
    age: "37",
    city: "Москва",
    photo: "/29.png",
  },
  {
    _id: "414",
    online: true,
    name: "Антон",
    age: "27",
    city: "Москва",
    photo: "/30.png",
  },
  {
    _id: "415",
    online: false,
    name: "Виктор",
    age: "37",
    city: "Москва",
    photo: "/31.png",
  },
  {
    _id: "416",
    online: false,
    name: "Алексей",
    age: "29",
    city: "Москва",
    photo: "/32.png",
  },
];

export default function Home() {
  return (
    <>
      <div className="relative">
        <img
          src="/bg.png"
          alt=""
          className="rounded-b-[50px] flex flex-col relative z-10"
        />
        <div className="w-full absolute top-[130px]">
          <div className="flex justify-center items-center gap-[5%] px-5 relative z-10">
            <SearchWidget className="" />
            <div className="flex flex-col w-[750px] gap-8">
              <h1 className="text-[48px] font-semibold text-white leading-[56px]">
                Поиск лучших содержанок и самых успешных мужчин
              </h1>
              <ul className="text-white uppercase list-disc leading-7 ml-4">
                <li>Бесплатная регистрация</li>
                <li>Реальные анкеты</li>
                <li>Качественные фото</li>
                <li>Голоса девушек</li>
              </ul>
            </div>
          </div>

          <div className="mt-[60px]  bg-gray dark:bg-black">
            <h2 className="text-[36px] text-white font-semibold pl-20 z-20 relative">
              Содержанки
            </h2>

            <div className="w-full grid grid-cols-4 mt-[30px] z-20 relative">
              {soderjanki.map((item, idx) => (
                <div className="flex justify-center" key={item._id}>
                  <PreviewWidget
                    item={item}
                    className={cn({
                      "mt-[50px]":
                        idx === 1 ||
                        idx === 2 ||
                        idx === 5 ||
                        idx === 6 ||
                        idx === 9 ||
                        idx === 10 ||
                        idx === 13 ||
                        idx === 14,
                    })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-[60px] bg-gray dark:bg-black">
            <h2 className="text-[36px] text-black dark:text-white font-semibold pl-20 z-20 relative">
              Наши мужчины
            </h2>

            <div className="w-full grid grid-cols-4 mt-[30px] z-20 relative">
              {sponsors.map((item, idx) => (
                <div className="flex justify-center" key={item._id}>
                  <PreviewWidget
                    item={item}
                    className={cn({
                      "mt-[50]":
                        idx === 1 ||
                        idx === 2 ||
                        idx === 5 ||
                        idx === 6 ||
                        idx === 9 ||
                        idx === 10 ||
                        idx === 13 ||
                        idx === 14,
                    })}
                  />
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-foreground-200 p-6 m-9 mb-0 mt-20 rounded-[36px]">
              <Image
                alt="BLOW"
                src={`/info.png`}
                width={570}
                height={510}
                className="object-cover float-left mr-8 mb-3"
              />
              <p>
                <span className="text-[24px] text-primary font-semibold">
                  BLOW
                </span>
              </p>
              <p className="mt-4">
                Добро пожаловать на наш сайт — платформу, где состоятельные
                мужчины находят очаровательных спутниц. Мы сделали сервис
                простым и удобным, чтобы каждый мужчина мог подобрать себе
                девушку для приятного общения и взаимовыгодных отношений, а
                девушки – встретить щедрого покровителя. BLOW – это сайт
                знакомств для успешных мужчин и привлекательных девушек, ценящих
                комфорт и заботу. Термин «содержанка» нередко воспринимается
                неоднозначно. На самом деле, это элегантная, умная женщина,
                которая не стремится к браку или долгосрочным обязательствам.
                Она ищет состоятельного мужчину, готового поддерживать её,
                создавая атмосферу уюта и удовольствия. В свою очередь, мужчина
                хочет проводить время с красивой девушкой без ожиданий серьезных
                отношений.
              </p>
              <p className="mt-4">
                Деловые и амбициозные мужчины дорожат своим временем. Они
                предпочитают отдыхать в компании очаровательных спутниц — на
                курортах, во время шопинга за границей и в других приятных
                местах. Если вы ищете обеспеченного партнера или покровителя,
                регистрируйтесь на сайте BLOW и создавайте свою анкету.
              </p>
              <p className="mt-4">
                На нашем сайте ежедневно появляются новые девушки, ищущие
                состоятельного мужчину для отношений в формате любовницы в
                Москве. Успешному бизнесмену важны не только интимные встречи,
                но и душевное общение с понимающей спутницей, готовой разделить
                его взгляды на жизнь. Именно здесь, на BLOW, вас ждет
                очаровательная девушка, мечтающая познакомиться с обеспеченным
                мужчиной. Ведь рядом с такой прекрасной молодой дамой можно
                по-настоящему ощутить радость и гармонию.
              </p>
              <p className="mt-4">
                Если вам хочется тепла, заботы и ярких эмоций, но из-за
                напряженного графика не остается времени на долгие поиски – вы
                обратились по адресу! Здесь вы легко найдете очаровательную
                содержанку, которая скрасит ваши вечера или с удовольствием
                составит компанию в путешествии.
              </p>

              <p className="mt-6">
                <span className="text-[24px] text-primary font-semibold">
                  Лучший сайт для знакомства с любовницами и влиятельными
                  спонсорами
                </span>
              </p>
              <p className="mt-4">
                Мечтаете о щедром и успешном спонсоре? Или ищете красивую и
                заботливую любовницу? Добро пожаловать! Здесь вас ждут только
                актуальные анкеты реальных пользователей. Зарегистрированная у
                нас содержанка обязательно привлечет внимание состоятельного
                мужчины, а каждый спонсор сможет найти молодую, привлекательную
                спутницу с фото, соответствующую его вкусам и желаниям.
              </p>

              <p className="mt-6">
                <span className="text-[24px] text-primary font-semibold">
                  Самые состоятельные любовники для роскошных женщин
                </span>
              </p>
              <p className="mt-4">
                Фраза «Ищу богатого любовника» — это не просто мечта о роскошной
                жизни, а реальная возможность найти достойного мужчину, который
                по достоинству оценит вашу красоту и элегантность. Ведь даже
                самый драгоценный бриллиант нуждается в крепкой и достойной
                оправе.{" "}
              </p>
              <p className="mt-4">
                Если вы хотите найти спонсора в Москве, Санкт-Петербурге или
                другом городе, просто заполните анкету с фото на нашем сайте.
                Здесь вас ждут реальные респектабельные мужчины, готовые
                воплотить ваши мечты в жизнь. Наш сайт знакомств создан для
                девушек, которые стремятся к финансовой стабильности и ярким
                эмоциям. Ведь успешный мужчина-спонсор — это не просто партнер,
                а проводник в мир благополучия и комфорта.
              </p>
            </div>

            <div className="pt-[70px] bg-gray dark:bg-black px-12">
              <h2 className="text-[24px] font-semibold">
                Найди любовницу или спонсора рядом с тобой – знакомься, общайся
                и наслаждайся приятным обществом в своем городе! 
              </h2>
            </div>

            <div className="grid grid-cols-6 mt-[30px] px-12 pb-[50px] gap-6">
              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Москва
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Санкт-Петербург
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Астрахань
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Барнаул
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Владивосток
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Екатеринбург
                </li>
              </ul>

              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Ижевск
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Казань
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Кемерово
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Краснодар
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Красноярск
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Липецк
                </li>
              </ul>

              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Майкоп
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Набережные Челны
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Нижний Новгород
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Новосибирск
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Омск
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Оренбург
                </li>
              </ul>

              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Пенза
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Пермь
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Ростов-на-Дону
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Рязань
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Самара
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Саратов
                </li>
              </ul>

              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Тула
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Тюмень
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Ульяновск
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Уфа
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Ханты-Мансийск
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Чебоксары
                </li>
              </ul>

              <ul className="flex flex-col gap-1">
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Челябинск
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Череповец
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Чита
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  Ярославль
                </li>
                <li className="cursor-pointer hover:text-primary hover:underline">
                  {" "}
                </li>
                <li className="cursor-pointer text-primary hover:text-dark font-semibold mt-6">
                  Все города
                </li>
              </ul>
            </div>

            <footer className="bg-gray dark:bg-black w-full">
              <div className="bg-dark rounded-t-[50px] px-12 py-[28px] grid grid-cols-3 text-white items-center">
                <p>
                  {new Date().getFullYear()} © BLOW. Сайт для лиц старше 18-ти
                  лет.
                </p>
                <div className="flex justify-center"><Image alt="BLOW" src="/logo.png" width={101} height={40} radius="none" /></div>
                <ul className="flex items-center justify-end gap-6">
                  <li className="underline cursor-pointer hover:text-primary text-nowrap">Свяжись с нами</li>
                  <li className="underline cursor-pointer hover:text-primary text-nowrap">Правила</li>
                  <li className="underline cursor-pointer hover:text-primary text-nowrap">Договор оферта</li>
                </ul>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
