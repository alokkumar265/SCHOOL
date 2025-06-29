
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Student } from '@/types';
import { UserPlus, Edit, Trash, Search, FileText, ClipboardList, Filter, Download, Upload, BarChart } from 'lucide-react';
import StudentDetailView from '@/components/students/StudentDetailView';
import StudentProfileCard from '@/components/students/StudentProfileCard';
import { AttendanceChart } from '@/components/analytics/AttendanceChart';
import { PerformanceChart } from '@/components/analytics/PerformanceChart';

// Mock data
const mockStudents: Student[] = [
  { 
    id: '1', 
    userId: '4',
    admissionNumber: 'VPS-2023-001',
    rollNumber: '101',
    guardianName: 'John Smith',
    guardianContact: '+91 9876543210',
    class: '10',
    section: 'A',
    address: '123 Main Street, Delhi',
    dateOfBirth: '2005-05-15',
    admissionDate: '2022-04-01',
    bloodGroup: 'O+'
  },
  { 
    id: '2', 
    userId: '5',
    admissionNumber: 'VPS-2023-002',
    rollNumber: '102',
    guardianName: 'Robert Williams',
    guardianContact: '+91 9876543211',
    class: '10',
    section: 'A',
    address: '456 Park Avenue, Delhi',
    dateOfBirth: '2005-06-22',
    admissionDate: '2022-04-01',
    bloodGroup: 'A+'
  },
  { 
    id: '3', 
    userId: '6',
    admissionNumber: 'VPS-2023-003',
    rollNumber: '103',
    guardianName: 'Michael Johnson',
    guardianContact: '+91 9876543212',
    class: '9',
    section: 'B',
    address: '789 Oak Lane, Delhi',
    dateOfBirth: '2006-03-10',
    admissionDate: '2022-04-02',
    bloodGroup: 'B+'
  },
  { 
    id: '4', 
    userId: '7',
    admissionNumber: 'VPS-2023-004',
    rollNumber: '104',
    guardianName: 'David Brown',
    guardianContact: '+91 9876543213',
    class: '9',
    section: 'A',
    address: '101 Pine Street, Delhi',
    dateOfBirth: '2006-07-18',
    admissionDate: '2022-04-02',
    bloodGroup: 'AB+'
  },
  { 
    id: '5', 
    userId: '8',
    admissionNumber: 'VPS-2023-005',
    rollNumber: '105',
    guardianName: 'Sarah Davis',
    guardianContact: '+91 9876543214',
    class: '8',
    section: 'C',
    address: '202 Maple Road, Delhi',
    dateOfBirth: '2007-11-30',
    admissionDate: '2022-04-03',
    bloodGroup: 'O-'
  },
];

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

const grades = ['6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D'];

const StudentsManagement = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    admissionNumber: '',
    rollNumber: '',
    guardianName: '',
    guardianContact: '',
    class: '',
    section: '',
    address: '',
    dateOfBirth: '',
    admissionDate: new Date().toISOString().split('T')[0],
    bloodGroup: '',
  });
  const [filterClass, setFilterClass] = useState<string | null>(null);
  const [filterSection, setFilterSection] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleAddStudent = () => {
    if (!newStudent.admissionNumber || !newStudent.rollNumber || !newStudent.guardianName) {
      toast({
        title: 'Missing Information',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    const student: Student = {
      id: String(students.length + 1),
      userId: String(Math.floor(Math.random() * 1000)),
      admissionNumber: newStudent.admissionNumber,
      rollNumber: newStudent.rollNumber,
      guardianName: newStudent.guardianName,
      guardianContact: newStudent.guardianContact || '',
      class: newStudent.class,
      section: newStudent.section,
      address: newStudent.address || '',
      dateOfBirth: newStudent.dateOfBirth || '',
      admissionDate: newStudent.admissionDate || new Date().toISOString().split('T')[0],
      bloodGroup: newStudent.bloodGroup,
    };

    setStudents([...students, student]);
    setNewStudent({
      admissionNumber: '',
      rollNumber: '',
      guardianName: '',
      guardianContact: '',
      class: '',
      section: '',
      address: '',
      dateOfBirth: '',
      admissionDate: new Date().toISOString().split('T')[0],
      bloodGroup: '',
    });
    setIsAddStudentDialogOpen(false);

    toast({
      title: 'Student Added',
      description: `${student.admissionNumber} has been added successfully`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    toast({
      title: 'Student Deleted',
      description: 'Student has been removed from the system',
    });
  };

  const handleViewStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailViewOpen(true);
  };

  const filteredStudents = students.filter(student => {
    // Filter by search term
    const matchesSearch = 
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.guardianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.class && student.class.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.section && student.section.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by class if selected
    const matchesClass = filterClass ? student.class === filterClass : true;
    
    // Filter by section if selected
    const matchesSection = filterSection ? student.section === filterSection : true;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  // Get unique classes from all students
  const classes = Array.from(new Set(students.map(student => student.class))).filter(Boolean);
  
  // Get unique sections from filtered class (if class filter is applied)
  const sections = Array.from(
    new Set(
      students
        .filter(student => filterClass ? student.class === filterClass : true)
        .map(student => student.section)
    )
  ).filter(Boolean);

  // Count students by class for statistics
  const studentsByClass = classes.map(classGrade => {
    const count = students.filter(student => student.class === classGrade).length;
    return { name: `Class ${classGrade}`, value: count, color: `hsl(${parseInt(classGrade || '0') * 30}, 70%, 60%)` };
  });

  // Count students by section (if class filter is applied)
  const studentsBySection = sections.map(section => {
    const count = students.filter(student => 
      student.section === section && 
      (filterClass ? student.class === filterClass : true)
    ).length;
    return { name: `Section ${section}`, value: count, color: `hsl(${(section?.charCodeAt(0) || 65) * 20}, 70%, 60%)` };
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Students Management</h2>
            <p className="text-muted-foreground">
              Manage all students of Veena Public School
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter student details. All fields marked with * are required.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="admissionNumber">
                        Admission Number *
                      </Label>
                      <Input
                        id="admissionNumber"
                        value={newStudent.admissionNumber}
                        onChange={(e) => setNewStudent({ ...newStudent, admissionNumber: e.target.value })}
                        placeholder="VPS-YYYY-XXX"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rollNumber">
                        Roll Number *
                      </Label>
                      <Input
                        id="rollNumber"
                        value={newStudent.rollNumber}
                        onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="guardianName">
                      Guardian Name *
                    </Label>
                    <Input
                      id="guardianName"
                      value={newStudent.guardianName}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianName: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="guardianContact">
                      Guardian Contact *
                    </Label>
                    <Input
                      id="guardianContact"
                      value={newStudent.guardianContact}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianContact: e.target.value })}
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="class">Class</Label>
                      <Select
                        value={newStudent.class}
                        onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="section">Section</Label>
                      <Select
                        value={newStudent.section}
                        onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          {sections.map((section) => (
                            <SelectItem key={section} value={section}>
                              {section}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newStudent.address}
                      onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={newStudent.dateOfBirth}
                        onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select
                        value={newStudent.bloodGroup}
                        onValueChange={(value) => setNewStudent({ ...newStudent, bloodGroup: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStudent}>
                    Add Student
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by admission number, roll number, name or class..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="w-28">
                  <Select
                    value={filterClass || ""}
                    onValueChange={(value) => {
                      setFilterClass(value || null);
                      setFilterSection(null); // Reset section when class changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map((classGrade) => (
                        <SelectItem key={classGrade} value={classGrade || ""}>
                          Class {classGrade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-28">
                  <Select 
                    value={filterSection || ""} 
                    onValueChange={(value) => setFilterSection(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sections</SelectItem>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section || ""}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setFilterClass(null);
                    setFilterSection(null);
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>
                  Total students: {filteredStudents.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Admission No.</TableHead>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Guardian Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.admissionNumber}</TableCell>
                          <TableCell>{student.rollNumber}</TableCell>
                          <TableCell>{student.guardianName}</TableCell>
                          <TableCell>{student.guardianContact}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.section}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleViewStudentDetails(student)}
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student.id)}>
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredStudents.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No students found matching your search criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cards" className="space-y-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="w-28">
                  <Select
                    value={filterClass || ""}
                    onValueChange={(value) => {
                      setFilterClass(value || null);
                      setFilterSection(null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map((classGrade) => (
                        <SelectItem key={classGrade} value={classGrade || ""}>
                          Class {classGrade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-28">
                  <Select 
                    value={filterSection || ""} 
                    onValueChange={(value) => setFilterSection(value || null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sections</SelectItem>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section || ""}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setFilterClass(null);
                    setFilterSection(null);
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="relative group">
                  <StudentProfileCard 
                    student={student} 
                    showDetails={false}
                    className="h-full transition-all hover:shadow-md group-hover:border-primary"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleViewStudentDetails(student)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  No students found matching your search criteria.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AttendanceChart 
                data={studentsByClass} 
                title="Students by Class" 
              />
              
              {filterClass && (
                <AttendanceChart 
                  data={studentsBySection} 
                  title={`Class ${filterClass} - Students by Section`} 
                />
              )}
              
              <PerformanceChart 
                data={mockPerformanceData}
                title="Performance Analysis by Subject" 
                description="Average student performance by subject"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedStudent && (
        <StudentDetailView
          student={selectedStudent}
          open={isDetailViewOpen}
          onOpenChange={setIsDetailViewOpen}
        />
      )}
    </DashboardLayout>
  );
};

export default StudentsManagement;
