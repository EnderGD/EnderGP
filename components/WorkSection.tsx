
import React from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Album from './Album';
import { GALLERY_CATEGORIES } from '../constants';
import Spinner from './Spinner';

interface WorkSectionProps {
  isAdmin: boolean;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-12 text-white tracking-wide" style={{ textShadow: '0 0 10px rgba(0, 191, 255, 0.5)' }}>
    {children}
  </h2>
);

const WorkSection: React.FC<WorkSectionProps> = ({ isAdmin }) => {
  const { groupedItems, loading, error } = usePortfolioData();
  
  return (
    <section id="work" className="py-20">
      <SectionTitle>My Work</SectionTitle>
      {loading && <div className="flex justify-center"><Spinner /></div>}
      {error && <p className="text-center text-red-500">Error loading portfolio. Please try again later.</p>}
      {!loading && !error && (
        <div className="space-y-8">
          {GALLERY_CATEGORIES.map((category, index) => (
            <Album
              key={category}
              category={category}
              images={groupedItems[category] || []}
              isAdmin={isAdmin}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkSection;
