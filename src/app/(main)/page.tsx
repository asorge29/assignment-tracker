import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { auth } from "@/auth";
import React from "react";
import Image from "next/image"

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex items-center flex-col">
      <div className="bg-[url(/paper.jpg)] bg-cover h-svh w-full flex flex-col items-center font-['ZukaDoodle']">
        <span className="text-9xl mt-20">The Assignment Tracker</span>
        <span className="text-7xl mt-2">Leave your school stress behind</span>
        <div className="text-3xl w-1/4 text-center">
          A simple web app to help high school and college students keep track of their assignments.
          Sort by classes.
          Visualize due dates with calendar view.
          Stay organized, stay on track.
          Succeed.
        </div>
        <div className="flex flex-row gap-8 mt-10">
          <button className="text-5xl z-20 bg-blue-300 rounded-full p-4 cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all">Sign Up</button>
          <button className="text-5xl z-20 bg-blue-300 rounded-full p-4 cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all">Log In</button>
        </div>
        <div className="absolute h-[60%] aspect-[60/53] -left-12 top-[25%]">
          <Image src="/apple.jpg" alt="" fill />
        </div>
        <div className="absolute h-[60%] aspect-[60/53] -right-20 top-[30%]">
          <Image src="/pencil.jpg" alt="" fill />
        </div>
      </div>
    </main>
  );
}
