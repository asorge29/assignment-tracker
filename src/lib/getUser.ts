import { User } from "@/types/user";
import { queryDb } from "./queryDb";

export async function getUser(): Promise<User> {
  
  try {
    return await queryDb("getUser").then(
      (data) =>{
        const user = data.results[0];
        if (user.settings){
          user.settings = JSON.parse(user.settings)
        }
        return user;
      },
    )
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}