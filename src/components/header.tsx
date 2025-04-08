import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import Profile from "./profile";
import SettingsMenu from "./settingsMenu";

export default async function Header({}) {

  return (
    <div className="w-full flex flex-row justify-between items-center p-4 border-b">
      <Link href="/"><h1 className="md:text-4xl text-xl font-semibold">Assignment Tracker</h1></Link>
      <div className="flex gap-4 justify-center items-center overflow-visible w-auto">
        <Link href="/" className="text-2xl hover:underline hidden md:block">Home</Link>
        <Link href="/assignments" className="text-2xl hover:underline hidden md:block">Assignments</Link>
        <ModeToggle />
        <SettingsMenu />
        <Profile />
      </div>
    </div>
  );
}
