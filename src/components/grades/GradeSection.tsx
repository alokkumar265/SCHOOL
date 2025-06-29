
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface GradeInfo {
  id: number;
  course: string;
  grade: string;
  score: number;
  semester: string;
  comments: string;
}

interface GradeSectionProps {
  title: string;
  grades: GradeInfo[];
  showGPA?: boolean;
}

export const GradeSection = ({ title, grades, showGPA = true }: GradeSectionProps) => {
  // Calculate GPA
  const calculateGPA = () => {
    const gradePoints: Record<string, number> = {
      'A+': 4.0,
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'F': 0.0
    };
    
    const totalPoints = grades.reduce((total, grade) => {
      return total + (gradePoints[grade.grade as keyof typeof gradePoints] || 0);
    }, 0);
    
    return (totalPoints / grades.length).toFixed(2);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {showGPA && grades.length > 0 && (
          <div className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium">
            GPA: {calculateGPA()}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Course</TableHead>
              <TableHead className="w-[100px]">Grade</TableHead>
              <TableHead className="w-[100px]">Score</TableHead>
              <TableHead className="hidden md:table-cell">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium">{grade.course}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                    grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                    grade.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {grade.grade}
                  </span>
                </TableCell>
                <TableCell>{grade.score}</TableCell>
                <TableCell className="text-muted-foreground hidden md:table-cell">{grade.comments}</TableCell>
              </TableRow>
            ))}
            {grades.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No grades available for this period.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GradeSection;
