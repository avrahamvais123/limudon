import Header from "./components/Header";
import Main from "./components/Main";

export default function Home() {
  return (
    <div className="size-full flex flex-col items-center">
      <Header />
      <Main />
    </div>
  );
}
