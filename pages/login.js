import Head from "next/head"
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'
import GoogleLoginBtn from "@/components/googleLoginBtn"
import GithubLoginBtn from "@/components/githubLoginBtn"
import styles from "@/styles/login.module.css"

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/assignments');
        }
    }, [status, router]);

    return (
      <>
        <Head>
          <title>Login - Assignment Tracker</title>
        </Head>
        <main className={ styles.main }>
          <div className={ styles.container }>
            <h1>Sign in to Assignment Tracker</h1>
            <GoogleLoginBtn className={ styles.google } />
            <GithubLoginBtn className={ styles.github } />
          </div>
        </main>
      </>
    )
}
