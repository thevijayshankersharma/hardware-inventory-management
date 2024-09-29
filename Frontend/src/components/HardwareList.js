import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Trash2, Plus, LogOut, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useToast } from "./ui/use-toast";
import { getHardware, deleteHardware } from '../services/api';
import AddHardwareForm from './AddHardwareForm';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog.js";

export default function HardwareList({ onLogout }) {
  const [hardware, setHardware] = useState([]);
  const [filteredHardware, setFilteredHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchHardware();
  }, []);

  useEffect(() => {
    setFilteredHardware(
      hardware.filter(item =>
        Object.values(item).some(val =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, hardware]);

  const fetchHardware = async () => {
    try {
      const data = await getHardware();
      setHardware(data);
      setFilteredHardware(data);
    } catch (error) {
      console.error('Error fetching hardware:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hardware. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    fetchHardware();
    setIsAdding(false);
    toast({
      title: "Success",
      description: "Hardware added successfully.",
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteHardware(id);
      fetchHardware();
      toast({
        title: "Success",
        description: "Hardware deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting hardware:', error);
      toast({
        title: "Error",
        description: "Failed to delete hardware. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen"
    >
      <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
  <CardTitle className="text-3xl font-bold text-blue-800">
    MP Police Hardware Inventory
  </CardTitle>
  <Button 
    onClick={onLogout} 
    variant="outline"
    className="border-red-500 text-red-500 hover:bg-red-50 transition duration-200 ml-auto"
  >
    <LogOut className="mr-2 h-4 w-4" /> Logout
  </Button>
</CardHeader>


        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Button 
              onClick={() => setIsAdding(true)} 
              className="bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Hardware
            </Button>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search hardware..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button
                variant="outline"
                onClick={fetchHardware}
                className="border-blue-500 text-blue-500 hover:bg-blue-50 transition duration-200"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <AddHardwareForm onAdd={handleAdd} />
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-blue-500 ml-2">Loading hardware...</p>
            </div>
          ) : filteredHardware.length === 0 ? (
            <div className="flex flex-col items-center py-8">
              <p className="text-gray-600 text-lg">No hardware items available.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold text-blue-800">Name</TableHead>
                    <TableHead className="font-semibold text-blue-800">Type</TableHead>
                    <TableHead className="font-semibold text-blue-800">Serial Number</TableHead>
                    <TableHead className="font-semibold text-blue-800">Status</TableHead>
                    <TableHead className="font-semibold text-blue-800">Location</TableHead>
                    <TableHead className="font-semibold text-blue-800">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHardware.map((item) => (
                    <TableRow key={item._id} className="hover:bg-blue-50 transition-colors duration-200">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.serialNumber}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the hardware item.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
