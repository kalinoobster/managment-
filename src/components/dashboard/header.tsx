
"use client"
import Link from "next/link"
import {
  Bell,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
  User,
  LogOut,
  ChevronDown,
  CreditCard,
  Settings
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package2 } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

export function Header() {
  const lowStockProducts = mockProducts.filter(
    (product) => product.stock < product.reorderThreshold
  );

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
       <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-background">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">SwiftStock</span>
                    </Link>
                    <Link
                    href="/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <Home className="h-5 w-5" />
                    Dashboard
                    </Link>
                    <Link
                    href="/dashboard/inventory"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <Package className="h-5 w-5" />
                    Inventory
                    </Link>
                     <Link
                    href="/dashboard/sales"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <CreditCard className="h-5 w-5" />
                    Sales
                    </Link>
                    <Link
                    href="/dashboard/orders"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                    </Link>
                    <Link
                    href="/dashboard/suppliers"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <Users className="h-5 w-5" />
                    Suppliers
                    </Link>
                    <Link
                    href="/dashboard/analytics"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <LineChart className="h-5 w-5" />
                    Analytics
                    </Link>
                </nav>
            </SheetContent>
          </Sheet>

      <div className="w-full flex-1">
        {/* Search form removed */}
      </div>
       <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
                {lowStockProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-white">
                    {lowStockProducts.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <DropdownMenuItem key={product.id} asChild>
                    <Link href="/dashboard/inventory" className="text-destructive">
                      Low stock: {product.name} ({product.stock} left)
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <User className="h-5 w-5" />
             <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login">Logout <LogOut className="ml-2 h-4 w-4" /></Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
