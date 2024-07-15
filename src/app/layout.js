import { Rubik, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const font = Noto_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "לימוד גמרא",
  description: "אפליקציה ללימוד גמרא",
  icons: {
    icon: "/logo-limudon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="he" className="w-dvw h-dvh border-0 border-red-600">
      <body className={`${font.className} size-full flex flex-col border-0 border-green-600 bg-s-50`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
