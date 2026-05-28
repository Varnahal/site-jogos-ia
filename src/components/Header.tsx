import React, { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, Compass, Users, Code, Mail } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#05010d]/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div 
          onClick={() => scrollToSection('hero-root')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative p-2 bg-rose-500/15 group-hover:bg-rose-500/25 rounded-xl border border-rose-500/30 selection:bg-none transition-all duration-300">
            <Gamepad2 className="w-5 h-5 text-rose-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-violet-500 rounded-xl opacity-0 group-hover:opacity-45 blur-sm transition-opacity" />
          </div>
          <div>
            <span className="font-sans font-black text-xl tracking-tight text-white leading-none block">VORTEX</span>
            <span className="font-mono text-[9px] text-rose-400 tracking-widest uppercase block mt-0.5 font-bold">STUDIOS</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            id="nav-games-btn"
            onClick={() => scrollToSection('gaming-portfolio')}
            className="text-slate-400 hover:text-white transition-all text-sm font-semibold flex items-center gap-1.5 focus:outline-none pointer-events-auto cursor-pointer"
          >
            <Compass className="w-4 h-4 text-rose-400" /> NOSSOS JOGOS
          </button>
          
          <button 
            id="nav-arcade-btn"
            onClick={() => scrollToSection('arcade-experience')}
            className="text-slate-400 hover:text-white transition-all text-sm font-semibold flex items-center gap-1.5 focus:outline-none pointer-events-auto cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 text-violet-400" /> MINI-GAME ARCADE
          </button>

          <button 
            id="nav-studio-btn"
            onClick={() => scrollToSection('studio-mission')}
            className="text-slate-400 hover:text-white transition-all text-sm font-semibold flex items-center gap-1.5 focus:outline-none pointer-events-auto cursor-pointer"
          >
            <Users className="w-4 h-4 text-rose-400" /> ESTÚDIO
          </button>

          <button 
            id="nav-careers-btn"
            onClick={() => scrollToSection('career-department')}
            className="text-slate-400 hover:text-white transition-all text-sm font-semibold flex items-center gap-1.5 focus:outline-none pointer-events-auto cursor-pointer"
          >
            <Code className="w-4 h-4 text-cyan-400" /> CARREIRAS
          </button>
        </nav>

        {/* Action Button & Menu toggles */}
        <div className="flex items-center gap-4">
          <button 
            id="nav-action-join-btn"
            onClick={() => scrollToSection('newsletter-join')}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full transition-all hover:scale-105 shadow-md shadow-rose-600/20 tracking-wider cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" /> ENTRAR NA GUILDA
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg bg-slate-900/60 text-slate-200 border border-slate-800 hover:border-rose-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-lg left-0 right-0 bg-[#05010d]/98 backdrop-blur-lg border-b border-white/5 p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <button 
              id="mob-nav-games"
              onClick={() => scrollToSection('gaming-portfolio')}
              className="text-[#f1f1f3] hover:text-rose-400 text-left font-bold text-sm uppercase py-2 border-b border-white/5 flex items-center gap-3"
            >
              <Compass className="w-5 h-5 text-rose-400" /> Nossos Jogos
            </button>
            <button 
              id="mob-nav-arcade"
              onClick={() => scrollToSection('arcade-experience')}
              className="text-[#f1f1f3] hover:text-[#a855f7] text-left font-bold text-sm uppercase py-2 border-b border-white/5 flex items-center gap-3"
            >
              <Gamepad2 className="w-5 h-5 text-violet-400" /> Fliperama Retro (Mini-Game)
            </button>
            <button 
              id="mob-nav-studio"
              onClick={() => scrollToSection('studio-mission')}
              className="text-[#f1f1f3] hover:text-rose-400 text-left font-bold text-sm uppercase py-2 border-b border-white/5 flex items-center gap-3"
            >
              <Users className="w-5 h-5 text-rose-400" /> Estúdio & Equipe
            </button>
            <button 
              id="mob-nav-careers"
              onClick={() => scrollToSection('career-department')}
              className="text-[#f1f1f3] hover:text-cyan-400 text-left font-bold text-sm uppercase py-2 border-b border-white/5 flex items-center gap-3"
            >
              <Code className="w-5 h-5 text-cyan-400" /> Carreiras
            </button>
            <button 
              id="mob-nav-join"
              onClick={() => scrollToSection('newsletter-join')}
              className="w-full mt-2 py-3 bg-rose-600 text-white font-bold rounded-full transition-all tracking-wider text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> ENTRAR NA GUILDA
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
