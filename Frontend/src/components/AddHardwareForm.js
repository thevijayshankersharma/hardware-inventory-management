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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        value={hardware.name}
        onChange={handleChange}
        placeholder="Hardware Name"
        required
      />
      <Input
        type="text"
        name="type"
        value={hardware.type}
        onChange={handleChange}
        placeholder="Hardware Type"
        required
      />
      <Input
        type="text"
        name="serialNumber"
        value={hardware.serialNumber}
        onChange={handleChange}
        placeholder="Serial Number"
        required
      />
      <Select name="status" value={hardware.status} onValueChange={(value) => setHardware({ ...hardware, status: value })}>
        <SelectTrigger>
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
      />
      <div className="flex space-x-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Hardware'}
        </Button>
        <Button type="button" onClick={handleClear}>Clear</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
}
