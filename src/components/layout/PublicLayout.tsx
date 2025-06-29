import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Menu, X, School } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-school-primary rounded-full p-1.5">
                <School className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-school-primary">Veena Public School</h1>
                <p className="text-xs text-school-dark">Knowledge • Character • Excellence</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <Link to="/" className="text-school-dark hover:text-school-primary font-medium">
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="text-school-dark hover:text-school-primary font-medium">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/admission" className="text-school-dark hover:text-school-primary font-medium">
                    Admission
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/academics" className="text-school-dark hover:text-school-primary font-medium">
                    Academics
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/sports" className="text-school-dark hover:text-school-primary font-medium">
                    Sports
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/alumni" className="text-school-dark hover:text-school-primary font-medium">
                    Alumni
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/career" className="text-school-dark hover:text-school-primary font-medium">
                    Careers
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Desktop Call-to-actions */}
            <div className="hidden md:flex space-x-4">
              <Button 
                variant="outline" 
                className="border-school-primary text-school-primary hover:bg-school-primary hover:text-white"
                onClick={() => navigate('/admission-enquiry')}
              >
                Admission Enquiry
              </Button>
              <Button 
                className="bg-school-primary hover:bg-school-primary/90 text-white"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-school-dark" />
                ) : (
                  <Menu className="h-6 w-6 text-school-dark" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 animate-fade-in"
          >
            <nav className="container mx-auto px-4 py-3">
              <ul className="space-y-4 py-4">
                <li>
                  <Link 
                    to="/" 
                    className="block py-2 text-school-dark hover:text-school-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="block py-2 text-school-dark hover:text-school-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admission" 
                    className="block py-2 text-school-dark hover:text-school-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admission
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/academics" 
                    className="block py-2 text-school-dark hover:text-school-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Academics
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/sports" 
                    className="block py-2 text-school-dark hover:text-school-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sports
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/alumni" 
                    className="block py-2 text-school-dark hover:text-school-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Alumni
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/career" 
                    className="block py-2 text-school-dark hover:text-school-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Careers
                  </Link>
                </li>
                <li className="pt-4 border-t border-gray-200 mt-4">
                  <Button 
                    className="w-full bg-school-primary hover:bg-school-primary/90 text-white mb-3"
                    onClick={() => {
                      navigate('/admission-enquiry');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Admission Enquiry
                  </Button>
                </li>
                <li>
                  <Button 
                    className="w-full bg-school-secondary hover:bg-school-secondary/90 text-white"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-school-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-white rounded-full p-1">
                  <School className="h-6 w-6 text-school-primary" />
                </div>
                <h3 className="text-xl font-bold">Veena Public School</h3>
              </div>
              <p className="text-gray-300">
                Knowledge • Character • Excellence
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/admission" className="text-gray-300 hover:text-white">Admission</Link></li>
                <li><Link to="/academics" className="text-gray-300 hover:text-white">Academics</Link></li>
                <li><Link to="/career" className="text-gray-300 hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
                <li><Link to="/fee-payment" className="text-gray-300 hover:text-white">Pay Fees</Link></li>
                <li><Link to="/calendar" className="text-gray-300 hover:text-white">School Calendar</Link></li>
                <li><Link to="/news" className="text-gray-300 hover:text-white">News & Events</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="not-italic text-gray-300">
                123 Education Street<br />
                New Delhi, 110001<br />
                <a href="tel:+911234567890" className="hover:text-white">+91 12345 67890</a><br />
                <a href="mailto:info@veenapublicschool.edu" className="hover:text-white">info@veenapublicschool.edu</a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Veena Public School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout; 