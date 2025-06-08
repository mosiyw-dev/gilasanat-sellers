import { useRouter } from 'next/router'; // Import next/router
import axios from 'axios';

// تنظیمات پایه Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// افزودن اینترسپتور برای ارسال توکن در هر درخواست
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// اینترسپتور برای مدیریت خطاها
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token");

      // Use Next.js router for client-side navigation
      if (typeof window !== "undefined") {
        // Make sure it's in the client-side
        const router = useRouter();
        router.push("/login"); // This will redirect without full-page reload
      }
    }

    // Handle 403 error (Access Denied)
    if (error.response && error.response.status === 403) {
      console.error("شما دسترسی به این بخش را ندارید");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
