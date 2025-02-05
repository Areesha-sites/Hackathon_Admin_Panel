import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Order } from "../../../types/ComponentsTypes";
import { OrdersProps } from "../../../types/ComponentsTypes";
const ordersQuery = groq`*[_type == "order"]{
 _id, 
 orderAmount,
 orderDate,
status,
user->{
 name,
 email
}
}`;
export async function getServerSideProps() {
  const orders: Order[] = await client.fetch(ordersQuery);
  return {
    props: { orders },
  };
}
export default function Orders({ orders }: OrdersProps) {
  return (
    <div>
      <h2>Orders Overview</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.orderAmount} - {order.user.name} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
