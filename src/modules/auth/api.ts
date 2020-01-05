import { api } from "../../api"
import { AuthData } from "./types"

export async function getAuthData() {
  const response = await fetch(api("me"), {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status)
  }

  return ((await response.json()) as unknown) as AuthData
}
