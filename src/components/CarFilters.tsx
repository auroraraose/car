import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useCarStore } from '../store/carStore';

export default function CarFilters() {
  const { sortBy, sortOrder, statusFilter, setSortBy, setSortOrder, setStatusFilter } = useCarStore();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-gray-500" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="price">Price</option>
            <option value="year">Year</option>
            <option value="brand">Brand</option>
          </select>
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as any)}
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}