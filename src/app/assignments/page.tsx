import Assignments from "@/components/assignments";

export default function Page() {
  return (
    <div className="flex flex-row">
      <div className="border-r h-screen w-1/5 p-4">
        <h2 className="text-3xl">Classes</h2>
      </div>
      <div className="p-4">
        <h2 className="text-3xl">Assignments</h2>
        <Assignments />
      </div>
    </div>
  );
}