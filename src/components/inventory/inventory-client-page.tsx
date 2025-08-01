
"use client"

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getColumns } from './columns';
import { InventoryTable } from './inventory-table';
import { ProductDialog } from './product-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


interface InventoryClientPageProps {
  initialProducts: Product[];
}

export function InventoryClientPage({ initialProducts }: InventoryClientPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(() => {
    const allCategories = initialProducts.map(p => p.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);


  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteRequest = (product: Product) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  }

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
    }
    setIsAlertOpen(false);
    setProductToDelete(null);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = (product: Product) => {
    if (selectedProduct) {
      // Edit
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add
      setProducts([...products, { ...product, id: `PROD${Date.now()}` }]);
    }
    handleDialogClose();
  };

  const columns = useMemo(() => getColumns(handleEditProduct, handleDeleteRequest), []);

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Inventory</h1>
              <p className="text-muted-foreground">Manage your product stock.</p>
            </div>
            <div className="flex items-center gap-2">
                <Input 
                  placeholder="Search by name..." 
                  className="w-64" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleAddProduct}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>
        </div>

      <InventoryTable columns={columns} data={filteredProducts} />

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleFormSubmit}
        product={selectedProduct}
      />

       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{productToDelete?.name}" from your inventory.
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
