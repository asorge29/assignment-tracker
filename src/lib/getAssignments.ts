import { queryDb } from "./queryDb";

export async function getAssignments(userEmail: string): Promise<any[]> {
  const query = `SELECT * FROM assignments WHERE email = "${userEmail}"`
  
  try {
    return (await queryDb(query).then(data => data.results))
  } catch (error) {
    console.error('Error fetching assignments:', error)
    throw error
  }
}