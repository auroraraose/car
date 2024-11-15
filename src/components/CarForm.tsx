import React from 'react';
import { Car } from '../types/car';
import { toast } from 'react-hot-toast';

interface CarFormProps {
  onSubmit: (car: Omit<Car, 'id'>) => void;
  initialData?: Car;
  onCancel: () => void;
}

export default function CarForm({ onSubmit, initialData, onCancel }: CarFormProps) {
  const [formData, setFormData] = React.useState<Omit<Car, 'id'>>({
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    color: initialData?.color || '',
    fuelType: initialData?.fuelType || 'Petrol',
    transmission: initialData?.transmission || 'Automatic',
    status: initialData?.status || 'available',
    image: initialData?.image || '',
    description: initialData?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.brand.trim() || !formData.model.trim()) {
      toast.error('Brand and model are required');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      toast.error('Please enter a valid year');
      return;
    }

    if (!formData.image.trim()) {
      toast.error('Image URL is required');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand *</label>
          <input
            type="text"
            required
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Model *</label>
          <input
            type="text"
            required
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year *</label>
          <input
            type="number"
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price *</label>
          <input
            type="number"
            required
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mileage (km)</label>
          <input
            type="number"
            min="0"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
          <select
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Transmission</label>
          <select
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Car['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image URL *</label>
          <input
            type="url"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://example.com/car-image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {initialData ? 'Update Car' : 'Add Car'}
        </button>
      </div>
    </form>
  );
}