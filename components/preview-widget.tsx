import { cn } from "@heroui/theme";
import { FC } from "react";
import { Image } from "@heroui/image";

interface PreviewWidgetProps {
  item: any;
  className?: string;
}

export const PreviewWidget: FC<PreviewWidgetProps> = ({ item, className }) => {
  return (
    <div
      className={cn(
        "w-full h-full border-[5px] rounded-[32px] border-white dark:border-white/25 overflow-hidden relative cursor-pointer text-white hover:scale-110 transition-all",
        className,
      )}
    >
      <Image
        alt="BLOW"
        height={"100%"}
        src={`/photos/${item.photo}`}
        width={"100%"}
      />

      <div className="p-[7px] bg-transparent w-full absolute left-0 bottom-0 z-10">
        <div className=" bg-dark/50 p-3 px-4 rounded-[24px] flex flex-col">
          <div className="flex items-center gap-1.5">
            {item?.online ? (
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            ) : null}
            <p className="font-semibold">{item.name}</p>
          </div>

          <p className="opacity-50">
            {item.age}, {item.city}
          </p>
        </div>
      </div>
    </div>
  );
};
