"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import ReactCrop, {
	Crop,
	PixelCrop,
	centerCrop,
	makeAspectCrop,
} from "react-image-crop";
import { LuCamera } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "@/hooks/useDebonceEffect";

interface ImageCroperProps {
	aspectRatios?: number
	onSave: (file: any) => void;
	onClose: () => void;
}

const ImageCroper: FunctionComponent<ImageCroperProps> = ({
	aspectRatios = undefined,
	onSave,
	onClose,
}) => {
	const [file, setFile] = useState<any>(null);
	const [imgSrc, setImgSrc] = useState<string>("");
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const [aspect, setAspect] = useState<number | undefined>(aspectRatios);
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const inputRef = useRef<any>(null);
	const previewCanvasRef = useRef<any>(null);
	const imgRef = useRef<any>(null);
	const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
	const blobUrlRef = useRef("");

	const [crop, setCrop] = useState<Crop>({
		unit: "%", // Can be 'px' or '%'
		x: 25,
		y: 25,
		width: 50,
		height: 50,
	});

	function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			// @ts-ignore
			setCrop(undefined); // Makes crop preview update between images.
			setFile(e.target.files[0]);
			const reader = new FileReader();
			reader.addEventListener("load", () =>
				setImgSrc(reader.result?.toString() || "")
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);

	function centerAspectCrop(
		mediaWidth: number,
		mediaHeight: number,
		aspect: number
	) {
		return centerCrop(
			makeAspectCrop(
				{
					unit: "%",
					width: 90,
				},
				aspect,
				mediaWidth,
				mediaHeight
			),
			mediaWidth,
			mediaHeight
		);
	}

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	async function onDownloadCropClick() {
		const image = imgRef.current;
		const previewCanvas = previewCanvasRef.current;
		if (!image || !previewCanvas || !completedCrop) {
			throw new Error("Crop canvas does not exist");
		}

		// This will size relative to the uploaded image
		// size. If you want to size according to what they
		// are looking at on screen, remove scaleX + scaleY
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const offscreen = new OffscreenCanvas(
			completedCrop.width * scaleX,
			completedCrop.height * scaleY
		);
		const ctx = offscreen.getContext("2d");
		if (!ctx) {
			throw new Error("No 2d context");
		}

		ctx.drawImage(
			previewCanvas,
			0,
			0,
			previewCanvas.width,
			previewCanvas.height,
			0,
			0,
			offscreen.width,
			offscreen.height
		);
		// You might want { type: "image/jpeg", quality: <0 to 1> } to
		// reduce image size
		const blob = await offscreen.convertToBlob();

		onSave({ name: file?.name || "", blob });
		onClose();

		if (blobUrlRef.current) {
			URL.revokeObjectURL(blobUrlRef.current);
		}
		blobUrlRef.current = URL.createObjectURL(blob);

		if (hiddenAnchorRef.current) {
			hiddenAnchorRef.current.href = blobUrlRef.current;
			hiddenAnchorRef.current.click();
		}
	}

	return (
				<Card className="">
					<CardHeader className="relative">
						<div className="text-lg font-[600] px-3 pt-1">
							Добавление изображения
						</div>
						<Button
							size="sm"
							variant="light"
							radius="full"
							onPress={onClose}
							isIconOnly
							className="absolute top-1 right-1 opacity-50"
						>
							<IoCloseSharp className="text-[18px] text-foreground-800" />
						</Button>
					</CardHeader>
					<CardBody className="flex flex-col gap-4 p-6 pt-1">
						{imgSrc ? (
							<div className="">
								<ReactCrop
									crop={crop}
									aspect={aspect}
									onChange={(c: any) => setCrop(c)}
									onComplete={(c) => setCompletedCrop(c)}
								>
									<img ref={imgRef} src={imgSrc} onLoad={onImageLoad} />
								</ReactCrop>
							</div>
						) : null}

						<div className="grid grid-cols-[1fr] gap-6 w-full">
							<div className="hidden w-[100px] h-[100px] rounded-full overflow-hidden">
								{completedCrop ? (
									<canvas
										ref={previewCanvasRef}
										style={{
											borderRadius: "100%",
											objectFit: "contain",
											// width: completedCrop?.width,
											// height: completedCrop?.height,
											width: "100px",
											height: "100px",
										}}
									/>
								) : (
									<div className="w-full h-full flex justify-center items-center text-white bg-foreground-200">
										Превью
									</div>
								)}
							</div>

							<div className="grid grid-cols-[3fr_2fr] w-full gap-3">
								<input
									ref={inputRef}
									className="hidden"
									type="file"
									onChange={onSelectFile}
								/>
								<Button
									color="primary"
									variant="ghost"
									endContent={<LuCamera className="text-lg" />}
									onClick={() => inputRef.current.click()}
									size="sm"
									// className="mt-[3px]"
								>
									{file ? "Другой файл" : "Выберите файл"}
								</Button>
								<Button
									color="primary"
									className="text-white"
									isDisabled={!completedCrop}
									onPress={onDownloadCropClick}
									size="sm"
								>
									Cохранить
								</Button>
								{/* <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a> */}
							</div>
						</div>
					</CardBody>
				</Card>

	);
};

export default ImageCroper;
