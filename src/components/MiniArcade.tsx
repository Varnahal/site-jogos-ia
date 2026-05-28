import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, ShieldAlert, Zap, Award, Sparkles } from 'lucide-react';

// Web Audio API Synthesizer for high-craft sound without external file dependency
class RetroAudioSynth {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // Lazy initialize when first sound is played to satisfy browser policy
  }

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playLaser() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn("Web Audio failed", e);
    }
  }

  playExplosion() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      console.warn("Web Audio failed", e);
    }
  }

  playPowerUp() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.25);
      
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      console.warn("Web Audio failed", e);
    }
  }
}

const synth = new RetroAudioSynth();

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
}

interface Enemy {
  x: number;
  y: number;
  size: number;
  speed: number;
  hp: number;
  maxHp: number;
  color: string;
  points: number;
}

interface Laser {
  x: number;
  y: number;
  speed: number;
  power: number;
}

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
  alpha: number;
}

export default function MiniArcade() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [level, setLevel] = useState<number>(1);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [unlockedKey, setUnlockedKey] = useState<boolean>(false);

  // Keyboard state
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Game Loop references
  const gameStateRef = useRef({
    playerX: 200,
    playerY: 410,
    playerWidth: 32,
    playerHeight: 24,
    playerSpeed: 7,
    lasers: [] as Laser[],
    enemies: [] as Enemy[],
    stars: [] as Star[],
    particles: [] as Particle[],
    lastSpawnTime: 0,
    shootCooldown: 0,
  });

  // Load High Score
  useEffect(() => {
    const saved = localStorage.getItem('vortex_arcade_highscore');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
    synth.enabled = soundOn;
  }, [soundOn]);

  // Handle Keyboard Inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      
      // Prevent page scrolling on Arrow keys and Space
      if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code) && isPlaying) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  // Initialize background stars
  useEffect(() => {
    const stars: Star[] = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * 400,
        y: Math.random() * 450,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.8,
      });
    }
    gameStateRef.current.stars = stars;
  }, []);

  // Play/Stop control
  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setLives(3);
    setLevel(1);
    setUnlockedKey(false);
    gameStateRef.current.playerX = 184; // Center
    gameStateRef.current.lasers = [];
    gameStateRef.current.enemies = [];
    gameStateRef.current.particles = [];
    gameStateRef.current.lastSpawnTime = Date.now();
    synth.playPowerUp();
  };

  const toggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    synth.enabled = nextVal;
  };

  // Main Canvas Game Loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameWidth = 400;
    const gameHeight = 450;

    const updateAndDraw = () => {
      // CLEAR SCREEN
      ctx.fillStyle = '#05010d';
      ctx.fillRect(0, 0, gameWidth, gameHeight);

      const state = gameStateRef.current;

      // 1. DRAW & UPDATE STARS (BACKGROUND)
      state.stars.forEach(star => {
        star.y += star.speed;
        if (star.y > gameHeight) {
          star.y = 0;
          star.x = Math.random() * gameWidth;
        }
        ctx.fillStyle = `rgba(34, 211, 238, ${star.alpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      // 2. PLAYER INPUT PROCESSING
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['KeyA']) {
        state.playerX = Math.max(0, state.playerX - state.playerSpeed);
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['KeyD']) {
        state.playerX = Math.min(gameWidth - state.playerWidth, state.playerX + state.playerSpeed);
      }

      // Shooting mechanics
      if (state.shootCooldown > 0) {
        state.shootCooldown--;
      }
      if (keysPressed.current['Space'] && state.shootCooldown === 0) {
        state.lasers.push({
          x: state.playerX + state.playerWidth / 2 - 2,
          y: state.playerY - 6,
          speed: 8,
          power: 1,
        });
        synth.playLaser();
        state.shootCooldown = 15; // Frames delay (0.25s)
      }

      // 3. SPAWN ENEMIES
      const now = Date.now();
      const spawnInterval = Math.max(800, 2000 - level * 200); // gets faster as levels go up
      if (now - state.lastSpawnTime > spawnInterval) {
        const isBig = Math.random() > 0.8;
        state.enemies.push({
          x: 20 + Math.random() * (gameWidth - 70),
          y: -40,
          size: isBig ? 32 : 18,
          speed: (1.5 + Math.random() * 2) * (0.9 + level * 0.1),
          hp: isBig ? 3 : 1,
          maxHp: isBig ? 3 : 1,
          color: isBig ? '#f43f5e' : '#22d3ee', // pink is tough, cyan/blue is standard
          points: isBig ? 30 : 10,
        });
        state.lastSpawnTime = now;
      }

      // 4. UPDATE & DRAW LASERS
      state.lasers = state.lasers.filter(laser => {
        laser.y -= laser.speed;
        
        ctx.fillStyle = '#f43f5e';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f43f5e';
        ctx.fillRect(laser.x, laser.y, 4, 10);
        ctx.shadowBlur = 0; // reset
        
        return laser.y > 0;
      });

      // 5. UPDATE & DRAW ENEMIES
      state.enemies = state.enemies.filter(enemy => {
        enemy.y += enemy.speed;

        // Draw meteor/ships with gradient and glow
        ctx.save();
        ctx.translate(enemy.x, enemy.y);
        
        // Draw asteroid shape
        ctx.fillStyle = enemy.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = enemy.color;
        
        ctx.beginPath();
        if (enemy.maxHp > 1) { // Large heavy asteroid (hexagon)
          ctx.moveTo(0, -enemy.size / 2);
          ctx.lineTo(enemy.size / 2, -enemy.size / 4);
          ctx.lineTo(enemy.size / 2, enemy.size / 4);
          ctx.lineTo(0, enemy.size / 2);
          ctx.lineTo(-enemy.size / 2, enemy.size / 4);
          ctx.lineTo(-enemy.size / 2, -enemy.size / 4);
        } else { // Small fast triangular drones
          ctx.moveTo(0, enemy.size / 2);
          ctx.lineTo(enemy.size / 2, -enemy.size / 2);
          ctx.lineTo(-enemy.size / 2, -enemy.size / 2);
        }
        ctx.closePath();
        ctx.fill();

        // HP Bar for big enemies
        if (enemy.maxHp > 1 && enemy.hp > 0) {
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.fillRect(-15, -enemy.size - 5, 30, 4);
          ctx.fillStyle = '#10b981';
          const hpPercentage = enemy.hp / enemy.maxHp;
          ctx.fillRect(-15, -enemy.size - 5, 30 * hpPercentage, 4);
        }

        ctx.restore();

        // Check weapon collision
        state.lasers.forEach((laser, lIndex) => {
          const dx = laser.x - enemy.x;
          const dy = laser.y - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < enemy.size) {
            // Hit!
            enemy.hp -= laser.power;
            state.lasers.splice(lIndex, 1);
            
            // Create small hit sparks
            for (let i = 0; i < 4; i++) {
              state.particles.push({
                x: laser.x,
                y: laser.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                color: enemy.color,
                size: 2 + Math.random() * 2,
                alpha: 1,
                life: 15 + Math.random() * 10
              });
            }
          }
        });

        // Check if crossed bottom - Lose Life and trigger tiny shake/explosion
        if (enemy.y > gameHeight + 20) {
          setLives(v => {
            const nextL = v - 1;
            if (nextL <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
              synth.playExplosion();
            } else {
              synth.playExplosion();
            }
            return nextL;
          });
          return false;
        }

        // Check player collision
        const pdx = (state.playerX + state.playerWidth / 2) - enemy.x;
        const pdy = (state.playerY + state.playerHeight / 2) - enemy.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < enemy.size + state.playerHeight / 2) {
          // Explode enemy
          triggerDebris(enemy.x, enemy.y, enemy.color, 12);
          synth.playExplosion();
          
          setLives(v => {
            const nextL = v - 1;
            if (nextL <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
            }
            return nextL;
          });
          return false;
        }

        // Keep surviving enemies that require health
        if (enemy.hp <= 0) {
          triggerDebris(enemy.x, enemy.y, enemy.color, 15);
          synth.playExplosion();
          
          setScore(s => {
            const nextS = s + enemy.points;
            // High score updates
            if (nextS > highScore) {
              setHighScore(nextS);
              localStorage.setItem('vortex_arcade_highscore', nextS.toString());
            }
            // Dynamic Levels
            if (nextS > 0 && nextS % 120 === 0) {
              setLevel(l => {
                synth.playPowerUp();
                return l + 1;
              });
            }
            // Unlock Beta code voucher if user scores over 100
            if (nextS >= 100 && !unlockedKey) {
              setUnlockedKey(true);
            }
            return nextS;
          });
          return false;
        }

        return true;
      });

      // 6. PARTICLES ENGINE
      state.particles = state.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = Math.max(0, p.life / 25);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1.0; // reset
        return p.life > 0;
      });

      // 7. DRAW PLAYER SHADOW / PLAYER SPACESHIP
      ctx.save();
      ctx.translate(state.playerX, state.playerY);

      // Neon cyan glowing spaceship
      ctx.fillStyle = '#22d3ee';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#22d3ee';
      ctx.beginPath();
      // Design an agile spaceship
      ctx.moveTo(state.playerWidth / 2, 0); // nose
      ctx.lineTo(state.playerWidth, state.playerHeight); // bottom right tail
      ctx.lineTo(state.playerWidth * 0.75, state.playerHeight * 0.75); // wing base
      ctx.lineTo(state.playerWidth * 0.25, state.playerHeight * 0.75); // wing base
      ctx.lineTo(0, state.playerHeight); // bottom left tail
      ctx.closePath();
      ctx.fill();

      // Exhaust trusters fire
      if (Math.random() > 0.3) {
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.fillRect(state.playerWidth / 2 - 3, state.playerHeight * 0.8, 6, 8 + Math.random() * 6);
      }

      ctx.restore();

      animId = requestAnimationFrame(updateAndDraw);
    };

    const triggerDebris = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        gameStateRef.current.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          color,
          size: 1 + Math.random() * 4,
          life: 20 + Math.random() * 15,
          alpha: 1,
        });
      }
    };

    animId = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, isGameOver, level, highScore, unlockedKey]);

  // Mobile controller triggers helper
  const triggerMobileMove = (direction: 'left' | 'right') => {
    const state = gameStateRef.current;
    if (direction === 'left') {
      state.playerX = Math.max(0, state.playerX - 25);
    } else {
      state.playerX = Math.min(400 - state.playerWidth, state.playerX + 25);
    }
  };

  const triggerMobileShoot = () => {
    const state = gameStateRef.current;
    state.lasers.push({
      x: state.playerX + state.playerWidth / 2 - 2,
      y: state.playerY - 6,
      speed: 8,
      power: 1,
    });
    synth.playLaser();
  };

  return (
    <div id="minigame-container" className="relative max-w-lg mx-auto bg-slate-900/40 border-4 border-slate-850 rounded-3xl overflow-hidden shadow-2xl shadow-rose-500/5 p-4 md:p-6 select-none">
      {/* Arcade Header Bezel */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Award className="text-rose-400 w-6 h-6 animate-pulse" />
          <span className="font-mono text-xs text-slate-500">ARCADE CABINET V-1.2</span>
        </div>
        
        <div className="flex gap-3">
          {/* Sound Toggle */}
          <button 
            id="sound-toggle-btn"
            onClick={toggleSound} 
            className="p-1 rounded bg-slate-950 border border-white/5 hover:border-rose-500/40"
            aria-label="Toggle sound effect"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          
          <div className="font-mono text-xs px-2 py-1 bg-slate-950 text-rose-400 rounded border border-rose-500/20">
            RECORD: {highScore < 100 ? `0${highScore}` : highScore}
          </div>
        </div>
      </div>

      {/* Main Terminal Screen */}
      <div className="relative aspect-[400/450] bg-[#05010d] rounded-lg border border-white/5 overflow-hidden">
        {isPlaying ? (
          <canvas 
            id="arcade-game-canvas"
            ref={canvasRef} 
            width={400} 
            height={450}
            className="w-full h-full block"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center bg-radial from-slate-950 to-[#05010d]">
            {isGameOver ? (
              <div className="animate-fade-in">
                <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-3 animate-bounce" />
                <h3 className="font-mono text-2xl font-bold text-rose-500 tracking-tight mb-2">FIM DE JOGO</h3>
                <p className="text-slate-400 text-sm mb-4">Seu caça civil foi destruído pelos asteroides.</p>
                <div className="bg-slate-950 p-3 rounded border border-rose-500/20 max-w-xs mx-auto mb-6">
                  <span className="block font-mono text-xs text-slate-500">PONTUAÇÃO FINAL</span>
                  <span className="font-mono text-3xl font-extrabold text-cyan-400">{score}</span>
                </div>
                <button
                  id="restart-game-btn"
                  onClick={startGame}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold tracking-wider text-sm transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto shadow-md shadow-rose-500/20"
                >
                  <RotateCcw className="w-4 h-4" /> REINICIAR EXPERIÊNCIA
                </button>
              </div>
            ) : (
              <div>
                <Sparkles className="w-14 h-14 text-rose-400 mx-auto mb-4 animate-float" />
                <h3 className="font-sans text-xl font-bold tracking-tight text-white mb-1">VORTEX DEFENDER</h3>
                <p className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase mb-4">MINI ESTRELA ARCADE</p>
                <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6">
                  Mova seu caça especial, esquive dos asteroides e destrua o ataque alienígena! Alcance <span className="text-rose-400 font-bold">100 pontos</span> para desbloquear uma chave secreta.
                </p>
                
                <button
                  id="insert-coin-btn"
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-rose-600 to-violet-600 text-white font-extrabold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-500/20 flex items-center gap-2 mx-auto tracking-widest text-[#05020c] font-mono cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white text-white" /> INICIAR JOGO
                </button>
                
                <div className="mt-6 flex justify-center gap-6 text-[11px] text-slate-500 font-mono">
                  <span>← → ou [A][D] para Mover</span>
                  <span>[Espaço] para Atirar</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HUD Overlay in play */}
        {isPlaying && (
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none font-mono">
            <div className="flex gap-4">
              <div className="bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] block">PONTOS</span>
                <span className="text-cyan-400 font-extrabold text-sm">{score}</span>
              </div>
              <div className="bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5">
                <span className="text-slate-500 text-[9px] block">NÍVEL</span>
                <span className="text-rose-400 font-extrabold text-sm">{level}</span>
              </div>
            </div>

            {/* Lives Indicator */}
            <div className="bg-slate-950/80 backdrop-blur-sm p-2 rounded border border-white/5 flex gap-1.5 items-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <span 
                  id={`life-heart-${i}`}
                  key={i} 
                  className={`inline-block rounded-full transition-all ${
                    i < lives ? 'bg-rose-500 shadow-lg shadow-rose-500' : 'bg-slate-800'
                  }`} 
                  style={{ width: '8px', height: '8px' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Arcade cabinet buttons for Mobile */}
      <div className="mt-4 pt-4 border-t border-white/5">
        {/* Physical panel details */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-600 animate-pulse border border-rose-900" />
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-cyan-900" />
          </div>
          <p className="font-mono text-[10px] text-slate-500">PAINEL DE ATUAÇÃO RETRÔ</p>
        </div>

        {/* Action controls buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            id="arcade-ctrl-left"
            onClick={() => triggerMobileMove('left')}
            className="py-3 bg-slate-950 hover:bg-slate-900 active:bg-rose-500/20 border border-white/5 hover:border-rose-500 text-sm rounded-xl font-bold font-mono text-slate-300 transform active:scale-95 transition-all outline-none"
          >
            ◄ ESQUERDA
          </button>
          <button
            id="arcade-ctrl-fire"
            onClick={triggerMobileShoot}
            disabled={!isPlaying}
            className="py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:pointer-events-none hover:shadow-lg hover:shadow-rose-500/20 active:scale-95 text-xs font-black rounded-xl text-white tracking-widest transform transition-all outline-none"
          >
            FIRE ⚔️
          </button>
          <button
            id="arcade-ctrl-right"
            onClick={() => triggerMobileMove('right')}
            className="py-3 bg-slate-950 hover:bg-slate-900 active:bg-rose-500/20 border border-white/5 hover:border-rose-500 text-sm rounded-xl font-bold font-mono text-slate-300 transform active:scale-95 transition-all outline-none"
          >
            DIREITA ►
          </button>
        </div>
      </div>

      {/* Key reward coupon unlocked section */}
      {unlockedKey && (
        <div className="mt-4 p-3 bg-slate-950 border border-rose-500/30 rounded-xl animate-fade-in flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="text-rose-400 w-6 h-6 animate-pulse" />
            <div>
              <p className="font-sans text-xs text-white font-bold leading-none">CÓDIGO ALPHA RESGATADO!</p>
              <p className="font-mono text-[9px] text-rose-400 mt-1">Insira na aba contatos</p>
            </div>
          </div>
          <span className="font-mono text-xs font-extrabold text-[#f1f5f9] bg-slate-900 border border-rose-500/30 px-2 py-1 rounded">
            VORTEX-PLAY-2088
          </span>
        </div>
      )}
    </div>
  );
}
