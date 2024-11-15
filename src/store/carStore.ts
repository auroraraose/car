import { create } from 'zustand';
import { Car } from '../types/car';

interface CarState {
  cars: Car[];
  sortBy: 'price' | 'year' | 'brand';
  sortOrder: 'asc' | 'desc';
  statusFilter: Car['status'] | 'all';
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  setSortBy: (sortBy: CarState['sortBy']) => void;
  setSortOrder: (order: CarState['sortOrder']) => void;
  setStatusFilter: (status: CarState['statusFilter']) => void;
}

const initialCars: Car[] = [
  {
    id: '1',
    brand: 'Tesla',
    model: 'Model S',
    year: 2023,
    price: 89990,
    mileage: 0,
    color: 'Pearl White',
    fuelType: 'Electric',
    transmission: 'Automatic',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000',
    description: 'Luxury electric sedan with advanced autopilot capabilities.'
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'M5',
    year: 2023,
    price: 103100,
    mileage: 1200,
    color: 'Black Sapphire',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000',
    description: 'High-performance luxury sedan with twin-turbo V8 engine.'
  },
];

export const useCarStore = create<CarState>((set) => ({
  cars: initialCars,
  sortBy: 'price',
  sortOrder: 'desc',
  statusFilter: 'all',
  addCar: (car) =>
    set((state) => ({
      cars: [...state.cars, { ...car, id: Math.random().toString(36).substr(2, 9) }],
    })),
  updateCar: (id, updatedCar) =>
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === id ? { ...car, ...updatedCar } : car
      ),
    })),
  deleteCar: (id) =>
    set((state) => ({
      cars: state.cars.filter((car) => car.id !== id),
    })),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
}));