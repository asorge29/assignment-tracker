import { useState, useEffect } from "react";
import styles from "@/styles/assignments.module.css";
import { queryDb } from "@/lib/queryDb";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "@/components/header";
import NewAssignmentMenu from "@/components/newAssignmentMenu";
import ClassTable from "@/components/classTable";
import AssignmentsTable from "@/components/assignmentsTable";
import EditMenu from "@/components/editMenu";

export default function Assignments({}) {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [settings, setSettings] = useState({});
  const [loadedSettings, setLoadedSettings] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(0);

  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      setSettings(parsedSettings);
    }
    setLoadedSettings(true);
  }, []);

  useEffect(() => {
    loadedSettings &&
      localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const query = `SELECT * FROM assignments WHERE email = "${
      session?.user?.email || ""
    }"`;
    queryDb(query)
      .then((data) => setAssignments(data.results))
      .catch((error) => console.error(error));
  }, [session]);

  useEffect(() => {
    const query = `SELECT * FROM classes WHERE email = "${
      session?.user?.email || ""
    }"`;
    queryDb(query)
      .then((data) => setClasses(data.results))
      .catch((error) => console.error(error));
  }, [session]);

  const addClass = (e) => {
    e.preventDefault();
    const class_name = e.target.className.value;
    const query = `INSERT INTO classes (email, name) VALUES ("${session?.user?.email}", "${class_name}")`;
    queryDb(query).then(() => {
      const query = `SELECT * FROM classes WHERE email = "${
        session?.user?.email || ""
      }"`;
      queryDb(query)
        .then((data) => setClasses(data.results))
        .catch((error) => console.error(error));
    });
    e.target.reset();
  };

  const handleCheckboxChange = (className) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((name) => name !== className)
        : [...prev, className],
    );
  };

  const filteredAssignments = assignments.filter(
    (assignment) =>
      selectedClasses.length === 0 ||
      selectedClasses.includes(assignment.class),
  );

  return (
    <>
      <Head>
        <title>
          {session && session.user.name.split(" ")[0] + "'s "}Assignments
        </title>
      </Head>
      <main>
        <Header
          session={session}
          active="assignments"
          settings={settings}
          setSettings={setSettings}
        />
        <div className={styles.container}>
          <div className={styles.classes}>
            <h2>Classes</h2>
            <ClassTable
              session={session}
              classes={classes}
              selectedClasses={selectedClasses}
              handleCheckboxChange={handleCheckboxChange}
            />
            {session && (
              <div>
                <h3>Add a new class:</h3>
                <form
                  className={styles.classForm}
                  onSubmit={(e) => addClass(e)}
                >
                  <input
                    type="text"
                    placeholder="Class Name"
                    name="className"
                    className={styles.classInput}
                  />
                  <button type="submit" className={styles.button}>
                    Add
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className={styles.assignments}>
            <div className={styles.toolbar}>
              <h1>Assignments</h1>
              {!showNewMenu && session && (
                <button
                  onClick={() => setShowNewMenu(true)}
                  className={styles.button}
                >
                  New
                </button>
              )}
            </div>
            <div className={styles.tableContainer}>
              <AssignmentsTable
                filteredAssignments={filteredAssignments}
                settings={settings}
                session={session}
                setAssignments={setAssignments}
                updateEditMenu={() => setShowEditMenu(true)}
                assignmentSelector={setSelectedAssignment}
              />
            </div>
          </div>
          {showNewMenu && (
            <NewAssignmentMenu
              session={session}
              classes={classes}
              closeMethod={() => setShowNewMenu(false)}
              updateMethod={setAssignments}
            />
          )}
          {showEditMenu && (
            <EditMenu
              session={session}
              classes={classes}
              closeMethod={() => setShowEditMenu(false)}
              updateMethod={setAssignments}
              assignment={selectedAssignment}
            />
          )}
        </div>
      </main>
    </>
  );
}
