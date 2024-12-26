export async function queryDb(query: string, params: any[] = []) {
  try {
    const response = await fetch("api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, params }),
    });

    return await response.json();
  } catch (error) {
    console.error("queryDb:", error);
  }
}
