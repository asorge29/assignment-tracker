export async function createClass({ name, email }: { name: string, email: string }) {
  try {
    const response = await fetch('api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'key': process.env.DATABASE_KEY as string,
      },
      body: JSON.stringify({
        query: `insert into classes (name, email) values ('${name}', '${email}')`
      }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}