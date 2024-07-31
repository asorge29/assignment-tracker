import { useState, useEffect } from "react";
import styles from "@/styles/assignments.module.css";
import { queryDb } from "@/lib/queryDb";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "@/components/header";
import NewAssignmentMenu from "@/components/newAssignmentMenu";
import ClassTable from "@/components/classTable";
import AssignmentsTable from "@/components/assignmentsTable";

export default function Assignments({}) {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [settings, setSettings] = useState({});
  const [loadedSettings, setLoadedSettings] = useState(false);

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

  const sortedAssignments = [...assignments].sort((a, b) => {
    const aValue =
      typeof a[sortConfig.key] === "string"
        ? a[sortConfig.key].toLowerCase()
        : a[sortConfig.key];
    const bValue =
      typeof b[sortConfig.key] === "string"
        ? b[sortConfig.key].toLowerCase()
        : b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleCheckboxChange = (className) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((name) => name !== className)
        : [...prev, className],
    );
  };

  const filteredAssignments = sortedAssignments.filter(
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
                requestSort={requestSort}
                sortConfig={sortConfig}
                session={session}
                setAssignments={setAssignments}
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
        </div>
      </main>
    </>
  );
}
