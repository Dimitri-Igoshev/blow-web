"use client";

import { FC, useEffect, useState } from "react";
import { Image } from "@heroui/image";
import { AiOutlineStar } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { IPhoto } from "@/common/interface/photo.interface";
import { useDisclosure } from "@heroui/react";
import { config } from "@/common/env";
import LabelRound from "./LabelRound";
import ImageCroper from "./ImageCroper";
import BaseModal from "./BaseModal";
import { TiStarFullOutline } from "react-icons/ti";
import { IoTrash } from "react-icons/io5";
import { BsFillCameraFill } from "react-icons/bs";

interface UploadImagesProps {
  data?: any[];
  isEdit?: boolean;
  onAdd: (images: IPhoto) => void;
  onChange: (images: IPhoto[]) => void;
  onRemove: (images: IPhoto) => void;
  onSetMain: (images: IPhoto[]) => void;
}

const UploadImages: FC<UploadImagesProps> = ({
  data = [],
  isEdit = true,
  onAdd,
  onChange,
  onRemove,
  onSetMain,
}) => {
  const [images, setImages] = useState(data);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addImage = (file: File) => {
    if (
      !file ||
      !file?.type.toString().includes("image") ||
      file.size > 10000000
    ) {
      return;
    }

    if (isEdit) onAdd({ file, url: URL.createObjectURL(file), main: false });

    onChange([
      ...images,
      { file, url: URL.createObjectURL(file), main: false },
    ]);

    if (!isEdit) {
      setImages([
        ...images,
        { file, url: URL.createObjectURL(file), main: false },
      ]);
    } else {
      // @ts-ignore
      setImages([...data] || []);
    }
  };

  const setMainImage = (url: string) => {
    const imgs: IPhoto[] = [];
    const currentImage = images.find((i: IPhoto) => i.url === url);

    images.forEach((i: IPhoto) => {
      imgs.push({ ...i, main: i.url === url });
    });

    const filteredImages: IPhoto[] = imgs.filter((i: IPhoto) => !i.main);
    if (currentImage) filteredImages.unshift(currentImage);

    if (isEdit) onSetMain(filteredImages);

    onChange(filteredImages);

    if (!isEdit) {
      setImages(filteredImages);
    } else {
      // @ts-ignore
      setImages([...data] || []);
    }
  };

  const removeImage = (idx: number) => {
    const imgs = [...images];
    imgs.splice(idx, 1);
    setImages(imgs);

    onChange(imgs);

    onRemove(images[idx]);
  };

  useEffect(() => {
    // @ts-ignore
    setImages([...data] || []);
  }, [data]);

  return (
    <div className="grid grid-cols-5 gap-5 w-full">
      {images.map(({ file, url, main }: IPhoto, idx: number) => (
        <div
          key={url}
          className="col-span-1 rounded-[27px] overflow-hidden relative group"
        >
          <Image
            alt=""
            className="z-0 relative"
            height={"100%"}
            radius="none"
            src={`${config.MEDIA_URL}/${url}` || ""}
            width={"100%"}
          />

          {idx > 0 && (
            <div
              className="hidden group-hover:flex absolute top-2.5 left-2.5 w-[40px] h-[40px] rounded-full bg-white/50 dark:bg-dark/50 cursor-pointer items-center justify-center hover:bg-primary hover:text-white hover:dark:bg-primary hover:dark:text-white transition-all"
              onClick={() => setMainImage(url)}
            >
              <TiStarFullOutline size={24} />
            </div>
          )}

          <div
            className="hidden group-hover:flex absolute top-2.5 right-2.5 w-[40px] h-[40px] rounded-full bg-white/50 dark:bg-dark/50 cursor-pointer items-center justify-center hover:bg-primary hover:text-white hover:dark:bg-primary hover:dark:text-white transition-all"
            onClick={() => removeImage(idx)}
          >
            <IoTrash size={20} />
          </div>
        </div>
      ))}

      <button
        className="col-span-1 bg-white min-h-[300px] dark:bg-foreground-100 rounded-[27px] flex justify-center items-center group z-0 relative"
        onClick={onOpen}
      >
        <div className="flex flex-col items-center gap-3 group-hover:text-primary transition-all">
          <BsFillCameraFill size={36} />
          <p className="font-semibold">Добавить фото</p>
        </div>
      </button>

      <BaseModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ImageCroper
          aspectRatios={4 / 6}
          onSave={(e: any) => addImage(e.blob)}
          onClose={onOpenChange}
        />
      </BaseModal>
    </div>
  );
};

export default UploadImages;
