import "@/styles/globals.css";
import "react-image-crop/dist/ReactCrop.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Image } from "@heroui/image";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-full bg-gray dark:bg-black">
            <Navbar />
            {/* <main className="container mx-auto max-w-full pt-16 px-6 flex-grow"> */}
            <main className="">{children}</main>
            <footer className="bg-gray dark:bg-black w-full">
              <div className="bg-dark rounded-t-[50px] px-12 py-[28px] grid grid-cols-3 text-white items-center">
                <p>
                  {new Date().getFullYear()} © BLOW. Сайт для лиц старше 18-ти
                  лет.
                </p>
                <div className="flex justify-center">
                  <Image
                    alt="BLOW"
                    height={40}
                    radius="none"
                    src="/logo.png"
                    width={101}
                  />
                </div>
                <div className="flex items-center justify-end gap-6">
                  <div className="underline cursor-pointer hover:text-primary text-nowrap">
                    Свяжись с нами
                  </div>
                  <div className="underline cursor-pointer hover:text-primary text-nowrap">
                    Правила
                  </div>
                  <div className="underline cursor-pointer hover:text-primary text-nowrap">
                    Договор оферта
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
