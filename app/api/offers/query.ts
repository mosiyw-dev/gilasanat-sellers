import { useQuery } from "@tanstack/react-query"
import { GetProductOffers, GetActiveOffers } from "./get"

export const useProductOffersQuery = (productId: string) => {
  return useQuery({
    queryKey: ["offers", productId],
    queryFn: () => GetProductOffers(productId),
  })
}

export const useActiveOffersQuery = () => {
  return useQuery({
    queryKey: ["active-offers"],
    queryFn: () => GetActiveOffers(),
  })
}

