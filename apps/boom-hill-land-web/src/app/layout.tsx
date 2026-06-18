import type { Metadata } from "next";
import "./globals.css";
import { version } from "../../package.json";
import { BASE_PATH } from "../consts/urls/base-path";

export const metadata: Metadata = {
  title: "붐힐랜드",
  description: "붐힐랜드의 다양한 게임을 즐겨보세요!",
  manifest: `${BASE_PATH}/manifest.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-full flex flex-col font-gothic-a1" data-version={version}>
        {children}
      </body>
    </html>
  );
}
