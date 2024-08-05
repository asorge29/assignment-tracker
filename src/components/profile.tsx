"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

export default function Profile() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  return (
    <>
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
      {isOpen && <p>isOpen</p>}
    </>
  );
}
