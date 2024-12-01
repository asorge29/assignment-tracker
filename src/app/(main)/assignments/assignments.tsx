'use client';

import {useSession} from "next-auth/react";
import {DataTable} from "@/components/dataTable";
import {Assignment} from "@/types/assignment";
import {columns} from "./columns";
import NewAssignment from "@/components/newAssignment";
import { useAssignmentsContext, useClassesContext } from "./context";
import EditAssignment from "@/components/editAssignment";
import {useState} from "react";

export default function Assignments() {
  const {data: session, status} = useSession();
  const {assignments, setAssignments, refetchAssignments} = useAssignmentsContext();
  const {classes, setClasses, refetchClasses} = useClassesContext();
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>(assignments[0]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const openEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setEditMenuOpen(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h2 className="md:text-3xl text-xl">Assignments</h2>
        <NewAssignment classes={classes} session={session} refetchAssignments={refetchAssignments}/>
      </div>
      <div>
        <DataTable data={assignments} columns={columns(refetchAssignments, classes, openEditAssignment)}/>
      </div>
      {selectedAssignment && <EditAssignment assignment={selectedAssignment} isOpen={editMenuOpen} setIsOpen={setEditMenuOpen}/>}
    </div>
  );
}