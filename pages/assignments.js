import { useState, useEffect } from "react";
import styles from "@/styles/assignments.module.css";
import { queryDb } from "@/lib/queryDb";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "@/components/header";
import NewAssignmentMenu from "@/components/newAssignmentMenu";

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

  function deleteAssignment(id) {
    const query = `DELETE FROM assignments WHERE id = ${id}`;
    queryDb(query)
      .then(() => {
        const query = `SELECT * FROM assignments WHERE email = "${
          session?.user?.email || ""
        }"`;
        queryDb(query)
          .then((data) => setAssignments(data.results))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

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

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name
      ? sortConfig.direction === "ascending"
        ? styles.sortedAsc
        : styles.sortedDesc
      : "";
  };

  const overDueCheck = (date) => {
    const today = new Date();
    const dueDate = new Date(`${date}T23:59:59`);
    return today > dueDate ? styles.overdue : "";
  };

  return (
    <>
      <Head>
        <title>
          {session && session.user.name.split(" ")[0] + "'s "}Assignments
        </title>
      </Head>
      <main>
        <Header session={session} active="assignments" />
        <div className={styles.container}>
          <div className={styles.classes}>
            <h2>Classes</h2>
            <table className={styles.classesTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Filter</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(item.name)}
                        checked={selectedClasses.includes(item.name)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h3>Add a new class:</h3>
              <form className={styles.classForm} onSubmit={(e) => addClass(e)}>
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
          </div>
          <div className={styles.assignments}>
            <div className={styles.toolbar}>
              <h1>Assignments</h1>
              {!showNewMenu && (
                <button
                  onClick={() => setShowNewMenu(true)}
                  className={styles.button}
                >
                  New
                </button>
              )}
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.headerRow}>
                    <th
                      onClick={() => requestSort("title")}
                      className={getClassNamesFor("title")}
                    >
                      <div>
                        <h4>Title</h4>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.ascArrow}
                        >
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.dscArrow}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </th>
                    <th>
                      <h4>Link</h4>
                    </th>
                    <th
                      onClick={() => requestSort("due_date")}
                      className={getClassNamesFor("due_date")}
                    >
                      <div>
                        <h4>Due Date</h4>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.ascArrow}
                        >
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.dscArrow}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </th>

                    <th
                      onClick={() => requestSort("class")}
                      className={getClassNamesFor("class")}
                    >
                      <div>
                        <h4>Class</h4>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.ascArrow}
                        >
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.dscArrow}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td>{assignment.title}</td>
                      <td className={styles.linkCell}>
                        <a href={assignment.link} target="_blank">
                          {assignment.link}
                        </a>
                      </td>
                      <td className={overDueCheck(assignment.due_date)}>
                        {assignment.due_date}
                      </td>
                      <td>{assignment.class}</td>
                      <td>
                        <div className={styles.tableButtons}>
                          <button
                            onClick={() => deleteAssignment(assignment.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>{" "}
                          </button>
                          <button onClick={() => editAssignment(assignment.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
