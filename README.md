# Grade Flow Online - School Management System

A comprehensive, modern school management system built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for managing academic operations, student records, grades, attendance, and administrative tasks.

## 🚀 Features

### Core Functionality
- **Student Management**: Complete student profiles, enrollment, and academic tracking
- **Grade Management**: Comprehensive grading system with analytics and reports
- **Attendance Tracking**: Real-time attendance monitoring and reporting
- **Assignment Management**: Create, distribute, and grade assignments
- **Fee Management**: Complete fee structure and payment tracking
- **Staff Management**: Teacher and administrative staff profiles
- **Communication Hub**: Internal messaging and notification system

### User Roles
- **Students**: Access to grades, assignments, attendance, and personal information
- **Teachers**: Grade management, assignment creation, attendance tracking
- **Administrators**: Complete system management and oversight
- **Parents**: Access to child's academic progress and communications

### Technical Features
- **Modern UI/UX**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **TypeScript**: Full type safety and better development experience
- **Real-time Updates**: Live data synchronization
- **Analytics Dashboard**: Comprehensive reporting and insights
- **File Management**: Document upload and management system

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React Icons
- **Build Tool**: Vite
- **Package Manager**: npm/bun
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Hooks and Context API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or bun package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/alokkumar265/SCHOOL.git
   cd SCHOOL
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── analytics/      # Analytics and chart components
│   ├── grades/         # Grade-related components
│   ├── layout/         # Layout components (sidebar, header)
│   ├── messages/       # Communication components
│   ├── students/       # Student-related components
│   └── ui/            # Base UI components (shadcn/ui)
├── frontend/          # Main frontend application
│   ├── components/    # Frontend-specific components
│   ├── hooks/         # Custom React hooks
│   ├── lib/          # Utility functions
│   └── pages/        # Page components
├── backend/          # Backend services and models
│   ├── contexts/     # React contexts
│   ├── models/       # Data models
│   └── services/     # API services
├── hooks/           # Shared hooks
├── lib/            # Shared utilities
├── pages/          # Main page components
└── types/          # TypeScript type definitions
```

## 🎨 Key Components

### Dashboard Layout
- **DashboardLayout**: Main application layout with sidebar navigation
- **DashboardSidebar**: Navigation sidebar with role-based menu items
- **ProtectedRoute**: Authentication and authorization wrapper

### Analytics & Reporting
- **AttendanceChart**: Visual attendance tracking and trends
- **PerformanceChart**: Student performance analytics
- **TrendsChart**: Academic trends and insights
- **DashboardStats**: Key metrics and statistics

### Grade Management
- **GradeSection**: Comprehensive grade display and management
- **GradebookPage**: Teacher's grade management interface
- **GradesPage**: Student grade viewing interface

### Assignment System
- **TeacherAssignmentsPage**: Complete assignment management for teachers
- **AssignmentsPage**: Student assignment interface
- **Assignment creation, grading, and tracking**

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Grade Flow Online
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended spacing and typography
- Component-specific utilities
- Responsive breakpoints

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Adaptive layout with collapsible sidebar
- **Mobile**: Mobile-first design with touch-friendly interactions

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
bun run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alok Kumar**
- GitHub: [@alokkumar265](https://github.com/alokkumar265)
- Email: alokkumar265@gmail.com

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the icon library
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

If you have any questions or need support, please:
1. Check the [Issues](https://github.com/alokkumar265/SCHOOL/issues) page
2. Create a new issue with detailed information
3. Contact the author directly

---

**Grade Flow Online** - Empowering education through technology ✨
