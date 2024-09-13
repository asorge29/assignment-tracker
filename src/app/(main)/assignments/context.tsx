"use client";

import { createContext, useState, useContext } from "react";
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

const useClassesContext = () => useContext(classContext);
const useAssignmentsContext = () => useContext(assignmentContext);

export { Context, useClassesContext, useAssignmentsContext };
