import React from 'react';
import { Gamepad2, Twitter, Github, Youtube, MessageSquare, Heart, Shield } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05010d] border-t border-white/5 pt-16 pb-8 px-4 text-xs font-sans text-slate-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Core Column: Branding */}
        <div className="space-y-4">
          <div 
            onClick={handleScrollToTop} 
            className="flex items-center gap-2 cursor-pointer group w-fit"
          >
            <div className="p-1.5 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-sans font-black text-white text-base tracking-tight">VORTEX</span>
              <span className="text-rose-450 font-mono text-[9px] block -mt-1 font-semibold">STUDIOS</span>
            </div>
          </div>
          <p className="text-slate-450 leading-relaxed text-2xs sm:text-xs">
            Forjando mundos virtuais inovadores e imersivos para jogadores apaixonados em todo o planeta.
          </p>
          
          {/* Social Badges Icons */}
          <div className="flex gap-3">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900/40 rounded-lg border border-white/5 hover:border-rose-500 hover:text-white transition" aria-label="Acessar Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900/40 rounded-lg border border-white/5 hover:border-rose-500 hover:text-white transition" aria-label="Acessar Discord">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900/40 rounded-lg border border-white/5 hover:border-rose-500 hover:text-white transition" aria-label="Acessar Youtube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900/40 rounded-lg border border-white/5 hover:border-rose-500 hover:text-white transition" aria-label="Acessar Github">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Games Link indexes */}
        <div className="space-y-3">
          <h4 className="font-mono text-white text-xs font-bold tracking-widest uppercase mb-1">UNIVERSOS</h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#gaming-portfolio" className="hover:text-rose-400 transition text-slate-400">Cyberfall 2088</a></li>
            <li><a href="#gaming-portfolio" className="hover:text-cyan-400 transition text-slate-400">Aethelgard: Chronicles</a></li>
            <li><a href="#gaming-portfolio" className="hover:text-rose-400 transition text-slate-400">Pixel Quest: Arena</a></li>
          </ul>
        </div>

        {/* Column 3: Navigation shortcuts */}
        <div className="space-y-3">
          <h4 className="font-mono text-white text-xs font-bold tracking-widest uppercase mb-1">RECURSOS</h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#arcade-experience" className="hover:text-rose-400 transition text-slate-400">Fliperama Retro Arcade</a></li>
            <li><a href="#studio-mission" className="hover:text-cyan-400 transition text-slate-400">Missão & Fundadores</a></li>
            <li><a href="#career-department" className="hover:text-rose-400 transition text-slate-400">Trabalhe Conosco</a></li>
            <li><a href="#newsletter-join" className="hover:text-cyan-400 transition text-slate-400">Inscrição Alpha Guild</a></li>
          </ul>
        </div>

        {/* Column 4: Legals & Location info */}
        <div className="space-y-3">
          <h4 className="font-mono text-white text-xs font-bold tracking-widest uppercase mb-1">LOCALIZAÇÃO</h4>
          <p className="text-slate-400 leading-relaxed text-2xs sm:text-xs">
            Vortex Games Studios S.A.<br />
            Florianópolis, SC — Brasil / Remoto<br />
            Contato: <span className="text-rose-400">contato@vortexstudios.com</span>
          </p>
          <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[10px]">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>GDPR / LGPD em conformidade</span>
          </div>
        </div>
      </div>

      {/* Under copyright bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Vortex Studios. Todos os direitos reservados.
        </p>
        <p className="flex items-center gap-1">
          Criado com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 font-extrabold" /> para o Universo dos Jogadores.
        </p>
      </div>
    </footer>
  );
}
