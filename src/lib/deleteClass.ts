export async function deleteClass(id: string) {
  try {
    const response = await fetch('api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'key': process.env.DATABASE_KEY as string,
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