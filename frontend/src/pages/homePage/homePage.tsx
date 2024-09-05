import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
import { OrdersList } from "@/components/ordersList/ordersList";
import { useEffect, useState } from "react";
import { getOrders } from "@/services/getOrders";
import { OrderResponse } from "@/types/order/order.interfaces";
import { envs } from "@/config/envs";
import { Button } from "@/components/ui/button";
import { createManyOrders } from "../../../devtools/createManyOrders";
import { deleteAllOrders } from "../../../devtools/deleteAllOrders";

export const HomePage = () => {
  //
  const fetchOrders = async () => {
    const ordersResponse = await getOrders();
    if (ordersResponse) {
      setOrders(ordersResponse);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const [orders, setOrders] = useState<OrderResponse[]>([]);

  const allowDevtools = envs.ALLOW_DEVTOOLS;

  const DEVTOOL_CREATE_ORDERS_RATE_LIMIT = envs.DEVTOOL_CREATE_USERS_RATE_LIMIT;

  return (
    <div className="home">
      <Link to={paths.ADMIN_USERS}>Administrador de usuarios</Link>
      <div className="max-w-xl mx-auto">
        {allowDevtools && (
          <div className="flex justify-between  ">
            <Button
              onClick={() => {
                createManyOrders(DEVTOOL_CREATE_ORDERS_RATE_LIMIT, fetchOrders);
              }}
            >
              create {DEVTOOL_CREATE_ORDERS_RATE_LIMIT}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteAllOrders(
                  orders.map((order) => order.id),
                  fetchOrders
                );
              }}
            >
              delete all
            </Button>
          </div>
        )}
        <OrdersList orders={orders} />
      </div>
    </div>
  );
};
