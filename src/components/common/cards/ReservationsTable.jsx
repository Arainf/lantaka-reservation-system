"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomerTable({ data }) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    // Set initial data set on mount
    setDataSet(data);
  }, [data]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPages = Math.ceil(dataSet.length / itemsPerPage);

  // Data for the current page
  const currentData = dataSet.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead className="w-[25%]">Guest Information</TableHead>
                <TableHead className="w-[20%]">Room Name</TableHead>
                <TableHead className="w-[20%]">Room Type</TableHead>
                <TableHead className="w-[20%]">Status</TableHead>
                <TableHead className="w-[15%] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item) => (
                <TableRow key={item.id}> {/* Use a unique id for the key */}
                  <TableCell className="flex items-center space-x-3 py-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="font-medium">{item.customer}</div>
                      <div className="text-sm text-gray-500">{item.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">{item.roomName}</TableCell>
                  <TableCell className="py-4">{item.roomType}</TableCell>
                  <TableCell className="py-4">
                    <Badge variant="secondary" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex justify-center space-x-2">
                      <Button variant="link">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 my-4 text-[#0f172a]">
            <Button
            
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft/>
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
              className="transition-all duration-300"
            >
              Next
              <ChevronRight/>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
