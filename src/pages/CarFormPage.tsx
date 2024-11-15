import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCarStore } from '../store/carStore';
import CarForm from '../components/CarForm';

export default function CarFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { cars, addCar, updateCar } = useCarStore();
  const car = id ? cars.find((c) => c.id === id) : undefined;

  const handleSubmit = (carData: Omit<Car, 'id'>) => {
    if (id) {
      updateCar(id, carData);
    } else {
      addCar(carData);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to list
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {id ? 'Edit Car' : 'Add New Car'}
          </h1>
          <CarForm
            initialData={car}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
}