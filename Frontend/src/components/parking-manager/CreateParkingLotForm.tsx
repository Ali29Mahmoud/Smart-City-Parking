import React, { useState } from "react";
import { Icons } from "../icons";

interface CreateParkingLotFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateParkingLotForm({
  onClose,
  onSuccess,
}: CreateParkingLotFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: 0,
    basePrice: 0,
    demandFactor: 1.0,
    evFactor: 1.0,
    timeLimit: 24,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError("You are not authorized. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/manager/lot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 403) {
        throw new Error("You are not authorized to perform this action");
      }

      if (!response.ok) {
        throw new Error("Failed to create parking lot");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create parking lot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Parking Lot</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icons.Close className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Base Price (per hour)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.basePrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  basePrice: parseFloat(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Demand Factor
            </label>
            <input
              type="number"
              required
              min="1"
              step="0.1"
              value={formData.demandFactor}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  demandFactor: parseFloat(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              EV Factor
            </label>
            <input
              type="number"
              required
              min="1"
              step="0.1"
              value={formData.evFactor}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  evFactor: parseFloat(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Limit (hours)
            </label>
            <input
              type="number"
              required
              min="1"
              max="24"
              value={formData.timeLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  timeLimit: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isSubmitting ? "Creating..." : "Create Parking Lot"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
