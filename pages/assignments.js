import { useState, useEffect } from 'react';
import styles from '@/styles/assignments.module.css';
import { queryDb } from '@/lib/queryDb';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}

export default function Assignments({ session }) {
  const { data: sessionData } = useSession();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const query = `SELECT * FROM assignments WHERE email = "${sessionData?.user?.email || ''}"`;
    queryDb(query)
      .then((data) => setAssignments(data.results))
      .catch((error) => console.error(error));
  }, [sessionData]);

  return (
    <>
    <Head>

    </Head>
    <main>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
    </>
  )
}