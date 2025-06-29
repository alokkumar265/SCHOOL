
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { School } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-school-light to-white">
      <div className="text-center p-8 rounded-lg bg-white shadow-md max-w-md">
        <School className="h-16 w-16 text-school-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-school-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-sm text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
