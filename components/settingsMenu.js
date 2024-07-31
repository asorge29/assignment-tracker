import styles from "@/styles/settingsMenu.module.css";

const updateSettings = (e, settings, setSettings) => {
  const id = e.target.id;
  const type = e.target.type;
  let value;
  if (type === "checkbox") {
    value = e.target.checked;
  } else {
    value = e.target.value;
  }
  const updatedSettings = {
    ...settings,
    [id]: value,
  };
  setSettings(updatedSettings);
};

export default function SettingsMenu({ closeMethod, settings, setSettings }) {
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
          onChange={(e) => updateSettings(e, settings, setSettings)}
          className={styles.form}
        >
          <div>
            <label htmlFor="highlight">Show Overdue Highlights:</label>
            <input
              type="checkbox"
              id="highlight"
              name="highlight"
              checked={settings.highlight}
            />
          </div>
          <div>
            <label htmlFor="highlightColor">Overdue Highlight Color:</label>
            <input
              type="color"
              id="highlightColor"
              name="highlightColor"
              value={settings.highlightColor}
              className={styles.colorInput}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
