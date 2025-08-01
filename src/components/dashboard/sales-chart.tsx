"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", purchase: 23000, sales: 54000 },
  { name: "Feb", purchase: 59000, sales: 49000 },
  { name: "Mar", purchase: 44000, sales: 52000 },
  { name: "Apr", purchase: 37000, sales: 43000 },
  { name: "May", purchase: 44000, sales: 44500 },
  { name: "Jun", purchase: 28000, sales: 44000 },
  { name: "Jul", purchase: 55000, sales: 48000 },
  { name: "Aug", purchase: 44000, sales: 43000 },
  { name: "Sep", purchase: 45000, sales: 42000 },
  { name: "Oct", purchase: 28000, sales: 44000 },
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
