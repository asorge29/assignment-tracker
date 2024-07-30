import styles from "@/styles/settingsMenu.module.css";
import { queryDb } from "@/lib/queryDb";

export default function SettingsMenu({ closeMethod }) {
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
        <form onSubmit={(e) => console.log(e)} className={styles.form}>
          <div>
            <label htmlFor="highlight">Show Overdue Highlights:</label>
            <input type="checkbox" id="highlight" name="highlight" />
          </div>
          <div>
            <label htmlFor="highlightColor">Overdue Highlight Color:</label>
            <input type="color" id="highlightColor" name="highlightColor" />
          </div>
        </form>
      </div>
    </div>
  );
}
