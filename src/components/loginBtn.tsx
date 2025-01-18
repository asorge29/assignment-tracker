'use client'

import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";

const loginBtn = () => {
  return (
    <Button onClick={() => signIn()}>
      Sign In
    </Button>
  )
};

export default loginBtn;