import Assignments from "./assignments";
import Classes from "./classes";
import { Context } from "./context";

export default function Page() {
  return (
    <div className="flex flex-row h-full">
      <Context>
        <div className="border-r min-w-1/5 p-4">
          <h2 className="text-3xl">Classes</h2>
          <Classes />
        </div>
        <div className="p-4 w-full">
          <Assignments />
        </div>
      </Context>
    </div>
  );
}
