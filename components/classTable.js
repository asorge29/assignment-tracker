import styles from "@/styles/classTable.module.css";
import Link from "next/link";

export default function ClassTable({
  session,
  classes,
  selectedClasses,
  handleCheckboxChange,
}) {
  if (!session) {
    return (
      <h3>
        You must be signed in to view your classes, sign in{" "}
        <Link href="/login">here.</Link>
      </h3>
    );
  }

  return (
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
  );
}
