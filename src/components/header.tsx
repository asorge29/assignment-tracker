import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import Profile from "./profile";

export default async function Header({}) {

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center p-4 border-b">
      <h1 className="md:text-4xl text-xl font-semibold">Assignment Tracker</h1>
      <div className="flex gap-4 justify-center items-center overflow-scroll w-full md:w-auto">
        <Link href="/" className="md:text-2xl text-lg hover:underline">Home</Link>
        <Link href="/about" className="md:text-2xl text-lg hover:underline">About</Link>
        <Link href="/assignments" className="md:text-2xl text-lg hover:underline">Assignments</Link>
        <ModeToggle />
        <Profile />
      </div>
    </div>
  );
}
