import axios from "axios";
import { toast } from "sonner";

const APIHttp = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
  timeout: 70000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

APIHttp.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isCancel(error)) {
      toast.error('درخواست توسط کاربر لغو شد.');
      return Promise.reject(error);
    }

    if (!error.response) {
      if (error.message.includes('Network Error')) {
        toast.error('خطای شبکه، لطفاً اتصال اینترنت خود را بررسی کنید.');
      } else if (error.message.includes('timeout')) {
        toast.error('زمان درخواست به پایان رسید. لطفاً دوباره تلاش کنید.');
      } else {
        toast.error('یک خطای غیرمنتظره رخ داد. لطفاً دوباره تلاش کنید.');
      }
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    if (status >= 400 && status < 500) {
      const message = data?.message || 'خطای سمت کاربر رخ داده است.';
      toast.error(message);
    } else if (status >= 500) {
      const message = data?.message || 'خطای سرور رخ داده است.';
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default APIHttp; 