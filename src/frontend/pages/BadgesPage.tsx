import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Award, CheckCircle, Heart, Users, Calendar } from 'lucide-react';

const allBadges = [
  { name: 'Verified Alumni', icon: <CheckCircle className="text-green-600" />, desc: 'Verified alumni profile.' },
  { name: 'Donor', icon: <Heart className="text-pink-500" />, desc: 'Contributed to school donations.' },
  { name: 'Mentor', icon: <Users className="text-blue-600" />, desc: 'Mentored other alumni or students.' },
  { name: 'Event Participant', icon: <Calendar className="text-purple-600" />, desc: 'Attended alumni events.' },
  { name: 'Alumni of the Month', icon: <Award className="text-yellow-500" />, desc: 'Featured for outstanding achievement.' },
];
const userBadges = ['Verified Alumni', 'Donor', 'Event Participant'];

const BadgesPage = () => (
  <DashboardLayout>
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Badges</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {allBadges.map((badge, i) => (
          <div key={i} className={`bg-white rounded-lg shadow p-4 flex items-center gap-4 ${userBadges.includes(badge.name) ? '' : 'opacity-50'}`}>
            <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded-full">
              {badge.icon}
            </div>
            <div>
              <div className="font-semibold">{badge.name}</div>
              <div className="text-sm text-gray-500">{badge.desc}</div>
              {userBadges.includes(badge.name) && <span className="text-xs text-green-600 font-medium">You have this badge</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default BadgesPage; 