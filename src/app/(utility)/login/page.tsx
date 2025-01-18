import {redirect} from "next/navigation"
import {auth} from "@/auth"
import GoogleLoginBtn from "@/components/googleLoginBtn"
import GithubLoginBtn from "@/components/githubLoginBtn"

export const runtime = 'edge'

export default async function Page() {
  const session = await auth()

  if (session?.user) {
    redirect("/assignments")
  }

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col rounded-lg shadow-sm border">
        <h1 className="text-center text-2xl tracking-tight font-semibold leading-none p-6">Sign in to Assignment Tracker</h1>
        <div className="flex items-center justify-center flex-col gap-4 p-6 pt-0">
          <GoogleLoginBtn/>
          <GithubLoginBtn/>
        </div>
      </div>
    </main>
  )
}