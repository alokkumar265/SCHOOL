
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Student } from '@/types';
import { AttendanceChart } from '../analytics/AttendanceChart';
import { PerformanceChart } from '../analytics/PerformanceChart';
import StudentProfileCard from './StudentProfileCard';

interface StudentDetailViewProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockAttendanceData = [
  { name: 'Present', value: 85, color: '#4ade80' },
  { name: 'Absent', value: 10, color: '#f87171' },
  { name: 'Late', value: 5, color: '#facc15' },
];

const mockPerformanceData = [
  { subject: 'Math', average: 85, classAverage: 78 },
  { subject: 'Science', average: 72, classAverage: 75 },
  { subject: 'English', average: 90, classAverage: 82 },
  { subject: 'History', average: 78, classAverage: 80 },
  { subject: 'Geography', average: 88, classAverage: 79 },
];

export const StudentDetailView = ({ 
  student,
  open,
  onOpenChange
}: StudentDetailViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>
            Comprehensive information about {student.guardianName}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 py-4">
            <StudentProfileCard student={student} />
          </TabsContent>
          
          <TabsContent value="academic" className="space-y-4 py-4">
            <PerformanceChart 
              data={mockPerformanceData}
              title="Academic Performance" 
              description={`Performance metrics for ${student.guardianName}`}
            />
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4 py-4">
            <AttendanceChart 
              data={mockAttendanceData}
              title="Attendance Overview" 
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailView;
