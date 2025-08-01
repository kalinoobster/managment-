"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Boxes, LayoutDashboard, Truck, Package } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/inventory", label: "Inventory", icon: Boxes },
    { href: "/dashboard/suppliers", label: "Suppliers", icon: Truck },
  ]

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold mb-4"
      >
        <Package className="h-6 w-6" />
        <span>SwiftStock</span>
      </Link>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === item.href && "bg-muted text-primary"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
      <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-destructive transition-all hover:text-primary cursor-pointer">
          <Boxes className="h-4 w-4" />
          Reorder Alerts
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
            3
          </Badge>
        </div>
    </nav>
  )
}
