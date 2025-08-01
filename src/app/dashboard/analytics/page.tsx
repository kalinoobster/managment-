
"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, Package, Users, ShoppingCart, TrendingUp, Circle, Truck, CheckCircle, FileText, Star, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import { mockOrders, mockProducts, mockSales } from '@/lib/mock-data';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { generateReport, GenerateReportOutput } from '@/ai/flows/report-flow';
import { SalesChart } from "@/components/dashboard/sales-chart"
import { OrderChart } from "@/components/dashboard/order-chart"


type Period = 'monthly' | 'yearly';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0', '#8884d8', '#82ca9d', '#ffc658'];

export default function AnalyticsPage() {
    const [period, setPeriod] = useState<Period>('monthly');
    const [report, setReport] = useState<GenerateReportOutput | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const filteredOrders = useMemo(() => {
        const now = new Date();
        if (period === 'monthly') {
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return mockOrders.filter(order => new Date(order.date) >= lastMonth && new Date(order.date) <= new Date());
        } else {
             const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            return mockOrders.filter(order => new Date(order.date) >= lastYear && new Date(order.date) <= new Date());
        }
    }, [period]);

    const totalRevenue = filteredOrders.reduce((acc, order) => acc + order.total, 0);
    const totalCost = filteredOrders.reduce((acc, order) => acc + (order.cost * order.quantity), 0);
    const totalProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
    
    const newCustomers = new Set(filteredOrders.map(o => o.customerName)).size;

    const { mostSoldItem, mostProfitableItem } = useMemo(() => {
        if(filteredOrders.length === 0) return { mostSoldItem: 'N/A', mostProfitableItem: 'N/A' };

        const salesByProduct = filteredOrders.reduce((acc, order) => {
            if (order.status !== 'Cancelled') {
                if (!acc[order.productName]) {
                    acc[order.productName] = { quantity: 0, profit: 0 };
                }
                acc[order.productName].quantity += order.quantity;
                acc[order.productName].profit += (order.price - order.cost) * order.quantity;
            }
            return acc;
        }, {} as Record<string, { quantity: number; profit: number }>);
        
        const soldArray = Object.entries(salesByProduct).sort((a, b) => b[1].quantity - a[1].quantity);
        const profitArray = Object.entries(salesByProduct).sort((a, b) => b[1].profit - a[1].profit);

        return {
            mostSoldItem: soldArray.length > 0 ? soldArray[0][0] : 'N/A',
            mostProfitableItem: profitArray.length > 0 ? profitArray[0][0] : 'N/A'
        };
    }, [filteredOrders]);


    const revenueByMonth = useMemo(() => {
        const data: {[key: string]: number} = {};
        filteredOrders.forEach(order => {
            const month = new Date(order.date).toLocaleString('default', { month: 'short' });
            if(!data[month]) data[month] = 0;
            data[month] += order.total;
        });
        return Object.entries(data).map(([name, revenue]) => ({ name, revenue }));
    }, [filteredOrders]);

    const salesByCategory = useMemo(() => {
        const data: {[key: string]: number} = {};
        filteredOrders.forEach(order => {
            const product = mockProducts.find(p => p.name === order.productName);
            if(product) {
                if(!data[product.category]) data[product.category] = 0;
                data[product.category] += order.total;
            }
        });
         return Object.entries(data).map(([name, value]) => ({ name, value }));
    }, [filteredOrders]);

    const orderStatusCounts = useMemo(() => {
        const counts = { 'Processing': 0, 'Shipped': 0, 'Delivered': 0, 'Cancelled': 0 };
        filteredOrders.forEach(order => {
            if (counts[order.status] !== undefined) {
                counts[order.status]++;
            }
        });
        return counts;
    }, [filteredOrders]);

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        setReport(null);
        try {
            const result = await generateReport({
                period,
                orders: filteredOrders,
                totalRevenue,
                totalCost,
                totalProfit,
                profitMargin,
                mostSoldItem,
                mostProfitableItem,
            });
            setReport(result);
        } catch (error) {
            console.error("Failed to generate report:", error);
            // You might want to show a toast notification here
        }
        setIsGenerating(false);
    }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Analytics Report</h3>
            <p className="text-sm text-muted-foreground">
                An overview of your business performance for the selected period.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant={period === 'monthly' ? 'default' : 'outline'} onClick={() => setPeriod('monthly')}>Monthly</Button>
            <Button variant={period === 'yearly' ? 'default' : 'outline'} onClick={() => setPeriod('yearly')}>Yearly</Button>
             <Button onClick={handleGenerateReport} disabled={isGenerating}>
                <FileText className="mr-2 h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
      </div>
      
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{period === 'monthly' ? 'From the last month' : 'From the last year'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Spent</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
             <p className="text-xs text-muted-foreground">On supplies for orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
             <p className="text-xs text-muted-foreground">Across all sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newCustomers}</div>
            <p className="text-xs text-muted-foreground">{period === 'monthly' ? 'In the last month' : 'In the last year'}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Selling Product</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{mostSoldItem}</div>
                <p className="text-xs text-muted-foreground">Top product by quantity sold</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Profitable Product</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{mostProfitableItem}</div>
                <p className="text-xs text-muted-foreground">Top product by total profit</p>
            </CardContent>
        </Card>
      </div>

       {report && (
            <Card>
                <CardHeader>
                    <CardTitle>Generated AI Report for {period.charAt(0).toUpperCase() + period.slice(1)} Sales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Sales Summary</h4>
                        <p className="text-sm text-muted-foreground">{report.salesSummary}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">Performance Analysis</h4>
                        <p className="text-sm text-muted-foreground">{report.performanceAnalysis}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold">Recommendations</h4>
                        <p className="text-sm text-muted-foreground">{report.recommendations}</p>
                    </div>
                </CardContent>
            </Card>
        )}

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
             <CardDescription>
                A summary of your revenue performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`}/>
                    <Tooltip formatter={(value) => `$${(value as number).toFixed(2)}`} />
                    <Legend iconType="circle" />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
             <CardDescription>
                Top performing product categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie data={salesByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                         {salesByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value as number).toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Processing Orders</CardTitle>
                    <Circle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{orderStatusCounts.Processing}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Shipped Orders</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{orderStatusCounts.Shipped}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{orderStatusCounts.Delivered}</div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cancelled Orders</CardTitle>
                    <Circle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{orderStatusCounts.Cancelled}</div>
                </CardContent>
            </Card>
       </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales & Purchase</CardTitle>
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

    </div>
  );
}
