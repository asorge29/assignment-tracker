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

export default function Classes() {
  const {data: session, status} = useSession();
  const [classes, setClasses] = useState<Class[]>([]);

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
          {classes.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className='text-right'>{item.assignments_count}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}