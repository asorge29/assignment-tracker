import { queryDb } from "@/lib/queryDb";

export async function deleteAssignment(id: number): Promise<void> {
  const query = `DELETE FROM assignments WHERE id = ?`
  const values = [id]

  try {
    await queryDb(query, values)
  } catch (error) {
    console.error('Error deleting assignment:', error)
    throw error
  }
}
