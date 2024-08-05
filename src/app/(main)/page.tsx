import Image from "next/image";
import LoginBtn from "@/components/loginBtn";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col min-h-screen">
      <LoginBtn />
    </main>
  );
}
