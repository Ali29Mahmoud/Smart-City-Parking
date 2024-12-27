import React from 'react';
import { Icons } from '../icons';

export function PaymentMethods() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Icons.CreditCard className="h-6 w-6 text-gray-400" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/25</p>
            </div>
          </div>
          <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
            Default
          </span>
        </div>
      </div>
    </div>
  );
}