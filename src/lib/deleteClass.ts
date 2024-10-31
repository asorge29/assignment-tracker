export async function deleteClass(id: string) {
  try {
    const response = await fetch('api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `delete from classes where id = ${id}`
      }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}