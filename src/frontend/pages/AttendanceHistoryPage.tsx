import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock } from 'lucide-react';

const mockAttendanceHistory = [
  { date: '2025-06-01', status: 'Present' },
  { date: '2025-06-02', status: 'Present' },
  { date: '2025-06-03', status: 'Absent' },
  { date: '2025-06-04', status: 'Present' },
  { date: '2025-06-05', status: 'Late' },
  { date: '2025-06-06', status: 'Present' },
  { date: '2025-06-07', status: 'Present' },
  { date: '2025-06-08', status: 'Present' },
  { date: '2025-06-09', status: 'Present' },
  { date: '2025-06-10', status: 'Present' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Present': return 'text-green-600';
    case 'Absent': return 'text-red-600';
    case 'Late': return 'text-yellow-600';
    default: return 'text-gray-600';
  }
};

const AttendanceHistoryPage = () => (
  <DashboardLayout>
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Attendance History
          </CardTitle>
          <CardDescription>Detailed attendance records for the current month</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttendanceHistory.map((rec, idx) => (
                <TableRow key={idx}>
                  <TableCell>{rec.date}</TableCell>
                  <TableCell className={getStatusColor(rec.status)}>{rec.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default AttendanceHistoryPage; 