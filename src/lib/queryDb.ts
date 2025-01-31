export async function queryDb(action: string, params: (string|number)[] = []) {  try {
    const response = await fetch("api/database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, params }),
    });

    return await response.json();
  } catch (error) {
    console.error("queryDb:", error);
  }
}
