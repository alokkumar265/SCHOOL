import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/backend/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  School, 
  BookOpen, 
  Users, 
  CreditCard, 
  Phone, 
  GraduationCap, 
  Trophy,
  Menu,
  X
} from 'lucide-react';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem,
  NavigationMenuLink 
} from '@/components/ui/navigation-menu';
import { useState, useRef, useEffect as useEffectHook } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import PublicLayout from '@/components/layout/PublicLayout';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Handle clicking outside of mobile menu to close it
  useEffectHook(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-school-light to-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-school-primary mb-6 leading-tight">
                Excellence in <span className="text-school-secondary">Education</span> Since 1985
              </h1>
              <p className="text-xl text-school-dark mb-8 max-w-lg">
                Building future leaders through quality education, character development, and holistic growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-school-primary hover:bg-school-primary/90 text-white px-6 py-6 text-lg"
                  onClick={() => navigate('/admission-enquiry')}
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  className="border-school-primary text-school-primary hover:bg-school-primary hover:text-white px-6 py-6 text-lg"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Veena Public School Campus" 
                className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-school-primary mb-12">Why Choose Veena Public School?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg bg-white shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <GraduationCap className="h-12 w-12 text-school-primary" />
              </div>
              <h3 className="text-xl font-semibold text-school-primary">Academic Excellence</h3>
              <p className="mt-3 text-gray-600">Comprehensive curriculum designed to nurture critical thinking and creativity.</p>
            </div>
            <div className="p-6 border rounded-lg bg-white shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <Trophy className="h-12 w-12 text-school-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-school-secondary">Sports & Activities</h3>
              <p className="mt-3 text-gray-600">Diverse sports facilities and extracurricular activities for holistic development.</p>
            </div>
            <div className="p-6 border rounded-lg bg-white shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-school-accent" />
              </div>
              <h3 className="text-xl font-semibold text-school-accent">Experienced Faculty</h3>
              <p className="mt-3 text-gray-600">Dedicated teachers committed to bringing out the best in every student.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Classroom Video Section */}
      <section className="py-16 bg-school-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-school-primary mb-8">Experience Our Classrooms</h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Step inside our modern learning environments where students are engaged in interactive and innovative educational experiences.
          </p>
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Virtual Tour of Veena Public School" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-school-primary mb-12">Access School Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link to="/fee-payment" className="flex flex-col items-center text-center">
                <CreditCard className="h-10 w-10 text-school-primary mb-4" />
                <h3 className="text-lg font-semibold text-school-primary">Pay Fees Online</h3>
                <p className="mt-2 text-sm text-gray-500">Conveniently pay school fees online</p>
              </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link to="/admission-enquiry" className="flex flex-col items-center text-center">
                <BookOpen className="h-10 w-10 text-school-secondary mb-4" />
                <h3 className="text-lg font-semibold text-school-secondary">Admission Enquiry</h3>
                <p className="mt-2 text-sm text-gray-500">Information about admission process</p>
              </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link to="/alumni" className="flex flex-col items-center text-center">
                <GraduationCap className="h-10 w-10 text-school-accent mb-4" />
                <h3 className="text-lg font-semibold text-school-accent">Alumni Network</h3>
                <p className="mt-2 text-sm text-gray-500">Connect with our alumni community</p>
              </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link to="/contact" className="flex flex-col items-center text-center">
                <Phone className="h-10 w-10 text-gray-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">Contact Us</h3>
                <p className="mt-2 text-sm text-gray-500">Reach out for any queries</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Alumni Achievements Carousel */}
      <section className="py-16 bg-gradient-to-b from-white to-school-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-school-primary mb-8">Alumni Achievements</h2>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our graduates have gone on to excel in various fields, making significant contributions to society.
          </p>
          
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4 border-4 border-school-light">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Alumni" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2 text-center">Rahul Sharma</h3>
                  <p className="text-sm text-gray-500 mb-3 text-center">Class of 2010</p>
                  <p className="text-gray-700 flex-grow">
                    Founded a technology startup that was recently valued at $1 billion, creating innovative solutions for healthcare.
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4 border-4 border-school-light">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Alumni" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2 text-center">Dr. Priya Kapoor</h3>
                  <p className="text-sm text-gray-500 mb-3 text-center">Class of 2005</p>
                  <p className="text-gray-700 flex-grow">
                    Leading medical researcher who has published groundbreaking work on infectious diseases in international journals.
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4 border-4 border-school-light">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Alumni" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2 text-center">Vikram Mehta</h3>
                  <p className="text-sm text-gray-500 mb-3 text-center">Class of 2008</p>
                  <p className="text-gray-700 flex-grow">
                    International chess champion who has represented India at multiple world championships.
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                  <div className="rounded-full overflow-hidden w-24 h-24 mx-auto mb-4 border-4 border-school-light">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Alumni" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2 text-center">Sunita Reddy</h3>
                  <p className="text-sm text-gray-500 mb-3 text-center">Class of 2012</p>
                  <p className="text-gray-700 flex-grow">
                    Award-winning documentary filmmaker whose work on environmental conservation has received global recognition.
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;
