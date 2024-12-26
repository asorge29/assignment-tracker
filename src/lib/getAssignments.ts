import { queryDb } from "@/lib/queryDb";
import { Assignment } from "@/types/assignment";

export async function getAssignments(userEmail: string): Promise<Assignment[]> {
  const query = `SELECT * FROM assignments WHERE email = ?`
  const values = [userEmail]
  
  try {
    return (await queryDb(query, values).then(data => data.results))
  } catch (error) {
    console.error('Error fetching assignments:', error)
    throw error
  }
}
