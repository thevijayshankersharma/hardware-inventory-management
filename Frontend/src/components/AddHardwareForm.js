import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { addHardware, updateHardware } from '../services/api';
import { useToast } from "./ui/use-toast";
import { motion } from "framer-motion";
import { Loader2, Plus, X } from "lucide-react";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function AddHardwareForm({ onAdd, onClose, initialData = null }) {
  const [hardware, setHardware] = useState(initialData || {
    name: '',
    type: '',
    serialNumber: '',
    status: 'Available',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHardware(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (initialData && initialData._id) {
        result = await updateHardware(initialData._id, hardware);
      } else {
        result = await addHardware(hardware);
      }
      onAdd(result);
      toast({
        title: "Success",
        description: initialData ? "Hardware updated successfully!" : "Hardware added successfully!",
      });
      onClose();
    } catch (error) {
      console.error('Error adding/updating hardware:', error);
      toast({
        title: "Error",
        description: error.message || `Failed to ${initialData ? 'update' : 'add'} hardware. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-blue-800">
          {initialData ? 'Edit Hardware' : 'Add New Hardware'}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Hardware Name</Label>
              <Input
                id="name"
                name="name"
                value={hardware.name}
                onChange={handleChange}
                placeholder="Enter hardware name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Hardware Type</Label>
              <Select 
                name="type" 
                value={hardware.type} 
                onValueChange={(value) => setHardware(prev => ({ ...prev, type: value }))} 
                required
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select hardware type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer">Computer</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="Printer">Printer</SelectItem>
                  <SelectItem value="Network Device">Network Device</SelectItem>
                  <SelectItem value="Communication Device">Communication Device</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                name="serialNumber"
                value={hardware.serialNumber}
                onChange={handleChange}
                placeholder="Enter serial number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                name="status" 
                value={hardware.status} 
                onValueChange={(value) => setHardware(prev => ({ ...prev, status: value }))} 
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="In Use">In Use</SelectItem>
                  <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                  <SelectItem value="Out of Service">Out of Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={hardware.location}
                onChange={handleChange}
                placeholder="Enter location"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              type="submit" 
              disabled={loading} 
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  {initialData ? 'Update Hardware' : 'Add Hardware'}
                </>
              )}
            </Button>
            <Button 
              type="button" 
              onClick={onClose} 
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}