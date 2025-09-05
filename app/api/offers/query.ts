import { useQuery, useMutation } from "@tanstack/react-query"
import { GetProductOffers, GetActiveOffers, GetInActiveOffers } from "./get"
import { AddOffer } from "./post"
import { UpdateOffer } from "./put"
import { DeleteOffer } from "./delete"
import { OfferFormData } from "@/types/offers"

export const useProductOffersQuery = (productId: string) => {
  return useQuery({
    queryKey: ["offers", productId],
    queryFn: () => GetProductOffers(productId),
  })
}

export const useActiveOffersQuery = (search?: string) => {
  return useQuery({
    queryKey: ["active-offers", search],
    queryFn: () => GetActiveOffers(search),
  })
}

export const useInActiveOffersQuery = (search?: string) => {
  return useQuery({
    queryKey: ["inactive-offers", search],
    queryFn: () => GetInActiveOffers(search),
  })
}

export const useAddOfferMutation = () => {
  return useMutation({
    mutationFn: (data: OfferFormData) => AddOffer(data),
  })
}

export const useUpdateOfferMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: OfferFormData }) => UpdateOffer(id, data),
  })
}

export const useDeleteOfferMutation = () => {
  return useMutation({
    mutationFn: (id: string) => DeleteOffer(id),
  })
}

