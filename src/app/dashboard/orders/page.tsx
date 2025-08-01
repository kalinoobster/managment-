import { OrdersClientPage } from "@/components/orders/orders-client-page";
import { mockOrders } from "@/lib/mock-data";

export default function OrdersPage() {
  const orders = mockOrders;
  return <OrdersClientPage initialOrders={orders} />;
}
