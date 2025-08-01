import Image from "next/image"
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
import { Check, DollarSign, ShoppingCart, ArrowUp, Package, Inbox } from "lucide-react"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { OrderChart } from "@/components/dashboard/order-chart"
import Link from "next/link"

const topSellingStock = [
  { name: 'Surf Excel', sold: 30, remaining: 12, price: 100 },
  { name: 'Rin', sold: 21, remaining: 15, price: 207 },
  { name: 'Parle G', sold: 19, remaining: 17, price: 105 },
]

const lowQuantityStock = [
    { name: 'Tata Salt', remaining: '10 Packet', image: 'https://placehold.co/40x40.png', hint: 'salt packet' },
    { name: 'Lays', remaining: '15 Packet', image: 'https://placehold.co/40x40.png', hint: 'chips bag' },
    { name: 'Lays', remaining: '15 Packet', image: 'https://placehold.co/40x40.png', hint: 'chips bag blue' },
]


export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
         <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">HELLO!!</CardTitle>
                        <CardDescription>It's good to see you again.</CardDescription>
                    </div>
                    <div className="relative h-24 w-24">
                        <Image src="https://placehold.co/100x100.png" alt="Waving character" layout="fill" objectFit="contain" data-ai-hint="waving person illustration"/>
                    </div>
                </div>
            </CardHeader>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Number of Categories</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's total orders</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">270</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-4 w-4 text-green-500" />
              12%
            </p>
          </CardContent>
        </card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quantity In Hand</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Be Received</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales & Purchase</CardTitle>
             <Button variant="outline" size="sm" className="ml-auto">Weekly</Button>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderChart />
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Selling Stock</CardTitle>
                <Link href="#" className="text-sm font-medium text-primary hover:underline">See All</Link>
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
                            <TableCell>₹ {item.price}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Low Quantity Stock</CardTitle>
                <Link href="#" className="text-sm font-medium text-primary hover:underline">See All</Link>
            </CardHeader>
            <CardContent className="grid gap-4">
               {lowQuantityStock.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                             <Image src={item.image} alt={item.name} width={40} height={40} data-ai-hint={item.hint}/>
                             <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Remaining Quantity: {item.remaining}</p>
                             </div>
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
