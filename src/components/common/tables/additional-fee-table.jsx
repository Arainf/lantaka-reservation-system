import React, { useState, useEffect } from "react";
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
import { useAdditionalFees } from "@/context/additionalFeeContext";
import { useToast } from "@/hooks/use-toast";

export default function AdditionalFeeTable({ searchTerm }) {
  const { additionalFees, fetchAddFees, addFee, updateFee, deleteFee } = useAdditionalFees();
  const [selectedFee, setSelectedFee] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newFee, setNewFee] = useState({ additional_fee_name: "", additional_fee_amount: "" });
  const [editingFee, setEditingFee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { toast } = useToast();

  useEffect(() => {
    fetchAddFees();
  }, [fetchAddFees]);

  const filteredFees = additionalFees.filter(fee =>
    fee && fee.additional_fee_name && fee.additional_fee_name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
  const currentData = filteredFees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = (fee) => {
    setSelectedFee(fee);
    setEditingFee({ ...fee });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleAddFee = async () => {
    try {
      await addFee({ ...newFee, additional_fee_amount: parseFloat(newFee.additional_fee_amount) });
      setIsAddDialogOpen(false);
      setNewFee({ additional_fee_name: "", additional_fee_amount: "" });
      toast({
        title: "Success",
        description: "New fee added successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add new fee.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateFee = async () => {
    try {
      await updateFee(editingFee.additional_fee_id, editingFee);
      setIsDialogOpen(false);
      setIsEditing(false);
      fetchAddFees();
      toast({
        title: "Success",
        description: "Fee updated successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update fee.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFee = async (id) => {
    try {
      await deleteFee(id);
      setIsDialogOpen(false);
      fetchAddFees();
      toast({
        title: "Success",
        description: "Fee deleted successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete fee.",
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex flex-row gap-3 my-5">
        <h1 className="text-2xl poppins-semibold">Additional Fees</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 text-black" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-bg-[#0f172a]">
            <TableHead className="w-[180px] text-white">Name</TableHead>
            <TableHead className="w-[180px] text-white">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((fee) => (
            <TableRow
              key={fee.additional_fee_id}
              className="cursor-pointer"
              onClick={() => handleRowClick(fee)}
            >
              <TableCell className="font-medium">{fee.additional_fee_name}</TableCell>
              <TableCell>₱{fee.additional_fee_amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredFees.length)} of{" "}
          {filteredFees.length} entries
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
            <DialogTitle>{isEditing ? "Edit Fee" : "Fee Details"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Name:</span>
                  <span className="col-span-3">{selectedFee?.additional_fee_name}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium text-right">Amount:</span>
                  <span className="col-span-3">₱{selectedFee?.additional_fee_amount.toFixed(2)}</span>
                </div>
  
    
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Fee</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additional_fee_name" className="text-right">
                Name
              </Label>
              <Input
                id="additional_fee_name"
                value={newFee.additional_fee_name}
                onChange={(e) => setNewFee({ ...newFee, additional_fee_name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additional_fee_amount" className="text-right">
                Amount (₱)
              </Label>
              <Input
                id="additional_fee_amount"
                value={newFee.additional_fee_amount}
                onChange={(e) => setNewFee({ ...newFee, additional_fee_amount: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddFee}>Add Fee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

