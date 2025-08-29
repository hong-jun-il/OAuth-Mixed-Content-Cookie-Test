import type { Metadata } from "next";
import "@/styles/globals.css";
import RQProvider from "@/components/RQProvider";

export const metadata: Metadata = {
  title: "OAuth FE",
  description: "OAuth 테스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        <RQProvider>{children}</RQProvider>
      </body>
    </html>
  );
}
