import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { useAuth } from '@/backend/contexts/AuthContext';

const FeedbackPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Staff-specific mock context
  const isStaff = user?.role === 'staff';
  const pageTitle = isStaff ? 'Staff Feedback & Suggestions' : 'Feedback & Suggestions';
  const thankYouMsg = isStaff ? 'Thank you for your feedback, staff member!' : 'Thank you for your feedback!';

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">{pageTitle}</h1>
        {submitted ? (
          <div className="bg-green-100 border-l-4 border-green-500 rounded-lg p-6 text-green-800">
            {thankYouMsg}
          </div>
        ) : (
          <form className="bg-white rounded-lg shadow p-6 space-y-4" onSubmit={handleSubmit}>
            <input name="name" className="input input-bordered w-full" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <input name="email" className="input input-bordered w-full" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            <textarea name="message" className="input input-bordered w-full h-24" placeholder={isStaff ? 'Your feedback or suggestion for school administration, HR, or facilities...' : 'Your Feedback or Suggestion'} value={form.message} onChange={handleChange} required />
            <button type="submit" className="btn btn-primary w-full">Submit</button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeedbackPage;