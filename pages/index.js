import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Assignment Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header session={session} active="home" />
        {session && (
          <div className={styles.welcomeWrapper}>
            <span className={styles.welcomeMsg}>{`Welcome back, ${session.user.name}`}</span>
          </div>
        )}
      </main>
    </>
  );
}
