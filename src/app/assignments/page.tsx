'use client'

import { useSession } from "next-auth/react";
import { queryDb } from "@/lib/queryDb";

export default function Page() {

  const { data: session } = useSession();

  const query = `SELECT * FROM assignments WHERE email = '${session?.user?.email || ""}'`;

  if (session) {
    const data = queryDb(query).then((data) => {
      console.log(data.resultslocal);
    });
  }

  return (
    <div>
      <h1 className="border rounded-md inline text-slate-500">Assignments</h1>
      {session && <p>{`Welcome to the assignments page ${session?.user?.name?.split(' ')[0]}!`}</p>}
    </div>
  );
}