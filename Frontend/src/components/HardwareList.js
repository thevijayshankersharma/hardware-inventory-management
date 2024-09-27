import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { getHardware, deleteHardware } from '../services/api';
import AddHardwareForm from './AddHardwareForm';

export default function HardwareList() {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">MP Police Hardware Inventory Management</h2>
      <Button onClick={() => setIsAdding(true)}>Add Hardware</Button>

      {/* Show form only when adding */}
      {isAdding && <AddHardwareForm onAdd={handleAdd} />}

      {loading ? (
        <p>Loading...</p>
      ) : hardware.length === 0 ? (
        <p>No hardware items available.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hardware.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.serialNumber}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDelete(item._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
