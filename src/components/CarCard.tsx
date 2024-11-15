import React from 'react';
import { Car } from '../types/car';
import { Car as CarIcon, Fuel, Gauge, Settings2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarCardProps {
  car: Car;
  onStatusChange: (id: string, status: Car['status']) => void;
}

export default function CarCard({ car, onStatusChange }: CarCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    sold: 'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {car.brand} {car.model}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[car.status]
            }`}
          >
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <CarIcon className="w-5 h-5 mr-2" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Gauge className="w-5 h-5 mr-2" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Fuel className="w-5 h-5 mr-2" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Settings2 className="w-5 h-5 mr-2" />
            <span>{car.transmission}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold text-gray-900">
            ${car.price.toLocaleString()}
          </p>
        </div>

        <div className="mt-4 space-y-4">
          <select
            value={car.status}
            onChange={(e) => onStatusChange(car.id, e.target.value as Car['status'])}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <Link
            to={`/car/${car.id}`}
            className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}