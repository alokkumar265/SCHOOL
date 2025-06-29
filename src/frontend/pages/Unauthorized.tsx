
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-school-primary">Access Denied</h1>
        <p className="text-lg text-muted-foreground mt-2">
          You don't have permission to access this page.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/dashboard')} variant="outline" className="mr-4">
            Return to Dashboard
          </Button>
          <Button onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
