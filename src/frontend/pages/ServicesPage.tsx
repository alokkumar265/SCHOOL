import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bus, 
  Utensils, 
  MapPin, 
  Clock, 
  Phone, 
  User,
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Eye,
  Download,
  Share2,
  Bookmark,
  Star,
  Heart,
  MessageSquare,
  Bell,
  Settings,
  Route,
  Car,
  Train,
  Bike,
  Coffee,
  Pizza,
  Apple,
  Milk,
  Sandwich,
  DollarSign,
  TrendingUp,
  Users,
  Package,
  FileText,
  Filter,
  Search,
  Location,
  Navigation,
  Timer,
  Wifi,
  Airplay
} from 'lucide-react';

const ServicesPage = () => {
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('transportation');

  // Sample transportation data
  const transportationServices = [
    {
      id: 1,
      name: 'School Bus Route 1',
      type: 'Bus',
      route: 'Central Delhi - School',
      driver: 'Mr. Ram Singh',
      driverPhone: '+91 9876543210',
      vehicleNumber: 'DL-01-AB-1234',
      capacity: 45,
      currentOccupancy: 38,
      departureTime: '07:30 AM',
      arrivalTime: '08:15 AM',
      returnDeparture: '03:30 PM',
      returnArrival: '04:15 PM',
      stops: [
        { name: 'Connaught Place', time: '07:30 AM', location: 'Central Delhi' },
        { name: 'Rajiv Chowk', time: '07:45 AM', location: 'Metro Station' },
        { name: 'Khan Market', time: '08:00 AM', location: 'South Delhi' },
        { name: 'School', time: '08:15 AM', location: 'Veena Public School' }
      ],
      monthlyFee: 1500,
      status: 'active',
      features: ['AC', 'GPS Tracking', 'First Aid Kit', 'CCTV'],
      rating: 4.5,
      reviews: 28
    },
    {
      id: 2,
      name: 'School Bus Route 2',
      type: 'Bus',
      route: 'North Delhi - School',
      driver: 'Mrs. Sunita Devi',
      driverPhone: '+91 9876543211',
      vehicleNumber: 'DL-02-CD-5678',
      capacity: 40,
      currentOccupancy: 35,
      departureTime: '07:15 AM',
      arrivalTime: '08:00 AM',
      returnDeparture: '03:15 PM',
      returnArrival: '04:00 PM',
      stops: [
        { name: 'Civil Lines', time: '07:15 AM', location: 'North Delhi' },
        { name: 'Kashmere Gate', time: '07:30 AM', location: 'Old Delhi' },
        { name: 'Chandni Chowk', time: '07:45 AM', location: 'Old Delhi' },
        { name: 'School', time: '08:00 AM', location: 'Veena Public School' }
      ],
      monthlyFee: 1400,
      status: 'active',
      features: ['AC', 'GPS Tracking', 'First Aid Kit'],
      rating: 4.3,
      reviews: 22
    },
    {
      id: 3,
      name: 'Van Service - South Delhi',
      type: 'Van',
      route: 'South Delhi - School',
      driver: 'Mr. Amit Kumar',
      driverPhone: '+91 9876543212',
      vehicleNumber: 'DL-03-EF-9012',
      capacity: 15,
      currentOccupancy: 12,
      departureTime: '07:45 AM',
      arrivalTime: '08:20 AM',
      returnDeparture: '03:45 PM',
      returnArrival: '04:20 PM',
      stops: [
        { name: 'Greater Kailash', time: '07:45 AM', location: 'South Delhi' },
        { name: 'Hauz Khas', time: '08:00 AM', location: 'South Delhi' },
        { name: 'School', time: '08:20 AM', location: 'Veena Public School' }
      ],
      monthlyFee: 1800,
      status: 'active',
      features: ['AC', 'GPS Tracking', 'Premium Service'],
      rating: 4.7,
      reviews: 15
    }
  ];

  // Sample canteen data
  const canteenServices = {
    menu: [
      {
        id: 1,
        name: 'Veg Thali',
        category: 'Lunch',
        description: 'Complete vegetarian meal with rice, dal, vegetables, and roti',
        price: 80,
        image: '/placeholder.svg',
        available: true,
        rating: 4.2,
        reviews: 45,
        ingredients: ['Rice', 'Dal', 'Mixed Vegetables', 'Roti', 'Curd'],
        nutritionInfo: { calories: 450, protein: '12g', carbs: '65g', fat: '15g' }
      },
      {
        id: 2,
        name: 'Chicken Biryani',
        category: 'Lunch',
        description: 'Aromatic basmati rice cooked with tender chicken and spices',
        price: 120,
        image: '/placeholder.svg',
        available: true,
        rating: 4.5,
        reviews: 38,
        ingredients: ['Basmati Rice', 'Chicken', 'Onions', 'Spices', 'Ghee'],
        nutritionInfo: { calories: 550, protein: '25g', carbs: '75g', fat: '18g' }
      },
      {
        id: 3,
        name: 'Veg Sandwich',
        category: 'Snacks',
        description: 'Fresh vegetables with cheese in whole wheat bread',
        price: 40,
        image: '/placeholder.svg',
        available: true,
        rating: 4.0,
        reviews: 52,
        ingredients: ['Whole Wheat Bread', 'Cucumber', 'Tomato', 'Cheese', 'Lettuce'],
        nutritionInfo: { calories: 280, protein: '8g', carbs: '35g', fat: '12g' }
      },
      {
        id: 4,
        name: 'Fruit Salad',
        category: 'Healthy',
        description: 'Fresh seasonal fruits with honey dressing',
        price: 60,
        image: '/placeholder.svg',
        available: true,
        rating: 4.3,
        reviews: 29,
        ingredients: ['Apple', 'Banana', 'Orange', 'Grapes', 'Honey'],
        nutritionInfo: { calories: 120, protein: '2g', carbs: '25g', fat: '0g' }
      },
      {
        id: 5,
        name: 'Coffee',
        category: 'Beverages',
        description: 'Hot coffee with milk and sugar',
        price: 25,
        image: '/placeholder.svg',
        available: true,
        rating: 3.8,
        reviews: 67,
        ingredients: ['Coffee', 'Milk', 'Sugar'],
        nutritionInfo: { calories: 80, protein: '3g', carbs: '12g', fat: '2g' }
      },
      {
        id: 6,
        name: 'Pizza Slice',
        category: 'Snacks',
        description: 'Cheese pizza slice with tomato sauce',
        price: 70,
        image: '/placeholder.svg',
        available: false,
        rating: 4.1,
        reviews: 41,
        ingredients: ['Pizza Base', 'Cheese', 'Tomato Sauce', 'Herbs'],
        nutritionInfo: { calories: 320, protein: '10g', carbs: '40g', fat: '14g' }
      }
    ],
    operatingHours: {
      breakfast: '07:30 AM - 09:30 AM',
      lunch: '12:00 PM - 02:30 PM',
      snacks: '03:00 PM - 05:00 PM'
    },
    contact: {
      manager: 'Mrs. Rekha Sharma',
      phone: '+91 9876543215',
      email: 'canteen@school.edu'
    }
  };

  // Student's current bookings
  const currentBookings = [
    {
      id: 1,
      service: 'School Bus Route 1',
      type: 'transportation',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      amount: 1500,
      paymentStatus: 'paid',
      nextPayment: '2024-02-01'
    },
    {
      id: 2,
      service: 'Monthly Canteen Plan',
      type: 'canteen',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'active',
      amount: 2000,
      paymentStatus: 'paid',
      nextPayment: '2024-02-01'
    }
  ];

  // Student's order history
  const orderHistory = [
    {
      id: 1,
      items: ['Veg Thali', 'Coffee'],
      total: 105,
      date: '2024-01-15',
      time: '12:30 PM',
      status: 'completed',
      rating: 4
    },
    {
      id: 2,
      items: ['Chicken Biryani', 'Fruit Salad'],
      total: 180,
      date: '2024-01-14',
      time: '12:15 PM',
      status: 'completed',
      rating: 5
    },
    {
      id: 3,
      items: ['Veg Sandwich', 'Coffee'],
      total: 65,
      date: '2024-01-13',
      time: '03:30 PM',
      status: 'completed',
      rating: 4
    }
  ];

  const getTransportIcon = (type) => {
    switch (type) {
      case 'Bus': return <Bus className="h-5 w-5" />;
      case 'Van': return <Car className="h-5 w-5" />;
      case 'Train': return <Train className="h-5 w-5" />;
      default: return <Route className="h-5 w-5" />;
    }
  };

  const getTransportColor = (type) => {
    switch (type) {
      case 'Bus': return 'bg-blue-100 text-blue-800';
      case 'Van': return 'bg-green-100 text-green-800';
      case 'Train': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Lunch': return <Utensils className="h-5 w-5" />;
      case 'Snacks': return <Pizza className="h-5 w-5" />;
      case 'Beverages': return <Coffee className="h-5 w-5" />;
      case 'Healthy': return <Apple className="h-5 w-5" />;
      default: return <Utensils className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = () => {
    // Handle booking submission
    console.log('Booking service:', selectedService);
    setShowBookingModal(false);
    setSelectedService(null);
  };

  const filteredTransport = transportationServices.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpent = orderHistory.reduce((sum, order) => sum + order.total, 0);
  const averageRating = orderHistory.length > 0 
    ? orderHistory.reduce((sum, order) => sum + order.rating, 0) / orderHistory.length 
    : 0;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">School Services</h1>
          <p className="text-muted-foreground">Manage your transportation and canteen services</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold">{currentBookings.length}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Currently using
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600">₹{totalSpent}</p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-purple-600">{averageRating.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Canteen services</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Payment</p>
                  <p className="text-2xl font-bold text-orange-600">₹{currentBookings.reduce((sum, booking) => sum + booking.amount, 0)}</p>
                  <p className="text-sm text-gray-600">Due Feb 1st</p>
                </div>
                <CreditCard className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transportation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
            <TabsTrigger value="canteen">Canteen</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="transportation" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search transportation services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transportation Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTransport.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTransportIcon(service.type)}
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <Badge className={getTransportColor(service.type)}>
                            {service.type}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Route Information</h4>
                        <p className="text-sm text-gray-600 mb-2">{service.route}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Departure: {service.departureTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>Arrival: {service.arrivalTime}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Driver Information</h4>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium">Name:</span> {service.driver}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Phone:</span> {service.driverPhone}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Vehicle:</span> {service.vehicleNumber}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">{service.currentOccupancy}</span>
                          <span className="text-gray-500">/{service.capacity} seats</span>
                        </div>
                        <Progress value={(service.currentOccupancy / service.capacity) * 100} className="w-20" />
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Stops</h4>
                        <div className="space-y-1">
                          {service.stops.map((stop, index) => (
                            <div key={index} className="text-sm flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>{stop.name}</span>
                              <span className="text-gray-500">({stop.time})</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold">₹{service.monthlyFee}</div>
                          <div className="text-sm text-gray-600">per month</div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleBookService(service)}
                            className="flex-1"
                            disabled={service.currentOccupancy >= service.capacity}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            {service.currentOccupancy >= service.capacity ? 'Full' : 'Book'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="canteen" className="space-y-6">
            {/* Canteen Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Breakfast</span>
                      <span className="text-sm text-gray-600">{canteenServices.operatingHours.breakfast}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Lunch</span>
                      <span className="text-sm text-gray-600">{canteenServices.operatingHours.lunch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Snacks</span>
                      <span className="text-sm text-gray-600">{canteenServices.operatingHours.snacks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="font-medium">Manager:</span> {canteenServices.contact.manager}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Phone:</span> {canteenServices.contact.phone}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Email:</span> {canteenServices.contact.email}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Orders</span>
                      <span className="text-sm text-gray-600">{orderHistory.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Spent</span>
                      <span className="text-sm text-gray-600">₹{totalSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Average Rating</span>
                      <span className="text-sm text-gray-600">{averageRating.toFixed(1)}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Menu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Today's Menu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {canteenServices.menu.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(item.category)}
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <Badge className="text-xs">{item.category}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{item.price}</div>
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              {item.rating}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {item.available ? 'Available' : 'Not Available'}
                          </Badge>
                          <Button size="sm" disabled={!item.available}>
                            <Plus className="h-4 w-4 mr-1" />
                            Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            {/* Current Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Current Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{booking.service}</h4>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                            <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                              {booking.paymentStatus}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Amount:</span> ₹{booking.amount}
                            {booking.nextPayment && (
                              <span className="ml-4">
                                <span className="font-medium">Next Payment:</span> {formatDate(booking.nextPayment)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">Order #{order.id}</h4>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              {order.rating}/5
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {order.items.join(', ')}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Date:</span> {formatDate(order.date)} at {order.time}
                            <span className="ml-4">
                              <span className="font-medium">Total:</span> ₹{order.total}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Booking Modal */}
        {showBookingModal && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Book {selectedService.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">12 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Pickup Location</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {selectedService.stops.map((stop, index) => (
                        <option key={index} value={stop.name}>{stop.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Special Requirements</label>
                    <Textarea
                      placeholder="Any special requirements or notes..."
                      rows={2}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleBookingSubmit} className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Book Service
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowBookingModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage; 