import styles from "@/styles/header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import ProfileMenu from "./profileMenu";

export default function Header({ session, active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>Assignment Tracker</h1>
      </div>
      <div className={styles.nav}>
        <Link href="/" className={active === "home" && styles.active}>Home</Link>
        <Link href="/assignments" className={active === "assignments" && styles.active}>Assignments</Link>
        {session ? <Image src={session.user.image} alt="Profile picture" width={50} height={50} onClick={() => setMenuOpen(!menuOpen)} /> : <button onClick={() => router.push('/login')} className={styles.loginBtn}>Sign In</button>}
      </div>
    </div>
    {menuOpen && <ProfileMenu session={session} />}
    </>
  );
}