
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/types';

interface StudentProfileCardProps {
  student: Student;
  showDetails?: boolean;
  className?: string;
}

export const StudentProfileCard = ({ 
  student,
  showDetails = true,
  className = ""
}: StudentProfileCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Student Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.admissionNumber}`} alt={student.guardianName} />
            <AvatarFallback>{getInitials(student.guardianName)}</AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold">{student.guardianName}</h3>
            <div className="flex gap-2 justify-center my-1">
              <Badge variant="secondary">Class {student.class}</Badge>
              <Badge variant="outline">Section {student.section}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{student.admissionNumber}</p>
          </div>

          {showDetails && (
            <div className="w-full pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Roll Number:</span>
                <span className="text-sm font-medium">{student.rollNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Guardian Contact:</span>
                <span className="text-sm font-medium">{student.guardianContact}</span>
              </div>
              
              {student.dateOfBirth && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date of Birth:</span>
                  <span className="text-sm font-medium">{new Date(student.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
              
              {student.bloodGroup && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Blood Group:</span>
                  <span className="text-sm font-medium">{student.bloodGroup}</span>
                </div>
              )}
              
              {student.address && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Address:</span>
                  <span className="text-sm font-medium max-w-[200px] text-right">{student.address}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfileCard;
