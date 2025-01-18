'use client';

import {useSession} from "next-auth/react";
import {DataTable} from "@/components/dataTable";
import {Assignment} from "@/types/assignment";
import {columns} from "./columns";
import NewAssignment from "@/components/newAssignment";
import { useAssignmentsContext, useClassesContext } from "./context";
import EditAssignment from "@/components/editAssignment";
import {useState} from "react";
import {CornerRightUp, MoveLeft} from "lucide-react";

export default function Assignments() {
  const {data: session, status} = useSession();
  const {assignments, setAssignments, refetchAssignments} = useAssignmentsContext();
  const {classes, setClasses, refetchClasses} = useClassesContext();
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>(assignments[0]);

  const openEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setEditMenuOpen(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h2 className="md:text-3xl text-xl">Assignments</h2>
        {classes.length > 0 && <NewAssignment classes={classes} session={session} refetchAssignments={refetchAssignments}/>}
      </div>
      <div>
        {assignments.length > 0 ? (
          <DataTable
            data={assignments}
            columns={columns(refetchAssignments, classes, openEditAssignment)}
          />
        ) : (
          classes.length > 0 ? (
            <div className="flex flex-row justify-end mr-16">
              <p>Create an assignment here to get started</p>
              <CornerRightUp className="relative bottom-2"/>
            </div>
          ) : (
            <div className="flex gap-1">
              <MoveLeft />
              <p>Create a class here to get started</p>
            </div>
          )
        )}

      </div>
      {selectedAssignment && <EditAssignment assignment={selectedAssignment} isOpen={editMenuOpen} setIsOpen={setEditMenuOpen}/>}
    </div>
  );
}