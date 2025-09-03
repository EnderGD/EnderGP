import React, { useState } from 'react';
import { MenuIcon, XIcon } from './icons';

interface HeaderProps {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const Logo = () => (
    <a href="#intro" className="flex items-center space-x-3 group" aria-label="Go to top of page">
        <svg width="40" height="40" viewBox="0 0 100 100" className="group-hover:animate-spin" style={{ animationDuration: '10s' }}>
            <path d="M50,0 A50,50 0 0,1 93.3,25 L75,36.6 A32,32 0 0,0 50,18 V0 Z" fill="#00BFFF"/>
            <path d="M93.3,25 A50,50 0 0,1 93.3,75 L75,63.4 A32,32 0 0,0 75,36.6 L93.3,25 Z" fill="#1E90FF"/>
            <path d="M93.3,75 A50,50 0 0,1 50,100 L50,82 A32,32 0 0,0 75,63.4 L93.3,75 Z" fill="#4169E1"/>
            <path d="M50,100 A50,50 0 0,1 6.7,75 L25,63.4 A32,32 0 0,0 50,82 V100 Z" fill="#0000CD"/>
            <path d="M6.7,75 A50,50 0 0,1 6.7,25 L25,36.6 A32,32 0 0,0 25,63.4 L6.7,75 Z" fill="#00008B"/>
            <path d="M6.7,25 A50,50 0 0,1 50,0 L50,18 A32,32 0 0,0 25,36.6 L6.7,25 Z" fill="#000080"/>
        </svg>
        <span className="font-orbitron text-2xl font-bold tracking-widest text-white">ENDER</span>
    </a>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="capitalize font-orbitron text-sm tracking-wider text-gray-300 hover:text-cyan-400 transition-colors duration-300"
  >
    {children}
  </a>
);

const AuthButton: React.FC<{ isAdmin: boolean; login: () => void; logout: () => void; }> = ({ isAdmin, login, logout }) => (
    <button
        onClick={isAdmin ? logout : login}
        className="font-orbitron text-sm bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]"
    >
        {isAdmin ? 'Logout' : 'Admin Login'}
    </button>
);


const Header: React.FC<HeaderProps> = ({ isAdmin, login, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['work', 'pricing', 'contact'];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 py-4 px-4 md:px-8 bg-black/30 backdrop-blur-lg border-b border-blue-900/30">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink key={item} href={`#${item}`}>{item}</NavLink>
          ))}
          <AuthButton isAdmin={isAdmin} login={login} logout={logout} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open navigation menu">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0c0a1f]/95 backdrop-blur-xl p-6 transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-8">
          <button onClick={closeMenu} aria-label="Close navigation menu">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-8">
          {navItems.map((item) => (
            <NavLink key={item} href={`#${item}`} onClick={closeMenu}>{item}</NavLink>
          ))}
          <AuthButton isAdmin={isAdmin} login={login} logout={logout} />
        </nav>
      </div>
      {isMenuOpen && <div onClick={closeMenu} className="fixed inset-0 bg-black/50 z-40 md:hidden"></div>}
    </header>
  );
};

export default Header;