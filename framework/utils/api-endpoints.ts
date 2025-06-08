const API_ENDPOINTS = {
  products: {
    list: "/products",
    get: (id: string) => `/products/${id}`,
    create: "/products",
    update: (id: string) => `/products/${id}`,
    delete: (id: string) => `/products/${id}`,
  },
  offers: {
    list: "/offers",
    active:"/sellers/offers",
    get: (id: string) => `/offers/${id}`,
    create: "/offers",
    update: (id: string) => `/offers/${id}`,
    delete: (id: string) => `/offers/${id}`,
    getByProduct: (productId: string) => `/offers/product/${productId}`,
  },
  sellers: {
    profile: "/sellers/profile",
  },
  // Add other endpoints as needed
} as const

export default API_ENDPOINTS 