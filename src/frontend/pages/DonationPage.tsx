import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const D_KEY = 'alumni_donations';

const loadDonations = () => {
  try {
    return JSON.parse(localStorage.getItem(D_KEY) || '[]');
  } catch {
    return [];
  }
};

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [donations, setDonations] = useState(loadDonations());
  const [loading, setLoading] = useState(false);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || !name || !email) return;
    setLoading(true);
    // Razorpay integration (demo)
    const options = {
      key: 'RAZORPAY_KEY_ID', // Replace with your Razorpay key
      amount: parseInt(amount) * 100,
      currency: 'INR',
      name: 'Veena Public School',
      description: 'Alumni Donation',
      handler: function (response) {
        const newDonation = { amount, name, email, id: response.razorpay_payment_id, date: new Date().toLocaleString() };
        const updated = [newDonation, ...donations];
        setDonations(updated);
        localStorage.setItem(D_KEY, JSON.stringify(updated));
        setAmount(''); setName(''); setEmail('');
        alert('Donation successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: { name, email },
      theme: { color: '#0d47a1' },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Donate to School</h1>
        <form className="bg-white rounded-lg shadow p-6 mb-8" onSubmit={handleDonate}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Amount (INR)</label>
            <input type="number" min="1" className="input input-bordered w-full" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input type="text" className="input input-bordered w-full" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" className="input input-bordered w-full" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Processing...' : 'Donate with Razorpay'}</button>
          <p className="text-xs text-gray-500 mt-2">* This is a demo. Replace <code>RAZORPAY_KEY_ID</code> with your real key for production.</p>
        </form>
        <h2 className="text-lg font-semibold mb-2">Donation History</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {donations.length === 0 ? (
            <p className="text-gray-500 text-center">No donations yet.</p>
          ) : (
            <ul className="divide-y">
              {donations.map((d, i) => (
                <li key={i} className="py-2 flex justify-between items-center">
                  <span>
                    <span className="font-medium">₹{d.amount}</span> by {d.name} <span className="text-xs text-gray-400">({d.email})</span>
                  </span>
                  <span className="text-xs text-gray-500">{d.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </DashboardLayout>
  );
};

export default DonationPage; 