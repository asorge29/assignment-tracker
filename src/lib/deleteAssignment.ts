import { queryDb } from "@/lib/queryDb";

export async function deleteAssignment(id: number): Promise<void> {
  const values = [id];

  try {
    await queryDb("deleteAssignment", values);
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
}
