import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "붐힐랜드",
  description: "붐힐랜드의 다양한 게임을 즐겨보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-full flex flex-col font-gothic-a1">{children}</body>
    </html>
  );
}
