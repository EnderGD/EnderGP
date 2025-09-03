import React, { useState, useRef, ChangeEvent } from 'react';
import { PortfolioItem, GalleryCategory } from '../types';
import { db, storage } from '../services/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
// Fix: Removed modular storage imports as we are now using the compat library for storage.
import { DeleteIcon, UploadIcon, ChevronDownIcon } from './icons';
import Spinner from './Spinner';

interface AlbumProps {
  category: GalleryCategory;
  images: PortfolioItem[];
  isAdmin: boolean;
  defaultOpen?: boolean;
}

const Album: React.FC<AlbumProps> = ({ category, images, isAdmin, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isAdmin) return;

    setUploading(true);
    try {
      const storagePath = `images/${category}/${Date.now()}_${file.name}`;
      // Fix: Use Firebase v8 compat API for storage.
      const storageRef = storage.ref(storagePath);
      const snapshot = await storageRef.put(file);
      const imageUrl = await snapshot.ref.getDownloadURL();

      await addDoc(collection(db, 'portfolio_images'), {
        category,
        imageUrl,
        storagePath,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Failed to upload image. Check console for details.');
    } finally {
      setUploading(false);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (item: PortfolioItem) => {
    if (!isAdmin || !window.confirm('Are you sure you want to delete this image?')) return;

    try {
      // Fix: Use Firebase v8 compat API for storage.
      const storageRef = storage.ref(item.storagePath);
      await storageRef.delete();
      await deleteDoc(doc(db, 'portfolio_images', item.id));
    } catch (error) {
      console.error("Error deleting image:", error);
      alert('Failed to delete image. Check console for details.');
    }
  };

  return (
    <div className="border border-blue-800/30 rounded-lg overflow-hidden backdrop-blur-sm bg-gray-900/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 md:p-6 bg-gray-900/30 hover:bg-gray-800/40 transition-colors"
      >
        <h3 className="font-orbitron text-xl md:text-2xl font-bold tracking-wider">{category} ({images.length})</h3>
        <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-4 md:p-6">
          {isAdmin && (
            <div className="mb-6 p-4 border-2 border-dashed border-cyan-500/50 rounded-lg text-center">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" ref={fileInputRef} disabled={uploading} />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? <><Spinner /> Uploading...</> : <><UploadIcon className="w-5 h-5" /> Add Image to {category}</>}
              </button>
            </div>
          )}
          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map(item => (
                <div key={item.id} className="group relative aspect-square overflow-hidden rounded-md">
                  <img src={item.imageUrl} alt={`${category} work`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(item)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500"
                      aria-label="Delete image"
                    >
                      <DeleteIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">No work to display in this category yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Album;