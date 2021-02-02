import { DependencyList, useEffect, useState } from "react"
import { getCsrfToken } from "../modules/auth/selectors"
import { deferredSelectorRedux } from "./deferredSelectorRedux"

export interface ApiState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
}

export interface Paginated<T> {
  page: number
  pages: number
  per_page: number
  total: number
  results: T[]
}

export const initialApiState = {
  data: null,
  error: null,
  isLoading: false,
}

export async function apiWithAuth<T>(
  url: string,
  method?: string,
  body?: unknown,
): Promise<T> {
  const csrfToken = await deferredSelectorRedux(getCsrfToken)

  const response = await fetch(url, {
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: "include",
    headers: {
      "X-CSRFToken": csrfToken,
      "Content-Type": "application/json",
    },
    method,
  })

  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status)
  }

  if (method === "DELETE") {
    return (undefined as unknown) as T
  }

  return ((await response.json()) as unknown) as T
}

export function buildUrl(
  url: string,
  parameters: Record<string, string | number | boolean | undefined>,
) {
  if (Object.keys(parameters).length === 0) {
    return url
  }

  const parts = []
  for (const [key, value] of Object.entries(parameters)) {
    if (value !== undefined) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value))
    }
  }

  return url + "?" + parts.join("&")
}

// TODO: Handle not found and errors
export function useApiFetcher<T>(
  fetcher: () => Promise<T>,
  inputs: DependencyList = [],
): T | null {
  const [result, setResult] = useState<T | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const result = await fetcher()
        if (!cancelled) setResult(result)
      } catch (e) {
        if (cancelled) return

        // TODO: Handle unauthed
        throw e
      }
    })()

    return () => {
      cancelled = true
    }
  }, inputs)

  return result
}
