"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Product } from "@/lib/types"

interface ProductDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: Product) => void
  product: Product | null
}

export function ProductDialog({ isOpen, onClose, onSubmit, product }: ProductDialogProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newProduct: Product = {
      id: product?.id || `PROD${Date.now()}`,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      stock: Number(formData.get("stock")),
      reorderThreshold: Number(formData.get("reorderThreshold")),
      supplier: formData.get("supplier") as string,
      expirationDate: formData.get("expirationDate") as string,
      price: Number(formData.get("price")),
      cost: Number(formData.get("cost")),
    }
    onSubmit(newProduct)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Update the details of the existing product." : "Fill in the details for the new product."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" defaultValue={product?.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Input id="category" name="category" defaultValue={product?.category} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input id="stock" name="stock" type="number" defaultValue={product?.stock} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reorderThreshold" className="text-right">Reorder Threshold</Label>
              <Input id="reorderThreshold" name="reorderThreshold" type="number" defaultValue={product?.reorderThreshold} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Sale Price</Label>
                <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">Purchase Cost</Label>
                <Input id="cost" name="cost" type="number" step="0.01" defaultValue={product?.cost} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="supplier" className="text-right">Supplier</Label>
              <Input id="supplier" name="supplier" defaultValue={product?.supplier} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expirationDate" className="text-right">Expiry Date</Label>
              <Input id="expirationDate" name="expirationDate" type="date" defaultValue={product?.expirationDate?.split('T')[0]} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
