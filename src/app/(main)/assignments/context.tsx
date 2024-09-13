"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { Class } from "@/types/class";
import { Assignment } from "@/types/assignment";
import { queryDb } from "@/lib/queryDb";
import { useSession } from "next-auth/react";

const classContext = createContext({});
const assignmentContext = createContext({});

const Context = ({ children }: { children: React.ReactNode }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const {data: session, status} = useSession();

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

  return (
    <classContext.Provider value={{ classes, setClasses }}>
      <assignmentContext.Provider value={{ assignments, setAssignments }}>
        {children}
      </assignmentContext.Provider>
    </classContext.Provider>
  );
};

// @ts-ignore
const useClassesContext = (): {classes: Class[], setClasses: (classes: Class[]) => void} => useContext(classContext);
// @ts-ignore
const useAssignmentsContext = (): {assignments: Assignment[], setAssignments: (assignments: Assignment[]) => void} => useContext(assignmentContext);

export { Context, useClassesContext, useAssignmentsContext };
