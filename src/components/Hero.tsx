import React, { useState, useEffect } from 'react';
import { Play, Flame, Swords, ShieldCheck, ChevronDown, Gamepad2 } from 'lucide-react';

export default function Hero() {
  const [onlinePlayers, setOnlinePlayers] = useState(148204);

  // Live Simulated Ticker for Players Online
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlinePlayers(prev => prev + Math.floor(Math.random() * 9) - 4);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToNext = () => {
    const element = document.getElementById('gaming-portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToArcade = () => {
    const element = document.getElementById('arcade-experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-root" 
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f052d] via-[#05010d] to-[#05010d]"
    >
      {/* Dynamic ambient glow overlays from Vibrant Palette */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-rose-500/10 blur-[130px] rounded-full animate-pulse-slow -z-10" />
      
      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.05)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(124,58,237,0.05)_1px,_transparent_1px)] bg-[size:32px_32px] -z-20 opacity-40" />

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto text-center z-10 animate-fade-in-up px-2">
        
        {/* Indie Badge with rose/violet border and text */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/50 rounded-full text-rose-400 text-xs font-bold tracking-widest uppercase mb-6 font-mono">
          <Flame className="w-3.5 h-3.5 animate-bounce" />
          ESTÚDIO DE JOGOS VIBRANTES • NEXUS VORTEX
        </div>

        {/* Big Stylized Display Typography from the Vibrant Palette */}
        <h1 className="font-sans font-black text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter leading-none mb-6">
          NÓS CRIAMOS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-400 drop-shadow-sm font-black pr-2">
            IMERSÃO
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg font-light leading-relaxed mb-10">
          Forjando narrativas épicas, jogabilidade ultra responsiva e interconexões profundas. Da magia retrô 16-bits ao poder futurista em neon. Venha fazer parte do nosso clã.
        </p>

        {/* Direct Action Buttons - using Vibrant Rose background and shadow details */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            id="hero-play-portfolio-btn"
            onClick={handleScrollToNext}
            className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-600/30 tracking-wider text-base flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white text-white" /> CONHECER OS JOGOS
          </button>

          <button
            id="hero-play-arcade-btn"
            onClick={handleScrollToArcade}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/40 hover:bg-slate-800 text-slate-200 font-bold border border-slate-700 hover:border-violet-500 rounded-full transition-all hover:scale-105 active:scale-95 tracking-wider text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4 text-rose-400 animate-pulse" /> TESTAR ARCADE GRÁTIS
          </button>
        </div>

        {/* Quick Simulated Live Stats Column with high contrast text */}
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto py-5 border-y border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl">
          <div className="text-center font-mono">
            <span className="block text-xl sm:text-3xl font-black text-white">
              {onlinePlayers.toLocaleString('pt-BR')}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold mt-0.5 block">Online</span>
          </div>

          <div className="text-center font-mono border-x border-white/5">
            <span className="block text-xl sm:text-3xl font-black text-white">12M+</span>
            <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold mt-0.5 block">Downloads</span>
          </div>

          <div className="text-center font-mono">
            <span className="block text-xl sm:text-3xl font-black text-rose-400">98%</span>
            <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold mt-0.5 block">Feedback</span>
          </div>
        </div>
      </div>

      {/* Decorative bottom arrows scroll guide */}
      <button 
        id="scroll-guide-btn"
        aria-label="Scroll down to games portfolio"
        onClick={handleScrollToNext} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-opacity duration-300 group cursor-pointer"
      >
        <span className="font-mono text-[9px] tracking-widest uppercase">CONHEÇA OS UNIVERSOS</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-rose-500" />
      </button>
    </section>
  );
}
