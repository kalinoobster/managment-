import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    orderId: "ORD001",
    customerName: "John Doe",
    date: "2024-07-31",
    total: 150.0,
    status: "Delivered",
  },
  {
    orderId: "ORD002",
    customerName: "Jane Smith",
    date: "2024-07-30",
    total: 75.5,
    status: "Shipped",
  },
  {
    orderId: "ORD003",
    customerName: "Mike Johnson",
    date: "2024-07-29",
    total: 220.0,
    status: "Processing",
  },
  {
    orderId: "ORD004",
    customerName: "Emily Davis",
    date: "2024-07-28",
    total: 35.0,
    status: "Delivered",
  },
    {
    orderId: "ORD005",
    customerName: "Chris Brown",
    date: "2024-07-27",
    total: 12.0,
    status: "Cancelled",
  },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Delivered":
      return "default";
    case "Shipped":
      return "secondary";
    case "Processing":
      return "outline";
    case "Cancelled":
        return "destructive";
    default:
      return "default";
  }
}

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
