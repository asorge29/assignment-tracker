'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {useSession} from "next-auth/react";
import {Class} from "@/types/class";
import {useClassesContext, useAssignmentsContext} from "@/app/(main)/assignments/context";
import {Assignment} from "@/types/assignment";
import { Button } from "@/components/ui/button";

export default function Classes() {
  const {data: session, status} = useSession();
  const {classes, setClasses, refetchClasses} = useClassesContext()
  const {assignments, setAssignments, refetchAssignments} = useAssignmentsContext()

  const countAssignments = (classId: number): string => {
    return assignments.filter((assignment: Assignment) => assignment.class === classId).length.toString()
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead className='text-right'>Assignments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((item: Class) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className='text-right'>{countAssignments(item.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Dialog>
          <DialogTrigger>
            Create
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new class</DialogTitle>
            </DialogHeader>
            <form>
              <label htmlFor="name">Class Name</label>
              <input type="text" id="name" name="name" />
              <DialogClose asChild>
                <Button type="submit" className='hover:bg-green-700'>Add Assignment</Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="bg-slate-500 hover:bg-slate-600">
            Delete
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  )
}