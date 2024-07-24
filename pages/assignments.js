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
    const query = `INSERT INTO classes (email, name) VALUES ("${
      session?.user?.email
    }", "${class_name}")`
    queryDb(query)
    .then(() => {
      const query = `SELECT * FROM classes WHERE email = "${
        session?.user?.email || ""
      }"`;
      queryDb(query)
        .then((data) => setClasses(data.results))
        .catch((error) => console.error(error));
    });
    e.target.reset();
  }

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
        : [...prev, className]
    );
  };

  const filteredAssignments = sortedAssignments.filter(
    (assignment) =>
      selectedClasses.length === 0 || selectedClasses.includes(assignment.class)
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

  return (
    <>
      <Head>
        <title>
          {session && session.user.name.split(" ")[0]}'s Assignments
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
                  <input type="text" placeholder="Class Name" name="className" className={styles.classInput} />
                  <button type="submit" className={styles.addButton}>Add</button>
              </form>
            </div>
          </div>
          <div className={styles.assignments}>
            <div className={styles.toolbar}>
              <h1>Assignments</h1>
              {!showNewMenu && (
                <button onClick={() => setShowNewMenu(true)}>New</button>
              )}
            </div>
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
                  <th
                    onClick={() => requestSort("priority")}
                    className={getClassNamesFor("priority")}
                  >
                    <div>
                      <h4>Priority</h4>
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
                    onClick={() => requestSort("link")}
                    className={getClassNamesFor("link")}
                  >
                    <div>
                      <h4>Link</h4>
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
                    onClick={() => requestSort("time_estimate")}
                    className={getClassNamesFor("time_estimate")}
                  >
                    <div>
                      <h4>Time Estimate</h4>
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
                  <th
                    onClick={() => requestSort("done")}
                    className={getClassNamesFor("done")}
                  >
                    <div>
                      <h4>Done</h4>
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
                    onClick={() => requestSort("overdue")}
                    className={getClassNamesFor("overdue")}
                  >
                    <div>
                      <h4>Overdue</h4>
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
                    <td>{assignment.priority}</td>
                    <td>
                      <a href={assignment.link} target="_blank">
                        {assignment.link}
                      </a>
                    </td>
                    <td>{assignment.due_date}</td>
                    <td>{assignment.time_estimate}</td>
                    <td>{assignment.class}</td>
                    <td>{assignment.done}</td>
                    <td>{assignment.overdue}</td>
                    <td>
                      <button onClick={() => deleteAssignment(assignment.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
