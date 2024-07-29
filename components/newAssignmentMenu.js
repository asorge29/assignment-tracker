import styles from '@/styles/newAssignmentMenu.module.css';
import { queryDb } from '@/lib/queryDb';

export default function NewAssignmentMenu({ session, classes, closeMethod, updateMethod }) {
  function newAssignment(e, session) {
    e.preventDefault();
    const title = e.target.title.value;
    const link = e.target.link.value;
    const dueDate = e.target.dueDate.value;
    const className = e.target.class.value;
    const query = `INSERT INTO assignments (email, title, link, due_date, class) VALUES ("${session.user.email}", "${title}", "${link}", "${dueDate}", "${className}");`;
    console.log(query);
    queryDb(query)
      .then(() => {
        e.target.reset();
        const query = `SELECT * FROM assignments WHERE email = "${
          session?.user?.email || ""
        }"`;
        queryDb(query)
          .then((data) => updateMethod(data.results))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
    closeMethod();
  }

  return (
    <div className={styles.fullScreen}>
      <div className={styles.menu}>
        <button className={styles.closeBtn} onClick={closeMethod}>X</button>
        <form onSubmit={(e) => newAssignment(e, session)} className={styles.form}>
          <h2>Add New Assignment</h2>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required />
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
            <label htmlFor="class">Class:</label>
            <select id="class" name="class">
            {classes.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">Add Assignment</button>
        </form>
      </div>
    </div>
  );
}
