import { queryDb } from "./queryDb";

export async function deleteAssignment(id: number): Promise<void> {
  const query = `DELETE FROM assignments WHERE id = "${id}"`
  console.log(query)
  try {
    await queryDb(query)
  } catch (error) {
    console.error('Error fetching assignments:', error)
    throw error
  }
}
