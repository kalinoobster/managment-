"use client"

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Order } from '@/lib/types';
import { Input } from "@/components/ui/input"
import { getColumns } from './columns';
import { OrdersTable } from './orders-table';
import { OrderDialog } from './order-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


interface OrdersClientPageProps {
  initialOrders: Order[];
}

export function OrdersClientPage({ initialOrders }: OrdersClientPageProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const handleAddOrder = () => {
    setSelectedOrder(null);
    setIsDialogOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleDeleteRequest = (order: Order) => {
    setOrderToDelete(order);
    setIsAlertOpen(true);
  }

  const handleDeleteConfirm = () => {
    if (orderToDelete) {
      setOrders(orders.filter(p => p.id !== orderToDelete.id));
    }
    setIsAlertOpen(false);
    setOrderToDelete(null);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleFormSubmit = (order: Order) => {
    if (selectedOrder) {
      // Edit
      setOrders(orders.map(p => p.id === order.id ? order : p));
    } else {
      // Add
      setOrders([...orders, { ...order, id: `ORD${Date.now()}` }]);
    }
    handleDialogClose();
  };

  const columns = useMemo(() => getColumns(handleEditOrder, handleDeleteRequest), []);

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Orders</h1>
              <p className="text-muted-foreground">Manage your customer orders.</p>
            </div>
            <div className="flex items-center gap-2">
                <Input placeholder="Search by customer..." className="w-64" />
                <Button onClick={handleAddOrder}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Order
                </Button>
            </div>
        </div>

      <OrdersTable columns={columns} data={orders} />

      <OrderDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
        order={selectedOrder}
      />

       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the order
              "{orderToDelete?.id}" from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
