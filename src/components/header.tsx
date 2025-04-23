import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./modeToggle";
import Profile from "./profile";

export default async function Header({}) {

  return (
    <div className="w-full flex flex-row justify-between items-center p-4 border-b">
      <div className="flex flex-row gap-4 items-center">
        <Link href="/">
          <Image alt="logo" src="/icon.svg" width={40} height={40} />
        </Link>
        <Link href="/"><p className="md:text-4xl text-xl font-semibold md:block hidden">Assignment Tracker</p></Link>
      </div>
      <div className="flex gap-4 justify-center items-center overflow-visible w-auto">
        <Link href="/" className="text-2xl hover:underline hidden md:block">Home</Link>
        <Link href="/assignments" className="text-2xl hover:underline hidden md:block">Assignments</Link>
        <ModeToggle />
        <Profile />
      </div>
    </div>
  );
}
