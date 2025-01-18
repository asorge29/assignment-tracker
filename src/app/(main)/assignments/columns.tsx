"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Assignment} from "@/types/assignment";
import {Class} from "@/types/class";
import {ArrowUpDown, Check, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {deleteAssignment} from "@/lib/deleteAssignment";

export const columns = (refetchAssignments: () => void, classes: Class[], openEditAssignment: (assignment: Assignment) => void): ColumnDef<Assignment>[] => [

  {
    accessorKey: "title",
    header: ({column}) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) => {
      return <span className="capitalize">{row.getValue("title")}</span>;
    },
  },
  {
    accessorKey: "link",
    header: () => <span className='text-primary'>Link</span>,
    cell: ({row}) => {
      const link = row.getValue("link") as string;
      return (
        <a href={link} target="_blank" rel="noopener noreferrer"
           className="hover:underline hover:decoration-black dark:hover:decoration-white duration-200 decoration-transparent">
          {link}
        </a>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({column}) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) => {
      const date = new Date(`${row.getValue("due_date")}T23:59:59`);
      const formatted = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);

      const due = new Date(`${row.getValue("due_date")}T23:59:59`);
      const now = new Date();

      if (due < now) {
        return <div className="text-red-500">{formatted}</div>;
      }

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "class",
    header: ({column}) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Class
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) => {
      const classId = row.getValue("class") as number;
      const className = classes.find((c: Class) => c.id === classId)?.name;
      return <div>{className}</div>;
    }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const assignment = row.original;

      return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={async () => {
                  await deleteAssignment(assignment.id);
                  refetchAssignments();
                }
                }
              >
                <Check className="text-green-500"/>
                <span className="text-green-500">Complete!</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  openEditAssignment(assignment);
                }
                }
              >
                <Pencil/>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className="cursor-pointer" onClick={async () => {
                await deleteAssignment(assignment.id);
                refetchAssignments();
              }
              }>
                <Trash2 className="text-red-500"/>
                <span className="text-red-500">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      );
    },
  },
];
