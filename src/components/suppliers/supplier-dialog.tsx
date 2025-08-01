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
import type { Supplier } from "@/lib/types"

interface SupplierDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (supplier: Supplier) => void
  supplier: Supplier | null
}

export function SupplierDialog({ isOpen, onClose, onSubmit, supplier }: SupplierDialogProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newSupplier: Supplier = {
      id: supplier?.id || `SUP${Date.now()}`,
      name: formData.get("name") as string,
      contactPerson: formData.get("contactPerson") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      categories: (formData.get("categories") as string).split(',').map(c => c.trim()),
    }
    onSubmit(newSupplier)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{supplier ? "Edit Supplier" : "Add Supplier"}</DialogTitle>
          <DialogDescription>
            {supplier ? "Update the details of the existing supplier." : "Fill in the details for the new supplier."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" name="name" defaultValue={supplier?.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactPerson" className="text-right">Contact Person</Label>
              <Input id="contactPerson" name="contactPerson" defaultValue={supplier?.contactPerson} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={supplier?.email} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" name="phone" type="tel" defaultValue={supplier?.phone} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categories" className="text-right">Categories</Label>
              <Input id="categories" name="categories" defaultValue={supplier?.categories.join(', ')} className="col-span-3" placeholder="Fruits, Vegetables" />
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
