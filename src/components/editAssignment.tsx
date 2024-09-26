'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import {Button} from "@/components/ui/button";
import {Class} from "@/types/class";
import React from "react";
import { updateAssignment } from "@/lib/updateAssignment";
import {Assignment} from "@/types/assignment";
import {useClassesContext} from "@/app/(main)/assignments/context";
import { useAssignmentsContext } from "@/app/(main)/assignments/context";

export default function EditAssignment(assignment: Assignment) {

  const {classes, setClasses, refetchClasses} = useClassesContext()
  const { assignments, setAssignments, refetchAssignments} = useAssignmentsContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const link = formData.get("link") as string;
    const dueDate = formData.get("dueDate") as string;
    const className = Number(formData.get("class"));
    const email = formData.get("email") as string;

    console.log(title, link, dueDate, className, email);

    await updateAssignment({ id, title, link, dueDate, classId: className, email })
    
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
          <input type="hidden" name="id" id="id" value={assignment.id} />
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="title" className='text-lg'>Title:</label>
            <input type="text" id="title" name="title" required className='rounded text-lg border p-0.5' value={assignment.title} />
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="link" className='text-lg'>Link:</label>
            <input type="url" id="link" name="link" className='rounded text-lg border p-0.5' value={assignment.link} />
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="dueDate" className='text-lg'>Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" required className='rounded text-lg border p-0.5' value={assignment.due_date} />
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="class" className='text-lg'>Class:</label>
            <select id="class" name="class" className='rounded text-lg border p-0.5' value={assignment.class} >
              {classes.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <input type="hidden" name="email" id="email" value={assignment.email} />
          <DialogClose asChild>
            <Button type="submit" className='hover:bg-green-700'>Update Assignment</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}