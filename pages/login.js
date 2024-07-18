import Head from "next/head"
import GoogleLoginBtn from "@/components/googleLoginBtn"
import GithubLoginBtn from "@/components/githubLoginBtn"
import styles from "@/styles/login.module.css"

export default function Login() {
    return (
      <>
        <Head>
          <title>Login - Assignment Tracker</title>
        </Head>
        <main className={ styles.main }>
          <div className={ styles.container }>
            <h1>Login to Assignment Tracker</h1>
            <GoogleLoginBtn />
            <GithubLoginBtn />
          </div>
        </main>
      </>
    )
}