import { useQuery } from "@tanstack/react-query"
import { GetSellerProfile } from "./get"
import { SellerProfile } from "./types"
import { useSellerProfileStore } from "@/app/store/seller-profile"

export const useProfileQuery = () => {
  const setProfile = useSellerProfileStore((state) => state.setProfile)

  return useQuery<SellerProfile>({
    queryKey: ["seller-profile"],
    queryFn: async () => {
      const response = await GetSellerProfile()
      const profile = response.data?.profile
      if (profile) {
        setProfile(profile)
      }
      return profile
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep data in cache for 30 minutes
  })
} 