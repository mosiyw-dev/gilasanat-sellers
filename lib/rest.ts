// utils/res.ts
import axios from "@/lib/axios";

// Create a wrapper function for different HTTP methods (GET, POST, PUT, etc.)
const res = {
  post: async (url: string, data: any) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      // Handle error as needed (for logging, rethrowing, etc.)
      throw error;
    }
  },

  get: async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url: string, data: any) => {
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // You can add more methods like DELETE or PATCH here as needed
};

export default res;
