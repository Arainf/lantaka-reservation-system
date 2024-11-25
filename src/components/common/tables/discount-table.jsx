import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Plus, Edit, Save } from 'lucide-react';
import { useDiscountContext } from "@/context/discountContext";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function DiscountTable({ searchTerm }) {
  const { discounts, isLoading, error, fetchDiscounts, addDiscount, updateDiscount, deleteDiscount } = useDiscountContext();
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    discount_name: "",
    discount_percentage: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { toast } = useToast();

  const filteredDiscounts = discounts.filter((discount) =>
    discount.discount_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDiscounts.length / itemsPerPage);
  const currentData = filteredDiscounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // FETCH ON THE FIRST RELOAD
  useEffect(() => {
    fetchDiscounts();
  }, []);


  const handleRowClick = (discount) => {
    setSelectedDiscount(discount);
    setNewDiscount({
      discount_name: discount.discount_name,
      discount_percentage: discount.discount_percentage,
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleAddDiscount = useCallback(async () => {
    const discountExists = discounts.some(
      (discount) => discount.discount_name.toLowerCase() === newDiscount.discount_name.toLowerCase()
    );

    if (discountExists) {
      toast({
        title: "Error",
        description: "A discount with this name already exists",
        variant: "destructive",
      });
      return;
    }

    try {
      await addDiscount({
        discount_name: newDiscount.discount_name,
        discount_percentage: parseFloat(newDiscount.discount_percentage),
      });
      setIsAddDialogOpen(false);
      setNewDiscount({ discount_name: "", discount_percentage: "" });
      toast({
        title: "Success",
        description: "Discount added successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error adding discount:", error);
      toast({
        title: "Error",
        description: "Error adding discount",
        variant: "destructive",
      });
    }
  }, [addDiscount, discounts, newDiscount, toast]);

  const handleEditDiscount = useCallback(async () => {
    const discountExists = discounts.some(
      (discount) => 
        discount.discount_name.toLowerCase() === newDiscount.discount_name.toLowerCase() &&
        discount.discount_id !== selectedDiscount.discount_id
    );

    if (discountExists) {
      toast({
        title: "Error",
        description: "A discount with this name already exists",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateDiscount({
        id: selectedDiscount.discount_id,
        discount_name: newDiscount.discount_name,
        discount_percentage: parseFloat(newDiscount.discount_percentage),
      });
      setIsEditing(false);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Discount updated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error editing discount:", error);
      toast({
        title: "Error",
        description: "Error updating discount",
        variant: "destructive",
      });
    }
  }, [updateDiscount, discounts, newDiscount, selectedDiscount, toast]);

  const handleDeleteDiscount = useCallback(async () => {
    try {
      await deleteDiscount(selectedDiscount.discount_id);
      setIsDialogOpen(false);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Discount deleted successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting discount:", error);
      toast({
        title: "Error",
        description: "Error deleting discount",
        variant: "destructive",
      });
    }
  }, [deleteDiscount, selectedDiscount, toast]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-row gap-3 my-5">
        <h1 className="text-2xl poppins-semibold">Discounts</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 text-black" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-bg-[#0f172a]">
            <TableHead className="w-[180px] text-white">Name</TableHead>
            <TableHead className="w-[180px] text-white">Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((discount) => (
            <TableRow
              key={discount.discount_id}
              className="cursor-pointer"
              onClick={() => handleRowClick(discount)}
            >
              <TableCell className="font-medium">{discount.discount_name}</TableCell>
              <TableCell>{discount.discount_percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredDiscounts.length)} of{" "}
          {filteredDiscounts.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isEllipsis = 
              (page > 2 && page < currentPage - 1) || 
              (page < totalPages - 1 && page > currentPage + 1);

            if (isEllipsis) {
              return (
                <span key={`ellipsis-${page}`} className="text-muted-foreground">
                  ...
                </span>
              );
            }

            if (
              page === 1 || 
              page === totalPages || 
              Math.abs(currentPage - page) <= 1
            ) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            }

            return null;
          })}

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Discount" : "Discount Details"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {isEditing ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_discount_name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit_discount_name"
                    value={newDiscount.discount_name}
                    onChange={(e) => setNewDiscount({ ...newDiscount, discount_name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit_discount_percentage" className="text-right">
                    Percentage
                  </Label>
                  <Input
                    id="edit_discount_percentage"
                    value={newDiscount.discount_percentage}
                    onChange={(e) => setNewDiscount({ ...newDiscount, discount_percentage: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Name:</span>
                  <span className="col-span-3">{selectedDiscount?.discount_name}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Percentage:</span>
                  <span className="col-span-3">{selectedDiscount?.discount_percentage}%</span>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            {isEditing ? (
              <Button onClick={handleEditDiscount}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
            <Button onClick={() => handleDeleteDiscount(selectedDiscount.discount_id)} variant="destructive">Delete</Button>
            <Button onClick={() => {
              setIsEditing(false);
              setIsDialogOpen(false);
            }}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Discount</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount_name" className="text-right">
                Name
              </Label>
              <Input
                id="discount_name"
                value={newDiscount.discount_name}
                onChange={(e) => setNewDiscount({ ...newDiscount, discount_name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount_percentage" className="text-right">
                Percentage
              </Label>
              <Input
                id="discount_percentage"
                value={newDiscount.discount_percentage}
                onChange={(e) => setNewDiscount({ ...newDiscount, discount_percentage: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddDiscount}>Add Discount</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

