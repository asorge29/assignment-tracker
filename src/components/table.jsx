'use client'

import { useSession } from "next-auth/react";
import { queryDb } from "@/lib/queryDb";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Assignment = {
  email: string
  title: string
  link: string
  due_date: string
  class: string
}

export default function Page() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const query = `SELECT * FROM assignments WHERE email = "${
      session?.user?.email || ""
    }"`;
    queryDb(query)
      .then((data) => setAssignments(data.results))
      .catch((error) => console.error(error));
  }, [session]);

  return (
    <div>
      <h1 className="border rounded-md inline text-slate-500">Assignments</h1>
      {session && <p>{`Welcome to the assignments page ${session?.user?.name?.split(' ')[0]}!`}</p>}
      <Table>
        <TableCaption>Your Assignments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Class</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment: Assignment) => (
            <TableRow key={assignment.title}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.link}</TableCell>
              <TableCell>{assignment.due_date}</TableCell>
              <TableCell>{assignment.class}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}