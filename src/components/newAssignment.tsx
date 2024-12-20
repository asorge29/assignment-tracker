'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {Class} from "@/types/class";
import React from "react";
import { createAssignment } from "@/lib/createAssignment";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string(),
  link: z.string().url(),
  dueDate: z.string(),
  className: z.string(),
  email: z.string().email(),
})

export default function NewAssignment({ classes, session, refetchAssignments}: { classes: Class[], session: any, refetchAssignments: () => void }) {
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      dueDate: "",
      className: "",
      email: session?.user?.email,
    }
  })

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Assignment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Assignment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
        <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Topic Article #4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({field}) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://docs.google.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({field}) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="className"
            render={({field}) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class for this assignment."/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes.map((classItem, index) => (
                      <SelectItem key={index} value={JSON.stringify(classItem.id)}>{classItem.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button type="submit" className='hover:bg-green-700'>Create Assignment</Button>
        </form></Form>
      </DialogContent>
    </Dialog>
  );
}