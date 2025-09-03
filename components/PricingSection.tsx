
import React from 'react';
import { PRICING_DATA } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-12 text-white tracking-wide" style={{ textShadow: '0 0 10px rgba(0, 191, 255, 0.5)' }}>
      {children}
    </h2>
  );

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20">
      <SectionTitle>Pricing</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {PRICING_DATA.map((tier, index) => (
          <div
            key={tier.service}
            className="group relative p-6 bg-gray-900/40 border border-blue-800/30 rounded-xl overflow-hidden text-center transition-all duration-300 hover:border-cyan-400 hover:bg-gray-900/80 hover:-translate-y-2 animate-in opacity-0"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transform -translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"></div>
            <h3 className="font-orbitron text-lg md:text-xl font-bold text-cyan-400">{tier.service}</h3>
            <p className="text-3xl md:text-4xl font-bold my-3 text-white">{tier.price}</p>
            <p className="text-sm text-gray-400">/ {tier.unit}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
