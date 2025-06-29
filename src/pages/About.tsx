import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { School, Medal, History } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const About = () => {
  return (
    <PublicLayout>
      {/* Header/Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-school-primary to-school-secondary flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="School building" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Veena Public School</h1>
          <p className="text-xl md:text-2xl">Building futures through excellence in education since 1985</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-school-primary mb-6">Our Journey</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Veena Public School was established in 1985 with a vision to provide quality education that nurtures academic excellence, character development, and holistic growth. 
              Over the decades, we have grown from a small institution to one of the most respected educational establishments in the region.
            </p>
            <p className="text-gray-700 mb-6 text-lg">
              Our school is named after Smt. Veena Sharma, a pioneering educationist who believed in the power of education to transform lives and communities. 
              Her philosophy continues to guide our approach to teaching and learning.
            </p>
            
            <div className="flex items-center mt-8">
              <History className="text-school-primary h-12 w-12 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-school-primary">Our Legacy</h3>
                <p className="text-gray-700">Over 35 years of educational excellence</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="School campus" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-school-primary mb-12 text-center">Vision & Mission</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-school-primary">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <School className="h-8 w-8 text-school-primary mr-3" />
                  <h3 className="text-2xl font-bold text-school-primary">Our Vision</h3>
                </div>
                <p className="text-gray-700">
                  To be a center of educational excellence that nurtures students to become responsible global citizens with strong values, critical thinking abilities, and a lifelong passion for learning.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-school-secondary">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Medal className="h-8 w-8 text-school-secondary mr-3" />
                  <h3 className="text-2xl font-bold text-school-secondary">Our Mission</h3>
                </div>
                <p className="text-gray-700">
                  To provide a stimulating learning environment with a balanced curriculum that fosters academic excellence, physical development, emotional well-being, and social responsibility among our students.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Core Values */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-school-primary mb-8 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-school-light rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-school-primary">E</span>
              </div>
              <h3 className="text-xl font-bold text-school-primary mb-2">Excellence</h3>
              <p className="text-gray-600">Striving for the highest standards in everything we do</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-school-light rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-school-primary">I</span>
              </div>
              <h3 className="text-xl font-bold text-school-primary mb-2">Integrity</h3>
              <p className="text-gray-600">Upholding moral and ethical principles at all times</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-school-light rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-school-primary">R</span>
              </div>
              <h3 className="text-xl font-bold text-school-primary mb-2">Respect</h3>
              <p className="text-gray-600">Treating everyone with dignity and understanding</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default About;
