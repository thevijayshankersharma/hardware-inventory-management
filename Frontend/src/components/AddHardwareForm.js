import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { addHardware } from '../services/api';

export default function AddHardwareForm({ onAdd }) {
  const [hardware, setHardware] = useState({
    name: '',
    type: '',
    serialNumber: '',
    status: 'Available',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setHardware({ ...hardware, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await addHardware(hardware);
      onAdd();  // Call the onAdd function to refresh the list
      setSuccess('Hardware added successfully!');
      setHardware({ name: '', type: '', serialNumber: '', status: 'Available', location: '' });
    } catch (error) {
      console.error('Error adding hardware:', error);
      setError('Error adding hardware. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setHardware({ name: '', type: '', serialNumber: '', status: 'Available', location: '' });
    setError('');
    setSuccess('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add New Hardware</h3>
      
      <Input
        type="text"
        name="name"
        value={hardware.name}
        onChange={handleChange}
        placeholder="Hardware Name"
        required
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <Input
        type="text"
        name="type"
        value={hardware.type}
        onChange={handleChange}
        placeholder="Hardware Type"
        required
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <Input
        type="text"
        name="serialNumber"
        value={hardware.serialNumber}
        onChange={handleChange}
        placeholder="Serial Number"
        required
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <Select 
        name="status" 
        value={hardware.status} 
        onValueChange={(value) => setHardware({ ...hardware, status: value })}
        className="border border-gray-300 rounded"
      >
        <SelectTrigger className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="In Use">In Use</SelectItem>
          <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
        </SelectContent>
      </Select>
      
      <Input
        type="text"
        name="location"
        value={hardware.location}
        onChange={handleChange}
        placeholder="Location"
        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="flex space-x-2 mt-4">
        <Button 
          type="submit" 
          disabled={loading} 
          className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
        >
          {loading ? 'Adding...' : 'Add Hardware'}
        </Button>
        <Button 
          type="button" 
          onClick={handleClear} 
          className="flex-1 bg-gray-300 hover:bg-gray-400 transition duration-200"
        >
          Clear
        </Button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
}
