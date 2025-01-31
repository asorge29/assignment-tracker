import { queryDb } from "@/lib/queryDb";

export async function deleteClass(id: string) {
  const values = [id];

  try {
    return await queryDb("deleteClass", values).then((data) => data.results);
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
}
