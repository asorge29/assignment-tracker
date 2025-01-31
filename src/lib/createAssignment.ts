import { queryDb } from "@/lib/queryDb";

export async function createAssignment({
  title,
  link,
  dueDate,
  className,
}: {
  title: string;
  link: string;
  dueDate: string;
  className: string;
}) {
  const values = [title, link, dueDate, className];

  try {
    return await queryDb("createAssignment", values).then(
      (data) => data.results,
    );
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
}
