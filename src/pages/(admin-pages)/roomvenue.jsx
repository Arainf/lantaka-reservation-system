"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Edit, Save, Trash2, X, Upload } from 'lucide-react';
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide";
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop";
import { useRoomVenueContentsContext } from "@/context/roomandVenueContext";
import { Toaster } from "@/components/ui/toaster";
import { useNotifications } from "@/context/notificationContext";

export default function VenueRoomManagement({
  sidebarOpen = false,
  toggleSidebar = () => {},
}) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState("ready");
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [editedCapacity, setEditedCapacity] = useState("");
  const [editedInternalPrice, setEditedInternalPrice] = useState("");
  const [editedExternalPrice, setEditedExternalPrice] = useState("");
  const [editedRoomType, setEditedRoomType] = useState("");
  const { rooms, venues, setRooms, setVenues, fetchRoomAndVenue, room_Types, fetchRoomTypes  } =
    useRoomVenueContentsContext();
  const itemsPerPage = 8;
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [renders, setRenderers] = useState(0);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItemType, setNewItemType] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemRoomType, setNewItemRoomType] = useState("");
  const [newItemId, setNewItemId] = useState("");

  const [newItemCapacity, setNewItemCapacity] = useState("");
  const [newItemInternalPrice, setNewItemInternalPrice] = useState("");
  const [newItemExternalPrice, setNewItemExternalPrice] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemImage, setNewItemImage] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const { createNotification } = useNotifications();

  const allItems = [
    ...rooms.map((room) => ({ ...room, type: "Room" })),
    ...venues.map((venue) => ({ ...venue, type: "Venue" })),
  ];

  useEffect(() => {
    fetchRoomAndVenue();
    fetchRoomTypes();
  }, [renders]);

  useEffect(() => {
    fetchRoomTypes();
    setRoomTypes(room_Types);
  }, [renders]);

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.room_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.venue_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room_type?.room_type_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.room_status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.venue_status?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      item.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus =
      filterStatus === "all" ||
      (item.room_status || item.venue_status)?.toLowerCase() ===
        filterStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusColorBadge = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    const statusColors = {
      ready: "bg-green-200 text-green-800",
      onMaintenance: "bg-red-200 text-red-800",
      onCleaning: "bg-orange-200 text-orange-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setStatus(item.room_status || item.venue_status);
    setEditedName(item.room_name || item.venue_name);
    setEditedDescription(
      item.room_type?.room_type_description || item.venue_description
    );
    setEditedImageUrl(item.room_type?.room_type_img_url || item.venue_img_url);
    setEditedCapacity(item.venue_capacity || item.room_type?.room_type_capacity || "");
    setEditedInternalPrice(item.venue_pricing_internal || item.room_type?.room_type_price_internal || "");
    setEditedExternalPrice(item.venue_pricing_external || item.room_type?.room_type_price_external || "");
    setEditedRoomType(item.room_type?.room_type_id || "");
    setIsDialogOpen(true);
    setIsEditing(false);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSaveChanges = async () => {
    if (!selectedItem) return;
  
    const updatedItem = {
      id: selectedItem.room_id || selectedItem.venue_id,
      type: selectedItem.type,
      name: editedName,
      description: editedDescription,
      status: status,
    };
  
    if (selectedItem.type === "Venue") {
      updatedItem.capacity = parseInt(editedCapacity);
      updatedItem.pricing_internal = parseFloat(editedInternalPrice);
      updatedItem.pricing_external = parseFloat(editedExternalPrice);
    } else if (selectedItem.type === "Room") {
      updatedItem.room_type_id = editedRoomType;
    }
  
    if (editedImageUrl !== selectedItem.venue_img_url) {
      updatedItem.image_url = editedImageUrl;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/venue-room/${updatedItem.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedItem),
        }
      );
  
      if (!response.ok) throw new Error("Failed to update item");
  
      const result = await response.json();
  
      if (selectedItem.type === "Room") {
        setRooms(
          rooms.map((room) =>
            room.room_id === result.id ? { ...room, ...result } : room
          )
        );
      } else {
        setVenues(
          venues.map((venue) =>
            venue.venue_id === result.id ? { ...venue, ...result } : venue
          )
        );
      }
      setRenderers((prevKey) => prevKey + 1);
      setIsEditing(false);
      setIsDialogOpen(false);
  
      toast({
        title: "Success",
        description: "Item updated successfully",
        variant: "success",
      });
  
      createNotification({
        type: "Modified",
        description: `${selectedItem.type} "${editedName}" has been updated. Modifications include: ${
          editedName !== selectedItem.name ? "Name, " : ""
        }${editedDescription !== selectedItem.description ? "Description, " : ""}${
          status !== selectedItem.status ? "Status, " : ""
        }${
          selectedItem.type === "Venue"
            ? editedCapacity !== selectedItem.capacity
              ? "Capacity, "
              : "" +
                (editedInternalPrice !== selectedItem.pricing_internal
                  ? "Internal Price, "
                  : "") +
                (editedExternalPrice !== selectedItem.pricing_external
                  ? "External Price"
                  : "")
            : selectedItem.type === "Room" && editedRoomType !== selectedItem.room_type_id
            ? "Room Type"
            : ""
        }`,
        role: "employee",
      });
      
  
      setRenderers((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error updating item:", error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
  
      
    }
  };
  
  const handleDelete = async () => {
    if (!selectedItem) return;
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/venue-room/${
          selectedItem.room_id || selectedItem.venue_id
        }`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) throw new Error("Failed to delete item");
  
      if (selectedItem.type === "Room") {
        setRooms(rooms.filter((room) => room.room_id !== selectedItem.room_id));
      } else {
        setVenues(
          venues.filter((venue) => venue.venue_id !== selectedItem.venue_id)
        );
      }
      setRenderers((prevKey) => prevKey + 1);
      setIsDialogOpen(false);
  
      toast({
        title: "Success",
        description: "Item deleted successfully",
        variant: "success",
      });
  
      createNotification({
        type: "Deleted",
        description: `${selectedItem.type} "${selectedItem.name}" has been deleted`,
        role: "employee",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
  

    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseDialog = () => {
    if (isEditing) {
      setShowConfirmDialog(true);
    } else {
      setIsDialogOpen(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  const handleAddNew = () => {
    setIsAddDialogOpen(true);
    setNewItemType("");
    setNewItemName("");
    setNewItemRoomType("");
    setNewItemId("");
  };

  const handleNewItemTypeChange = (value) => {
    setNewItemType(value);
    setNewItemName("");
    setNewItemRoomType("");
    setNewItemId("");
  };

  const handleNewItemNameChange = (e) => {
    const name = e.target.value;
    setNewItemName(name);
    setNewItemId(name.replace(/\s+/g, ""));
  };

  const handleSaveNewItem = async () => {
    const idExists = allItems.some(
      (item) => item.room_id === newItemId || item.venue_id === newItemId
    );
  
    if (idExists) {
      toast({
        title: "Error",
        description: "An item with this ID already exists",
        variant: "destructive",
      });
  
  
      return;
    }
  
    const newItem = {
      type: newItemType,
      name: newItemName,
      id: newItemId,
      status: "ready",
    };
  
    if (newItemType === "Room") {
      newItem.room_type = newItemRoomType;
    } else {
      if (!newItemCapacity || !newItemInternalPrice || !newItemExternalPrice) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
  

  
        return;
      }
      newItem.capacity = parseInt(newItemCapacity);
      newItem.pricing_internal = parseFloat(newItemInternalPrice);
      newItem.pricing_external = parseFloat(newItemExternalPrice);
      newItem.description = newItemDescription;
      if (newItemImage) {
        newItem.image = newItemImage;
      }
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/add-venue-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
  
      if (!response.ok) throw new Error("Failed to add new item");
  
      const result = await response.json();
  
      if (newItemType === "Room") {
        setRooms([...rooms, result]);
      } else {
        setVenues([...venues, result]);
      }
  
      setIsAddDialogOpen(false);
      setRenderers((prevKey) => prevKey + 1);
  
      toast({
        title: "Success",
        description: "New item added successfully",
        variant: "success",
      });
  
      createNotification({
        type: "Created",
        description: `${newItemType} "${newItemName}" has been added`,
        role: "employee",
      });

    } catch (error) {
      console.error("Error adding new item:", error);
      toast({
        title: "Error",
        description: "Failed to add new item",
        variant: "destructive",
      });
  

    }
  };

  console.log("room Type: " , roomTypes)

  return (
    <>
      <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
        <NavigationSide isOpen={sidebarOpen} />

        <div className="flex-1 overflow-auto">
          <NavigationTop onSidebarToggle={toggleSidebar} />
          <div className="flex flex-col h-screen">
            <div className="p-6 space-y-6 flex-grow overflow-auto">
              <h1 className="text-2xl font-bold">Venue and Room Management</h1>

              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="venue">Venue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="onMaintenance">Maintenance</SelectItem>
                    <SelectItem value="onCleaning">Cleaning</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddNew}>Add New</Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-bg-[#0f172a]">
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Type</TableHead>
                      <TableHead className="text-white">Capacity</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedItems.map((item) => (
                      <TableRow
                        key={item.room_id || item.venue_id}
                        className="cursor-pointer hover:bg-blue-100"
                        onClick={() => handleRowClick(item)}
                      >
                        <TableCell className="font-medium">
                          {item.room_name || item.venue_name}
                        </TableCell>
                        <TableCell>
                          {item.type === "Room"
                            ? `${item.type} | ${
                                item.room_type?.room_type_name ??
                                "Unknown Room Type"
                              }`
                            : item.type}
                        </TableCell>

                        <TableCell>
                          {item.type === "Venue"
                            ? item.venue_capacity
                            : item.room_type?.room_type_capacity}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={getStatusColorBadge(
                              item.room_status || item.venue_status
                            )}
                          >
                            {item.room_status || item.venue_status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
  <div className="text-sm text-muted-foreground">
    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
    {Math.min(currentPage * itemsPerPage, filteredItems.length)} of{" "}
    {filteredItems.length} entries
  </div>
  <div className="flex items-center space-x-2">
    {/* Previous Button */}
    <Button
      variant="outline"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <ChevronLeft className="h-4 w-4" />
      Previous
    </Button>

    {/* Dynamic Pagination */}
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

    {/* Next Button */}
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

            </div>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="sm:max-w-[900px] border-none bg-transparent p-0 shadow-none"
            showCloseButton={false}
          >
            <div className="flex flex-row gap-4">
              <div className="w-[calc(50%-1rem)] flex flex-col gap-4">
                <Card className="flex-1 flex flex-col">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex items-center space-x-3 py-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {selectedItem?.type === "Room" ? "R" : "V"}
                      </div>
                      <div className="flex-grow">
                        {isEditing ? (
                          <Input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="font-medium"
                          />
                        ) : (
                          <div className="font-medium">{editedName}</div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          {selectedItem?.type === "Room"
                            ? `Id: ${selectedItem?.room_id}`
                            : `Id: ${selectedItem?.venue_id}`}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />
                    <ScrollArea className="flex-grow pr-4">
                      <div className="space-y-4">
                        {selectedItem?.type === "Room" && (
                          <>
                            <div className="flex flex-row gap-4 w-full justify-between">
                              <div className="px-6">
                                <p className="font-medium">Room Type</p>
                                {isEditing ? (
                                  <Select value={editedRoomType} onValueChange={setEditedRoomType}>
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select room type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {roomTypes.map((type) => (
                                        <SelectItem key={type.room_type_id} value={type.room_type_id}>
                                          {type.room_type_name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <p className="text-muted-foreground">
                                    {selectedItem?.room_type?.room_type_name}
                                  </p>
                                )}
                              </div>
                              <div className="px-6">
                                <p className="font-medium">Capacity</p>
                                <p className="text-muted-foreground">
                                  {selectedItem?.room_type?.room_type_capacity}{" "}
                                  persons
                                </p>
                              </div>
                            </div>

                            <div className="px-6">
                              <p className="font-medium">Pricing</p>
                              <div className="flex flex-row gap-8 justify-between">
                                <p className="text-sm">
                                  Internal:{" "}
                                  {formatPrice(
                                    selectedItem?.room_type
                                      ?.room_type_price_internal
                                  )}
                                </p>
                                <p className="text-sm">
                                  External:{" "}
                                  {formatPrice(
                                    selectedItem?.room_type
                                      ?.room_type_price_external
                                  )}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        {selectedItem?.type === "Venue" && (
                          <>
                            <div>
                              <p className="font-medium">Capacity</p>
                              {isEditing ? (
                                <Input
                                  type="number"
                                  value={editedCapacity}
                                  onChange={(e) => setEditedCapacity(e.target.value)}
                                  className="mt-1"
                                />
                              ) : (
                                <p className="text-muted-foreground">
                                  {selectedItem?.venue_capacity} persons
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">Pricing</p>
                              <div className="space-y-1">
                                {isEditing ? (
                                  <>
                                    <div className="flex items-center space-x-2">
                                      <Label htmlFor="internal-price">Internal:</Label>
                                      <Input
                                        id="internal-price"
                                        type="number"
                                        value={editedInternalPrice}
                                        onChange={(e) => setEditedInternalPrice(e.target.value)}
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Label htmlFor="external-price">External:</Label>
                                      <Input
                                        id="external-price"
                                        type="number"
                                        value={editedExternalPrice}
                                        onChange={(e) => setEditedExternalPrice(e.target.value)}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm">
                                      Internal:{" "}
                                      {formatPrice(
                                        selectedItem?.venue_pricing_internal
                                      )}
                                    </p>
                                    <p className="text-sm">
                                      External:{" "}
                                      {formatPrice(
                                        selectedItem?.venue_pricing_external
                                      )}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </ScrollArea>

                    <Separator className="my-4" />
                    <div className="font-medium mb-2">Previous Guests</div>
                    <ScrollArea className="h-[150px] w-full rounded-md border p-4">
                      {selectedItem?.guests &&
                      selectedItem.guests.length > 0 ? (
                        selectedItem.guests.map((guest, index) => (
                          <div
                            key={index}
                            className="mb-2 p-2 bg-gray-50 rounded"
                          >
                            <p className="font-medium">{guest}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">
                          No current guests
                        </p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={status}
                        onValueChange={handleStatusChange}
                        disabled={!isEditing}
                      >
                        <SelectTrigger
                          id="status"
                          className={`${getStatusColorBadge(status)} w-[180px]`}
                        >
                          <SelectValue placeholder={status} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="onMaintenance">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="onCleaning">Cleaning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                    {isEditing && selectedItem?.type === "Venue" ?  (
                      <Textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="mt-2 bg-white/10 border-black text-black flex-grow"
                      />
                    ) : (
                      <ScrollArea className="flex-grow">
                        <p className="text-sm">{editedDescription}</p>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square relative">
                        {isEditing && selectedItem?.type === "Venue" ? (
                          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                            <div className="text-center">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
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
                                    const reader = new FileReader();
                                    reader.onload = (e) => setEditedImageUrl(e.target.result);
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={editedImageUrl}
                            alt={`Image of ${editedName}`}
                            className="object-cover rounded-lg w-full h-full"
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
              </div>
              <div className="flex flex-col justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" onClick={handleCloseDialog}>
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="space-x-2">
                    {isEditing ? (
                      <Button variant="default" onClick={handleSaveChanges}>
                        <Save className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={handleEdit}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="mt-auto">
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unsaved Changes</DialogTitle>
            </DialogHeader>
            <p>
              You have unsaved changes. Are you sure you want to close without
              saving?
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowConfirmDialog(false);
                  setIsDialogOpen(false);
                  setIsEditing(false);
                }}
              >
                Close Without Saving
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Room or Venue</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newItemType}
                  onValueChange={handleNewItemTypeChange}
                >
                  <SelectTrigger className="w-[180px]" id="item-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Room">Room</SelectItem>
                    <SelectItem value="Venue">Venue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newItemName}
                  onChange={handleNewItemNameChange}
                  className="col-span-3"
                />
              </div>
              {newItemType === "Room" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room-type" className="text-right">
                    Room Type
                  </Label>
                  <Select
                    value={newItemRoomType}
                    onValueChange={setNewItemRoomType}
                  >
                    <SelectTrigger className="w-[180px]" id="room-type">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem
                          key={type.room_type_id}
                          value={type.room_type_id}
                        >
                          {type.room_type_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {newItemType === "Venue" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newItemCapacity}
                      onChange={(e) => setNewItemCapacity(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="internal-price" className="text-right">
                      Internal Price
                    </Label>
                    <Input
                      id="internal-price"
                      type="number"
                      value={newItemInternalPrice}
                      onChange={(e) => setNewItemInternalPrice(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="external-price" className="text-right">
                      External Price
                    </Label>
                    <Input
                      id="external-price"
                      type="number"
                      value={newItemExternalPrice}
                      onChange={(e) => setNewItemExternalPrice(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newItemDescription}
                      onChange={(e) => setNewItemDescription(e.target.value)}
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
                      onChange={(e) => setNewItemImage(e.target.files[0])}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id" className="text-right">
                  ID
                </Label>
                <Input
                  id="id"
                  value={newItemId}
                  readOnly
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSaveNewItem}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Toaster />
      </div>
    </>
  );
}