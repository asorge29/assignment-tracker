import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="md:text-6xl text-3xl text-center font-semibold">Hi!</h1>
        <h1 className="md:text-6xl text-3xl text-center font-semibold">Welcome to the Assignment Tracker.</h1>
        <h1 className="md:text-6xl text-3xl text-center font-semibold">For people with sh*t to do.</h1>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 p-4">
        <Link href='/login' className='underline text-xl'>Log In/Sign Up</Link>
        <Link href='/assignments' className='underline text-xl'> Just take me to my assignments</Link>
        <Link href='/about' className='underline text-xl'>I&apos;d like to know more</Link>
      </div>
    </main>
  );
}
