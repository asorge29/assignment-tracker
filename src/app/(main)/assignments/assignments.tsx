'use client';

import { getAssignments } from "@/lib/getAssignments";
import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { DataTable } from "@/components/dataTable";
import { Assignment } from "@/types/assignment";
import { columns } from "./columns";
import {Button} from "@/components/ui/button";
import NewAssignment from "@/components/newAssignment";

export default function Assignments() {
  const { data: session, status } = useSession();
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    async function fetchAssignments() {
      if (session?.user?.email) {
        const fetchedAssignments = await getAssignments(session.user.email);
        setAssignments(fetchedAssignments);
      }
    }
    const promise = fetchAssignments()
  }, [session]);

  const refetchAssignments = async () => {
    if (session?.user?.email) {
      const fetchedAssignments = await getAssignments(session.user.email);
      setAssignments(fetchedAssignments);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h2 className="text-3xl">Assignments</h2>
        <NewAssignment classes={['math', 'science', 'history']} />
      </div>
      <DataTable data={assignments} columns={columns(refetchAssignments)}/>
    </div>
  );
}