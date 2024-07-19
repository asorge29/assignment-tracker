import { useState, useEffect } from 'react';
import styles from '@/styles/assignments.module.css';
import { queryDb } from '@/lib/queryDb';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/header';

export default function Assignments({  }) {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const query = `SELECT * FROM assignments WHERE email = "${session?.user?.email || ''}"`;
    queryDb(query)
      .then((data) => setAssignments(data.results))
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
    console.log(query);
    queryDb(query)
      .then(() => {
        e.target.reset();
        const query = `SELECT * FROM assignments WHERE email = "${session?.user?.email || ''}"`;
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
        const query = `SELECT * FROM assignments WHERE email = "${session?.user?.email || ''}"`;
        queryDb(query)
          .then((data) => setAssignments(data.results))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
    <Head>
      <title>{session && session.user.name.split(' ')[0]}'s Assignments</title>
    </Head>
    <main>
      <Header session={session} active="assignments" />
      <div>
        <h1>Assignments</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Link</th>
              <th>Due Date</th>
              <th>Time Estimate</th>
              <th>Class</th>
              <th>Done</th>
              <th>Overdue</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.priority}</td>
                <td><a src={assignment.link}>{assignment.link}</a></td>
                <td>{assignment.due_date}</td>
                <td>{assignment.time_estimate}</td>
                <td>{assignment.class}</td>
                <td>{assignment.done}</td>
                <td>{assignment.overdue}</td>
                <td><button onClick={() => deleteAssignment(assignment.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <form onSubmit={(e) => newAssignment(e, session)}>
          <h2>Add New Assignment</h2>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div>
            <label htmlFor="priority">Priority:</label>
            <select id="priority" name="priority">
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="link">Link:</label>
            <input type="url" id="link" name="link" />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" required />
          </div>
          <div>
            <label htmlFor="timeEstimate">Time Estimate (hours):</label>
            <input type="number" id="timeEstimate" name="timeEstimate" min="0" step="0.5" />
          </div>
          <div>
            <label htmlFor="class">Class:</label>
            <input type="text" id="class" name="class" />
          </div>
          <button type="submit">Add Assignment</button>
        </form>
      </div>
    </main>
    </>
  )
}