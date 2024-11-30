  export async function createAssignment({ title, link, dueDate, className, email }: { title: string, link: string, dueDate: string, className: string, email: string }) {
    try {
      const response = await fetch('api/database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'key': process.env.DATABASE_KEY as string,
        },
        body: JSON.stringify({
          query: `insert into assignments (title, link, due_date, class, email) values ('${title}', '${link}', '${dueDate}', '${className}', '${email}')`
        }),
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }