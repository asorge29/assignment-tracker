'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {Button} from "@/components/ui/button";
import {Class} from "@/types/class";
import React from "react";

export default function NewAssignment({ classes, session, refetchAssignments}: { classes: Class[], session: any, refetchAssignments: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const link = formData.get("link") as string;
    const dueDate = formData.get("dueDate") as string;
    const className = formData.get("class") as string;
    const email = session.user?.email;
    const data = {
      title,
      link,
      dueDate,
      className,
      email,
    };
    console.log(data);
    refetchAssignments();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Assignment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
        </DialogHeader>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="title" className='text-lg'>Title:</label>
            <input type="text" id="title" name="title" required className='rounded text-lg border p-0.5'/>
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="link" className='text-lg'>Link:</label>
            <input type="url" id="link" name="link" className='rounded text-lg border p-0.5'/>
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="dueDate" className='text-lg'>Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" required className='rounded text-lg border p-0.5'/>
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="class" className='text-lg'>Class:</label>
            <select id="class" name="class" className='rounded text-lg border p-0.5'>
              {classes.map((item, index) => (
                <option key={index} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <Button type="submit" className='hover:bg-green-700'>Add Assignment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}