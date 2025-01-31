import { queryDb } from "@/lib/queryDb";
import { Class } from "@/types/class";

export async function getClasses(): Promise<Class[]> {
  try {
    return await queryDb("getClasses").then((data) => data.results);
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
}
