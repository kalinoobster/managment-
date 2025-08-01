"use client"

import React, { useState, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Order, Product } from "@/lib/types"
import { mockProducts } from '@/lib/mock-data';

interface OrderDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (order: Order) => void
  order: Order | null
}

export function OrderDialog({ isOpen, onClose, onSubmit, order }: OrderDialogProps) {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(order?.quantity || 1);
  const [price, setPrice] = useState(order?.price || 0);
  const [cost, setCost] = useState(order?.cost || 0);
  const [total, setTotal] = useState(order?.total || 0);

   useEffect(() => {
    if (order) {
      const product = products.find(p => p.name === order.productName);
      setSelectedProduct(product || null);
      setQuantity(order.quantity);
      setPrice(order.price);
      setCost(order.cost);
    } else {
        setSelectedProduct(null);
        setQuantity(1);
        setPrice(0);
        setCost(0);
    }
   }, [order, products]);

  useEffect(() => {
    if (selectedProduct) {
        setPrice(selectedProduct.price);
        setCost(selectedProduct.cost);
    }
  }, [selectedProduct]);

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  const handleProductChange = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product || null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    if (!selectedProduct) return;

    const newOrder: Order = {
      id: order?.id || `ORD${Date.now()}`,
      customerName: formData.get("customerName") as string,
      date: formData.get("date") as string,
      status: formData.get("status") as Order['status'],
      productName: selectedProduct.name,
      quantity: quantity,
      price: price,
      cost: cost,
      total: total,
    }
    onSubmit(newOrder)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{order ? "Edit Order" : "Add Order"}</DialogTitle>
          <DialogDescription>
            {order ? "Update the details of the existing order." : "Fill in the details for the new order."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">Customer</Label>
              <Input id="customerName" name="customerName" defaultValue={order?.customerName} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">Product</Label>
                <Select onValueChange={handleProductChange} defaultValue={selectedProduct?.id}>
                    <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                    {products.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">Quantity</Label>
                <Input id="quantity" name="quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Sale Price</Label>
                <Input id="price" name="price" type="number" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">Purchase Cost</Label>
                <Input id="cost" name="cost" type="number" step="0.01" value={cost} onChange={e => setCost(Number(e.target.value))} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="total" className="text-right">Total</Label>
                <Input id="total" name="total" type="number" step="0.01" value={total} readOnly className="col-span-3 bg-muted" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input id="date" name="date" type="date" defaultValue={order?.date?.split('T')[0]} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
               <Select name="status" defaultValue={order?.status}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
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
