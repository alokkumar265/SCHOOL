import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Briefcase, GraduationCap, Clock, MapPin, Award } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const Career = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-school-primary to-school-secondary flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Teacher with students" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl md:text-2xl">Build your career at Veena Public School</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Briefcase className="h-12 w-12 text-school-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-school-primary mb-4">Careers at Veena Public School</h2>
          <p className="text-lg text-gray-700">
            Join our team of dedicated professionals who are committed to providing quality education 
            and fostering the holistic development of our students. We offer a collaborative and 
            supportive work environment where you can grow professionally while making a meaningful impact.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Why Work With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <Award className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2">Professional Growth</h3>
                  <p className="text-gray-700">
                    Regular professional development opportunities, workshops, and training programs to enhance your skills.
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
                  <h3 className="text-xl font-bold text-school-primary mb-2">Innovative Environment</h3>
                  <p className="text-gray-700">
                    Freedom to implement creative teaching methodologies and contribute to curriculum development.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-school-light rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-school-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-school-primary mb-2">Supportive Community</h3>
                  <p className="text-gray-700">
                    Collaborative work culture with mentorship programs and team-building activities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Current Openings */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Current Openings</h2>
          
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-school-primary mb-1">Mathematics Teacher (Secondary)</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <Clock className="h-3 w-3 mr-1" /> Full-time
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <MapPin className="h-3 w-3 mr-1" /> On-campus
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <GraduationCap className="h-3 w-3 mr-1" /> 3+ years experience
                      </span>
                    </div>
                    <p className="text-gray-700">
                      We are looking for a passionate Mathematics teacher with experience in teaching CBSE curriculum for classes IX-XII.
                    </p>
                  </div>
                  <button className="bg-school-primary hover:bg-school-primary/90 text-white px-4 py-2 rounded-md whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-school-primary mb-1">Science Teacher (Primary)</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <Clock className="h-3 w-3 mr-1" /> Full-time
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <MapPin className="h-3 w-3 mr-1" /> On-campus
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <GraduationCap className="h-3 w-3 mr-1" /> 2+ years experience
                      </span>
                    </div>
                    <p className="text-gray-700">
                      Looking for an engaging Science teacher who can make learning fun and interactive for primary school children.
                    </p>
                  </div>
                  <button className="bg-school-primary hover:bg-school-primary/90 text-white px-4 py-2 rounded-md whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-school-primary mb-1">Physical Education Instructor</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <Clock className="h-3 w-3 mr-1" /> Full-time
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <MapPin className="h-3 w-3 mr-1" /> On-campus
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <GraduationCap className="h-3 w-3 mr-1" /> 3+ years experience
                      </span>
                    </div>
                    <p className="text-gray-700">
                      We are seeking a dynamic Physical Education instructor to oversee sports programs and physical fitness activities.
                    </p>
                  </div>
                  <button className="bg-school-primary hover:bg-school-primary/90 text-white px-4 py-2 rounded-md whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-school-primary mb-1">School Counselor</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <Clock className="h-3 w-3 mr-1" /> Full-time
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <MapPin className="h-3 w-3 mr-1" /> On-campus
                      </span>
                      <span className="inline-flex items-center bg-school-light text-school-primary text-xs px-2 py-1 rounded">
                        <GraduationCap className="h-3 w-3 mr-1" /> 5+ years experience
                      </span>
                    </div>
                    <p className="text-gray-700">
                      Looking for a qualified counselor to provide social-emotional support and guidance to students across all grade levels.
                    </p>
                  </div>
                  <button className="bg-school-primary hover:bg-school-primary/90 text-white px-4 py-2 rounded-md whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Application Process */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Application Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-school-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-school-primary">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Apply Online</h3>
                  <p className="text-gray-600">
                    Submit your application through our online portal with your resume and cover letter.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-school-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-school-primary">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Initial Screening</h3>
                  <p className="text-gray-600">
                    Our HR team will review your application and contact you for an initial phone interview.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-school-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-school-primary">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Demo Session</h3>
                  <p className="text-gray-600">
                    Teaching candidates will be invited to conduct a demo class with actual students.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-school-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-school-primary">4</span>
                  </div>
                  <h3 className="text-lg font-bold text-school-primary mb-2">Final Interview</h3>
                  <p className="text-gray-600">
                    Selected candidates will meet with the department head and school principal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Join Our Team CTA */}
        <div className="mt-20 bg-school-light p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-school-primary mb-4">No Suitable Openings?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We're always on the lookout for exceptional talent. If you don't see a position that matches 
            your skills but believe you would be a valuable addition to our team, we encourage you to send us your resume.
          </p>
          <div className="flex justify-center">
            <button className="bg-school-primary hover:bg-school-primary/90 text-white px-6 py-3 rounded-md font-medium">
              Submit Open Application
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Career;
