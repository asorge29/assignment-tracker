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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

const deleteClassSchema = z.object({
  id: z.string({
    required_error: "Please select a class to delete."
  }),
})

export default function Classes() {
  const {data: session, status} = useSession();
  const {classes, setClasses, refetchClasses} = useClassesContext()
  const {assignments, setAssignments, refetchAssignments} = useAssignmentsContext()
  const [isClient, setIsClient] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);

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

  const deleteForm = useForm<z.infer<typeof deleteClassSchema>>({
    resolver: zodResolver(deleteClassSchema),
  })

  function createClassSubmit(values: z.infer<typeof createClassSchema>) {
    console.log(values)
  }

  function deleteClassSubmit(values: z.infer<typeof deleteClassSchema>) {
    deleteClass(values.id).then(() => {
      refetchClasses();
    });
    setDeleteFormOpen(false);
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
        <Dialog open={createFormOpen} onOpenChange={setCreateFormOpen}>
          <DialogTrigger>
            <Button>Create Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new class</DialogTitle>
            </DialogHeader>
            <Form {...createForm}>
              <form className='flex flex-col gap-4' onSubmit={createForm.handleSubmit(createClassSubmit)}>
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
        <Dialog open={deleteFormOpen} onOpenChange={setDeleteFormOpen}>
          <DialogTrigger>
            <Button>Delete Class</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete a class</DialogTitle>
            </DialogHeader>
            <Form {...deleteForm}>
              <form className='flex flex-col gap-4' onSubmit={deleteForm.handleSubmit(deleteClassSubmit)}>
                <FormField 
                  control={deleteForm.control}
                  name="id"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class to delete." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((classItem, index) => (
                            <SelectItem key={index} value={JSON.stringify(classItem.id)}>{classItem.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className='hover:bg-red-600 w-full'>Delete Class</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  ) : null;
}