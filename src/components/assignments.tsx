'use client';

import { getAssignments } from "@/lib/getAssignments";
import { useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import AssignmentsTable from "./assignmentsTable";
import { Assignment } from "@/types/assignment";

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
    fetchAssignments();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AssignmentsTable assignments={assignments} />
      
    </div>
  );
}