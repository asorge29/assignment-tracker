import {queryDb} from "@/lib/queryDb";

export async function createAssignment({ title, link, dueDate, className, email }: { title: string, link: string, dueDate: string, className: string, email: string }) {
  const query = `insert into assignments (title, link, due_date, class, email) values (?, ?, ?, ?, ?)`
  const values = [title, link, dueDate, className, email]

  try {
    return (await queryDb(query, values).then(data => data.results))
  } catch (error) {
    console.error('Error creating assignment:', error)
    throw error
  }
}