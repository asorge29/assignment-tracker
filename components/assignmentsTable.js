import styles from "@/styles/assignmentsTable.module.css";
import { queryDb } from "@/lib/queryDb";
import Link from "next/link";
import { useState } from "react";

export default function AssignmentsTable({
  filteredAssignments,
  settings,
  session,
  setAssignments,
  updateEditMenu,
  assignmentSelector,
}) {

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const overDueCheck = (date) => {
    const today = new Date();
    const dueDate = new Date(`${date}T23:59:59`);
    return today > dueDate;
  };

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

  if (!session) {
    return (
      <h3>
        You must be signed in to view your assignments, sign in{" "}
        <Link href="/login">here.</Link>
      </h3>
    );
  }

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
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

  if (sortedAssignments.length === 0) {
    return <h3>Create some assignments to get started!</h3>;
  }

  return (
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
          <th style={{ cursor: "default" }}>
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
        {sortedAssignments.map((assignment) => (
          <tr key={assignment.id}>
            <td>{assignment.title}</td>
            <td className={styles.linkCell}>
              <a href={assignment.link} target="_blank">
                {assignment.link}
              </a>
            </td>
            <td
              style={
                overDueCheck(assignment.due_date) && settings.highlight
                  ? { backgroundColor: settings.highlightColor }
                  : {}
              }
            >
              {assignment.due_date}
            </td>
            <td>{assignment.class}</td>
            <td className={styles.buttonCell}>
              <svg
                onClick={() => deleteAssignment(assignment.id)}
                className={styles.tableButton}
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
              <svg
                onClick={() => {
                  updateEditMenu();
                  assignmentSelector(assignment);
                }}
                className={styles.tableButton}
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
