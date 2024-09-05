import { CreateOrder, OrderResponse } from "@/types/order/order.interfaces";
import { privateAxios } from "@/api/axios";
import { ordersUrl } from "@/api/paths";

export const createOrder = async ({ products }: CreateOrder) => {
  //
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
