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
import {useSession} from "next-auth/react";
import {Class} from "@/types/class";
import {useClassesContext, useAssignmentsContext} from "@/app/(main)/assignments/context";
import {Assignment} from "@/types/assignment";

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
    </div>
  )
}