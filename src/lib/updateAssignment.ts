import { queryDb } from "@/lib/queryDb";

export async function updateAssignment({
  id,
  title,
  link,
  dueDate,
  classId,
  email,
}: {
  id: number;
  title: string;
  link: string;
  dueDate: string;
  classId: string;
  email: string;
}) {
  const values = [title, link, dueDate, classId, id];

  try {
    return await queryDb("updateAssignment", values).then(
      (data) => data.results,
    );
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
}
