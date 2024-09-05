import { OrderResponse } from "@/types/order/order.interfaces";
import { ordersUrl } from "@/api/paths";
import { privateAxios } from "@/api/axios";

export const getOrders = async () => {
  //
  try {
    //
    const response = await privateAxios.get(ordersUrl);
    const orders = response.data as OrderResponse[];
    return orders;
  } catch (error) {
    console.error(error);
    return null;
  }
};
