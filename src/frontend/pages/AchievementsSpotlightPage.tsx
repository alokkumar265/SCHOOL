import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const initialAchievements = [
  { title: 'Best Innovator Award', description: 'Won the Best Innovator Award at TechFest 2024.', year: '2024', by: 'Amit Sharma' },
  { title: 'Alumni of the Month', description: 'Recognized for outstanding community service.', year: '2025', by: 'Priya Singh', spotlight: true },
];

const AchievementsSpotlightPage = () => {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [form, setForm] = useState({ title: '', description: '', year: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (form.title && form.description && form.year) {
      setAchievements([{ ...form, by: 'You' }, ...achievements]);
      setForm({ title: '', description: '', year: '' });
    }
  };

  const spotlight = achievements.find(a => a.spotlight);
  const rest = achievements.filter(a => !a.spotlight);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Achievements & Spotlights</h1>
        {spotlight && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">
            <div className="font-semibold text-lg mb-1">Alumni of the Month: {spotlight.by}</div>
            <div className="font-medium">{spotlight.title} ({spotlight.year})</div>
            <div className="text-gray-700">{spotlight.description}</div>
          </div>
        )}
        <form className="bg-white rounded-lg shadow p-4 mb-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input name="title" className="input input-bordered" placeholder="Achievement Title" value={form.title} onChange={handleChange} required />
            <input name="year" className="input input-bordered" placeholder="Year" value={form.year} onChange={handleChange} required />
            <input name="description" className="input input-bordered md:col-span-1" placeholder="Description" value={form.description} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Submit Achievement</button>
        </form>
        <div className="space-y-4">
          {rest.map((a, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold">{a.title} ({a.year})</div>
              <div className="text-gray-700 mb-1">{a.description}</div>
              <div className="text-xs text-gray-400">By {a.by}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AchievementsSpotlightPage; 