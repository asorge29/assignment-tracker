import styles from "@/styles/profileMenu.module.css"
import Image from "next/image"
import { signOut } from "next-auth/react"

export default function ProfileMenu({ session }) {
    return (
        <div className={styles.menu}>
            <p className={styles.email}>{session.user.email}</p>
            <Image src={session.user.image} alt="Profile picture" width={100} height={100} />
            <p className={styles.name}>{session.user.name}</p>
            <button onClick={() => signOut()} className={styles.signOut}>Sign Out</button>
        </div>
    )
}