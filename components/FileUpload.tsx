"use client";

import { CameraIcon } from "@/common/icons";
import { Button } from "@heroui/button";
import React, { useRef, useState } from "react";

const FileUpload = () => {
	const [file, setFile] = useState<any>(null);
	const inputRef = useRef<any>(null);

	const handleFileChange = (e: any) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	};

	const handleDrop = (e: any) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files[0];
		setFile(droppedFile);
	};

	const handleDragOver = (e: any) => {
		e.preventDefault();
	};

	return (
		<div
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			className="border border-primary border-dashed rounded-xl p-[48px] flex flex-col gap-6 justify-center items-center"
		>
			<div>Перетащите ваш файл сюда или нажмите, чтобы выбрать файл.</div>
			<input
				ref={inputRef}
				className="hidden"
				type="file"
				onChange={handleFileChange}
			/>
			<Button
				color="primary"
				className="text-white"
				endContent={<CameraIcon />}
				onClick={() => inputRef.current.click()}
			>
				Выберите файл
			</Button>
			{file ? (
				<div>
					<p>Выбранный файл: {file?.name || ""}</p>
					<p>Размер файла: {file?.size || ""} bytes</p>
					<p>Тип файла: {file?.type || ""}</p>
				</div>
			) : null}
		</div>
	);
};

export default FileUpload;
