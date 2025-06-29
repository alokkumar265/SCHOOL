
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Users, 
  BookOpen, 
  Calendar,
  TrendingUp, 
  BarChart,
  Percent
} from 'lucide-react';

interface StatCardProps { 
  title: string; 
  value: string | number; 
  description: string; 
  icon: React.ElementType;
  trend?: number;
  color?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  trend,
  color = "text-primary"
}: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend !== undefined && (
          <div className={`flex items-center text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  return null; // This component serves as an export for StatCard
};

export default DashboardStats;
