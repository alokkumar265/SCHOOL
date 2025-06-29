import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const initialJobs = [
  { title: 'Frontend Developer', company: 'Google', location: 'Bangalore', postedBy: 'Amit Sharma' },
  { title: 'Data Analyst', company: 'TCS', location: 'Mumbai', postedBy: 'Priya Singh' },
];

const JobBoardPage = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [form, setForm] = useState({ title: '', company: '', location: '', postedBy: '' });
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = e => {
    e.preventDefault();
    if (form.title && form.company && form.location && form.postedBy) {
      setJobs([{ ...form }, ...jobs]);
      setForm({ title: '', company: '', location: '', postedBy: '' });
      setShowModal(false);
    }
  };

  const openPostJobModal = () => setShowModal(true);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Job Board</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            className="input input-bordered flex-1"
            placeholder="Search jobs by title, company, location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search jobs"
          />
          <button className="btn btn-primary" aria-label="Post a job" onClick={openPostJobModal}>Post Job</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">No jobs found.</div>
          ) : filteredJobs.map((job, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <div className="font-semibold text-lg mb-1">{job.title}</div>
              <div className="text-sm text-gray-500 mb-1">{job.company}</div>
              <div className="text-sm text-gray-500 mb-2">{job.location}</div>
              <div className="text-xs text-gray-400 mb-2">Posted by {job.postedBy}</div>
              <button className="btn btn-primary btn-sm mt-auto" aria-label={`Apply for ${job.title} at ${job.company}`}>Apply</button>
            </div>
          ))}
        </div>
        
        {/* Post Job Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button 
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" 
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Post a Job</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <input
                    name="title"
                    className="input input-bordered w-full"
                    placeholder="e.g., Software Engineer"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    name="company"
                    className="input input-bordered w-full"
                    placeholder="e.g., Tech Corp"
                    value={form.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    name="location"
                    className="input input-bordered w-full"
                    placeholder="e.g., Bangalore"
                    value={form.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Posted By</label>
                  <input
                    name="postedBy"
                    className="input input-bordered w-full"
                    placeholder="Your name"
                    value={form.postedBy}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="btn btn-primary flex-1">Post Job</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobBoardPage; 