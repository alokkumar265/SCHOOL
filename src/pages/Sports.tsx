import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Award, Users } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';

const Sports = () => {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-school-primary to-school-secondary flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Sports field" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sports & Physical Education</h1>
          <p className="text-xl md:text-2xl">Developing champions in sports and in life</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Trophy className="h-12 w-12 text-school-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-school-primary mb-4">Our Sports Philosophy</h2>
          <p className="text-lg text-gray-700">
            At Veena Public School, we believe that sports and physical education are integral to a well-rounded education. 
            Our comprehensive sports program is designed to promote physical fitness, teamwork, discipline, and sportsmanship 
            among students of all ages and abilities.
          </p>
        </div>

        {/* Sports Facilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Sports Facilities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Cricket field" 
                className="h-48 w-full object-cover"
              />
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Cricket Ground</h3>
                <p className="text-gray-600">
                  A full-sized cricket ground with proper pitch and practice nets for training future cricketers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Basketball court" 
                className="h-48 w-full object-cover"
              />
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Basketball Courts</h3>
                <p className="text-gray-600">
                  Multiple basketball courts with professional-grade equipment for practice and tournaments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1519925610903-381054cc2a1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Swimming pool" 
                className="h-48 w-full object-cover"
              />
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Swimming Pool</h3>
                <p className="text-gray-600">
                  A semi-olympic size swimming pool with trained coaches for swimming instruction and competitive training.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Badminton courts" 
                className="h-48 w-full object-cover"
              />
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Badminton Courts</h3>
                <p className="text-gray-600">
                  Indoor badminton courts with proper lighting and equipment for training and matches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Football field" 
                className="h-48 w-full object-cover"
              />
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Football Field</h3>
                <p className="text-gray-600">
                  A well-maintained football field for training and competitive matches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1517343985841-f8b2d66e010b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Yoga room" 
                className="h-48 w-full object-cover"
              />
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-school-primary mb-2">Yoga & Fitness Center</h3>
                <p className="text-gray-600">
                  Dedicated space for yoga, aerobics, and general fitness activities with trained instructors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Sports Programs */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Sports Programs</h2>
          
          <Tabs defaultValue="regular" className="mb-16">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="regular">Regular Program</TabsTrigger>
                <TabsTrigger value="competitive">Competitive Sports</TabsTrigger>
                <TabsTrigger value="special">Special Training</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="regular" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-school-primary mb-4">Regular Physical Education</h3>
                  <p className="text-gray-700 mb-4">
                    Our regular physical education program ensures that every student participates in sports activities as part of the curriculum. 
                    These sessions focus on overall fitness, basic skills in various sports, and promoting healthy lifestyle habits.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Regular PE classes for all age groups</li>
                    <li>Age-appropriate fitness activities and games</li>
                    <li>Basic training in multiple sports</li>
                    <li>Annual sports day participation</li>
                    <li>Health and fitness awareness sessions</li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Physical education class" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="competitive" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Competitive sports" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-school-primary mb-4">Competitive Sports Program</h3>
                  <p className="text-gray-700 mb-4">
                    Our competitive sports program identifies and nurtures talented students who show potential in specific sports. 
                    These students receive specialized training and represent the school in various inter-school competitions and tournaments.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>School teams in Cricket, Basketball, Football, Swimming, etc.</li>
                    <li>Regular participation in district and state-level tournaments</li>
                    <li>Advanced coaching from experienced trainers</li>
                    <li>Sports scholarships for exceptional athletes</li>
                    <li>Exposure to professional sports events and workshops</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="special" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-school-primary mb-4">Special Training Programs</h3>
                  <p className="text-gray-700 mb-4">
                    Our special training programs offer intensive coaching in selected sports for students who show exceptional talent and dedication. 
                    These programs aim to develop professional-level skills and prepare students for state and national-level competitions.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Pre-dawn and after-school intensive training sessions</li>
                    <li>Personalized coaching and performance tracking</li>
                    <li>Nutrition and fitness guidance</li>
                    <li>Mental conditioning and sports psychology</li>
                    <li>Participation in elite competitions and tournaments</li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Special sports training" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Achievements */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-school-primary mb-10 text-center">Recent Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-all duration-300 border-t-4 border-school-accent">
              <Award className="h-12 w-12 text-school-accent mb-4" />
              <h3 className="text-lg font-bold text-school-primary mb-2">District Champions</h3>
              <p className="text-gray-600">Under-16 Cricket Team (2024)</p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-all duration-300 border-t-4 border-school-accent">
              <Award className="h-12 w-12 text-school-accent mb-4" />
              <h3 className="text-lg font-bold text-school-primary mb-2">State Finalists</h3>
              <p className="text-gray-600">Under-14 Basketball Team (2023)</p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-all duration-300 border-t-4 border-school-accent">
              <Award className="h-12 w-12 text-school-accent mb-4" />
              <h3 className="text-lg font-bold text-school-primary mb-2">Gold Medals</h3>
              <p className="text-gray-600">Inter-School Swimming Competition (2024)</p>
            </Card>
            
            <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-all duration-300 border-t-4 border-school-accent">
              <Award className="h-12 w-12 text-school-accent mb-4" />
              <h3 className="text-lg font-bold text-school-primary mb-2">National Qualifier</h3>
              <p className="text-gray-600">Athletics Championship (2023)</p>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Sports;
