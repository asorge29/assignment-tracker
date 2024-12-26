import {queryDb} from "@/lib/queryDb";

export async function updateAssignment({ id, title, link, dueDate, classId, email }: { id: number, title: string, link: string, dueDate: string, classId: string, email: string }) {
  const query = `UPDATE assignments SET title = ?, link = ?, due_date = ?, class = ? WHERE id = ? AND email = ?`
  const values = [title, link, dueDate, classId, id, email]

  try {
    return (await queryDb(query, values).then(data => data.results))
  } catch (error) {
    console.error('Error updating assignment:', error)
    throw error
  }
}