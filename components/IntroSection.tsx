
import React from 'react';

const IntroSection: React.FC = () => {
  return (
    <section id="intro" className="min-h-[80vh] flex flex-col items-center justify-center text-center py-20">
      <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="animate-spin" style={{ animationDuration: '30s' }}>
            <path d="M50,0 A50,50 0 0,1 93.3,25 L75,36.6 A32,32 0 0,0 50,18 V0 Z" fill="#00BFFF"/>
            <path d="M93.3,25 A50,50 0 0,1 93.3,75 L75,63.4 A32,32 0 0,0 75,36.6 L93.3,25 Z" fill="#1E90FF"/>
            <path d="M93.3,75 A50,50 0 0,1 50,100 L50,82 A32,32 0 0,0 75,63.4 L93.3,75 Z" fill="#4169E1"/>
            <path d="M50,100 A50,50 0 0,1 6.7,75 L25,63.4 A32,32 0 0,0 50,82 V100 Z" fill="#0000CD"/>
            <path d="M6.7,75 A50,50 0 0,1 6.7,25 L25,36.6 A32,32 0 0,0 25,63.4 L6.7,75 Z" fill="#00008B"/>
            <path d="M6.7,25 A50,50 0 0,1 50,0 L50,18 A32,32 0 0,0 25,36.6 L6.7,25 Z" fill="#000080"/>
        </svg>
      </div>

      <h1 className="font-orbitron text-5xl md:text-7xl font-extrabold text-white tracking-widest animate-in opacity-0" style={{ textShadow: '0 0 15px rgba(0, 191, 255, 0.7)' }}>
        Hi, I'm Ender
      </h1>
      <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed animate-in opacity-0 animation-delay-1">
        A creative graphic designer transforming ideas into visual spectacles. I specialize in blending cosmic aesthetics with functional branding to create designs that are out of this world.
      </p>
    </section>
  );
};

export default IntroSection;
