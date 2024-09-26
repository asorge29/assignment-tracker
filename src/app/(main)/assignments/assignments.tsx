'use client';

import {getAssignments} from "@/lib/getAssignments";
import {useSession} from "next-auth/react";
import {useEffect, useState, Suspense} from "react";
import {DataTable} from "@/components/dataTable";
import {Assignment} from "@/types/assignment";
import {columns} from "./columns";
import {Button} from "@/components/ui/button";
import NewAssignment from "@/components/newAssignment";
import {Class} from "@/types/class";
import {queryDb} from "@/lib/queryDb";
import { Context, useAssignmentsContext, useClassesContext } from "./context"

export default function Assignments() {
  const {data: session, status} = useSession();
  const {assignments, setAssignments, refetchAssignments} = useAssignmentsContext();
  const {classes, setClasses, refetchClasses} = useClassesContext();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h2 className="text-3xl">Assignments</h2>
        <NewAssignment classes={classes} session={session} refetchAssignments={refetchAssignments}/>
      </div>
      <div>
        <DataTable data={assignments} columns={columns(refetchAssignments, classes)}/>
      </div>
    </div>
  );
}