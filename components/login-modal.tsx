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
import { ROUTES } from "@/app/routes";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onRegister: () => void;
  onOpenChange: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({
  isOpen,
  onRegister,
  onOpenChange,
}) => {
  const router = useRouter();
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
          <>
            <ModalHeader className="flex flex-col gap-1 text-[20px]">
              Вход
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
                />
                <Input
                  radius="full"
                  type="password"
                  placeholder="Пароль"
                  startContent={<FaLock size={14} />}
                  classNames={{
                    input: "bg-transparent dark:text-white",
                    inputWrapper: "dark:bg-foreground-200",
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-col w-full">
                <Button
                  color="primary"
                  radius="full"
                  className="w-full"
                  onPress={() => {
                    router.push(ROUTES.ACCOUNT)
                    onClose()
                  }}
                >
                  Войти
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
                      onRegister();
                      onClose();
                    }}
                  >
                    Зарегистрироваться?
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
