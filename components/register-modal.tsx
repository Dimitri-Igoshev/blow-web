"use client";

import {
  Button,
  Checkbox,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { FC, useRef, useState } from "react";
import { HeartIcon, MenIcon, WomenIcon } from "./icons";
import { cities } from "@/data/cities";
import { ages } from "@/data/ages";
import { MdOutlineGirl, MdOutlineHeight } from "react-icons/md";
import { HiOutlineCamera } from "react-icons/hi2";

import { GiWeight } from "react-icons/gi";
import { heights } from "@/data/heights";
import { weights } from "@/data/weights";
import { IFilePayload } from "@/common/interfaces";
import { useUploadMutation } from "@/redux/services/uploadApi";

interface RegisterModalProps {
  isOpen: boolean;
  onLogin: () => void;
  onOpenChange: () => void;
  onNext: (value: any) => void;
}

export const RegisterModal: FC<RegisterModalProps> = ({
  isOpen,
  onLogin,
  onNext,
  onOpenChange,
}) => {
  const [men, setMen] = useState(true);
  const [woman, setWoman] = useState(false);
  const [city, setCity] = useState("");
  const [sponsor, setSponsor] = useState(true);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<any>();
  const [imgSrc, setImgSrc] = useState<string>("");

  const [upload] = useUploadMutation();

  const inputRef = useRef<any>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadPhoto = (value: IFilePayload) => {
    setLoading(true);

    const formData = new FormData();
    if (value?.blob) formData.set("file", value.blob);

    upload(formData)
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="sm"
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        className="bg-gray dark:bg-foreground-100 border-[3px] border-white dark:border-white/50 rounded-[36px] py-1 transition-all"
        classNames={{
          closeButton: "m-3.5",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[20px]">
                Информация о вас
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center w-full gap-4">
                    <Button
                      className={cn(
                        "text-xs font-regular bg-white w-full dark:bg-foreground-300",
                        {
                          "bg-dark dark:bg-black text-white": men,
                        }
                      )}
                      radius="full"
                      startContent={<MenIcon className="text-danger" />}
                      onPress={() => {
                        setMen(!men);
                        setWoman(false);
                      }}
                    >
                      мужчина
                    </Button>
                    <Button
                      className={cn(
                        "text-xs  font-regular bg-white w-full dark:bg-foreground-300",
                        {
                          "bg-dark dark:bg-black text-white": woman,
                        }
                      )}
                      radius="full"
                      startContent={<WomenIcon className="text-danger" />}
                      onPress={() => {
                        setWoman(!woman);
                        setMen(false);
                      }}
                    >
                      девушка
                    </Button>
                  </div>

                  {woman ? (
                    <>
                      <Select
                        className="w-full text-primary"
                        classNames={{
                          trigger: "bg-white dark:bg-foreground-300",
                        }}
                        placeholder="возраст (лет)"
                        radius="full"
                        selectedKeys={[age]}
                        onChange={(el: any) => setAge(el.target.value)}
                        startContent={<MdOutlineGirl size={24} />}
                      >
                        {ages.map((age) => (
                          <SelectItem key={age.key}>{age.label}</SelectItem>
                        ))}
                      </Select>

                      <Select
                        className="w-full text-primary"
                        classNames={{
                          trigger: "bg-white dark:bg-foreground-300",
                        }}
                        placeholder="рост (см)"
                        radius="full"
                        selectedKeys={[height]}
                        onChange={(el: any) => setHeight(el.target.value)}
                        startContent={
                          <MdOutlineHeight size={22} className="w-[22px]" />
                        }
                      >
                        {heights.map((height) => (
                          <SelectItem key={height.key}>
                            {height.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        className="w-full text-primary"
                        classNames={{
                          trigger: "bg-white dark:bg-foreground-300",
                        }}
                        placeholder="вес (кг)"
                        radius="full"
                        selectedKeys={[weight]}
                        onChange={(el: any) => setWeight(el.target.value)}
                        startContent={
                          <GiWeight size={18} className="w-[22px]" />
                        }
                      >
                        {weights.map((weight) => (
                          <SelectItem key={weight.key}>
                            {weight.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </>
                  ) : null}

                  <Select
                    className="text-primary"
                    classNames={{
                      trigger: "bg-white dark:bg-foreground-300",
                    }}
                    placeholder="выберите город"
                    radius="full"
                    selectedKeys={[city]}
                    onChange={(el: any) => setCity(el.target.value)}
                  >
                    {cities.map((city) => (
                      <SelectItem key={city.value}>{city.label}</SelectItem>
                    ))}
                  </Select>

                  {woman ? (
                    <>
                      {imgSrc ? (
                        <div className="flex justify-center w-full rounded-[20px] overflow-hidden">
                          <img src={imgSrc} />
                        </div>
                      ) : null}
                      <input
                        ref={inputRef}
                        className="hidden"
                        type="file"
                        onChange={onSelectFile}
                      />

                      <Button
                        color="primary"
                        radius="full"
                        className="w-full"
                        variant="bordered"
                        startContent={
                          <HiOutlineCamera size={20} className="w-[22px]" />
                        }
                        onPress={() => inputRef.current.click()}
                      >
                        {photo ? "Заменить фото" : "Добавить фото"}
                      </Button>
                    </>
                  ) : null}

                  <p className="font-semibold mt-1">Цель знакомства</p>

                  <Checkbox
                    defaultSelected
                    icon={<HeartIcon />}
                    className="-mt-4"
                    classNames={{
                      wrapper: "bg-white dark:bg-foreground-300",
                    }}
                    isSelected={sponsor}
                    onChange={(e) => e.target.checked && setSponsor(true)}
                  >
                    {men ? "стану спонсором" : "ищу спонсора"}
                  </Checkbox>
                  <Checkbox
                    defaultSelected
                    icon={<HeartIcon />}
                    className="-mt-5"
                    classNames={{
                      wrapper: "bg-white dark:bg-foreground-300",
                    }}
                    isSelected={!sponsor}
                    onChange={(e) => e.target.checked && setSponsor(false)}
                  >
                    {men ? "я не спонсор" : "не ищу спонсора"}
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-col w-full">
                  <Button
                    color="primary"
                    radius="full"
                    className="w-full"
                    onPress={() => {
                      onNext({
                        men,
                        woman,
                        city,
                        sponsor,
                        age,
                        height,
                        weight,
                        photo
                      });
                      onClose();
                    }}
                  >
                    Все верно
                  </Button>

                  <div className="flex items-center justify-between w-full gap-4 text-xs mt-2 -mb-3">
                    <Button
                      className="cursor-pointer hover:text-primary bg-transparent text-xs"
                      variant="flat"
                      radius="full"
                    >
                      Забыл{woman ? "a" : ""} пароль?
                    </Button>
                    <Button
                      className="cursor-pointer hover:text-primary bg-transparent text-xs"
                      variant="flat"
                      radius="full"
                      onPress={() => {
                        onLogin();
                        onClose();
                      }}
                    >
                      Есть анкета?
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
