import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import GoogleLoginBtn from "@/components/googleLoginBtn"
import GithubLoginBtn from "@/components/githubLoginBtn"

export default function Page() {
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-center">Sign in to Assignment Tracker</CardTitle>
          {/*<CardDescription className="text-center">Select your prefered method of authentication, assignments will sync to any accounts with the same email address.</CardDescription>*/}
        </CardHeader>
        <CardContent className="flex items-center justify-center flex-col gap-4">
          <GoogleLoginBtn />
          <GithubLoginBtn />
        </CardContent>
      </Card>
    </main>
  )
}