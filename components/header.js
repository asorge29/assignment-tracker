import styles from "@/styles/header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import ProfileMenu from "./profileMenu";
import SettingsMenu from "./settingsMenu";

export default function Header({ session, active, settings, setSettings }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Assignment Tracker</h1>
        </div>
        <div className={styles.nav}>
          <Link href="/" className={active === "home" && styles.active}>
            Home
          </Link>
          <Link
            href="/assignments"
            className={active === "assignments" && styles.active}
          >
            Assignments
          </Link>
          <svg
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={styles.settings}
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          {session ? (
            <Image
              src={session.user.image}
              alt="Profile picture"
              width={50}
              height={50}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={styles.loginBtn}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      {menuOpen && <ProfileMenu session={session} />}
      {settingsOpen && (
        <SettingsMenu
          closeMethod={() => setSettingsOpen(false)}
          settings={settings}
          setSettings={setSettings}
        />
      )}
    </>
  );
}
