import styles from "@/styles/editMenu.module.css";
import { queryDb } from "@/lib/queryDb";

export default function EditMenu({
  session,
  classes,
  closeMethod,
  updateMethod,
  assignment,
}) {
  function updateAssignment(e, session) {
    e.preventDefault();
    const title = e.target.title.value;
    const link = e.target.link.value;
    const dueDate = e.target.dueDate.value;
    const className = e.target.class.value;
    const id = e.target.id.value;
    const query = `UPDATE assignments SET email = "${session.user.email}", title = "${title}", link = "${link}", due_date = "${dueDate}", class = "${className}" WHERE id = "${id}";`;
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
        <button className={styles.closeBtn} onClick={closeMethod}>
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <form
          onSubmit={(e) => updateAssignment(e, session)}
          className={styles.form}
        >
          <h2>Edit Assignment</h2>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={assignment.title}
              required
            />
          </div>
          <div>
            <label htmlFor="link">Link:</label>
            <input
              type="url"
              id="link"
              name="link"
              defaultValue={assignment.link}
            />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              defaultValue={assignment.due_date}
              required
            />
          </div>
          <div>
            <label htmlFor="class">Class:</label>
            <select id="class" name="class" defaultValue={assignment.class}>
              {classes.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <input type="hidden" value={assignment.id} id="id" name="id" />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
