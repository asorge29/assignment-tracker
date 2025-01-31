'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import React, {useEffect} from "react";
import { updateAssignment } from "@/lib/updateAssignment";
import {Assignment} from "@/types/assignment";
import {useClassesContext} from "@/app/(main)/assignments/context";
import { useAssignmentsContext } from "@/app/(main)/assignments/context";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  link: z.string(),
  dueDate: z.date(),
  classId: z.string({
    required_error: "Please select a class",
  }),
})

export default function EditAssignment({ assignment, isOpen, setIsOpen }: { assignment: Assignment, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const {classes} = useClassesContext()
  const {refetchAssignments} = useAssignmentsContext()

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedAssignment = {...values, dueDate: values.dueDate.toISOString().split("T")[0]};
    updateAssignment(updatedAssignment).then(() => {
      refetchAssignments();
    });
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (assignment) {
      form.setValue('id', assignment.id);
      form.setValue('title', assignment.title);
      form.setValue('link', assignment.link);
      form.setValue('dueDate', new Date(`${assignment.due_date}T00:00:00`));
      form.setValue('classId', JSON.stringify(assignment.class));
    }
  }, [assignment, form]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
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
                    <Popover >
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
                name="classId"
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
              <Input type="hidden" {...form.register("id")} />
              <Button type="submit" className='hover:bg-green-700'>Update Assignment</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}