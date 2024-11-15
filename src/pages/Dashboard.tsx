import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Search } from 'lucide-react';
import { useCarStore } from '../store/carStore';
import { useAuthStore } from '../store/authStore';
import CarCard from '../components/CarCard';
import CarFilters from '../components/CarFilters';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { cars, sortBy, sortOrder, statusFilter, updateCar } = useCarStore();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const filteredAndSortedCars = React.useMemo(() => {
    return cars
      .filter((car) => {
        const matchesSearch = `${car.brand} ${car.model} ${car.year}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || car.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'price') {
          comparison = a.price - b.price;
        } else if (sortBy === 'year') {
          comparison = a.year - b.year;
        } else if (sortBy === 'brand') {
          comparison = a.brand.localeCompare(b.brand);
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [cars, searchTerm, sortBy, sortOrder, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Car Management System</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/add')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add New Car
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cars by brand, model, or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <CarFilters />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onStatusChange={(id, status) => {
                  updateCar(id, { status });
                  toast.success('Car status updated successfully');
                }}
              />
            ))}
          </div>

          {filteredAndSortedCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}