'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginBtn() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <p>Loading...</p>
    )
  }

  if (!session) {
    return (
      <button onClick={() => signIn()}>Sign in</button>
    )
  }
  return (
    <>
    <pre>{JSON.stringify(session)}</pre>
    <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}