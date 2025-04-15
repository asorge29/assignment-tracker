import Assignments from "./assignments";
import Classes from "./classes";
import {Context} from "./context";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { getRequestContext } from "@cloudflare/next-on-pages";
import {auth} from "@/auth"
import {Assignment} from "@/types/assignment";
import {Class} from "@/types/class";
import {redirect} from "next/navigation";
import UpdateNotes from "@/components/updateNotes";
import { User } from "@/types/user";

export const runtime = 'edge'

export default async function Page() {

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const now = new Date();
  const endNotes = new Date("2025-04-30T23:59:59");

  const { env } = getRequestContext();
  const assignments: Assignment[] = await env.DATABASE.prepare("SELECT * FROM assignments WHERE email=?").bind(session?.user?.email).all().then((data: { results: Assignment[]; }) => data.results);
  const classes: Class[] = await env.DATABASE.prepare("SELECT * FROM classes WHERE email=?").bind(session?.user?.email).all().then((data: {results: Class[]}) => data.results);
  const user: User = await env.DATABASE.prepare("SELECT * FROM users WHERE email=?").bind(session?.user?.email).first().then((data: {email: string, settings: string}) => ({email: data.email, settings: JSON.parse(data.settings)})).catch(() => ({email: session?.user?.email, settings: undefined}));

  return (
    <div className="flex md:flex-row flex-col h-full">
      {now < endNotes && <UpdateNotes/>}
      <Context defaultClasses={classes} defaultAssignments={assignments} defaultUser={user}>
        <div className="border-r md:w-1/4 p-4">
          <Accordion type="single" collapsible className="md:hidden">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl md:text-3xl hover:no-underline">Classes</AccordionTrigger>
              <AccordionContent><Classes/></AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="hidden md:block">
            <h2 className="text-xl md:text-3xl">Classes</h2>
            <Classes/>
          </div>
        </div>
        <div className="p-4 w-full">
          <Assignments/>
        </div>
      </Context>
    </div>
  );
}