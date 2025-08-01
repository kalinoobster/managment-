"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, Package, Users, ShoppingCart, TrendingUp, Circle, Truck, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button";
import { mockOrders, mockProducts, mockSales } from '@/lib/mock-data';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

type Period = 'monthly' | 'yearly';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
    const [period, setPeriod] = useState<Period>('monthly');

    const filteredSales = useMemo(() => {
        const now = new Date();
        if (period === 'monthly') {
            const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
            return mockSales.filter(sale => new Date(sale.date) > lastMonth);
        } else {
             const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
            return mockSales.filter(sale => new Date(sale.date) > lastYear);
        }
    }, [period]);

    const filteredOrders = useMemo(() => {
        const now = new Date();
        if (period === 'monthly') {
            const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
            return mockOrders.filter(order => new Date(order.date) > lastMonth);
        } else {
             const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
            return mockOrders.filter(order => new Date(order.date) > lastYear);
        }
    }, [period]);


    const totalRevenue = filteredSales.reduce((acc, sale) => acc + sale.total, 0);
    const totalOrders = filteredOrders.length;
    const productsInStock = mockProducts.reduce((acc, p) => acc + p.stock, 0);
    const newCustomers = new Set(filteredSales.map(s => s.customerName)).size;

    const revenueByMonth = useMemo(() => {
        const data: {[key: string]: number} = {};
        filteredSales.forEach(sale => {
            const month = new Date(sale.date).toLocaleString('default', { month: 'short' });
            if(!data[month]) data[month] = 0;
            data[month] += sale.total;
        });
        return Object.entries(data).map(([name, revenue]) => ({ name, revenue }));
    }, [filteredSales]);

    const salesByCategory = useMemo(() => {
        const data: {[key: string]: number} = {};
        mockSales.forEach(sale => {
            const product = mockProducts.find(p => p.name === sale.productName);
            if(product) {
                if(!data[product.category]) data[product.category] = 0;
                data[product.category] += sale.total;
            }
        });
         return Object.entries(data).map(([name, value]) => ({ name, value }));
    }, []);

    const orderStatusCounts = useMemo(() => {
        const counts = { 'Processing': 0, 'Shipped': 0, 'Delivered': 0, 'Cancelled': 0 };
        mockOrders.forEach(order => {
            if (counts[order.status] !== undefined) {
                counts[order.status]++;
            }
        });
        return counts;
    }, []);

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
            <p className="text-xs text-muted-foreground">{period === 'monthly' ? '+20.1% from last month' : '+15.2% from last year'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalOrders}</div>
             <p className="text-xs text-muted-foreground">{period === 'monthly' ? '+180.1% from last month' : '+120.5% from last year'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsInStock}</div>
             <p className="text-xs text-muted-foreground">Total across all products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{newCustomers}</div>
            <p className="text-xs text-muted-foreground">{period === 'monthly' ? '+15% from last month' : '+10% from last year'}</p>
          </CardContent>
        </Card>
      </div>

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
                    <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">45.2%</div>
                     <p className="text-xs text-muted-foreground">Across all sales</p>
                </CardContent>
            </Card>
       </div>

    </div>
  );
}
