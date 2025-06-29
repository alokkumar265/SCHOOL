import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/backend/contexts/AuthContext'; // Changed from @/contexts/AuthContext
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { School, ArrowRight } from 'lucide-react';

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
            <p className="text-sm mt-1 opacity-90">Sign in to your account</p>
          </div>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@school.edu"
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
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gray-50 p-6 border-t">
            <div className="text-sm text-center text-muted-foreground">
              Demo Accounts:
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground w-full">
              <div className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => {setEmail('admin@school.edu'); setPassword('admin');}}>
                <strong>Admin:</strong> admin@school.edu / admin
              </div>
              <div className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => {setEmail('teacher@school.edu'); setPassword('teacher');}}>
                <strong>Teacher:</strong> teacher@school.edu / teacher
              </div>
              <div className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => {setEmail('student@school.edu'); setPassword('student');}}>
                <strong>Student:</strong> student@school.edu / student
              </div>
              <div className="p-2 bg-white border rounded hover:bg-gray-50 transition-colors cursor-pointer"
                   onClick={() => {setEmail('alumni@school.edu'); setPassword('alumni');}}>
                <strong>Alumni:</strong> alumni@school.edu / alumni
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
