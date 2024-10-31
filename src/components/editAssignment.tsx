'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import {Button} from "@/components/ui/button";
import React from "react";
import { updateAssignment } from "@/lib/updateAssignment";
import {Assignment} from "@/types/assignment";
import {useClassesContext} from "@/app/(main)/assignments/context";
import { useAssignmentsContext } from "@/app/(main)/assignments/context";

export default function EditAssignment({ assignment, isOpen, setIsOpen }: { assignment: Assignment, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const {classes, setClasses, refetchClasses} = useClassesContext()
  const { assignments, setAssignments, refetchAssignments} = useAssignmentsContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const link = formData.get("link") as string;
    const dueDate = formData.get("dueDate") as string;
    const classId = Number(formData.get("class"));
    const email = formData.get("email") as string;

    await updateAssignment({ id, title, link, dueDate, classId, email })
    
    await refetchAssignments();
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="hidden" name="id" id="id" value={assignment.id} />
            <div className='flex flex-row gap-4 justify-center items-center'>
              <label htmlFor="title" className='text-lg'>Title:</label>
              <input type="text" id="title" name="title" required className='rounded text-lg border p-0.5' defaultValue={assignment.title} />
            </div>
            <div className='flex flex-row gap-4 justify-center items-center'>
              <label htmlFor="link" className='text-lg'>Link:</label>
              <input type="url" id="link" name="link" className='rounded text-lg border p-0.5' defaultValue={assignment.link} />
            </div>
            <div className='flex flex-row gap-4 justify-center items-center'>
              <label htmlFor="dueDate" className='text-lg'>Due Date:</label>
              <input type="date" id="dueDate" name="dueDate" required className='rounded text-lg border p-0.5' defaultValue={assignment.due_date} />
            </div>
            <div className='flex flex-row gap-4 justify-center items-center'>
              <label htmlFor="class" className='text-lg'>Class:</label>
              <select id="class" name="class" className='rounded text-lg border p-0.5' defaultValue={assignment.class} >
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
    </>
  );
}