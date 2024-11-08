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

function AccountsTable({ accounts, onDelete, currentPage }) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [current, setCurrentPage] = useState(currentPage);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);
  const currentAccounts = accounts.slice((current - 1) * itemsPerPage, current * itemsPerPage);

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
                      <Button variant="ghost" >
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
          disabled={current === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={current === i + 1 ? "primary" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
            className={`transition-all duration-300 ${
              current === i + 1
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
          disabled={current === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}

export default AccountsTable;
