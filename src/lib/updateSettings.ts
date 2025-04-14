import { Settings } from "@/types/settings";
import { queryDb } from "./queryDb";

export async function updateSettings({
  settings
}: {
  settings: Settings
}) {
  const values = [JSON.stringify(settings)]
  
  try {
    return await queryDb("updateSettings", values).then(
      (data) => data.results,
    )
  } catch (error) {
    console.error("Error setting settings:", error);
    throw error;
  }
}