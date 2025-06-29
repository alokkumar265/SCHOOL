
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Department } from '@/types';
import { Plus, Edit, Trash, Search } from 'lucide-react';

// Mock department data
const mockDepartments: Department[] = [
  { id: '1', name: 'Mathematics', description: 'Mathematics and Statistics', headOfDepartment: 'John Doe' },
  { id: '2', name: 'Science', description: 'Physics, Chemistry and Biology', headOfDepartment: 'Jane Smith' },
  { id: '3', name: 'History', description: 'World History and Geography', headOfDepartment: 'Mark Wilson' },
  { id: '4', name: 'English', description: 'Literature and Language Arts', headOfDepartment: 'Emily White' },
  { id: '5', name: 'Computer Science', description: 'Programming and Information Technology', headOfDepartment: 'David Brown' },
  { id: '6', name: 'Physical Education', description: 'Sports and Physical Fitness', headOfDepartment: 'Sarah Johnson' },
  { id: '7', name: 'Arts', description: 'Visual Arts and Design', headOfDepartment: 'Michael Lee' },
  { id: '8', name: 'Music', description: 'Music Theory and Performance', headOfDepartment: 'Laura Chen' },
];

const DepartmentsManagement = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
    name: '',
    description: '',
    headOfDepartment: '',
  });
  const { toast } = useToast();

  const handleAddDepartment = () => {
    if (!newDepartment.name) {
      toast({
        title: 'Missing Information',
        description: 'Department name is required',
        variant: 'destructive',
      });
      return;
    }

    const department: Department = {
      id: String(departments.length + 1),
      name: newDepartment.name,
      description: newDepartment.description || '',
      headOfDepartment: newDepartment.headOfDepartment || '',
    };

    setDepartments([...departments, department]);
    setNewDepartment({
      name: '',
      description: '',
      headOfDepartment: '',
    });
    setIsAddDialogOpen(false);

    toast({
      title: 'Department Added',
      description: `${department.name} has been added successfully`,
    });
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    toast({
      title: 'Department Deleted',
      description: 'Department has been removed',
    });
  };

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.description && dept.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (dept.headOfDepartment && dept.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Departments Management</h2>
            <p className="text-muted-foreground">
              Add and manage academic departments
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Create a new academic department. Department name is required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="head" className="text-right">
                    Head
                  </Label>
                  <Input
                    id="head"
                    value={newDepartment.headOfDepartment}
                    onChange={(e) => setNewDepartment({ ...newDepartment, headOfDepartment: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newDepartment.description}
                    onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddDepartment}>
                  Add Department
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="my-6 w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments by name, description or head..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((dept) => (
            <Card key={dept.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{dept.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteDepartment(dept.id)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Head: {dept.headOfDepartment || 'Not assigned'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {dept.description || 'No description available'}
                </p>
              </CardContent>
            </Card>
          ))}
          
          {filteredDepartments.length === 0 && (
            <div className="col-span-full py-6 text-center text-muted-foreground">
              No departments found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentsManagement;
