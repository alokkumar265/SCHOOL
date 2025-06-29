
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/backend/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, Book, Clock, Calendar, Award } from "lucide-react";

const MyCourses = () => {
  const { user } = useAuth();
  const isStudent = user?.role === "student";

  const courses = [
    {
      id: 1,
      name: "Mathematics",
      teacher: "Mrs. Smith",
      schedule: "Monday, Wednesday, Friday",
      time: "9:00 AM - 10:30 AM",
      progress: 65,
      room: "Room 101"
    },
    {
      id: 2,
      name: "Science",
      teacher: "Mr. Johnson",
      schedule: "Tuesday, Thursday",
      time: "11:00 AM - 12:30 PM",
      progress: 78,
      room: "Lab 3"
    },
    {
      id: 3,
      name: "English Literature",
      teacher: "Ms. Davis",
      schedule: "Monday, Wednesday",
      time: "1:00 PM - 2:30 PM",
      progress: 92,
      room: "Room 205"
    },
    {
      id: 4,
      name: "History",
      teacher: "Mr. Wilson",
      schedule: "Tuesday, Friday",
      time: "3:00 PM - 4:30 PM",
      progress: 45,
      room: "Room 304"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            View and manage your current courses and assignments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardHeader className="bg-school-primary text-white p-4">
                <CardTitle className="flex items-center justify-between">
                  <span>{course.name}</span>
                  <Book className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <School className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Teacher: {course.teacher}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{course.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Room: {course.room}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-school-secondary" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyCourses;
