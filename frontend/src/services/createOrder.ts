import { CreateOrder, OrderResponse } from "@/types/order/order.interfaces";
import { privateAxios } from "@/api/axios";
import { ordersUrl } from "@/api/paths";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createOrder = async ({ products }: CreateOrder) => {
  //
  await delay(5000); // 2000ms = 2s

  try {
    //Axios
    const response = await privateAxios.post(
      ordersUrl,
      { products },
      {
        withCredentials: true,
      }
    );
    const order = response.data as OrderResponse;
    return order;
  } catch (error) {
    console.error(error);
    return null;
  }
};
