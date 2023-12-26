import Image from "next/image";
import Link from "next/link";
import Header from "./component/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background-9">
      <div className="fixed top-0 lg:top-5 left-1/2 -translate-x-1/2 w-full lg:min-w-[992px] max-w-[992px] z-10">
        <Header />
      </div>
    </main>
  );
}
