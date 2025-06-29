import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/frontend/hooks/use-toast';
import { useAuth } from '@/backend/contexts/AuthContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { School, ArrowRight, GraduationCap, User, Users, BookOpen } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-school-primary/10 to-white flex flex-col">
      {/* Header with back to homepage link */}
      <header className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-school-primary hover:text-school-secondary transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180 mr-2" />
            <span className="text-sm font-medium">Back to Homepage</span>
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
          <div className="bg-school-primary text-white p-8 flex flex-col items-center">
            <div className="bg-white rounded-full p-3">
              <School className="h-10 w-10 text-school-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-4">Veena Public School</h1>
            <p className="text-sm mt-1 opacity-90">Student Portal Login</p>
          </div>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Student Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-school-primary hover:underline">Forgot password?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-school-primary hover:bg-school-primary/90 h-12 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In to Student Portal'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gray-50 p-6 border-t">
            <div className="text-sm text-center text-muted-foreground font-semibold">
              Quick Login - Demo Accounts:
            </div>
            <div className="grid grid-cols-1 gap-3 text-xs text-muted-foreground w-full">
              {/* Student Account - Highlighted */}
              <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer relative"
                   onClick={() => {setEmail('student@school.edu'); setPassword('student');}}>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  <strong className="text-blue-800">Student Portal</strong>
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">Class 1-12</span>
                </div>
                <div className="text-blue-700">student@school.edu / student</div>
                <div className="text-xs text-blue-600 mt-1">Access courses, grades, assignments, attendance</div>
              </div>
              
              <div className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => {setEmail('admin@school.edu'); setPassword('admin');}}>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-gray-600" />
                  <strong>Admin:</strong>
                </div>
                admin@school.edu / admin
              </div>
              <div className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => {setEmail('teacher@school.edu'); setPassword('teacher');}}>
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-gray-600" />
                  <strong>Teacher:</strong>
                </div>
                teacher@school.edu / teacher
              </div>
              <div className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => {setEmail('alumni@school.edu'); setPassword('alumni');}}>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="h-4 w-4 text-gray-600" />
                  <strong>Alumni:</strong>
                </div>
                alumni@school.edu / alumni
              </div>
            </div>
            
            {/* Student-specific information */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 text-sm mb-2">Student Portal Features:</h4>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• View and track your academic progress</li>
                <li>• Access course materials and assignments</li>
                <li>• Check attendance and grades</li>
                <li>• Communicate with teachers</li>
                <li>• Access school library resources</li>
                <li>• View school events and announcements</li>
              </ul>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
