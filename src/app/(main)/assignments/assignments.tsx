'use client';

import {DataTable} from "@/components/dataTable";
import {Assignment} from "@/types/assignment";
import {columns} from "./columns";
import NewAssignment from "@/components/newAssignment";
import { useAssignmentsContext, useClassesContext, useSettingsContext } from "./context";
import EditAssignment from "@/components/editAssignment";
import {useState} from "react";
import {CornerRightUp, MoveLeft} from "lucide-react";
import SettingsMenu from "@/components/settingsMenu";

export default function Assignments() {
  const {assignments, refetchAssignments} = useAssignmentsContext();
  const {classes} = useClassesContext();
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>(assignments[0]);
  const {settings} = useSettingsContext();

  const openEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setEditMenuOpen(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="md:text-3xl text-xl">Assignments</h1>
        <div className="flex flex-row gap-2">
          <SettingsMenu />
          {classes.length > 0 && <NewAssignment classes={classes} refetchAssignments={refetchAssignments}/>}
        </div>
      </div>
      <div>
        {assignments.length > 0 ? (
          <DataTable
            data={assignments}
            columns={columns(refetchAssignments, classes, openEditAssignment, settings)}
          />
        ) : (
          classes.length > 0 ? (
            <div className="flex flex-row justify-end mr-16">
              <p>Create an assignment here to get started</p>
              <CornerRightUp className="relative bottom-2"/>
            </div>
          ) : (
            <div className="flex gap-1">
              <div>
                <div className="hidden md:contents">
                  <MoveLeft />
                  <p>Create a class here to get started</p>
                </div>
                <div className="flex flex-row justify-end mr-16 md:hidden">
                  <p>Open the class menu above and create a class to get started</p>
                  <CornerRightUp className="flex-shrink-0 relative bottom-2"/>
                </div>
              </div>
            </div>
          )
        )}

      </div>
      {selectedAssignment && <EditAssignment assignment={selectedAssignment} isOpen={editMenuOpen} setIsOpen={setEditMenuOpen}/>}
    </div>
  );
}