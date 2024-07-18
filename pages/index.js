import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoginBtn from "@/components/login-btn";
import { useSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <Head>
        <title>Assignment Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Assignment Tracker</h1>
        <LoginBtn />
        {session && (
          <>
          <div>
            <p>Welcome, {session.user.name}</p>
            <p>Email: {session.user.email}</p>
          </div>
          <Image src={session.user.image} alt="Profile picture" width={50} height={50} />
          </>
        )}
        <Link href="/assignments">View Assignments</Link>
      </main>
    </>
  );
}
