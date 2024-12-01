import Assignments from "./assignments";
import Classes from "./classes";
import {Context} from "./context";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"

export default function Page() {
  return (
    <div className="flex md:flex-row flex-col h-full">
      <Context>
        <div className="border-r min-w-1/5 p-4">
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
