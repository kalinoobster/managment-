"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, ShoppingCart, Users, LogOut, CircleDot, Store, CreditCard, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/inventory", label: "Inventory", icon: Store },
    { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
    { href: "/dashboard/suppliers", label: "Suppliers", icon: Users },
    { href: "/dashboard/sales", label: "Sales", icon: CreditCard },
    { href: "/dashboard/analytics", label: "Analytics", icon: DollarSign },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col items-center justify-between border-r bg-background py-5 sm:flex">
        <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 w-full">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-4"
                >
                    <CircleDot className="h-5 w-5 text-white transition-all group-hover:scale-110" />
                    <span className="sr-only">SwiftStock</span>
                </Link>
                {navItems.map((item) => (
                    <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                            <Link
                            href={item.href}
                            className={cn(
                                "flex h-12 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
                                pathname === item.href && "bg-muted text-foreground border-2 border-primary"
                            )}
                            >
                            <item.icon className="h-6 w-6" />
                            <span className="sr-only">{item.label}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                ))}
            </nav>
            <nav className="flex flex-col items-center gap-4 px-2 w-full">
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                        href="/dashboard/settings"
                        className={cn("flex h-12 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
                           pathname === "/dashboard/settings" && "bg-muted text-foreground"
                        )}
                        >
                        <Settings className="h-6 w-6" />
                        <span className="sr-only">Settings</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                        href="/login"
                        className="flex h-12 w-full items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                        >
                        <LogOut className="h-6 w-6" />
                        <span className="sr-only">Logout</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
            </nav>
        </TooltipProvider>
    </aside>
  )
}
