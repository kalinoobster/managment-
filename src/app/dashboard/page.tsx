
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DollarSign, ArrowUp, Package, Inbox, ArrowDown, Warehouse } from "lucide-react"
import Link from "next/link"
import { mockOrders, mockProducts } from "@/lib/mock-data"


export default function DashboardPage() {
  const salesByProduct = mockOrders
    .filter(order => order.status !== 'Cancelled')
    .reduce((acc, order) => {
      if (!acc[order.productName]) {
        acc[order.productName] = 0;
      }
      acc[order.productName] += order.quantity;
      return acc;
    }, {} as Record<string, number>);

  const topSellingStock = Object.entries(salesByProduct)
    .sort(([, qtyA], [, qtyB]) => qtyB - qtyA)
    .slice(0, 3)
    .map(([productName, sold]) => {
      const product = mockProducts.find(p => p.name === productName);
      return {
        name: productName,
        sold: sold,
        remaining: product ? product.stock : 0,
        price: product ? product.price : 0
      };
    });

  const lowQuantityStock = mockProducts
    .filter(p => p.stock < p.reorderThreshold)
    .slice(0, 3)
    .map(product => ({
        name: product.name,
        remaining: product.stock,
    }));

    const totalProducts = mockProducts.length;
    const quantityInHand = mockProducts.reduce((total, p) => total + p.stock, 0);
    const ordersToBeReceived = mockOrders.filter(o => o.status === 'Processing').reduce((sum, o) => sum + o.quantity, 0);
    
    const today = new Date().toISOString().split('T')[0];
    const todaysTotalOrders = mockOrders.filter(o => o.date.startsWith(today)).length;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdaysDate = yesterday.toISOString().split('T')[0];
    const yesterdaysTotalOrders = mockOrders.filter(o => o.date.startsWith(yesterdaysDate)).length;

    const percentageIncrease = yesterdaysTotalOrders > 0 
        ? ((todaysTotalOrders - yesterdaysTotalOrders) / yesterdaysTotalOrders) * 100 
        : todaysTotalOrders > 0 ? 100 : 0;


  return (
    <div className="flex flex-col gap-4">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Unique items in inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's total orders</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysTotalOrders}</div>
            <p className="text-xs text-muted-foreground flex items-center">
               {percentageIncrease >= 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              {percentageIncrease.toFixed(1)}% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quantity In Hand</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quantityInHand}</div>
             <p className="text-xs text-muted-foreground">Total units in stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Be Received</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersToBeReceived}</div>
            <p className="text-xs text-muted-foreground">Items in processing orders</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Selling Stock</CardTitle>
                <Link href="/dashboard/inventory" className="text-sm font-medium text-primary hover:underline">See All</Link>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Sold Quantity</TableHead>
                        <TableHead>Remaining Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topSellingStock.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.sold}</TableCell>
                            <TableCell>{item.remaining}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Low Quantity Stock</CardTitle>
                <Link href="/dashboard/inventory" className="text-sm font-medium text-primary hover:underline">See All</Link>
            </CardHeader>
            <CardContent className="grid gap-4">
               {lowQuantityStock.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="flex items-center justify-between">
                         <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Remaining Quantity: {item.remaining}</p>
                         </div>
                        <span className="text-red-500 text-sm font-medium bg-red-100 px-2 py-1 rounded-md">Low</span>
                    </div>
                ))}
            </CardContent>
        </Card>
       </div>
    </div>
  )
}
