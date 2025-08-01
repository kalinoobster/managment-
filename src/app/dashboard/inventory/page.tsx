import { InventoryClientPage } from "@/components/inventory/inventory-client-page";
import { mockProducts } from "@/lib/mock-data";

export default function InventoryPage() {
  // In a real app, you would fetch this data from your backend
  const products = mockProducts;

  return <InventoryClientPage initialProducts={products} />;
}
