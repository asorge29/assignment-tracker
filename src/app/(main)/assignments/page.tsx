import Assignments from "./assignments";
import Classes from "./classes";
import {Context} from "./context";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { getRequestContext } from "@cloudflare/next-on-pages";
import {auth} from "@/auth"
import {Assignment} from "@/types/assignment";
import {Class} from "@/types/class";
import {redirect} from "next/navigation";

export const runtime = 'edge'

export default async function Page() {

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { env } = getRequestContext();
  const assignments: Assignment[] = await env.DATABASE.prepare("SELECT * FROM assignments WHERE email=?").bind(session?.user?.email).all().then((data: { results: Assignment[]; }) => data.results);
  const classes: Class[] = await env.DATABASE.prepare("SELECT * FROM classes WHERE email=?").bind(session?.user?.email).all().then((data: {results: Class[]}) => data.results);

  return (
    <div className="flex md:flex-row flex-col h-full">
      <Context defaultClasses={classes} defaultAssignments={assignments}>
        <div className="border-r w-1/4 p-4">
          <Accordion type="single" collapsible className="md:hidden">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl md:text-3xl">Classes</AccordionTrigger>
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
