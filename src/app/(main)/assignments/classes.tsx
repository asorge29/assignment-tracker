'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useSession} from "next-auth/react";
import {Class} from "@/types/class";
import {useClassesContext, useAssignmentsContext} from "@/app/(main)/assignments/context";
import {Assignment} from "@/types/assignment";
import { Button } from "@/components/ui/button";
import {useEffect, useState} from "react";
import { createClass } from "@/lib/createClass";
import { deleteClass } from "@/lib/deleteClass";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const createClassSchema = z.object({
  name: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
  email: z.string(),
})

export default function Classes() {
  const {data: session, status} = useSession();
  const {classes, setClasses, refetchClasses} = useClassesContext()
  const {assignments, setAssignments, refetchAssignments} = useAssignmentsContext()
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const createForm = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: "",
      email: session?.user?.email as string,
    }
  })

  function onSubmit(values: z.infer<typeof createClassSchema>) {
    console.log(values)
  }

  const handleCreateClass = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = session?.user?.email;
    
    if (name && email) {
      createClass({ name, email }).then(() => {
        refetchClasses();
      });
    }
  }

  const handleDeleteClass = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget)
    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;

    if (id) {
      deleteClass(id).then(() => {
        refetchClasses();
      });
    }
  }

  const countAssignments = (classId: number): string => {
    return assignments.filter((assignment: Assignment) => assignment.class === classId).length.toString()
  }

  return isClient ? (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead className='text-right'>Assignments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((item: Class) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className='text-right'>{countAssignments(item.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex flex-row justify-between'>
        <Dialog>
          <DialogTrigger>
            <Button>Create Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new class</DialogTitle>
            </DialogHeader>
            <Form {...createForm}>
              <form className='flex flex-col gap-4' onSubmit={createForm.handleSubmit(onSubmit)}>
              <FormField
                control={createForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Calculus AB" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <Button type="submit" className='hover:bg-green-700 w-full'>Create Class</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <Button>Delete Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete a class</DialogTitle>
            </DialogHeader>
            <form className='flex flex-col gap-4' onSubmit={handleDeleteClass}>
              <div className="flex flex-row gap-4 justify-center items-center">
                <label className='text-lg nowrap' htmlFor="name">Class Name:</label>
                <select className='rounded text-lg border p-0.5' name='id'>
                  {classes.map((item: Class) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <DialogClose asChild>
                <Button type="submit" className='hover:bg-green-700 w-full'>Create Class</Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ) : null;
}