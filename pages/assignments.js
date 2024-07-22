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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    const query = `SELECT * FROM assignments WHERE email = "${session?.user?.email || ""}"`;
    queryDb(query)
      .then((data) => setAssignments(data.results))
      .catch((error) => console.error(error));
  }, [session]);

  useEffect(() => {
    const query = `SELECT * FROM classes WHERE email = "${session?.user?.email || ""}"`;
    queryDb(query)
      .then((data) => setClasses(data.results))
      .catch((error) => console.error(error));
  }, [session]);

  function newAssignment(e, session) {
    e.preventDefault();
    const title = e.target.title.value;
    const priority = e.target.priority.value;
    const link = e.target.link.value;
    const dueDate = e.target.dueDate.value;
    const timeEstimate = e.target.timeEstimate.value;
    const className = e.target.class.value;
    const done = 0;
    const overdue = 0;
    const query = `INSERT INTO assignments (email, title, priority, link, due_date, time_estimate, class, done, overdue) VALUES ("${session.user.email}", "${title}", "${priority}", "${link}", "${dueDate}", "${timeEstimate}", "${className}", "${done}", "${overdue}");`;
    queryDb(query)
      .then(() => {
        e.target.reset();
        const query = `SELECT * FROM assignments WHERE email = "${session?.user?.email || ""}"`;
        queryDb(query)
          .then((data) => setAssignments(data.results))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  function deleteAssignment(id) {
    const query = `DELETE FROM assignments WHERE id = ${id}`;
    queryDb(query)
      .then(() => {
        const query = `SELECT * FROM assignments WHERE email = "${session?.user?.email || ""}"`;
        queryDb(query)
          .then((data) => setAssignments(data.results))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
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
      prev.includes(className) ? prev.filter((name) => name !== className) : [...prev, className]
    );
  };

  const filteredAssignments = sortedAssignments.filter((assignment) =>
    selectedClasses.length === 0 || selectedClasses.includes(assignment.class)
  );

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? (sortConfig.direction === 'ascending' ? styles.sortedAsc : styles.sortedDesc) : '';
  };

  return (
    <>
      <Head>
        <title>{session && session.user.name.split(" ")[0]}'s Assignments</title>
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
              <form>
                <input type="text" placeholder="Class Name" />
              </form>
            </div>
          </div>
          <div className={styles.assignments}>
            <div className={styles.toolbar}>
              <h1>Assignments</h1>
              {!showNewMenu && <button onClick={() => setShowNewMenu(true)}>New</button>}
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => requestSort("title")} className={getClassNamesFor('title')}>Title</th>
                  <th onClick={() => requestSort("priority")} className={getClassNamesFor('priority')}>Priority</th>
                  <th onClick={() => requestSort("link")} className={getClassNamesFor('link')}>Link</th>
                  <th onClick={() => requestSort("due_date")} className={getClassNamesFor('due_date')}>Due Date</th>
                  <th onClick={() => requestSort("time_estimate")} className={getClassNamesFor('time_estimate')}>Time Estimate</th>
                  <th onClick={() => requestSort("class")} className={getClassNamesFor('class')}>Class</th>
                  <th onClick={() => requestSort("done")} className={getClassNamesFor('done')}>Done</th>
                  <th onClick={() => requestSort("overdue")} className={getClassNamesFor('overdue')}>Overdue</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>{assignment.title}</td>
                    <td>{assignment.priority}</td>
                    <td>
                      <a href={assignment.link} target="_blank">
                        {assignment.link.split("/").slice(2).join("/")}
                      </a>
                    </td>
                    <td>{assignment.due_date}</td>
                    <td>{assignment.time_estimate}</td>
                    <td>{assignment.class}</td>
                    <td>{assignment.done}</td>
                    <td>{assignment.overdue}</td>
                    <td>
                      <button onClick={() => deleteAssignment(assignment.id)}>Delete</button>
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
