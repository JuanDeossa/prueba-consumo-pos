import { ordersUrl } from "@/api/paths";
import { privateAxios } from "@/api/axios";

export const deleteOrder = async (id: string) => {
  //
  try {
    //
    const { status } = await privateAxios.delete(`${ordersUrl}/${id}`);

    if (status !== 204) return null;
    return true;
  } catch (error) {
    //
    console.error(error);
    return null;
  }
};
