import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const mockNewsletters = [
  { title: 'Alumni Newsletter - June 2025', date: '2025-06-01', link: '#' },
  { title: 'Alumni Newsletter - May 2025', date: '2025-05-01', link: '#' },
];
const mockAnnouncements = [
  { title: 'School Annual Day Announced!', date: '2025-07-01' },
  { title: 'New Library Inauguration', date: '2025-06-15' },
];

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Newsletter & Announcements</h1>
        <form className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4" onSubmit={handleSubscribe}>
          <input className="input input-bordered flex-1" placeholder="Enter your email to subscribe" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
        {subscribed && <div className="text-green-600 mb-4">Subscribed successfully!</div>}
        <h2 className="text-lg font-semibold mb-2">Past Newsletters</h2>
        <ul className="mb-6 space-y-2">
          {mockNewsletters.map((n, i) => (
            <li key={i} className="bg-gray-50 rounded p-3 flex justify-between items-center">
              <span>{n.title}</span>
              <span className="text-xs text-gray-400">{n.date}</span>
              <a href={n.link} className="btn btn-sm btn-outline ml-2">View</a>
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-semibold mb-2">Major Announcements</h2>
        <ul className="space-y-2">
          {mockAnnouncements.map((a, i) => (
            <li key={i} className="bg-gray-50 rounded p-3 flex justify-between items-center">
              <span>{a.title}</span>
              <span className="text-xs text-gray-400">{a.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default NewsletterPage; 