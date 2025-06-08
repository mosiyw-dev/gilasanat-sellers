import { useQuery } from "@tanstack/react-query"

export const useGenericQuery = <T>(
  queryFn: () => Promise<T>,
  queryKey: unknown[]
) => {
  return useQuery({
    queryKey,
    queryFn,
  })
} 