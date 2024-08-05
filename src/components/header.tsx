import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import Profile from "./profile";

export default async function Header({}) {

  return (
    <div className="w-full flex justify-between items-center p-4 border-b">
      <h1 className="text-4xl">Assignment Tracker</h1>
      <div className="flex gap-4 justify-center items-center">
        <Link href="/" className="text-2xl hover:underline">Home</Link>
        <Link href="/about" className="text-2xl hover:underline">About</Link>
        <Link href="/assignments" className="text-2xl hover:underline">Assignments</Link>
        <ModeToggle />
        <Profile />
      </div>
    </div>
  );
}
