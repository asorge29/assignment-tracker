import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import GoogleLoginBtn from "@/components/googleLoginBtn"
import GithubLoginBtn from "@/components/githubLoginBtn"

export default async function Page() {
  const session = await auth()

  if (session?.user) {
    redirect("/assignments")
  }
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-center">Sign in to Assignment Tracker</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center flex-col gap-4">
          <GoogleLoginBtn />
          <GithubLoginBtn />
        </CardContent>
      </Card>
    </main>
  )
}