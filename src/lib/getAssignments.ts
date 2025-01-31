import { queryDb } from "@/lib/queryDb";
import { Assignment } from "@/types/assignment";

export async function getAssignments(): Promise<Assignment[]> {
  try {
    return await queryDb("getAssignments").then((data) => data.results);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
}
