import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { parkingApi } from '@/services/api';

interface ReservationForm {
  startTime: string;
  duration: number;
}

export const CreateReservation = () => {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ReservationForm>();

  const onSubmit = async (data: ReservationForm) => {
    try {
      const startTime = new Date(data.startTime);
      const endTime = new Date(startTime.getTime() + data.duration * 60 * 60 * 1000);

      await parkingApi.createReservation({
        spotId: spotId!,
        startTime,
        endTime,
      });

      toast.success('Reservation created successfully!');
      navigate('/reservations');
    } catch (error) {
      toast.error('Failed to create reservation');
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Reservation</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <div className="mt-1 relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="datetime-local"
              {...register('startTime')}
              className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (hours)
          </label>
          <div className="mt-1 relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              {...register('duration')}
              className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="4">4 hours</option>
              <option value="8">8 hours</option>
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Confirm Reservation
        </Button>
      </form>
    </div>
  );
};