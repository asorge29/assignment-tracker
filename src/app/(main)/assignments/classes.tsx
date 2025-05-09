'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {Input} from "@/components/ui/input"
import {Class} from "@/types/class";
import {useClassesContext, useAssignmentsContext} from "@/app/(main)/assignments/context";
import {Assignment} from "@/types/assignment";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {createClass} from "@/lib/createClass";
import {deleteClass} from "@/lib/deleteClass";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useSettingsContext} from "@/app/(main)/assignments/context";

const createClassSchema = z.object({
  name: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
})

const deleteClassSchema = z.object({
  id: z.string({
    required_error: "Please select a class to delete."
  }),
})

export default function Classes() {
  const {classes, refetchClasses} = useClassesContext()
  const {assignments} = useAssignmentsContext()
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [deleteFormOpen, setDeleteFormOpen] = useState(false);
  const {settings} = useSettingsContext();

  const createForm = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: {
      name: "",
    }
  })

  const deleteForm = useForm<z.infer<typeof deleteClassSchema>>({
    resolver: zodResolver(deleteClassSchema),
  })

  function createClassSubmit(values: z.infer<typeof createClassSchema>) {
    const newClass = {...values};
    createClass(newClass).then(() => {
      refetchClasses();
    });
    setCreateFormOpen(false);
    createForm.reset();
  }

  function deleteClassSubmit(values: z.infer<typeof deleteClassSchema>) {
    deleteClass(values.id).then(() => {
      refetchClasses();
    });
    setDeleteFormOpen(false);
    deleteForm.reset();
  }

  const countAssignments = (classId: number): string => {
    return assignments.filter((assignment: Assignment) => assignment.class === classId).length.toString()
  }

  return (
    <div>
      {classes.length > 0 && <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead className='text-right'>Assignments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((item: Class) => (
            <TableRow key={item.id}>
              <TableCell className="group flex items-center">{item.name}{/*<Pencil
                className="hidden group-hover:block cursor-pointer h-4 text-muted-foreground"/>*/}</TableCell>
              <TableCell className='text-right'>{countAssignments(item.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
      <div className='flex flex-row lg:justify-between lg:flex-nowrap gap-1 py-4 flex-wrap justify-center'>
        <Dialog open={createFormOpen} onOpenChange={setCreateFormOpen}>
          <DialogTrigger asChild>
            <Button className={`${settings?.accentColor && `bg-${settings.accentColor}-500`} ${settings?.accentColor && `hover:bg-${settings.accentColor}-600`} px-2`}>Create Class</Button>
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
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Class Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Calculus AB" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className='bg-green-700 w-full'>Create Class</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {classes.length > 0 && <Dialog open={deleteFormOpen} onOpenChange={setDeleteFormOpen}>
          <DialogTrigger asChild>
            <Button className={`${settings?.accentColor && `bg-${settings.accentColor}-500`} ${settings?.accentColor && `hover:bg-${settings.accentColor}-600`} px-2`}>Delete Class</Button>
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
                            <SelectValue placeholder="Select a class to delete."/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((classItem, index) => {
                            if (countAssignments(classItem.id) === "0") {
                              return (
                                <SelectItem key={index} value={JSON.stringify(classItem.id)}>{classItem.name}</SelectItem>
                              )
                            }
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Note: Classes cannot be deleted if they have active assignments.
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className='bg-red-600 w-full'>Delete Class</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>}
      </div>
    </div>
  );
}