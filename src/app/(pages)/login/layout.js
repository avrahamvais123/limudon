import { Rubik, Noto_Sans_Hebrew } from "next/font/google";
import "../../globals.css";

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

export default function NoHeaderLayout({ children }) {
  return <div className="size-full">{children}</div>;
}
