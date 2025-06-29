import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const initialMentors = [
  { name: 'Amit Sharma', interest: 'Software Engineering', email: 'amit@example.com', type: 'mentor' },
  { name: 'Priya Singh', interest: 'Data Science', email: 'priya@example.com', type: 'mentor' },
  { name: 'Rahul Verma', interest: 'AI/ML', email: 'rahul@example.com', type: 'mentee' },
];

const MentorshipPage = () => {
  const [role, setRole] = useState('mentor');
  const [form, setForm] = useState({ name: '', interest: '', email: '' });
  const [list, setList] = useState(initialMentors);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (form.name && form.interest && form.email) {
      setList([{ ...form, type: role }, ...list]);
      setForm({ name: '', interest: '', email: '' });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Mentorship Program</h1>
        <div className="flex gap-4 mb-4">
          <button className={`btn btn-sm ${role === 'mentor' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setRole('mentor')}>Be a Mentor</button>
          <button className={`btn btn-sm ${role === 'mentee' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setRole('mentee')}>Be a Mentee</button>
        </div>
        <form className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
          <input name="name" className="input input-bordered" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input name="interest" className="input input-bordered" placeholder="Area of Interest" value={form.interest} onChange={handleChange} required />
          <input name="email" className="input input-bordered" placeholder="Email" value={form.email} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary col-span-1 md:col-span-3">Sign Up</button>
        </form>
        <h2 className="text-lg font-semibold mb-2">Available Mentors & Mentees</h2>
        <div className="space-y-4">
          {list.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold">{item.name} <span className="text-xs text-gray-400">({item.type})</span></div>
                <div className="text-sm text-gray-500">{item.interest}</div>
              </div>
              <div className="text-xs text-gray-400 mt-2 md:mt-0">{item.email}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorshipPage; 