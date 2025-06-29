export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'staff' | 'alumni';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  active: boolean;
  phoneNumber?: string;
  address?: string;
  joiningDate?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  headOfDepartment?: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  students: string[];
  room?: string;
  schedule?: Schedule[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  description?: string;
  credits: number;
}

export interface Student {
  id: string;
  userId: string;
  admissionNumber: string;
  rollNumber: string;
  guardianName: string;
  guardianContact: string;
  class?: string;
  section?: string;
  address: string;
  dateOfBirth: string;
  admissionDate: string;
  bloodGroup?: string;
}

export interface Staff {
  id: string;
  userId: string;
  employeeId: string;
  designation: string;
  qualification: string;
  experience: number;
  joiningDate: string;
  salary: number;
  departmentId: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  academicYear: string;
  grade: string;
  amount: number;
  dueDate: string;
  description?: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'cheque' | 'online';
  status: 'paid' | 'pending' | 'partial' | 'overdue';
  receiptNumber: string;
  transactionId?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface Schedule {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  courseId: string;
  teacherId: string;
  roomNumber: string;
}

export interface Exam {
  id: string;
  name: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
}

export interface Grade {
  id: string;
  studentId: string;
  examId: string;
  marks: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  remarks?: string;
}

// Add a theme object for styling consistency
export interface SchoolTheme {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
  dark: string;
}
