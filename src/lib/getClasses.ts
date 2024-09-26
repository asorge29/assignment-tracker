import { queryDb } from "./queryDb";
import { Class } from "@/types/class";

export async function getClasses(userEmail: string): Promise<Class[]> {
  const query = `SELECT * FROM classes WHERE email = "${userEmail}"`

  try {
    return (await queryDb(query).then(data => data.results))
  } catch (error) {
    console.error('Error fetching classes:', error)
    throw error
  }
}