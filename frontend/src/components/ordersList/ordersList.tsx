import { OrderResponse } from "@/types/order/order.interfaces";

interface Props {
  orders: OrderResponse[];
}

export const OrdersList = ({ orders }: Props) => {
  //

  return (
    <div className="UsersList flex flex-col gap-2.5">
      <h2 className="text-xl font-semibold text-red-500">
        Usuarios actuales: <b>{orders.length}</b>
      </h2>
      <UserCardHeader />
      <div className="flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto">
        {orders.length === 0 ? (
          <span className="text-gray-600 font-semibold text-lg border rounded-md bg-gray-50 border-gray-300 py-2 px-4 text-center">
            No hay usuarios disponibles.
          </span>
        ) : (
          orders.map((order) => (
            <UserCard key={order.id} order={order} isHeader={false} />
          ))
        )}
      </div>
    </div>
  );
};

const UserCard = ({
  order = null,
  isHeader = false,
}: {
  order: OrderResponse | null;
  isHeader: boolean;
}) => {
  return (
    <div
      className={`py-2 px-4 border rounded-md flex justify-between gap-5 ${
        !isHeader ? "bg-gray-50 border-gray-300" : "bg-gray-200"
      }`}
    >
      <span title={order?.id} className="overflow-hidden truncate flex gap-5">
        <span className="w-36 overflow-hidden truncate font-semibold">
          {!isHeader ? order?.total : "Total"}
        </span>
        <span className="w-32 overflow-hidden truncate font-bold">
          {!isHeader ? order?.status : "Estado"}
        </span>
        {/* <span className="w-32 overflow-hidden truncate font-bold text-center">
          {!isHeader ? (order?.order_items_count ? "✔️" : "✖️") : "Activo"}
        </span> */}
        <span className="w-56 overflow-hidden truncate font-semibold">
          {!isHeader ? order?.order_items_count : "Items"}
        </span>
      </span>
    </div>
  );
};

const UserCardHeader = () => {
  return <UserCard isHeader={true} order={null} />;
};
