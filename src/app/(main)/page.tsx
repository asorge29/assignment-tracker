import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {auth} from '@/auth'

export const runtime = 'edge'

export default async function Home() {

  const session = await auth();

  return (
    <main className="flex items-center flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="md:text-6xl text-3xl text-center font-semibold">Hi!</h1>
        <h1 className="md:text-6xl text-3xl text-center font-semibold">Welcome to the Assignment Tracker.</h1>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 p-4">
        {session ? <Link href='/assignments' className='underline text-xl'> Just take me to my assignments</Link> : <Link href='/login' className='underline text-xl'>Log In/Sign Up</Link>}
      </div>
      <div className="flex justify-center md:flex-row flex-col md:w-5/6 w-full">
        <div className="md:w-1/2 w-full flex-shrink-0 p-4 gap-4 flex flex-col">
          <h2 className='text-center md:text-4xl text-xl'>What does it do?</h2>
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
                  Have dark mode. Everyone loves dark mode.
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
                  Solve global warming :(
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <h2 className='text-center md:text-4xl text-xl'>What if I find a bug or have suggestions?</h2>
          <p className='indent-10 text-justify'>
            The Assignment Tracker is open source, so you can find the source code on Github
            at <Link className='underline' href='https://github.com/asorge29/assignment-tracker'>github.com/asorge29/assignment-tracker</Link>.
            Feel free to open an issue or pull request!
          </p>
        </div>
        <div className="md:w-1/2 w-full flex-shrink-0 flex flex-col gap-4 p-4">
          <h2 className='text-center md:text-4xl text-xl'>Where did it come from?</h2>
          <p className='indent-10 text-justify'>
            I created this app to help me keep track of the ever-growing mound of schoolwork and for a fun learning
            project.
            I&apos;m a student trying to gain experience, and will be maintaining and improving this app in my free
            time.
            I&apos;d be pretty stoked if even a few people get some good use out of it and I&apos;d love to hear from
            you
            have any feedback!
          </p>
          <h2 className='text-center  md:text-4xl text-xl'>How much does it cost?</h2>
          <p className='indent-10 text-justify'>
            It is completely free to use. It will always be completely free to use. Below is a brief breakdown of the
            costs associated with running this. The cost of maintaining this may increase if the usage approaches the limits of the free tier.
            {/*If you would like to support the development of this project, you can buy me a coffee below :)*/}
          </p>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Domain Registration</TableCell>
                  <TableCell>$14.18/yr</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hosting on Cloudflare Pages</TableCell>
                  <TableCell>$0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cloudflare D1 Database</TableCell>
                  <TableCell>$0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className='text-green-500'>$14.18/yr</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/*<div className='flex justify-center'>
            <Button className='text-2xl bg-[#ff5f5f]' asChild><Link href='https://buymeacoffee.com/asorge29'>☕Buy me a
              coffee :)</Link></Button>
          </div>*/}
        </div>
      </div>
    </main>
  );
}
