import { queryDb } from "@/lib/queryDb";

export async function createClass({ name }: { name: string }) {
  const values = [name];

  try {
    return await queryDb("createClass", values).then((data) => data.results);
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}
