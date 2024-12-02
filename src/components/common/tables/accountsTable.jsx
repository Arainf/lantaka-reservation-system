'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import Slogo from '@/assets/images/SchoolLogo.png'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import DeleteConfirmationDialog from '../cards/DeleteConfirmationDialog'
import axios from 'axios'

function AccountsTable({ accounts, onDelete }) {
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(accounts.length / itemsPerPage)
  const currentAccounts = accounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const { toast } = useToast()

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleRowClick = (account) => {
    setSelectedAccount(account)
    setIsDetailsDialogOpen(true)
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
    setIsDetailsDialogOpen(false);
  }

  const handleDeleteConfirm = async (values) => {

    if (!selectedAccount) return;
    setIsLoading(true);
  
    const loggedInUsername = localStorage.getItem('userData');
    const username = JSON.parse(loggedInUsername);

  
    try {
      // First, verify the password
      const verifyResponse = await axios.post('http://localhost:5000/deletelogin', {
        username: username.username,
        password: values.password,
      });
  
      if (verifyResponse.data.success) { // Ensure you're checking `data.success`
        // If password is verified, proceed with deletion
        const deleteResponse = await fetch(
          `http://localhost:5000/api/deleteAccount/${selectedAccount.account_id}`,
          { method: 'DELETE' }
        );
  
        if (deleteResponse.ok) {
          onDelete(selectedAccount);
          setIsDetailsDialogOpen(false);
          setIsDeleteDialogOpen(false);
          toast({
            title: "Success",
            description: "Account deleted successfully",
            variant: "success",
          });
        } else {
          throw new Error('Failed to delete account');
        }
      } else {
        // Handle unsuccessful verification
        toast({
          title: "Error",
          description: "Password verification failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Success",
        description: "Account deleted successfully",
        variant: "success",
      });
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false)
      setIsDetailsDialogOpen(false);
    }
  };
  

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-bg-[#0f172a]">
            <TableHead className="w-[30%] text-white">Account Name</TableHead>
            <TableHead className="w-[30%] text-white">Role</TableHead>
            <TableHead className="w-[25%] text-white">Username</TableHead>
            <TableHead className="w-[30%] text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentAccounts.map((account) => (
            <TableRow
              key={account.account_id}
              onClick={() => handleRowClick(account)}
              className="cursor-pointer hover:bg-blue-100"
            >
              <TableCell className="flex items-center space-x-3 py-4">
                <img src={Slogo} alt="" width={32} height={32} className="rounded-full" />
                <div>
                  <div className="font-medium">{`${account.account_fName} ${account.account_lName}`}</div>
                  <div className="text-sm text-gray-500">{account.account_email}</div>
                </div>
              </TableCell>
              <TableCell>{account.account_role}</TableCell>
              <TableCell>{account.account_username}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getStatusColor(account.account_status)}>
                  {account.account_status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 p-4">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, accounts.length)} of{" "}
          {accounts.length} entries
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
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent 
        className="bg-transparent p-0 max-w-4xl border-none flex flex-col items-center gap-3 shadow-none"
        showCloseButton={false}
        >
          <div className='flex flex-col items-center gap-3 w-full max-w-lg'>
            <div className='flex flex-row gap-3 items-center w-full'>
              <img src={Slogo} alt="" width={60} height={60} className="rounded-full" />
              <Card className="w-full">
                <CardContent className="py-3">
                  <h3 className="font-semibold">
                    {selectedAccount && `${selectedAccount.account_fName} ${selectedAccount.account_lName}`}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedAccount && selectedAccount.account_email}
                  </p>
                </CardContent>
              </Card>
              <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
                <X className="h-4 w-4 " />
              </Button>
            </div>
            <Card className="w-full">
              <CardContent className="py-6">
                {selectedAccount && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-semibold">Role</Label>
                      <p>{selectedAccount.account_role}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Username</Label>
                      <p>{selectedAccount.account_username}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Phone</Label>
                      <p>{selectedAccount.account_phone}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Date of Birth</Label>
                      <p>{selectedAccount.account_dob}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Gender</Label>
                      <p>{selectedAccount.account_gender}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Last Login</Label>
                      <p>{selectedAccount.account_last_login}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className='flex justify-end gap-3 w-full max-w-lg'>
            <Button variant="destructive" onClick={handleDeleteClick}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setIsDetailsDialogOpen(true);
        }}
        
        onConfirm={handleDeleteConfirm}
        isLoading={isLoading}
      />
      
      <Toaster/>
    </>
  )
}

export default AccountsTable