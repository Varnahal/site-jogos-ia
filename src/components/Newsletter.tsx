import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, Gamepad2, Sparkles, Send, Award } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [personalKey, setPersonalKey] = useState('');
  const [savedEmails, setSavedEmails] = useState<string[]>([]);

  // Local storage management to show user persistence
  useEffect(() => {
    const stored = localStorage.getItem('vortex_subscribers');
    if (stored) {
      try {
        setSavedEmails(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Generate a beautiful mock alpha voucher key
    const uniqueSegment = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generatedVoucher = `VTX-ALPHA-${uniqueSegment}-2026`;
    setPersonalKey(generatedVoucher);

    const updated = [...savedEmails, email];
    setSavedEmails(updated);
    localStorage.setItem('vortex_subscribers', JSON.stringify(updated));
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section id="newsletter-join" className="relative py-24 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#0f0525] via-[#05010d] to-[#05010d] text-center px-4">
      {/* Decorative cyber ambient glow grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Absolute ambient corner circles */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-400 mb-2 animate-float">
            <Gamepad2 className="w-8 h-8" />
          </div>

          <h3 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight leading-none">
            Entre para a Guilda de <br />
            Testadores <span className="text-rose-400">Alpha</span>
          </h3>

          <p className="max-w-lg mx-auto text-slate-400 text-xs sm:text-sm leading-relaxed">
            Cadastre-se para receber convites diretos de Alphas Fechados pontuais, acesso antecipado a chaves Steam secretas e relatórios exclusivos do nosso laboratório de desenvolvimento.
          </p>

          {submitted ? (
            <div className="p-6 bg-slate-950 rounded-2xl border border-rose-500/40 max-w-md mx-auto animate-fade-in space-y-4">
              <Award className="w-10 h-10 text-rose-400 mx-auto animate-bounce" />
              <h4 className="font-sans font-bold text-white text-base">Inscrição Efetuada com Sucesso!</h4>
              <p className="text-slate-450 text-xs leading-normal">
                Parabéns! Você acaba de garantir seu registro no banco de dados prioritário da Vortex Guild. Enviaremos seu convite por email assim que o próximo lote Alpha estiver ativo.
              </p>
              
              {/* Generated simulated Code voucher */}
              <div className="p-3 bg-slate-900 rounded-xl border border-white/5 text-center font-mono text-xs">
                <span className="block text-slate-500 text-[10px] mb-1">SUA CHAVE DA GUILDA IDENTIFICADORA:</span>
                <span className="text-rose-400 font-extrabold tracking-widest">{personalKey}</span>
              </div>
              
              <button 
                id="claim-another-form-btn"
                onClick={() => setSubmitted(false)} 
                className="text-2xs text-slate-500 hover:text-white underline block mx-auto font-mono py-1"
              >
                CADASTRAR OUTRO EMAIL
              </button>
            </div>
          ) : (
            <form id="newsletter-subscription-form" onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 mt-6">
              <div className="relative flex-grow">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                <input 
                  id="newsletter-email-input"
                  type="email" 
                  required
                  value={email}
                  placeholder="Seu melhor email gamer"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#05010d] border border-white/10 rounded-full focus:border-rose-500 focus:outline-none font-sans text-xs text-white"
                />
              </div>
              <button 
                id="newsletter-subscribe-btn"
                type="submit"
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-full text-xs tracking-wider transition hover:scale-103 cursor-pointer select-none flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/15 font-mono"
              >
                ENTRAR AGORA <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Secure details badges */}
          <div className="flex justify-center items-center gap-4 text-slate-500 text-[10px] sm:text-xs pt-4 font-mono">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Sem Spam, Garantido</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-rose-400" /> {savedEmails.length + 864} Guilders Membros</span>
          </div>
        </div>
      </div>
    </section>
  );
}
