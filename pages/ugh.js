import { useState, useEffect } from 'react';
import { queryDb } from '@/lib/queryDb';
import { useSession } from 'next-auth/react';
import styles from '@/styles/ugh.module.css';

export default function MyComponent() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const query = `SELECT * from assignments where email = "${session.user.email}"`;
  useEffect(() => {
    queryDb(query)
      .then(data => setResult(data))
      .catch(error => setError(error));
  }, []);

  return (
    <div className={styles.container}>
      <pre>{JSON.stringify(result, 0, ' ')}</pre>
      <table>
        <tr>
          <td>Title</td>
          <td>Priority</td>
          <td>Link</td>
          <td>Due Date</td>
          <td>Time Estimate</td>
          <td>Class</td>
          <td>Done</td>
          <td>Overdue</td>
        </tr>
        {result && result.results.map((item, index) => (
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.priority}</td>
            <td>{item.link}</td>
            <td>{item.due_date}</td>
            <td>{item.time_estimate}</td>
            <td>{item.class}</td>
            <td>{item.done}</td>
            <td>{item.overdue}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
