import { Settings } from "@/types/settings";
import { queryDb } from "./queryDb";

export async function createUser({
  settings
}: {
  settings: Settings
}) {
  const values = [JSON.stringify(settings)]
  
  try {
    return await queryDb("createUser", values).then(
      (data) => data.results,
    )
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}