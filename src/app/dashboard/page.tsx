import { StatCard } from "@/components/dashboard/stat-card"
import {
  Package,
  Warehouse,
  ShoppingCart,
  CalendarClock,
} from "lucide-react"
import { InventoryClientPage } from "@/components/inventory/inventory-client-page"

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value="7"
          description="Distinct items in inventory"
          Icon={Package}
        />
        <StatCard
          title="Total Quantity in Stock"
          value="720"
          description="Sum of all items in stock"
          Icon={Warehouse}
        />
        <StatCard
          title="Today's Orders"
          value="12"
          description="+5 from yesterday"
          Icon={ShoppingCart}
        />
        <StatCard
          title="Upcoming Expirations"
          value="3"
          description="Items expiring within 7 days"
          Icon={CalendarClock}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Low Stock Items</h2>
        <InventoryClientPage initialProducts={[]} isDashboardView={true} />
      </div>
    </>
  )
}
