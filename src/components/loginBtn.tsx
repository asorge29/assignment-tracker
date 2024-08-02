'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession()
  if (!session) {
    return (
      <button onClick={() => signIn()}>Sign in</button>
    )
  }
  return (
    <pre>{JSON.stringify(session)}</pre>
  )
}