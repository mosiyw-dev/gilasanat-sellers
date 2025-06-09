import { useQuery, useMutation } from "@tanstack/react-query"
import { GetProductOffers, GetActiveOffers } from "./get"
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

export const useActiveOffersQuery = () => {
  return useQuery({
    queryKey: ["active-offers"],
    queryFn: () => GetActiveOffers(),
  })
}

export const useAddOfferMutation = () => {
  return useMutation({
    mutationFn: AddOffer
  })
}

export const useUpdateOfferMutation = () => {
  return useMutation({
    mutationFn: ({ offerId, offerData }: { offerId: string, offerData: Partial<OfferFormData> }) => 
      UpdateOffer(offerId, offerData)
  })
}

export const useDeleteOfferMutation = () => {
  return useMutation({
    mutationFn: DeleteOffer
  })
}

