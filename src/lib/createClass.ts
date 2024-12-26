import {queryDb} from "@/lib/queryDb";

export async function createClass({ name, email }: { name: string, email: string }) {
  const query = `insert into classes (name, email) values (?, ?)`
  const values = [name, email]

  try {
    return (await queryDb(query, values).then(data => data.results))
  } catch (error) {
    console.error('Error creating class:', error)
    throw error
  }
}