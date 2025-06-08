import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SellerProfile {
  id: string
  name: string
  shopName: string
  totalOffers: number
  email: string
  phone: string
  address: string
  logo?: string
  description?: string
  rating: number
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

interface SellerProfileStore {
  profile: SellerProfile | null
  setProfile: (profile: SellerProfile) => void
  clearProfile: () => void
}

export const useSellerProfileStore = create<SellerProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'seller-profile-storage',
    }
  )
) 