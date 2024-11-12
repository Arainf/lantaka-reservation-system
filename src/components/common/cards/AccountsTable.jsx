'use client'

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import Slogo from '@/assets/images/SchoolLogo.png'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function AccountsTable({ accounts, onDelete, currentPage, setCurrentPage }) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);
  const currentAccounts = accounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleRowExpansion = (accountId) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      if (newExpandedRows.has(accountId)) {
        newExpandedRows.delete(accountId);
      } else {
        newExpandedRows.add(accountId);
      }
      return newExpandedRows;
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditClick = (account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSaveChanges = () => {
    // Implement save logic here
    console.log("Saving changes for account:", editingAccount);
    handleCloseModal();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[1%]"></TableHead>
              <TableHead className="w-[19%]">Account Name</TableHead>
              <TableHead className="w-[20%]">Role</TableHead>
              <TableHead className="w-[20%]">Username</TableHead>
              <TableHead className="w-[30%]">Status</TableHead>
              <TableHead className="w-[15%] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAccounts.map((account) => (
              <React.Fragment key={account.account_id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(account.account_id)}
                    >
                      {expandedRows.has(account.account_id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="flex items-center space-x-3 py-4">
                    <img src={Slogo} alt="" className='h-8 w-8'/>
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
                  <TableCell className="text-center py-4">
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" onClick={() => handleEditClick(account)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => onDelete(account)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>          
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.has(account.account_id) && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="p-4 bg-gray-50">
                        <h2 className="font-semibold mb-4 text-xl ">Additional Details</h2>
                        <div className='pl-4'>
                          <p className="font-semibold">Account Number: </p>
                          <p>{account.account_id}</p>
                          <p className="font-semibold">Phone: </p>
                          <p>{account.account_phone}</p>
                          <p className="font-semibold">Date of Birth: </p>
                          <p>{account.account_dob}</p>
                          <p className="font-semibold">Gender:</p>
                          <p>{account.account_gender}</p>
                          <p className="font-semibold" >Created: </p>
                          <p>{account.account_created_at}</p>
                          <p className="font-semibold">Updated: </p>
                          <p>{account.account_updated_at}</p>
                          <p className="font-semibold">Last Login: </p>
                          <p>{account.account_last_login}</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex justify-center items-center space-x-4 my-4 text-[#0f172a]">
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "primary" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
            className={`transition-all duration-300 ${
              currentPage === i + 1
                ? 'shadow-[0_0_10px_3px_rgba(59,130,246,0.5)] text-[#0f172a] bg-[#fcb813]'
                : ' bg-[#0f172a] text-primary-foreground'
            }`}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          {editingAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name:
                </Label>
                <Input
                  id="firstName"
                  value={editingAccount.account_fName}
                  onChange={(e) => setEditingAccount({...editingAccount, account_fName: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name:
                </Label>
                <Input
                  id="lastName"
                  value={editingAccount.account_lName}
                  onChange={(e) => setEditingAccount({...editingAccount, account_lName: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email:
                </Label>
                <Input
                  id="email"
                  value={editingAccount.account_email}
                  onChange={(e) => setEditingAccount({...editingAccount, account_email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role:
                </Label>
                <Select 
                  value={editingAccount.account_role}
                  onValueChange={(value) => setEditingAccount({...editingAccount, account_role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status:
                </Label>
                <Select 
                  value={editingAccount.account_status}
                  onValueChange={(value) => setEditingAccount({...editingAccount, account_status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default AccountsTable;