import Main from "./components/Main";
import { cookies } from "next/headers";
import Header from "./components/Header";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "No token";

  return (
    <main className="size-full border-0 border-blue-500 p-6 flex flex-col justify-center items-center gap-10">
      <Main token={token} />
    </main>
  );
}
