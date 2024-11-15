import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarStore } from '../store/carStore';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cars, deleteCar } = useCarStore();
  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Car not found</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(car.id);
      toast.success('Car deleted successfully');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to list
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/edit/${car.id}`)}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.brand} {car.model}
                </h1>
                <p className="text-lg text-gray-600">{car.year}</p>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                ${car.price.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Mileage</dt>
                    <dd className="font-medium">{car.mileage.toLocaleString()} km</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Fuel Type</dt>
                    <dd className="font-medium">{car.fuelType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Transmission</dt>
                    <dd className="font-medium">{car.transmission}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Color</dt>
                    <dd className="font-medium">{car.color}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Status</dt>
                    <dd className="font-medium capitalize">{car.status}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600">{car.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}