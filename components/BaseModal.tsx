"use client";

import { cn, Modal, ModalContent } from "@heroui/react";
import { FunctionComponent, ReactNode } from "react";

interface BaseModalProps {
  children: ReactNode,
  className?: string,
	isOpen: boolean;
	onOpenChange: () => void;
	size?: "sm" | "md" | "lg" | "full" | "xl" | "xs" | "2xl" | "3xl" | "4xl" | "5xl" | undefined
}

const BaseModal: FunctionComponent<BaseModalProps> = ({
  children,
  className = '',
	isOpen,
	onOpenChange,
	size = 'md'
}) => {
	return (
		<Modal
			isOpen={isOpen}
			placement="center"
			onOpenChange={onOpenChange}
			backdrop="blur"
      className={cn('m-3', className)}
			closeButton
			size={size}
		>
			<ModalContent>{(onClose) => children}</ModalContent>
		</Modal>
	);
};

export default BaseModal;
