import { queryDb } from "./queryDb";

export async function getSettings() {
  
  try {
    return await queryDb("getSettings").then(
      (data) => data.results as string,
    )
  } catch (error) {
    console.error("Error getting settings:", error);
    throw error;
  }
}