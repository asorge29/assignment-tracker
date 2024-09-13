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
import {useEffect, useState} from "react";
import {queryDb} from "@/lib/queryDb";
import {useSession} from "next-auth/react";
import {Class} from "@/types/class";
import {useClassesContext, useAssignmentsContext} from "@/app/(main)/assignments/context";
import {Assignment} from "@/types/assignment";

export default function Classes() {
  const {data: session, status} = useSession();
  const {classes, setClasses}: { classes: Class[], setClasses: (classes: Class[]) => void } = useClassesContext()
  const {assignments, setAssignments}: { assignments: Assignment[], setAssignments: (assignments: Assignment[]) => void } = useAssignmentsContext()

  useEffect(() => {
    async function fetchClasses() {
      if (session?.user?.email) {
        const fetchedClasses = await queryDb(`select * from classes where email="${session.user.email}"`);
        setClasses(fetchedClasses.results);
        console.log(fetchedClasses);
      }
    }

    const promise = fetchClasses()
  }, [session]);

  useEffect(() => {
    async function fetchAssignments() {
      if (session?.user?.email) {
        const fetchedAssignments = await queryDb(`select * from assignments where email="${session.user.email}"`);
        setAssignments(fetchedAssignments.results);
        console.log(fetchedAssignments);
      }
    }

    const promise = fetchAssignments()
  }, [session]);

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