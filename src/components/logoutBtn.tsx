'use client'

import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";

const logoutBtn = () => {
  return (
    <Button variant='destructive' onClick={() => signOut({redirectTo: "/"})}><LogOut/>Sign Out</Button>
  )
};

export default logoutBtn;