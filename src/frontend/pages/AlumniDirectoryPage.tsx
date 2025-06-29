import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const mockAlumni = [
  { name: 'Amit Sharma', batch: '2010', company: 'Infosys', location: 'Bangalore', email: 'amit@example.com' },
  { name: 'Priya Singh', batch: '2012', company: 'TCS', location: 'Delhi', email: 'priya@example.com' },
  { name: 'Rahul Verma', batch: '2015', company: 'Google', location: 'Hyderabad', email: 'rahul@example.com' },
  { name: 'Sneha Patel', batch: '2018', company: 'Amazon', location: 'Mumbai', email: 'sneha@example.com' },
];

const getUnique = (arr, key) => [...new Set(arr.map(a => a[key]))];

const AlumniDirectoryPage = () => {
  const [search, setSearch] = useState('');
  const [batch, setBatch] = useState('');
  const [company, setCompany] = useState('');
  const [modal, setModal] = useState(null);
  const [message, setMessage] = useState('');

  const batches = getUnique(mockAlumni, 'batch');
  const companies = getUnique(mockAlumni, 'company');

  const filtered = mockAlumni.filter(a =>
    (batch ? a.batch === batch : true) &&
    (company ? a.company === company : true) &&
    (
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.batch.includes(search) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Alumni Directory</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select className="input input-bordered" value={batch} onChange={e => setBatch(e.target.value)} aria-label="Filter by batch">
            <option value="">All Batches</option>
            {batches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select className="input input-bordered" value={company} onChange={e => setCompany(e.target.value)} aria-label="Filter by company">
            <option value="">All Companies</option>
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            className="input input-bordered flex-1"
            placeholder="Search by name, batch, company, location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search alumni"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">No alumni found.</div>
          ) : filtered.map((alumni, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold mb-2">
                {alumni.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="font-semibold text-lg">{alumni.name}</div>
              <div className="text-sm text-gray-500 mb-1">Batch {alumni.batch}</div>
              <div className="text-sm text-gray-500 mb-1">{alumni.company}</div>
              <div className="text-sm text-gray-500 mb-2">{alumni.location}</div>
              <button className="btn btn-primary btn-sm w-full" aria-label={`Connect with ${alumni.name}`} onClick={() => setModal(alumni)}>Connect</button>
            </div>
          ))}
        </div>
        {modal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setModal(null)} aria-label="Close modal">&times;</button>
              <h2 className="text-xl font-bold mb-2">Connect with {modal.name}</h2>
              <div className="mb-2 text-sm text-gray-500">Email: <a href={`mailto:${modal.email}`} className="text-blue-600 underline">{modal.email}</a></div>
              <form onSubmit={e => { e.preventDefault(); setMessage(''); setModal(null); }}>
                <textarea className="input input-bordered w-full mb-2" placeholder="Write a message (demo only)" value={message} onChange={e => setMessage(e.target.value)} />
                <button className="btn btn-primary w-full" type="submit">Send Message</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AlumniDirectoryPage; 