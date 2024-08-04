'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Assignment } from "@/types/assignment"

export default function AssignmentsTable({ assignments }: { assignments: Assignment[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Class</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={assignment.title}>
            <TableCell>{assignment.title}</TableCell>
            <TableCell>
              <a href={assignment.link} target="_blank" rel="noopener noreferrer">
                {assignment.link}
              </a>
            </TableCell>
            <TableCell>{assignment.due_date}</TableCell>
            <TableCell>{assignment.class}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
