import React from 'react';
import { X, Calendar, Flame, Layers, Monitor, Disc3, Shield } from 'lucide-react';
import { Game } from '../types';

interface GameDetailsModalProps {
  game: Game | null;
  onClose: () => void;
}

export default function GameDetailsModal({ game, onClose }: GameDetailsModalProps) {
  if (!game) return null;

  // Render platform logos or text tags cleanly
  const platformColors: { [key: string]: string } = {
    'PC': 'bg-slate-800 text-slate-100 border-slate-700',
    'Xbox': 'bg-green-950 text-green-300 border-green-800',
    'PlayStation': 'bg-blue-950 text-blue-300 border-blue-800',
    'Nintendo Switch': 'bg-red-950 text-red-300 border-red-800',
    'SteamDeck': 'bg-cyan-950 text-cyan-300 border-cyan-800'
  };

  const statusColors = {
    'In Alpha': 'bg-yellow-950 text-yellow-300 border-yellow-800',
    'Early Access': 'bg-cyan-950 text-cyan-400 border-cyan-800',
    'Released': 'bg-emerald-950 text-emerald-400 border-emerald-800',
    'Coming Soon': 'bg-purple-950 text-purple-400 border-purple-800'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity cursor-pointer"
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-3xl bg-[#05010d] rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-10 transition-all">
        {/* Cover Video/Image Backdrop banner */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={game.imageUrl} 
            alt={game.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05010d] to-transparent" />
          
          {/* Close trigger button */}
          <button 
            id="modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-200 border border-white/10 transition cursor-pointer"
            aria-label="Filter games"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title tag overlays on top of images */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 items-end justify-between">
            <h3 className="font-sans font-black text-2xl sm:text-3.5xl text-white tracking-tight drop-shadow-md">
              {game.title}
            </h3>
            <span className={`px-3 py-1 text-xs font-bold rounded-full border font-mono ${statusColors[game.status]}`}>
              {game.status}
            </span>
          </div>
        </div>

        {/* Modal content body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          {/* Game Genre and Release information bar */}
          <div className="flex flex-wrap gap-4 items-center justify-between text-xs text-slate-400 font-mono pb-4 border-b border-white/5 mb-6">
            <span className="text-rose-400 font-bold uppercase tracking-wider">{game.genre}</span>
            <div className="flex items-center gap-1.5 font-bold">
              <Calendar className="w-3.5 h-3.5 text-rose-450" />
              <span>Lançamento: {game.releaseDate}</span>
            </div>
            <span className="bg-slate-900 px-3 py-1 rounded-full border border-white/5 font-bold uppercase text-[10px] text-rose-400">
              {game.rating}
            </span>
          </div>

          <div className="space-y-6">
            {/* Story description */}
            <div>
              <h4 className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase mb-1.5">HISTORIA & HISTÓRICO</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{game.longDescription}</p>
            </div>

            {/* Platforms and tags bullet indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-mono text-xs text-rose-400 font-bold tracking-widest uppercase mb-3">PLATAFORMAS SUPORTADAS</h4>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((platform) => (
                    <span 
                      id={`modal-platform-${platform}`}
                      key={platform} 
                      className={`px-3 py-1 rounded-full text-xs border font-bold ${platformColors[platform] || 'bg-slate-700'}`}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold tracking-widest uppercase mb-3 text-slate-400">TAGS DO PROJETO</h4>
                <div className="flex flex-wrap gap-1.5">
                  {game.tags.map((tag) => (
                    <span 
                      id={`modal-tag-${tag}`}
                      key={tag} 
                      className="px-2.5 py-1 bg-slate-900 text-rose-400 text-2xs border border-white/5 rounded-full font-bold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Core mechanical features */}
            <div>
              <h4 className="font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-450 animate-pulse" /> DESTAQUES DE JOGABILIDADE
              </h4>
              <ul className="space-y-2.5 text-slate-350 text-sm">
                {game.features.map((feat, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start">
                    <span className="inline-block mt-2 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical system requirements */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5">
              <h4 className="font-mono text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-1.5 text-slate-400">
                <Monitor className="w-4 h-4 text-slate-500" /> REQUISITOS DE SISTEMA (PC)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold block text-cyan-400 mb-1">Mínimos:</span>
                   <p className="text-slate-400 leading-normal font-mono">{game.requirements.minimum}</p>
                </div>
                <div>
                  <span className="font-bold block text-rose-400 mb-1">Recomendados:</span>
                  <p className="text-slate-400 leading-normal font-mono">{game.requirements.recommended}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal footer call to action */}
        <div className="p-5 sm:px-8 bg-slate-950 border-t border-white/5 flex flex-wrap gap-3 items-center justify-between">
          <span className="font-mono text-2xs text-slate-500">RESGATAR ACESSO ANTECIPADO • VORTEX</span>
          <button 
            id="modal-subscribe-alpha-btn"
            onClick={onClose} 
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full transition duration-150 tracking-widest flex items-center gap-1 cursor-pointer"
          >
            INSCREVER PRO PARQUE BETA
          </button>
        </div>
      </div>
    </div>
  );
}
