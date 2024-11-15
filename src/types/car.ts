export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  fuelType: string;
  transmission: string;
  status: 'available' | 'sold' | 'maintenance';
  image: string;
  description: string;
}