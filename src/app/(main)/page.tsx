import Image from "next/image";
import LoginBtn from "@/components/loginBtn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  return (
    <main className="flex items-center flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-6xl font-semibold">Hi!</h1>
        <h1 className="text-6xl font-semibold">Welcome to the Assignment Tracker.</h1>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Things the Assignment Tracker Will Do</TableHead>
              <TableHead>Things the Assignment Tracker Won&apos;t Do</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                Help you keep track of your schoolwork
              </TableCell>
              <TableCell>
                Eat your homework
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Improve your organization
              </TableCell>
              <TableCell>
                Watch the 18 reels that one friend sent you
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Have dark mode. Everyone loves dark mode
              </TableCell>
              <TableCell>
                Give you relationship advice
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Sync your assignments wherever you log in
              </TableCell>
              <TableCell>
                Track you or sell your information
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Be free and open source forever
              </TableCell>
              <TableCell>
                Show you ads
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Make you happy
              </TableCell>
              <TableCell>
                Solve golbal warming :(
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
