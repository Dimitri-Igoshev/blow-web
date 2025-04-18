"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { FC, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "@/redux/services/authApi";
import { cities } from "@/data/cities";
import { weights } from "@/data/weights";
import { useUploadMutation } from "@/redux/services/uploadApi";

type Inputs = {
  email: string;
  password: string;
};

interface EmailModalProps {
  isOpen: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onOpenChange: () => void;
  newUser: any;
}

export const EmailModal: FC<EmailModalProps> = ({
  isOpen,
  onLogin,
  onRegister,
  onOpenChange,
  newUser,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);

  const [registaration] = useRegisterMutation();
  const [upload] = useUploadMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const body: any = {
      email: data.email,
      password: data.password,
      sex: newUser.men ? "male" : "female",
      age: newUser.age,
      city: newUser.city,
      height: newUser.height,
      weight: newUser.weight,
      sponsor: newUser.sponsor,
    };

    if (newUser?.photo) {
      const formData = new FormData();
      formData.set("files", newUser?.photo);
      await upload(formData)
        .unwrap()
        .then((res) => {
          body.photos = [{ ...res[0], priority: 0 }]
        })
        .catch((err) => console.log(err));
    }

    registaration(body)
      .unwrap()
      .then((res) => {
        localStorage.setItem("access-token", res.accessToken);
        document.location.reload()
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        onOpenChange();
        setIsLoading(false);
      });
  };

  return (
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1 text-[20px]">
              Данные входа
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-5">
                <Input
                  radius="full"
                  type="email"
                  placeholder="E-mail"
                  startContent={<MdEmail />}
                  classNames={{
                    input: "bg-transparent dark:text-white",
                    inputWrapper: "dark:bg-foreground-200",
                  }}
                  {...register("email", {
                    required: { value: true, message: "Обязательное поле" },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Невалидный emaill",
                    },
                  })}
                />
                <Input
                  required
                  radius="full"
                  type="password"
                  placeholder="Пароль"
                  startContent={<FaLock size={14} />}
                  classNames={{
                    input: "bg-transparent dark:text-white",
                    inputWrapper: "dark:bg-foreground-200",
                  }}
                  {...register("password", {
                    required: { value: true, message: "Обязательное поле" },
                    minLength: { value: 6, message: "Не менее 6 символов" },
                  })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-col w-full">
                <Button
                  type="submit"
                  color="primary"
                  radius="full"
                  className="w-full"
                >
                  Сохранить
                </Button>

                <div className="flex items-center justify-between w-full gap-4 text-xs mt-2 -mb-3">
                  <Button
                    className="cursor-pointer hover:text-primary bg-transparent text-xs"
                    variant="flat"
                    radius="full"
                  >
                    Забыли пароль?
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
                    Есть аккаунт?
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};
