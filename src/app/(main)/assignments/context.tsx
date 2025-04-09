"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { Class } from "@/types/class";
import { Assignment } from "@/types/assignment";
import { useSession } from "next-auth/react";
import { getAssignments } from "@/lib/getAssignments";
import { getClasses } from "@/lib/getClasses";
import { Settings } from "@/types/settings";

const classContext = createContext({});
const assignmentContext = createContext({});
const settingsContext = createContext({});

const Context = ({ children, defaultAssignments, defaultClasses }: { children: React.ReactNode, defaultAssignments: Assignment[], defaultClasses: Class[] }) => {
  const [classes, setClasses] = useState<Class[]>(defaultClasses);
  const [assignments, setAssignments] = useState<Assignment[]>(defaultAssignments);
  const [settings, setSettings] = useState<Settings>({color: null, overdueHighlight: true});
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchClasses() {
      if (session?.user?.email) {
        const fetchedClasses = await getClasses();
        setClasses(fetchedClasses);
      }
    }

    void fetchClasses();
  }, [session]);

  useEffect(() => {
    async function fetchAssignments() {
      if (session?.user?.email) {
        const fetchedAssignments = await getAssignments();
        setAssignments(fetchedAssignments);
      }
    }

    void fetchAssignments();
  }, [session]);

  const refetchAssignments = async () => {
    if (session?.user?.email) {
      const fetchedAssignments = await getAssignments();
      setAssignments(fetchedAssignments);
    }
  };

  const refetchClasses = async () => {
    if (session?.user?.email) {
      const fetchedClasses = await getClasses();
      setClasses(fetchedClasses);
    }
  };

  return (
    <settingsContext.Provider value={{ settings, setSettings }}>
      <classContext.Provider value={{ classes, setClasses, refetchClasses }}>
        <assignmentContext.Provider
          value={{ assignments, setAssignments, refetchAssignments }}
        >
          {children}
        </assignmentContext.Provider>
      </classContext.Provider>
    </settingsContext.Provider>
  );
};

const useClassesContext = (): {
  classes: Class[];
  setClasses: (classes: Class[]) => void;
  refetchClasses: () => Promise<void>;
} => useContext(classContext) as {
    classes: Class[];
    setClasses: (classes: Class[]) => void;
    refetchClasses: () => Promise<void>;
  };

const useAssignmentsContext = (): {
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  refetchAssignments: () => Promise<void>;
} =>
  useContext(assignmentContext) as {
    assignments: Assignment[];
    setAssignments: (assignments: Assignment[]) => void;
    refetchAssignments: () => Promise<void>;
  };

  const useSettingsContext = (): {
  settings: Settings;
  setSettings: (settings: Settings) => void;
} => useContext(settingsContext) as {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export { Context, useClassesContext, useAssignmentsContext, useSettingsContext };