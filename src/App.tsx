import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MiniArcade from './components/MiniArcade';
import StudioMission from './components/StudioMission';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import GameDetailsModal from './components/GameDetailsModal';
import { GAMES_DATA, NEWS_DATA } from './data';
import { Game } from './types';
import { Compass, Sparkles, SlidersHorizontal, Eye, Calendar, MessageSquare, Newspaper } from 'lucide-react';

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'RPG' | 'Adventure' | 'Pixel'>('All');
  const [newsLikes, setNewsLikes] = useState<{ [key: string]: number }>({ n1: 24, n2: 52 });
  const [newsLiked, setNewsLiked] = useState<{ [key: string]: boolean }>({});

  const filteredGames = GAMES_DATA.filter(game => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'RPG') return game.genre.includes('RPG');
    if (selectedFilter === 'Adventure') return game.genre.includes('Aventura');
    if (selectedFilter === 'Pixel') return game.genre.includes('Retrô');
    return true;
  });

  const handleLikeNews = (newsId: string) => {
    if (newsLiked[newsId]) {
      setNewsLikes(prev => ({ ...prev, [newsId]: prev[newsId] - 1 }));
      setNewsLiked(prev => ({ ...prev, [newsId]: false }));
    } else {
      setNewsLikes(prev => ({ ...prev, [newsId]: prev[newsId] + 1 }));
      setNewsLiked(prev => ({ ...prev, [newsId]: true }));
    }
  };

  const statusColors = {
    'In Alpha': 'bg-yellow-950/70 text-yellow-300 border-yellow-800/30',
    'Early Access': 'bg-cyan-950/70 text-cyan-300 border-cyan-800/30',
    'Released': 'bg-emerald-950/70 text-emerald-300 border-emerald-800/30',
    'Coming Soon': 'bg-purple-950/70 text-purple-300 border-purple-800/30'
  };
  return (
    <div id="vortex-root" className="min-h-screen bg-[#05010d] text-slate-100 overflow-x-hidden transition-all font-sans">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Interactive Welcome section */}
      <Hero />

      {/* 3. Games Portfolio Section */}
      <section id="gaming-portfolio" className="relative py-24 bg-[#05010d] px-4 sm:px-6 lg:px-8 border-t border-white/5">
        
        {/* Glow ambient design backdrops from Vibrant Palette */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/5 blur-[120px] rounded-full -z-10 animate-pulse-slow" />

        <div className="max-w-7xl mx-auto">
          {/* Section title header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-rose-450 font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1.5">
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> CATALOGADO EM ALTA FIDELIDADE
              </div>
              <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">
                Explore Nossos <span className="text-rose-400">Mundos</span>
              </h2>
            </div>

            {/* Interactive Filters selector block with high fidelity rounded pill buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-2xs sm:text-xs">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 mr-1 flex-shrink-0" />
              
              <button
                id="filter-all-btn"
                onClick={() => setSelectedFilter('All')}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full border transition font-bold cursor-pointer ${
                  selectedFilter === 'All' 
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/50 shadow-md shadow-rose-500/5' 
                    : 'bg-slate-900/40 text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                Todos
              </button>

              <button
                id="filter-rpg-btn"
                onClick={() => setSelectedFilter('RPG')}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full border transition font-bold cursor-pointer ${
                  selectedFilter === 'RPG' 
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/50 shadow-md shadow-rose-500/5' 
                    : 'bg-slate-900/40 text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                Série RPG
              </button>

              <button
                id="filter-adventure-btn"
                onClick={() => setSelectedFilter('Adventure')}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full border transition font-bold cursor-pointer ${
                  selectedFilter === 'Adventure' 
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/50 shadow-md shadow-rose-500/5' 
                    : 'bg-slate-900/40 text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                Aventura
              </button>

              <button
                id="filter-pixel-btn"
                onClick={() => setSelectedFilter('Pixel')}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full border transition font-bold cursor-pointer ${
                  selectedFilter === 'Pixel' 
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/50 shadow-md shadow-rose-500/5' 
                    : 'bg-slate-900/40 text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                }`}
              >
                Retro 16-bits
              </button>
            </div>
          </div>

          {/* Games Card list list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <div 
                id={`game-card-${game.id}`}
                key={game.id} 
                className="group relative flex flex-col bg-slate-900/40 rounded-3xl border border-white/5 overflow-hidden shadow-xl hover:shadow-rose-500/5 transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Game Card Header Image banner */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500/70"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                  
                  {/* Status Indicator over image */}
                  <span className={`absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold rounded-full font-mono border ${statusColors[game.status]}`}>
                    {game.status}
                  </span>
                </div>

                {/* Card body descriptions */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-rose-455 uppercase font-bold tracking-widest block">{game.genre}</span>
                    <h3 className="font-sans font-black text-[#f1f1f3] text-lg sm:text-xl transform group-hover:text-rose-400 transition leading-tight">
                      {game.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* Platforms indicator and Action details selector button */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3 text-2xs font-mono font-bold">
                    <div className="flex gap-1.5 text-slate-500">
                      {game.platforms.map((plat) => (
                        <span key={plat} className="px-2 py-0.5 bg-slate-950 border border-white/5 rounded-full text-[9px]">
                          {plat}
                        </span>
                      ))}
                    </div>

                    <button
                      id={`game-details-btn-${game.id}`}
                      onClick={() => setSelectedGame(game)}
                      className="text-rose-450 hover:text-white font-extrabold flex items-center gap-0.5 hover:underline decoration-1 cursor-pointer"
                    >
                      Ver Detalhes <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mini retro arcade terminal game container */}
      <section id="arcade-experience" className="relative py-24 bg-[#05010d] px-4 border-t border-white/5">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-600/5 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogan and details columns */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 font-mono text-2xs sm:text-xs font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> TESTE DE CAPACIDADE DE JOGO
            </div>
            
            <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter leading-none">
              Fliperama Retro <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-400 pr-2">
                Pixel-Force 2500
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Demonstramos nossa paixão desenvolvendo experiências lúdicas diretamente no navegador! Jogue o mini-game **Vortex Space Defender** à direita. Use as setas ou clique nos botões integrados ao painel.
            </p>

            <div className="space-y-4 font-sans justify-start text-xs sm:text-sm text-slate-450">
              <div className="flex gap-2.5 items-start">
                <span className="text-rose-450 font-bold font-mono text-sm mt-0.5">01</span>
                <div>
                  <strong className="text-slate-200 block">Recompensas Exclusivas:</strong>
                  <span>Esquive e atire para bater o recorde de 100 pontos e desbloquear um cupom chave beta especial.</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <span className="text-cyan-400 font-bold font-mono text-sm mt-0.5">02</span>
                <div>
                  <strong className="text-slate-200 block">Sintetizador Web Audio API:</strong>
                  <span>Nenhum arquivo de áudio pesado e lento é carregado! Os lasers e explosões retro são gerados via sintetizadores de frequências analógicos simulados no seu browser.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Arcade Play Area */}
          <div className="lg:col-span-6">
            <MiniArcade />
          </div>
        </div>
      </section>

      {/* 5. Studio team, values, and careers directories info */}
      <StudioMission />

      {/* 6. Devlog news feed section */}
      <section id="devlog-news" className="relative py-24 bg-[#05010d] px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 font-mono tracking-widest font-bold mb-3 rounded-full">
              <Newspaper className="w-4 h-4" /> DIÁRIOS DE CRIAÇÃO & EVENTOS
            </span>
            <h3 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">Novidades da Vortex</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {NEWS_DATA.map((news) => (
              <div 
                id={`news-card-${news.id}`}
                key={news.id} 
                className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-rose-500/20 transition-all shadow-xl"
              >
                <div className="h-44 overflow-hidden relative">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-slate-950 text-rose-400 border border-white/5 rounded-full font-mono text-[9px] uppercase font-bold">
                    {news.category}
                  </span>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="font-mono text-3xs text-slate-500 block flex items-center gap-1.5 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" /> {news.date}
                    </span>
                    <h4 className="font-sans font-bold text-base sm:text-lg text-white hover:text-rose-400 transition-colors leading-tight">
                      {news.title}
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-white/5 text-2xs font-mono font-bold">
                    <button 
                      id={`like-news-${news.id}`}
                      onClick={() => handleLikeNews(news.id)} 
                      className={`flex items-center gap-1 p-1 hover:text-white transition cursor-pointer select-none ${
                        newsLiked[news.id] ? 'text-rose-400 font-bold' : 'text-slate-500'
                      }`}
                    >
                      ♥ {newsLikes[news.id]} Curtidas
                    </button>
                    <span className="text-slate-600 block flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> 0 comentários
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Guild join newsletter subscription section */}
      <Newsletter />

      {/* 8. Footer component segment */}
      <Footer />

      {/* 9. Render Game Details Modal if selected */}
      <GameDetailsModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
}
