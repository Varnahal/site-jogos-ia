import { Game, CareerRole, TeamMember, BlogNews } from './types';
import cyberfallImg from './assets/images/cyberfall_artwork_1780006089185.png';
import aethelgardImg from './assets/images/aethelgard_artwork_1780006106501.png';
import pixelquestImg from './assets/images/pixelquest_artwork_1780006123793.png';

export const GAMES_DATA: Game[] = [
  {
    id: 'cyberfall',
    title: 'Cyberfall 2088',
    genre: 'RPG de Ação Sci-Fi',
    tagline: 'Sua mente é a arma. A cidade é o seu túmulo.',
    description: 'Um RPG de ação imersivo em uma suntuosa metrópole futurista tomada por corporações gananciosas, onde cada implante cibernético redefine quem você é.',
    longDescription: 'Escreva seu próprio destino nas ruas encharcadas de neon da Megacidade Nova Éden. Em Cyberfall 2088, você assume o papel de Jax, um mercenário de rua aprimorado ciberneticamente em busca de um chip lendário que concede a imortalidade. Explore distritos verticais, enfrente gangues perigosas e tome decisões cruciais que moldarão as alianças de poder e o destino de milhões de pessoas.',
    releaseDate: '15 de Novembro de 2026',
    status: 'Early Access',
    imageUrl: cyberfallImg,
    platforms: ['PC', 'Xbox', 'PlayStation', 'SteamDeck'],
    rating: 'PEGI 18',
    tags: ['Cyberpunk', 'Mundo Aberto', 'RPG de Escolhas', 'Tiro em Primeira Pessoa'],
    features: [
      'Narrativa ramificada com múltiplos finais baseados em decisões reais.',
      'Sistema de personalização detalhado com mais de 120 peças cibernéticas.',
      'Gráficos impressionantes com Ray-Tracing e trilha sonora eletrônica original pulsante.',
      'Combate fluido misturando armas de fogo, hacks mentais e combates corpo a corpo.'
    ],
    requirements: {
      minimum: 'Windows 10, Intel i5-8400 / AMD Ryzen 5 1600, 16GB RAM, Nvidia GTX 1070, 70GB HDD/SSD',
      recommended: 'Windows 11, Intel i7-11700 / AMD Ryzen 7 5800X, 32GB RAM, Nvidia RTX 3070, 70GB SSD NVMe'
    }
  },
  {
    id: 'aethelgard',
    title: 'Aethelgard: Chronicles of Light',
    genre: 'Aventura / RPG de Mundo Aberto',
    tagline: 'Voe além dos limites do mundo antigo.',
    description: 'Explore um reino de ilhas flutuantes, magia ancestral e ruínas misteriosas neste vasto RPG de mundo aberto onde os céus guardam segredos perdidos.',
    longDescription: 'As ilhas outrora pacíficas de Aethelgard correm o risco de colidir sob a influência de uma antiga força gravitacional corrompida. Como um Guardião dos Dragões Emissários, você deve voar entre continentes celestes, aprender rituais mágicos elementais perdidos e reunir as tribos celestes. Use planadores, montarias aladas e dominar artes místicas para salvar seu lar das trevas eternas.',
    releaseDate: 'Março de 2027',
    status: 'In Alpha',
    imageUrl: aethelgardImg,
    platforms: ['PC', 'PlayStation', 'Nintendo Switch'],
    rating: 'PEGI 12',
    tags: ['Mundo Aberto', 'Fantasia', 'Montarias Aladas', 'RPG Cooperativo'],
    features: [
      'Voos integrados em tempo real sem telas de carregamento entre ilhas aéreas.',
      'Ecossistema dinâmico de dragões que você pode criar, treinar e voar junto.',
      'Múltiplos quebra-cabeças cooperativos ancestrais que exigem o trabalho em equipe.',
      'Trilha sonora totalmente orquestrada capturando a vastidão dos céus.'
    ],
    requirements: {
      minimum: 'Windows 10, Intel i5-6600, 8GB RAM, Nvidia GTX 1060 (6GB), 45GB HDD',
      recommended: 'Windows 10/11, Intel i7-9700k, 16GB RAM, Nvidia RTX 2060, 45GB SSD'
    }
  },
  {
    id: 'pixelquest',
    title: 'Pixel Quest: Arena',
    genre: 'Roguelike Cooperativo / Retrô',
    tagline: 'Junte seus amigos, prepare as poções e sobreviva à masmorra!',
    description: 'Um autêntico dungeon crawler retrô 16-bits focado em cooperação frenética local e online, com masmorras geradas proceduralmente e centenas de loots inimagináveis.',
    longDescription: 'Pixel Quest: Arena traz de volta a nostalgia dos fliperamas dos anos 90 combinados com design moderno de jogos roguelike. Entre em calabouços misteriosos gerados de forma randômica onde cada morte é um aprendizado permanente. Escolha entre 8 classes clássicas (Mago, Guerreiro, Assassino, Clérigo e mais) e combine habilidades estratégicas para superar chefes temíveis e alcançar o topo dos placares globais.',
    releaseDate: 'Disponível Agora',
    status: 'Released',
    imageUrl: pixelquestImg,
    platforms: ['PC', 'Nintendo Switch', 'SteamDeck', 'PlayStation', 'Xbox'],
    rating: 'PEGI 10',
    tags: ['Cooperação Local', 'Roguelike', 'Pixel Art', 'Trilha em Chiptune'],
    features: [
      'Geração procedural de salas, bosses, armadilhas e tesouros lendários.',
      'Cooperativo de até 4 jogadores simultâneos na mesma tela ou online cross-play.',
      'Estética pixel-art deslumbrante feita quadro a quadro com muito amor.',
      'Mais de 300 armas únicas, poções misteriosas, pergaminhos e charms combináveis.'
    ],
    requirements: {
      minimum: 'Windows 7/8/10, Processador 2.0 GHz, 4GB RAM, Placa de vídeo de 1GB VRAM, 2GB de espaço livre',
      recommended: 'Windows 10, Processador 3.0 GHz, 8GB RAM, Placa de vídeo de 2GB VRAM, 2GB de espaço livre'
    }
  }
];

export const CAREERS_DATA: CareerRole[] = [
  {
    id: 'c1',
    title: 'Game Designer Sênior - RPG',
    department: 'Design de Jogos',
    type: 'Full-time',
    location: 'Remoto (Brasil/América Latina)',
    description: 'Procuramos um Game Designer Sênior criativo com larga experiência em projetar sistemas complexos de RPG, progressão de personagens e design de missões para nossos títulos ambiciosos em mundo aberto.',
    requirements: [
      'Mínimo de 5 anos de experiência comprovada no desenvolvimento de RPGs ou jogos focados em sistemas.',
      'Forte portfólio documentado de design de progressão de personagem, balanceamento quantitativo e fluxogramas de missões.',
      'Proficiência com Unreal Engine ou Unity (estruturas de Blueprint / Scripting).',
      'Excelente comunicação verbal e escrita em português e inglês.'
    ]
  },
  {
    id: 'c2',
    title: 'Programador de Jogos C++ (Unreal Engine)',
    department: 'Engenharia',
    type: 'Full-time',
    location: 'Híbrido (Florianópolis - SC / Remoto)',
    description: 'Venha nos ajudar a codificar a jogabilidade fluida e os sistemas mecânicos do Cyberfall 2088. Você trabalhará diretamente com mecânicas de movimento de personagens, integração de IA e sincronização multiplayer.',
    requirements: [
      'Experiência profunda programando em C++ focando em jogos por pelo menos 3 anos.',
      'Experiência sólida na Unreal Engine (Networking, Mecânicas de Jogabilidade, Animações).',
      'Conhecimento em boas práticas de otimização de memória, profiling e CPU/GPU em consoles.',
      'Habilidade em resolver problemas complexos de matemática aplicada (vetores, trigonometria).'
    ]
  },
  {
    id: 'c3',
    title: 'Artista 3D Sênior (Ambientes & Cenários)',
    department: 'Arte',
    type: 'Contract',
    location: 'Remoto',
    description: 'Buscamos um talento artístico capaz de moldar as paisagens celestes de Aethelgard. Você será encarregado de criar ativos de cenários, folhagens estilizadas, ruínas mágicas inspiradoras e texturas de altíssima qualidade.',
    requirements: [
      'Portfólio excepcional com foco em modelagem e texturização de ambientes estilizados.',
      'Domínio completo de Maya, Blender, ZBrush e Substance Painter.',
      'Grande habilidade teórica em controle de iluminação, cores compostas e leitura visual.',
      'Familiaridade com processos de pipelines de arte e shaders na Unreal Engine.'
    ]
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    name: 'Helena Ribeiro',
    role: 'Diretora Criativa e Fundadora',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Mais de 15 anos na indústria liderando projetos inovadores. Apaixonada por narrativas profundas e universos fantásticos.'
  },
  {
    name: 'Thiago Martins',
    role: 'Diretor de Tecnologia (CTO)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Especialista em motores gráficos e inteligência artificial para jogos. Passou ex-estúdios AAA de renome internacional.'
  },
  {
    name: 'Aline Souza',
    role: 'Diretora de Arte Sênior',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    bio: 'Traz magia e estilo a cada projeto da Vortex. Especialista em design conceitual e atmosfera cinematográfica.'
  }
];

export const NEWS_DATA: BlogNews[] = [
  {
    id: 'n1',
    title: 'O desenvolvimento de Cyberfall 2088 acelera rumo à Beta Fechada',
    category: 'Devlog',
    date: '28 de Maio de 2026',
    summary: 'Novo patch notes interno e progresso do design de combate mecânico. Confira como estão ficando as animações e o progresso da cidade.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=650&h=400'
  },
  {
    id: 'n2',
    title: 'Vortex Studios garante prêmio de Melhor Estúdio Independente',
    category: 'Event',
    date: '10 de Abril de 2026',
    summary: 'Temos orgulho de compartilhar que fomos contemplados como o Estúdio Indie Destaque da América Latina na Game Developers Latam Cup!',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=650&h=400'
  }
];
