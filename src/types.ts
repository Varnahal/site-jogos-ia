export interface SystemRequirement {
  minimum: string;
  recommended: string;
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  tagline: string;
  description: string;
  longDescription: string;
  releaseDate: string;
  status: 'In Alpha' | 'Early Access' | 'Released' | 'Coming Soon';
  imageUrl: string;
  platforms: ('PC' | 'Xbox' | 'PlayStation' | 'Nintendo Switch' | 'SteamDeck')[];
  rating: string;
  tags: string[];
  features: string[];
  requirements: SystemRequirement;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  location: string;
  description: string;
  requirements: string[];
}

export interface BlogNews {
  id: string;
  title: string;
  category: 'Update' | 'Event' | 'Press Release' | 'Devlog';
  date: string;
  summary: string;
  imageUrl: string;
}
