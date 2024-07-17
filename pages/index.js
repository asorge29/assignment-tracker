import Head from "next/head";
import LoginBtn from "@/components/login-btn";
import styles from "@/styles/Home.module.css";

export default function Home() {
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
      </main>
    </>
  );
}
