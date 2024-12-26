import {queryDb} from "@/lib/queryDb";

export async function deleteClass(id: string) {
  const query = `delete from classes where id = ?`
  const values = [id]

  try {
    return (await queryDb(query, values).then(data => data.results))
  } catch (error) {
    console.error('Error deleting class:', error)
    throw error
  }
}