import { deleteOrder } from "../src/services/deleteOrder";

export const deleteAllOrders = async (
  orderIds: string[] = [],
  fetchOrders = async () => {}
) => {
  //
  for (const id of orderIds) {
    await deleteOrder(id);
  }

  fetchOrders();
};
