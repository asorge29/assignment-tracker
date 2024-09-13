"use client";

import React, { createContext, useState, useContext } from "react";
import { Class } from "@/types/class";
import { Assignment } from "@/types/assignment";

const classContext = createContext({});
const assignmentContext = createContext({});

const Context = ({ children }: { children: React.ReactNode }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

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
