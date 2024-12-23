export async function updateAssignment({ id, title, link, dueDate, classId, email }: { id: number, title: string, link: string, dueDate: string, classId: string, email: string }) {
  try {
    const response = await fetch('api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `UPDATE assignments SET title = "${title}", link = "${link}", due_date = "${dueDate}", class = ${classId} WHERE id = ${id} AND email = "${email}"`,
      }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}