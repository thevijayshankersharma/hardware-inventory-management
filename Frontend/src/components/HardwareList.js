import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { getHardware, deleteHardware } from '../services/api';
import AddHardwareForm from './AddHardwareForm';

export default function HardwareList({ onLogout }) {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHardware();
  }, []);

  const fetchHardware = async () => {
    try {
      const data = await getHardware();
      console.log('Fetched hardware:', data);
      setHardware(data);
    } catch (error) {
      console.error('Error fetching hardware:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    fetchHardware();
    setIsAdding(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        await deleteHardware(id);
        fetchHardware();
      } catch (error) {
        console.error('Error deleting hardware:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          MP Police Hardware Inventory Management
        </h2>
        <Button 
          onClick={handleLogout} 
          className="bg-red-500 text-white hover:bg-red-600 transition duration-200"
        >
          Logout
        </Button>
      </div>

      <Button 
        onClick={() => setIsAdding(true)} 
        className="mb-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
      >
        Add Hardware
      </Button>

      {/* Show form only when adding */}
      {isAdding && <AddHardwareForm onAdd={handleAdd} />}

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : hardware.length === 0 ? (
        <p className="text-gray-600">No hardware items available.</p>
      ) : (
        <Table className="border border-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-left p-3 text-gray-700">Name</TableHead>
              <TableHead className="text-left p-3 text-gray-700">Type</TableHead>
              <TableHead className="text-left p-3 text-gray-700">Serial Number</TableHead>
              <TableHead className="text-left p-3 text-gray-700">Status</TableHead>
              <TableHead className="text-left p-3 text-gray-700">Location</TableHead>
              <TableHead className="text-left p-3 text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hardware.map((item) => (
              <TableRow key={item._id} className="border-b hover:bg-gray-50">
                <TableCell className="p-3">{item.name}</TableCell>
                <TableCell className="p-3">{item.type}</TableCell>
                <TableCell className="p-3">{item.serialNumber}</TableCell>
                <TableCell className="p-3">{item.status}</TableCell>
                <TableCell className="p-3">{item.location}</TableCell>
                <TableCell className="p-3">
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(item._id)} 
                    className="bg-red-500 text-white hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
