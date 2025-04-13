import { User } from "@/types/user";
import { queryDb } from "./queryDb";

export async function getUser(): Promise<User | undefined> {
  
  try {
    return await queryDb("getUser").then(
      (data) =>{
        const user = data.results[0];
        if (!user) {
          return undefined;
        }
        return user;
      },
    )
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}