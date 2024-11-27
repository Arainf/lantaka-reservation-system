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
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Plus, X, Edit, Save, Trash2, Check } from 'lucide-react';
import { useRoomTypeContext } from "@/context/RoomTypeContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useRegistrationContext } from "@/context/utilContext"

export default function RoomTypeTable({ searchTerm, render }) {
  const { roomTypes, fetchRoomTypes, addRoomType, updateRoomType, deleteRoomType } = useRoomTypeContext();
  const [filteredRoomTypes, setFilteredRoomTypes] = useState(roomTypes);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newRoomType, setNewRoomType] = useState({
    room_type_name: "",
    room_type_capacity: "",
    room_type_price_internal: "",
    room_type_price_external: "",
    room_type_description: "",
    room_type_img: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [editedImageFile, setEditedImageFile] = useState(null);
  const itemsPerPage = 5;
  const { toast } = useToast();
  const { renders , setRenderers } = useRegistrationContext();

  useEffect(() => {
    const filtered = roomTypes.filter(roomType =>
      roomType.room_type_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRoomTypes(filtered);
  }, [searchTerm, roomTypes]);

  useEffect(() => {
    fetchRoomTypes()
  }, [isEditing])

  const totalPages = Math.ceil(filteredRoomTypes.length / itemsPerPage);
  const currentData = filteredRoomTypes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = (roomType) => {
    setSelectedRoomType(roomType);
    setEditedImageFile(null);
    setIsDialogOpen(true);
    setIsEditing(false);
  };


  const handleEditRoomType = async () => {
    try {
      const updatedRoomType = {
        room_type_name: selectedRoomType.room_type_name,
        room_type_description: selectedRoomType.room_type_description,
        room_type_price_internal: selectedRoomType.room_type_price_internal,
        room_type_price_external: selectedRoomType.room_type_price_external,
        room_type_capacity: selectedRoomType.room_type_capacity,
      };

      if (editedImageFile) {
        updatedRoomType.room_type_img = await fileToBase64(editedImageFile);
      }

      await updateRoomType(selectedRoomType.room_type_id, updatedRoomType);
      setIsEditing(false);
      setEditedImageFile(null);
      setIsDialogOpen(false); // Close the dialog
      await fetchRoomTypes(); // Re-fetch room types to update the table
      toast({
        title: "Success",
        description: "Room type updated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating room type:", error);
      toast({
        title: "Error",
        description: "Failed to update room type",
        variant: "destructive",
      });
    } finally {
      setRenderers((prevKey) => prevKey + 1);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };
  
  // const handleDeleteRoomType = async () => {
  //   try {
  //     await deleteRoomType(selectedRoomType.room_type_id);
  //     setIsDialogOpen(false);
  //     setRenderers((prevKey) => prevKey + 1);
  //     toast({
  //       title: "Success",
  //       description: "Room type deleted successfully",
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to delete room type",
  //       variant: "destructive",
  //     });
  //   }
  // };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  return (
    <>
      <div className="flex flex-row gap-3 my-5">
        <h1 className="text-2xl poppins-semibold">Room Types</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-bg-[#0f172a]">
            <TableHead className="w-[180px] text-white">Name</TableHead>
            <TableHead className="w-[180px] text-white">Capacity</TableHead>
            <TableHead className="w-[180px] text-white">Internal Price</TableHead>
            <TableHead className="w-[180px] text-white">External Price</TableHead>
            <TableHead className="w-[100px] text-white">Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((roomType) => (
            <TableRow
              key={roomType.room_type_id}
              className="cursor-pointer"
              onClick={() => handleRowClick(roomType)}
            >
              <TableCell className="font-medium">{roomType.room_type_name}</TableCell>
              <TableCell>{roomType.room_type_capacity}</TableCell>
              <TableCell>{formatCurrency(roomType.room_type_price_internal)}</TableCell>
              <TableCell>{formatCurrency(roomType.room_type_price_external)}</TableCell>
              <TableCell>{roomType.room_type_img_url ? <Check className="h-4 w-4 text-green-500" /> : null}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[900px] border-none bg-transparent p-0 shadow-none" showCloseButton={false} >
          <div className="flex flex-row gap-4">
            <div className="w-[calc(50%-1rem)] flex flex-col gap-4">
              <Card className="flex-1 flex flex-col">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-center space-x-3 py-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      R
                    </div>
                    <div className="flex-grow">
                        <div className="font-medium">{selectedRoomType?.room_type_name}</div>
                        <div className="text-sm text-muted-foreground">
                        Id: {selectedRoomType?.room_type_id}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  <ScrollArea className="flex-grow pr-4">
                    <div className="space-y-4">
                      <div className="flex flex-row gap-4 w-full justify-between">
                        <div className="px-6">
                          <p className="font-medium">Capacity</p>
                          {isEditing ? (
                            <Input
                              type="number"
                              value={selectedRoomType?.room_type_capacity}
                              onChange={(e) => setSelectedRoomType({ ...selectedRoomType, room_type_capacity: parseInt(e.target.value) })}
                              className="mt-1"
                            />
                          ) : (
                            <p className="text-muted-foreground">
                              {selectedRoomType?.room_type_capacity} persons
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="px-6">
                        <p className="font-medium">Pricing</p>
                        <div className="flex flex-row gap-8 justify-between">
                          {isEditing ? (
                            <>
                              <div className="flex items-center space-x-2">
                                <Label htmlFor="internal-price">Internal:</Label>
                                <Input
                                  id="internal-price"
                                  type="number"
                                  value={selectedRoomType?.room_type_price_internal}
                                  onChange={(e) => setSelectedRoomType({ ...selectedRoomType, room_type_price_internal: parseFloat(e.target.value) })}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Label htmlFor="external-price">External:</Label>
                                <Input
                                  id="external-price"
                                  type="number"
                                  value={selectedRoomType?.room_type_price_external}
                                  onChange={(e) => setSelectedRoomType({ ...selectedRoomType, room_type_price_external: parseFloat(e.target.value) })}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-sm">
                                Internal: {formatCurrency(selectedRoomType?.room_type_price_internal)}
                              </p>
                              <p className="text-sm">
                                External: {formatCurrency(selectedRoomType?.room_type_price_external)}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="w-[calc(50%-1rem)] flex flex-col gap-4">
              <Card className="bg-[#d1e7ff] shadow-md flex-grow">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-2">
                    <Label className="text-lg font-semibold">
                      Description
                    </Label>
                  </div>
                  {isEditing ? (
                    <Textarea
                      value={selectedRoomType?.room_type_description}
                      onChange={(e) => setSelectedRoomType({ ...selectedRoomType, room_type_description: e.target.value })}
                      className="mt-2 bg-white/10 border-black text-black flex-grow"
                    />
                  ) : (
                    <ScrollArea className="flex-grow">
                      <p className="text-sm">{selectedRoomType?.room_type_description}</p>
                    </ScrollArea>
                  )}
                  <div className="py-2">
                    <p className="font-medium">Image</p>
                    {isEditing ? (
                      <>
                        <p className="mt-1 text-sm text-gray-600">
                          Click to upload an image
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="mt-2"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setEditedImageFile(file);
                            }
                          }}
                        />
                      </>
                    ) : (
                      selectedRoomType?.room_type_img_url && (
                        <img 
                          src={selectedRoomType.room_type_img_url} 
                          alt={selectedRoomType.room_type_name} 
                          className="mt-2 max-w-full h-auto rounded-md"
                        />
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col justify-between items-center gap-2">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-x-2">
                  {isEditing ? (
                    <Button variant="default" onClick={handleEditRoomType}>
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Room Type</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                value={newRoomType.room_type_capacity}
                onChange={(e) => setNewRoomType({ ...newRoomType, room_type_capacity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="internal-price" className="text-right">
                Internal Price
              </Label>
              <Input
                id="internal-price"
                type="number"
                value={newRoomType.room_type_price_internal}
                onChange={(e) => setNewRoomType({ ...newRoomType, room_type_price_internal: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="external-price" className="text-right">
                External Price
              </Label>
              <Input
                id="external-price"
                type="number"
                value={newRoomType.room_type_price_external}
                onChange={(e) => setNewRoomType({ ...newRoomType, room_type_price_external: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newRoomType.room_type_description}
                onChange={(e) => setNewRoomType({ ...newRoomType, room_type_description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setNewRoomType({ ...newRoomType, room_type_img: e.target.files[0] })}
                className="col-span-3"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

