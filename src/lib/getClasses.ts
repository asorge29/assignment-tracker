import { queryDb } from "@/lib/queryDb";
import { Class } from "@/types/class";

export async function getClasses(userEmail: string): Promise<Class[]> {
  const query = `SELECT * FROM classes WHERE email = ?`
  const values = [userEmail]

  try {
    return (await queryDb(query, values).then(data => data.results))
  } catch (error) {
    console.error('Error fetching classes:', error)
    throw error
  }
}