import React, { useState } from 'react';
import { Target, Users2, Rocket, ArrowRight, HeartHandshake, CheckCircle2, Send, Info } from 'lucide-react';
import { CAREERS_DATA, TEAM_DATA } from '../data';
import { CareerRole } from '../types';

export default function StudioMission() {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const handleApplyRole = (role: CareerRole) => {
    setSelectedRole(role);
    setApplicationSuccess(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    // Simulate sending application
    setTimeout(() => {
      setApplicationSuccess(true);
      // Clean form states
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPortfolio('');
    }, 800);
  };

  return (
    <section id="studio-mission" className="relative py-24 bg-[#05010d]">
      {/* Structural matrix glow backgrounds */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-violet-600/5 blur-3xl rounded-full" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-rose-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: STUDIO VALUES */}
        <div className="text-center mb-16">
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Construindo pontes para <br className="hidden sm:inline" />
            novas <span className="text-rose-400">realidades</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-rose-500 to-violet-600 mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Frustrados com fórmulas repetitivas, fundamos a Vortex para criar jogos fora da caixa. Focamos no desenvolvimento saudável, na inovação tecnológica e no envolvimento honesto com nossos jogadores.
          </p>
        </div>

        {/* Values Bullet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-rose-500/30 transition-all group">
            <div className="p-3 bg-rose-500/10 rounded-xl w-fit border border-rose-500/20 text-rose-400 mb-5 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="font-sans text-lg font-bold text-white mb-2">Jogabilidade Sem Amarras</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Damos liberdade total para nossos criadores correrem riscos. Nossos jogos não seguem tendências vazias; eles inauguram conceitos originais mecânicos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all group">
            <div className="p-3 bg-cyan-500/10 rounded-xl w-fit border border-cyan-500/20 text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-sans text-lg font-bold text-white mb-2">Comunidade é o Core</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Ouvimos genuinamente nossos clãs através de Alphas Fechados e testes abertos. Desenvolvemos junto com as pessoas que mais importam: vocês, os gamers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-rose-500/30 transition-all group">
            <div className="p-3 bg-rose-500/10 rounded-xl w-fit border border-rose-500/20 text-rose-400 mb-5 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-sans text-lg font-bold text-white mb-2">Sustentabilidade (Sem Crunch)</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Acreditamos que jogos maravilhosos surgem de pessoas saudáveis e inspiradas. Dissemos adeus à mentalidade tóxica das longas horas extras e priorizamos a vida pessoal da nossa equipe.
            </p>
          </div>
        </div>

        {/* SECTION 2: TEAM LEADERSHIP DIRECTORY */}
        <div id="studio-vanguard" className="mb-24">
          <div className="text-center mb-12">
            <span className="font-mono text-2xs text-[#22d3ee] font-bold tracking-widest uppercase block mb-2">CONHEÇA A VANGUARDA</span>
            <h3 className="font-sans font-black text-2xl sm:text-3.5xl text-white tracking-tight">Os Arquitetos dos Universos</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM_DATA.map((member) => (
              <div 
                id={`team-member-${member.name.toLowerCase().replace(/\s/g, '-')}`}
                key={member.name} 
                className="text-center p-6 bg-slate-900/40 rounded-2xl border border-white/5 hover:border-rose-500/20 transition-all duration-300"
              >
                <div className="relative w-28 h-28 mx-auto mb-4 group">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full object-cover rounded-full border-2 border-slate-705"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -inset-1 rounded-full border border-rose-500/40 opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all -z-10" />
                </div>
                <h4 className="font-sans text-base font-bold text-white">{member.name}</h4>
                <p className="font-mono text-[10px] text-rose-400 uppercase mt-1 tracking-wider mb-3">{member.role}</p>
                <p className="text-slate-400 text-xs leading-normal max-w-sm mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: CAREER TERMINALS */}
        <div id="career-department" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 border-t border-white/5">
          
          {/* Description Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-block px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg font-mono text-[11px] font-bold tracking-widest leading-none">
              RECRUTAMENTO ATIVO
            </div>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3.5xl text-white tracking-tight">
              Faça parte da nossa <br />
              próxima aventura
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Trabalhe remoto de qualquer lugar ou em nosso quartel-general. Desenvolvemos com as melhores abordagens e prezamos pela diversidade e cooperação permanente. Procuramos heróis autodidatas que queiram elevar o patamar técnico latino-americano de games!
            </p>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex gap-3">
              <Info className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-normal">
                Você pode jogar o nosso <strong className="text-rose-400">Fliperama Retro</strong> para testar suas agilidades lógicas e obter um bônus especial de avaliação preenchendo o formulário!
              </p>
            </div>
          </div>

          {/* Active Careers Grid column */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-mono text-xs text-slate-500 font-bold tracking-widest uppercase mb-2">POSIÇÕES EM ABERTO</h4>
            
            <div className="grid grid-cols-1 gap-4">
              {CAREERS_DATA.map((role) => (
                <div 
                  id={`career-role-${role.id}`}
                  key={role.id} 
                  className="p-5 rounded-xl bg-slate-900/40 border border-white/5 hover:border-rose-500/35 hover:bg-slate-900/60 transition-all flex flex-wrap justify-between items-center gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h5 className="font-sans font-bold text-sm text-white">{role.title}</h5>
                      <span className="px-2 py-0.5 bg-slate-950 text-amber-500 text-[9px] font-semibold rounded font-mono border border-white/5">
                        {role.type}
                      </span>
                    </div>
                    <div className="flex gap-4 text-slate-400 text-2xs font-mono">
                      <span className="text-rose-400 font-bold">{role.department}</span>
                      <span>{role.location}</span>
                    </div>
                  </div>

                  <button
                    id={`apply-role-btn-${role.id}`}
                    onClick={() => handleApplyRole(role)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full transition flex items-center gap-1.5 cursor-pointer"
                  >
                    Inscrever-se <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: MODAL FORM SUBMISSION SIMULATION */}
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md cursor-pointer" onClick={() => setSelectedRole(null)} />
            
            <div className="relative w-full max-w-xl bg-[#05010d] rounded-3xl border border-white/10 overflow-hidden shadow-2xl z-10 p-5 sm:p-8">
              <button 
                id="career-apply-modal-close"
                onClick={() => setSelectedRole(null)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-xs border border-white/10 rounded-full px-3 py-1 cursor-pointer bg-[#05010d]"
              >
                FECHAR
              </button>

              <div className="mb-6">
                <span className="font-mono text-[9px] text-rose-400 tracking-widest uppercase block mb-1">PROCESSO SELETIVO</span>
                <h3 className="font-sans font-black text-xl text-white">{selectedRole.title}</h3>
                <p className="text-slate-400 text-2xs font-mono mt-1">{selectedRole.department} • {selectedRole.location}</p>
              </div>

              {applicationSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4 animate-bounce" />
                  <h4 className="font-sans font-bold text-[#f1f1f3] text-lg">Candidatura Enviada!</h4>
                  <p className="text-slate-450 text-xs mt-2 max-w-xs mx-auto">
                    Agradecemos seu interesse na Vortex Studios. Nossa equipe de recrutamento analisará sua bagagem e entrará em contato em até 48 horas úteis!
                  </p>
                  <button 
                    id="application-success-close-btn"
                    onClick={() => setSelectedRole(null)} 
                    className="mt-6 px-6 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-full hover:bg-rose-700 transition"
                  >
                    OK, ENTENDIDO
                  </button>
                </div>
              ) : (
                <form id="career-application-form" onSubmit={handleSubmitApplication} className="space-y-4 text-sm">
                  {/* Role Requirements Preview */}
                  <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-white/5 text-xs space-y-2 mb-4">
                    <span className="font-mono font-bold text-rose-400 block">REQUISITOS ESSENCIAIS:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-350">
                      {selectedRole.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <label className="block text-slate-450 text-2xs font-mono tracking-widest font-bold mb-1.5" htmlFor="full-name-input">NOME COMPLETO *</label>
                    <input 
                      id="full-name-input"
                      type="text" 
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Ex: Gabriel Santini"
                      className="w-full px-4 py-3 bg-[#05010d] border border-white/10 rounded-full focus:border-rose-500 focus:outline-none font-sans text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-450 text-2xs font-mono tracking-widest font-bold mb-1.5" htmlFor="email-input">ENDEREÇO DE EMAIL *</label>
                    <input 
                      id="email-input"
                      type="email" 
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="gabriel@exemplo.com"
                      className="w-full px-4 py-3 bg-[#05010d] border border-white/10 rounded-full focus:border-rose-500 focus:outline-none font-sans text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-450 text-2xs font-mono tracking-widest font-bold mb-1" htmlFor="portfolio-input">PORTFÓLIO & LINKEDIN / GITHUB (OPCIONAL)</label>
                    <input 
                      id="portfolio-input"
                      type="url" 
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      placeholder="https://github.com/meu-usuario"
                      className="w-full px-4 py-3 bg-[#05010d] border border-white/10 rounded-full focus:border-rose-500 focus:outline-none font-sans text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-450 text-2xs font-mono tracking-widest font-bold mb-1" htmlFor="badge-code-input">CÓDIGO SECRETO DO ARCADE (OPCIONAL)</label>
                    <input 
                      id="badge-code-input"
                      type="text" 
                      placeholder="Ex: VORTEX-PLAY-2088"
                      className="w-full px-4 py-3 bg-[#05010d] border border-white/10 rounded-full focus:border-rose-500 focus:outline-none font-mono text-cyan-400 text-xs placeholder:text-slate-650"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">Conquiste o recorde de 100 pontos para ganhar prioridade!</span>
                  </div>

                  <button 
                    id="submit-cand-btn"
                    type="submit" 
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-full text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-md mt-6 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> ENVIAR CANDIDATURA RECRUTADOR
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
