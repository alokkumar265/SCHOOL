
import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const StaffPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
        <p className="text-muted-foreground">Manage school staff and faculty members.</p>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Staff management content will be displayed here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffPage;
