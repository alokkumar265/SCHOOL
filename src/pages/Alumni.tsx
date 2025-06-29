import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { GraduationCap, Award, Users, Globe } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const Alumni = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-school-primary to-school-secondary flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Graduation ceremony" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Alumni Network</h1>
          <p className="text-xl md:text-2xl">Our global community of Veena Public School graduates</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <GraduationCap className="h-12 w-12 text-school-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-school-primary mb-4">The Veena Alumni Association</h2>
          <p className="text-lg text-gray-700">
            Our alumni network connects thousands of Veena Public School graduates across the globe, 
            fostering lifelong relationships and providing opportunities for mentorship, collaboration, and giving back to the school community.
          </p>
        </div>

        {/* Alumni Achievements */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Distinguished Alumni</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-64 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Business professional" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Ravi Sharma</h3>
                <p className="text-gray-500 mb-4">Class of 2005</p>
                <p className="text-gray-700 mb-4">
                  Co-founder and CEO of a leading tech startup, recognized in Forbes 30 under 30 list.
                </p>
                <div className="flex items-center text-school-secondary">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-sm">Technology & Innovation</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-64 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Doctor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Dr. Priya Patel</h3>
                <p className="text-gray-500 mb-4">Class of 2000</p>
                <p className="text-gray-700 mb-4">
                  Renowned cardiologist and medical researcher at Johns Hopkins University.
                </p>
                <div className="flex items-center text-school-secondary">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-sm">Medicine & Research</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-64 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Artist" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Meera Singh</h3>
                <p className="text-gray-500 mb-4">Class of 2010</p>
                <p className="text-gray-700 mb-4">
                  Acclaimed author and recipient of the Sahitya Akademi Award for literature.
                </p>
                <div className="flex items-center text-school-secondary">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-sm">Arts & Literature</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Alumni Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Alumni Voices</h2>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/1">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                          alt="Alumni testimonial"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <blockquote className="text-lg text-gray-700 italic mb-6">
                        "My years at Veena Public School shaped not just my academic foundation but my character and worldview. 
                        The values I learned here continue to guide me in my professional journey."
                      </blockquote>
                      <cite className="not-italic">
                        <p className="font-semibold text-school-primary">Amit Kumar</p>
                        <p className="text-sm text-gray-500">Class of 2008, Software Engineer at Google</p>
                      </cite>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/1">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                          alt="Alumni testimonial"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <blockquote className="text-lg text-gray-700 italic mb-6">
                        "The education I received at Veena was comprehensive and forward-thinking. 
                        The teachers not only taught subjects but inspired us to be lifelong learners and responsible citizens."
                      </blockquote>
                      <cite className="not-italic">
                        <p className="font-semibold text-school-primary">Sunita Reddy</p>
                        <p className="text-sm text-gray-500">Class of 2005, Architect</p>
                      </cite>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              <CarouselItem className="md:basis-1/1">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                          alt="Alumni testimonial"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <blockquote className="text-lg text-gray-700 italic mb-6">
                        "Looking back, I realize how fortunate I was to be part of such a nurturing educational environment. 
                        The extracurricular opportunities at Veena helped me discover my passion for music."
                      </blockquote>
                      <cite className="not-italic">
                        <p className="font-semibold text-school-primary">Vikram Mehta</p>
                        <p className="text-sm text-gray-500">Class of 2012, Professional Musician</p>
                      </cite>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
        
        {/* Alumni Network Benefits */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Alumni Network Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <Users className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Networking</h3>
                  <p className="text-gray-600">
                    Connect with fellow alumni across various industries and geographies.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <Award className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Mentorship</h3>
                  <p className="text-gray-600">
                    Participate in our mentorship program to guide current students.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <Globe className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Events</h3>
                  <p className="text-gray-600">
                    Access to exclusive alumni events, reunions, and professional workshops.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <GraduationCap className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Giving Back</h3>
                  <p className="text-gray-600">
                    Opportunities to contribute to scholarships and school development.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Join Alumni Network */}
        <div className="mt-20 bg-school-light p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-school-primary mb-4">Join Our Alumni Network</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Are you a Veena Public School graduate? Join our vibrant alumni community to stay connected, 
            participate in events, and contribute to the growth of your alma mater.
          </p>
          <div className="flex justify-center">
            <button className="bg-school-primary hover:bg-school-primary/90 text-white px-6 py-3 rounded-md font-medium">
              Register as Alumni
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Alumni;
