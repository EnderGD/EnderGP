import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { EmailIcon, InstagramIcon, DiscordIcon } from './icons';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-12 text-white tracking-wide" style={{ textShadow: '0 0 10px rgba(0, 191, 255, 0.5)' }}>
      {children}
    </h2>
);

const ContactCard: React.FC<{ item: any }> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (item.platform !== 'Discord') return;
    navigator.clipboard.writeText(item.handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const commonClasses = "group flex flex-col items-center p-8 bg-gray-900/40 border border-blue-800/30 rounded-xl transition-all duration-300 hover:border-cyan-400 hover:bg-gray-900/80 hover:-translate-y-2";

  if (item.platform === 'Discord') {
    return (
      <button
        onClick={handleCopy}
        className={`${commonClasses} w-full text-left`}
      >
        <div className="text-cyan-400 mb-4 transition-transform duration-300 group-hover:scale-110">
          {item.icon}
        </div>
        <h3 className="font-orbitron text-xl font-bold text-center">{item.platform}</h3>
        <p className="text-gray-300 mt-1">{copied ? 'Copied!' : item.handle}</p>
      </button>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
    >
      <div className="text-cyan-400 mb-4 transition-transform duration-300 group-hover:scale-110">
        {item.icon}
      </div>
      <h3 className="font-orbitron text-xl font-bold">{item.platform}</h3>
      <p className="text-gray-300 mt-1">{item.handle}</p>
    </a>
  );
};


const ContactSection: React.FC = () => {
  const contactItems = [
    {
      icon: <EmailIcon className="w-8 h-8" />,
      platform: 'Email',
      handle: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
    },
    {
      icon: <InstagramIcon className="w-8 h-8" />,
      platform: 'Instagram',
      handle: `@${CONTACT_INFO.instagram}`,
      href: `https://instagram.com/${CONTACT_INFO.instagram}`,
    },
    {
      icon: <DiscordIcon className="w-8 h-8" />,
      platform: 'Discord',
      handle: CONTACT_INFO.discord,
      href: '#', // Not a link, will be a copy action
    },
  ];

  return (
    <section id="contact" className="py-20">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contactItems.map((item, index) => (
          <div key={item.platform} className="animate-in opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
             <ContactCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;