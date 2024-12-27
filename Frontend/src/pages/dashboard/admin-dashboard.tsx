import React from 'react';
import { Users, ParkingSquare, AlertCircle } from 'lucide-react';
import { AdminStats } from '@/components/admin/admin-stats';
import { UsersList } from '@/components/admin/UsersList';
import { ParkingLotsList } from '@/components/admin/parking-lots-list';
import { useAdmin } from '@/hooks/use-admin';

export const AdminDashboard = () => {
  const { stats, users, parkingLots } = useAdmin();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">System Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AdminStats
          icon={<Users />}
          title="Total Users"
          value={stats?.totalUsers}
          change={stats?.userGrowth}
        />
        <AdminStats
          icon={<ParkingSquare />}
          title="Active Lots"
          value={stats?.activeLots}
          change={stats?.lotGrowth}
        />
        <AdminStats
          icon={<AlertCircle />}
          title="Issues"
          value={stats?.activeIssues}
          change={stats?.issueChange}
          trend="negative"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <UsersList users={users} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Parking Lots</h2>
          <ParkingLotsList lots={parkingLots} />
        </div>
      </div>
    </div>
  );
};