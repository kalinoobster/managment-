"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Settings, ShoppingCart, Users, LineChart, LogOut, Package2, CreditCard, Store, DollarSign, CircleDot } from "lucide-react"
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-black sm:flex text-white">
        <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
                >
                    <CircleDot className="h-6 w-6 transition-all group-hover:scale-110" />
                    <span className="sr-only">SwiftStock</span>
                </Link>
                {navItems.map((item) => (
                    <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                            <Link
                            href={item.href}
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-white md:h-8 md:w-8",
                                pathname === item.href ? "bg-gray-800 text-white" : "text-gray-400"
                            )}
                            >
                            <item.icon className="h-5 w-5" />
                            <span className="sr-only">{item.label}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-black text-white border-gray-700">{item.label}</TooltipContent>
                    </Tooltip>
                ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                        href="/dashboard/settings"
                        className={cn("flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-white md:h-8 md:w-8",
                           pathname === "/dashboard/settings" ? "bg-gray-800 text-white" : "text-gray-400"
                        )}
                        >
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-black text-white border-gray-700">Settings</TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                        href="/login"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-white md:h-8 md:w-8"
                        >
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Logout</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-black text-white border-gray-700">Logout</TooltipContent>
                </Tooltip>
            </nav>
        </TooltipProvider>
    </aside>
  )
}
