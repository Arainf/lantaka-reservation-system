import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

function DeleteConfirmationDialog({ isOpen, onClose, onConfirm, isLoading }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="bg-transparent">
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Account Deletion</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onConfirm)} className="space-y-4 animate-none">
          <div className="space-y-2">
            <Label htmlFor="password">Enter your password to confirm deletion</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <DialogFooter className="flex space-x-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading ? "Confirming..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;