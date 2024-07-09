import { Rubik, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";

const font = Noto_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "לימוד גמרא",
  description: "אפליקציה ללימוד גמרא",
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="en" className="w-screen h-dvh">
      <body className={`${font.className} size-full`}>{children}</body>
    </html>
  );
}
