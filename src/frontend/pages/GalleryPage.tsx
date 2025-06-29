import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const initialPhotos = [
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80', caption: 'Annual Meet 2024' },
  { url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80', caption: 'Reunion 2023' },
  { url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80', caption: 'Sports Day' },
];

const GalleryPage = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleUpload = e => {
    e.preventDefault();
    if (file && caption) {
      const url = URL.createObjectURL(file);
      setPhotos([{ url, caption }, ...photos]);
      setFile(null); setCaption('');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Photo Gallery</h1>
        <form className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-center" onSubmit={handleUpload}>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="input input-bordered" required />
          <input type="text" className="input input-bordered flex-1" placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} required />
          <button type="submit" className="btn btn-primary">Upload</button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover" />
              <div className="p-2 text-center text-sm text-gray-700">{photo.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GalleryPage; 