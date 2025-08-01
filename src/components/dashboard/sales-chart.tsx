"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", purchase: 2300, sales: 5400 },
  { name: "Feb", purchase: 5900, sales: 4900 },
  { name: "Mar", purchase: 4400, sales: 5200 },
  { name: "Apr", purchase: 3700, sales: 4300 },
  { name: "May", purchase: 4400, sales: 4450 },
  { name: "Jun", purchase: 2800, sales: 4400 },
  { name: "Jul", purchase: 5500, sales: 4800 },
  { name: "Aug", purchase: 4400, sales: 4300 },
  { name: "Sep", purchase: 4500, sales: 4200 },
  { name: "Oct", purchase: 2800, sales: 4400 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`}/>
        <Tooltip />
        <Legend iconType="circle" />
        <Bar dataKey="purchase" fill="#3b82f6" name="Purchase" radius={[4, 4, 0, 0]} />
        <Bar dataKey="sales" fill="#84cc16" name="Sales" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
