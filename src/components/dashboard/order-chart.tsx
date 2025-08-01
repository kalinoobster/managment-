"use client"

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", ordered: 380, delivered: 240 },
  { name: "Feb", ordered: 300, delivered: 221 },
  { name: "Mar", ordered: 340, delivered: 229 },
  { name: "Apr", ordered: 250, delivered: 200 },
  { name: "May", ordered: 320, delivered: 218 },
]

export function OrderChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorOrdered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
        <Tooltip />
        <Legend iconType="circle" />
        <Area type="monotone" dataKey="ordered" name="Ordered" stroke="#f97316" fillOpacity={1} fill="url(#colorOrdered)" />
        <Area type="monotone" dataKey="delivered" name="Delivered" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDelivered)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
