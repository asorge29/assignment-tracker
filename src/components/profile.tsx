"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react";


export default function Profile() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return (
      <Button onClick={() => signIn()}>
        Sign In
      </Button>
    );
  }

  if (status === "loading") {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  return (
    <div className="relative">
      <Avatar
        className="hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AvatarImage
          src={session?.user?.image ?? undefined}
          alt={session?.user?.name || "User avatar"}
        />
        <AvatarFallback>
          {session?.user?.name
            ? `${session.user.name.charAt(0)}${
                session.user.name.split(" ")[1]?.charAt(0) || ""
              }`
            : undefined}
        </AvatarFallback>
      </Avatar>
      {isOpen && (
        <Card className="absolute top-40p right-0 mt-2">
          <CardHeader className="flex flex-row items-center justify-center">
          <Avatar className="h-24 w-24">
              <AvatarImage
                src={session?.user?.image ?? undefined}
                alt={session?.user?.name || "User avatar"}
              />
              <AvatarFallback className="h-24 w-24">
                {session?.user?.name
                  ? `${session.user.name.charAt(0)}${
                      session.user.name.split(" ")[1]?.charAt(0) || ""
                    }`
                  : undefined}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardTitle>{session?.user?.name}</CardTitle>
            <CardDescription>{session?.user?.email}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant='destructive' onClick={() => signOut()}><LogOut className="mr-1" />Sign Out</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
