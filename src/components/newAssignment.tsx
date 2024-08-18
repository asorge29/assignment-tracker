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


export default function NewAssignment({ classes }: { classes: string[] }) {  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Assignment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
        </DialogHeader>
        <form className='flex flex-col gap-4'>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="title" className='text-lg'>Title:</label>
            <input type="text" id="title" name="title" required className='rounded text-lg'/>
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="link" className='text-lg'>Link:</label>
            <input type="url" id="link" name="link" className='rounded text-lg'/>
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="dueDate" className='text-lg'>Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" required className='rounded text-lg'/>
          </div>
          <div className='flex flex-row gap-4 justify-center items-center'>
            <label htmlFor="class" className='text-lg'>Class:</label>
            <select id="class" name="class" className='rounded text-lg'>
              {classes.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <Button type="submit" variant='ghost'>Add Assignment</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}