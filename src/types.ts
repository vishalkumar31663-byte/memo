/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Theme {
  primary: string;       // Hex or Tailwind class prefix
  accent: string;        // Accent color (Tailwind color name or hex)
  bg: string;            // Background class (e.g., bg-stone-950)
  cardBg: string;        // Card background class
  text: string;          // Base text color class
  textMuted: string;     // Secondary text color class
  border: string;        // Border styling class
  font: 'sans' | 'serif' | 'mono';
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  personalizedGreeting: string;
  secretLetter: string;
}

export interface Episode {
  id: string;
  title: string;
  season: number;
  episodeNumber: number;
  description: string;
  coverImage: string;
  images: string[];
  location?: string;
  date?: string;
  songTitle?: string;
}

export interface MemoryWebsite {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  creator: string;
  theme: Theme;
  tags: string[];
  profiles: Profile[];
  episodes: Episode[];
  likes: number;
  views: number;
  dateCreated: string;
  hasCustomUploads?: boolean;
}

export interface GameCard {
  id: number;
  imageId: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}
