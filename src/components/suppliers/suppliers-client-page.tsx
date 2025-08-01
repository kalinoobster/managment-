"use client"

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { mockSuppliers } from '@/lib/mock-data';
import type { Supplier } from '@/lib/types';
import { Input } from "@/components/ui/input"
import { getColumns } from './columns';
import { SuppliersTable } from './suppliers-table';
import { SupplierDialog } from './supplier-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export function SuppliersClientPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setIsDialogOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDialogOpen(true);
  };
  
  const handleDeleteRequest = (supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setIsAlertOpen(true);
  }

  const handleDeleteConfirm = () => {
    if (supplierToDelete) {
      setSuppliers(suppliers.filter(p => p.id !== supplierToDelete.id));
    }
    setIsAlertOpen(false);
    setSupplierToDelete(null);
  }


  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedSupplier(null);
  };

  const handleFormSubmit = (supplier: Supplier) => {
    if (selectedSupplier) {
      // Edit
      setSuppliers(suppliers.map(p => p.id === supplier.id ? supplier : p));
    } else {
      // Add
      setSuppliers([...suppliers, supplier]);
    }
    handleDialogClose();
  };

  const columns = useMemo(() => getColumns(handleEditSupplier, handleDeleteRequest), []);

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Suppliers</h1>
              <p className="text-muted-foreground">Manage your supplier information.</p>
            </div>
            <div className="flex items-center gap-2">
                <Input placeholder="Search by name..." className="w-64" />
                <Button onClick={handleAddSupplier}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Supplier
                </Button>
            </div>
        </div>

      <SuppliersTable columns={columns} data={suppliers} />

      <SupplierDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
        supplier={selectedSupplier}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the supplier
              "{supplierToDelete?.name}".
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
