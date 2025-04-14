'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
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
import {format} from "date-fns"
import { cn } from "@/lib/utils"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {Class} from "@/types/class";
import React, {useState} from "react";
import { createAssignment } from "@/lib/createAssignment";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useSettingsContext } from "@/app/(main)/assignments/context";

const formSchema = z.object({
  title: z.string().min(1),
  link: z.string(),
  dueDate: z.date(),
  className: z.string({
    required_error: "Please select a class",
  }),
})

const NewAssignment = ({ classes, refetchAssignments}: { classes: Class[], refetchAssignments: () => void }) => {
  const [open, setOpen] = useState(false);
  const {settings} = useSettingsContext();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newAssignment = {...values, dueDate: values.dueDate.toISOString().split("T")[0]};
    createAssignment(newAssignment).then(() => {
      refetchAssignments();
    })
    setOpen(false);
    form.reset();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      dueDate: new Date(),
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`${settings?.accentColor && `bg-${settings.accentColor}-500`} ${settings?.accentColor && `hover:bg-${settings.accentColor}-600`} text-wrap`}>Create Assignment</Button>
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
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                      {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
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
          <Button type="submit" className='bg-green-700'>Create Assignment</Button>
        </form></Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewAssignment;