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
    <html dir="rtl" lang="en" className="w-svw h-dvh border-0 border-red-600">
      <body className={`${font.className} size-full border-0 border-green-600`}>{children}</body>
    </html>
  );
}
