import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Calendar,
  Download,
  Eye,
  Star,
  BookMarked,
  Library,
  FileText,
  Video,
  Headphones
} from 'lucide-react';

const mockBooks = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Literature',
    isbn: '978-0-06-112008-4',
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    location: 'Fiction Section A',
    rating: 4.5,
    cover: 'https://via.placeholder.com/150x200/4F46E5/FFFFFF?text=TKAM'
  },
  {
    id: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Literature',
    isbn: '978-0-7432-7356-5',
    available: true,
    totalCopies: 4,
    availableCopies: 2,
    location: 'Fiction Section A',
    rating: 4.3,
    cover: 'https://via.placeholder.com/150x200/DC2626/FFFFFF?text=GG'
  },
  {
    id: 3,
    title: 'Mathematics for Class 12',
    author: 'NCERT',
    category: 'Mathematics',
    isbn: '978-81-7450-634-4',
    available: true,
    totalCopies: 10,
    availableCopies: 7,
    location: 'Reference Section B',
    rating: 4.7,
    cover: 'https://via.placeholder.com/150x200/059669/FFFFFF?text=Math'
  },
  {
    id: 4,
    title: 'Physics Fundamentals',
    author: 'Dr. H.C. Verma',
    category: 'Science',
    isbn: '978-81-219-0591-4',
    available: false,
    totalCopies: 8,
    availableCopies: 0,
    location: 'Reference Section C',
    rating: 4.8,
    cover: 'https://via.placeholder.com/150x200/7C3AED/FFFFFF?text=Physics'
  },
  {
    id: 5,
    title: 'Computer Science Principles',
    author: 'John Smith',
    category: 'Computer Science',
    isbn: '978-0-123-45678-9',
    available: true,
    totalCopies: 6,
    availableCopies: 4,
    location: 'Technology Section D',
    rating: 4.2,
    cover: 'https://via.placeholder.com/150x200/EA580C/FFFFFF?text=CS'
  }
];

const mockBorrowedBooks = [
  {
    id: 1,
    bookId: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    borrowedDate: '2024-01-10',
    dueDate: '2024-01-24',
    returned: false,
    fine: 0
  },
  {
    id: 2,
    bookId: 3,
    title: 'Mathematics for Class 12',
    author: 'NCERT',
    borrowedDate: '2024-01-05',
    dueDate: '2024-01-19',
    returned: true,
    returnDate: '2024-01-15',
    fine: 0
  }
];

const mockDigitalResources = [
  {
    id: 1,
    title: 'E-Book: Advanced Mathematics',
    type: 'ebook',
    format: 'PDF',
    size: '15.2 MB',
    downloads: 45,
    rating: 4.6
  },
  {
    id: 2,
    title: 'Video Lecture: Physics Lab Experiments',
    type: 'video',
    format: 'MP4',
    size: '125.8 MB',
    duration: '45:30',
    views: 128,
    rating: 4.4
  },
  {
    id: 3,
    title: 'Audio Book: English Literature Classics',
    type: 'audio',
    format: 'MP3',
    size: '89.3 MB',
    duration: '2:15:30',
    downloads: 67,
    rating: 4.7
  }
];

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBook, setSelectedBook] = useState(null);

  const categories = ['all', 'Literature', 'Mathematics', 'Science', 'Computer Science', 'History', 'Geography'];

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type) => {
    switch (type) {
      case 'ebook':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-500" />;
      case 'audio':
        return <Headphones className="h-4 w-4 text-green-500" />;
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAvailabilityBadge = (book) => {
    if (book.availableCopies > 0) {
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    }
    return <Badge className="bg-red-100 text-red-800">Not Available</Badge>;
  };

  const handleBorrowBook = (bookId) => {
    // Mock borrow functionality
    console.log(`Borrowing book ${bookId}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">School Library</h1>
            <p className="text-muted-foreground">Browse books and access digital resources</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50">
              {mockBorrowedBooks.filter(b => !b.returned).length} Books Borrowed
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="borrowed">My Borrowed Books</TabsTrigger>
            <TabsTrigger value="digital">Digital Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by title, author, or ISBN..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-md"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>
                      </div>
                      {getAvailabilityBadge(book)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span>{book.category}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{book.rating} / 5.0</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <div>ISBN: {book.isbn}</div>
                        <div>Location: {book.location}</div>
                        <div>Available: {book.availableCopies} of {book.totalCopies} copies</div>
                      </div>
                      
                      <div className="flex gap-2">
                        {book.availableCopies > 0 ? (
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleBorrowBook(book.id)}
                          >
                            <BookMarked className="h-4 w-4 mr-2" />
                            Borrow
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="flex-1" disabled>
                            Not Available
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="borrowed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5" />
                  My Borrowed Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBorrowedBooks.map((borrowed) => (
                    <div key={borrowed.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{borrowed.title}</div>
                        <div className="text-sm text-muted-foreground">by {borrowed.author}</div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Borrowed: {new Date(borrowed.borrowedDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Due: {new Date(borrowed.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {borrowed.returned ? (
                          <Badge className="bg-green-100 text-green-800">Returned</Badge>
                        ) : (
                          <div className="text-right">
                            <Badge className="bg-blue-100 text-blue-800 mb-2">Borrowed</Badge>
                            {borrowed.fine > 0 && (
                              <div className="text-sm text-red-600">Fine: ₹{borrowed.fine}</div>
                            )}
                          </div>
                        )}
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="digital" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Library className="h-5 w-5" />
                  Digital Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockDigitalResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          {getResourceIcon(resource.type)}
                          <CardTitle className="text-sm">{resource.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Format:</span>
                            <span className="font-medium">{resource.format}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Size:</span>
                            <span className="font-medium">{resource.size}</span>
                          </div>
                          {resource.duration && (
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="font-medium">{resource.duration}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>Rating:</span>
                            <span className="font-medium flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {resource.rating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>{resource.type === 'video' ? 'Views:' : 'Downloads:'}</span>
                            <span className="font-medium">{resource.type === 'video' ? resource.views : resource.downloads}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LibraryPage; 