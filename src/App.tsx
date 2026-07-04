/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Heart,
  Eye,
  Film,
  Sparkles,
  Compass,
  Tv,
  ArrowUpRight,
  Info,
  Gift,
  Flame,
  Users
} from 'lucide-react';
import { defaultMemories, ALL_TAGS } from './data/memories';
import { MemoryWebsite } from './types';
import MemoryWebsiteSimulator from './components/MemoryWebsiteSimulator';
import MemoryCreator from './components/MemoryCreator';

export default function App() {
  const [memories, setMemories] = useState<MemoryWebsite[]>(defaultMemories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Navigation states
  const [activeSimulatorWebsite, setActiveSimulatorWebsite] = useState<MemoryWebsite | null>(null);
  const [showCreatorWizard, setShowCreatorWizard] = useState(false);
  
  // Likes management state
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Filter logic
  const filteredMemories = useMemo(() => {
    return memories.filter((mem) => {
      // Tag filter
      const matchesTag = selectedTag === 'All' || mem.tags.includes(selectedTag);
      
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        mem.title.toLowerCase().includes(searchLower) ||
        mem.tagline.toLowerCase().includes(searchLower) ||
        mem.creator.toLowerCase().includes(searchLower) ||
        mem.tags.some((t) => t.toLowerCase().includes(searchLower));

      return matchesTag && matchesSearch;
    });
  }, [memories, searchQuery, selectedTag]);

  // Toggle dynamic like
  const handleToggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent launching simulator
    
    const isAlreadyLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isAlreadyLiked }));

    setMemories((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            likes: isAlreadyLiked ? m.likes - 1 : m.likes + 1,
          };
        }
        return m;
      })
    );
  };

  // Add a newly curated memory from the Wizard
  const handleAddAndLaunch = (newSite: MemoryWebsite) => {
    setMemories((prev) => [newSite, ...prev]);
    setShowCreatorWizard(false);
    setActiveSimulatorWebsite(newSite);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A]/10 selection:text-[#1A1A1A] border-[12px] border-[#1A1A1A] relative flex flex-col geometric-grid">
      
      {/* HEADER NAVIGATION */}
      <nav className="border-b-2 border-[#1A1A1A] bg-white sticky top-0 z-40 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center text-white rounded-none">
              <Film size={18} fill="currentColor" className="text-white" />
            </div>
            <div>
              <span className="font-display font-extrabold text-base md:text-lg tracking-tighter text-[#1A1A1A] block leading-none uppercase">MEMOIR CINEMA</span>
              <span className="text-stone-500 text-[9px] font-mono tracking-widest uppercase">Premium Cinematic Memories</span>
            </div>
          </div>

          {/* Minimalist links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wider uppercase text-stone-500">
            <a href="#discover" className="hover:text-[#1A1A1A] hover:underline decoration-2 transition-all">Browse Spaces</a>
            <a href="#features" className="hover:text-[#1A1A1A] hover:underline decoration-2 transition-all">The Gift Concept</a>
            <span className="text-stone-300">|</span>
            <div className="text-[10px] font-mono text-stone-500 flex items-center gap-1.5">
              <Flame size={12} className="text-[#1A1A1A]" />
              <span>Offline-First Vault</span>
            </div>
          </div>

          {/* Core Action */}
          <button
            onClick={() => {
              setShowCreatorWizard(true);
              document.getElementById('studio-wizard-anchor')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-neutral-800 active:scale-95 text-white font-bold px-4 py-2.5 rounded-none text-xs tracking-widest uppercase transition-all"
          >
            <Plus size={14} /> Curate a Space
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="px-6 py-20 md:py-28 text-center max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] tracking-[0.3em] font-mono text-stone-500 uppercase font-bold block mb-4">
            [ Cinematic Photo Webspaces ]
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-[1.05] text-[#1A1A1A] uppercase">
            Your memories,<br />
            turned into <span className="bg-[#1A1A1A] text-[#F8F8F7] px-3 py-1 inline-block rotate-[-1deg] transform">Cinematic Hubs.</span>
          </h1>
          <p className="mt-8 text-sm md:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto font-sans">
            We turn travel logs, wedding timelines, and anniversary stories into private digital theaters. 
            Equipped with customizable profiles, curated seasons, background songs, and interactive photo match puzzles.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#discover"
              className="px-6 py-3.5 rounded-none border-2 border-[#1A1A1A] bg-transparent hover:bg-neutral-100 transition-all text-xs font-bold tracking-widest uppercase text-[#1A1A1A]"
            >
              Explore Templates
            </a>
            <button
              onClick={() => setShowCreatorWizard(true)}
              className="px-6 py-3.5 rounded-none bg-[#1A1A1A] hover:bg-neutral-800 text-white transition-all text-xs font-bold tracking-widest uppercase flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-amber-400" /> Start Memory Studio
            </button>
          </div>
        </motion.div>
      </section>

      {/* DISCOVERY CORE HUB (SEARCH & TAGGING) */}
      <section id="discover" className="max-w-7xl mx-auto px-6 py-12 border-t-2 border-[#1A1A1A] w-full">
        
        {/* Hub Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#1A1A1A]">Discover Shared Spaces</h2>
            <p className="text-xs text-stone-500 mt-1">Search or filter through curated client-gift cinematic templates.</p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:max-w-xs group">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/60 group-hover:text-[#1A1A1A] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, creator, tags..."
              className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none pl-10 pr-4 py-2.5 text-xs text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
            />
          </div>
        </div>

        {/* INTUITIVE TAGGING SYSTEM */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
          <span className="text-[10px] font-mono text-[#1A1A1A] uppercase tracking-widest flex items-center gap-1 pr-2">
            <Compass size={12} /> Discovery Tags
          </span>
          {ALL_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-none text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-all ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-[#F8F8F7] border border-[#1A1A1A] shadow-none'
                    : 'bg-transparent text-[#1A1A1A] border border-stone-300 hover:border-[#1A1A1A] hover:bg-[#F0F0EF]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* BENTO CATALOG GRID */}
        {filteredMemories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMemories.map((mem) => {
                const isLiked = likedMap[mem.id];
                return (
                  <motion.div
                    key={mem.id}
                    id={`memory-site-card-${mem.id}`}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setActiveSimulatorWebsite(mem)}
                    className="group border-2 border-[#1A1A1A] bg-white rounded-none overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[8px_8px_0px_0px_#1A1A1A] hover:translate-y-[-4px] relative"
                  >
                    {/* Visual Cover aspect */}
                    <div className="aspect-[4/3] w-full overflow-hidden relative border-b-2 border-[#1A1A1A]">
                      <img
                        src={mem.coverImage}
                        alt={mem.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                      />
                      
                      {/* Heart Like overlay */}
                      <button
                        onClick={(e) => handleToggleLike(e, mem.id)}
                        className={`absolute top-4 right-4 p-2 rounded-none border border-[#1A1A1A] flex items-center justify-center transition-all active:scale-90 ${
                          isLiked
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-[#1A1A1A] hover:bg-stone-100'
                        }`}
                        title={isLiked ? "Unlike" : "Like"}
                      >
                        <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                      </button>

                      {/* Custom upload tag if created by user */}
                      {mem.hasCustomUploads && (
                        <div className="absolute top-4 left-4 bg-amber-400 border border-[#1A1A1A] text-[#1A1A1A] font-bold px-2 py-0.5 rounded-none text-[9px] uppercase font-mono tracking-wider flex items-center gap-1 shadow-none">
                          <Sparkles size={10} fill="currentColor" /> Created Custom
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                        {mem.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="bg-white border border-[#1A1A1A] text-[9px] uppercase font-mono text-[#1A1A1A] px-2 py-0.5 rounded-none"
                          >
                            {t}
                          </span>
                        ))}
                        {mem.tags.length > 2 && (
                          <span className="bg-white border border-[#1A1A1A] text-[9px] font-mono text-stone-500 px-1.5 py-0.5 rounded-none">
                            +{mem.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex justify-between items-start mb-1.5">
                          <h3 className="text-sm font-display font-bold uppercase tracking-tight text-[#1A1A1A] group-hover:underline transition-all truncate max-w-[180px]">
                            {mem.title}
                          </h3>
                          <span className="text-[10px] font-mono text-stone-500 uppercase">
                            by {mem.creator}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-2">
                          {mem.description}
                        </p>
                      </div>

                      {/* HUD indicators */}
                      <div className="flex justify-between items-center mt-6 pt-3 border-t border-[#1A1A1A] text-[10px] text-[#1A1A1A]/85 font-mono">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1" title="Views">
                            <Eye size={12} /> {mem.views + (isLiked ? 1 : 0)}
                          </span>
                          <span className="flex items-center gap-1" title="Likes">
                            <Heart size={12} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} /> {mem.likes}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-[#1A1A1A] font-display font-bold uppercase tracking-widest text-xs group-hover:translate-x-0.5 transition-transform">
                          <span>Demo Space</span>
                          <ArrowUpRight size={12} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty Search results state */
          <div className="border-2 border-dashed border-[#1A1A1A] bg-white p-12 rounded-none text-center max-w-md mx-auto shadow-[4px_4px_0px_0px_#1A1A1A]">
            <span className="text-2xl">🔍</span>
            <h3 className="text-sm font-display font-bold uppercase mt-3 mb-1 text-[#1A1A1A]">No Cinematic Spaces Found</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
              We couldn't find any memory hubs matching "{searchQuery}". Try selecting another tag or clearing your query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('All');
              }}
              className="mt-4 px-4 py-2 bg-[#1A1A1A] hover:bg-neutral-800 text-xs font-mono text-white rounded-none"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* STUDIO WIZARD (CURATE YOUR OWN) */}
      <section id="studio-wizard-anchor" className="max-w-7xl mx-auto px-6 py-16 border-t-2 border-[#1A1A1A] w-full">
        <AnimatePresence mode="wait">
          {!showCreatorWizard ? (
            <div className="border-2 border-[#1A1A1A] bg-white rounded-none p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-[8px_8px_0px_0px_#1A1A1A]">
              
              <div>
                <span className="text-[10px] tracking-[0.25em] font-mono text-[#1A1A1A] uppercase font-bold block mb-2">
                  [ Memory Studio Core ]
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-[#1A1A1A] mb-2">
                  Have a private memory to bundle?
                </h2>
                <p className="text-xs md:text-sm text-stone-600 max-w-lg leading-relaxed">
                  Open the studio wizard to name your space, pick matching typography/templates, and 
                  curate your own personal seasons. You will immediately be able to browse and demo your space!
                </p>
              </div>

              <button
                onClick={() => setShowCreatorWizard(true)}
                className="px-6 py-4 rounded-none bg-[#1A1A1A] hover:bg-neutral-800 text-white font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-1.5 flex-shrink-0 active:scale-95"
              >
                <Tv size={14} /> Open Curation Wizard
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <MemoryCreator
                onAddAndLaunch={handleAddAndLaunch}
                onCancel={() => setShowCreatorWizard(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* RE-CONVEYING THE "CINEMA GIFT" VALUE */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16 border-t-2 border-[#1A1A1A] w-full mb-12">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.25em] font-mono text-stone-500 uppercase block mb-2">[ How it works ]</span>
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-[#1A1A1A]">The Anatomy of a Cinematic Memory Gift</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-none border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[8px_8px_0px_0px_#1A1A1A] transition-all">
            <div className="w-10 h-10 rounded-none bg-[#1A1A1A] text-white flex items-center justify-center mb-5">
              <Users size={16} />
            </div>
            <h3 className="text-sm font-display font-bold uppercase tracking-tight text-[#1A1A1A] mb-3">1. Personalized Profiles</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              When launching, each partner logs into their specific portal to find warm custom greetings and confidential anniversary love declarations.
            </p>
          </div>

          <div className="p-6 rounded-none border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[8px_8px_0px_0px_#1A1A1A] transition-all animate-none">
            <div className="w-10 h-10 rounded-none bg-[#1A1A1A] text-white flex items-center justify-center mb-5">
              <Tv size={16} />
            </div>
            <h3 className="text-sm font-display font-bold uppercase tracking-tight text-[#1A1A1A] mb-3">2. Curated Seasons</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Your photos and memories are organized cleanly into sequential television-like episodes, featuring title screens and selected background soundtracks.
            </p>
          </div>

          <div className="p-6 rounded-none border-2 border-[#1A1A1A] bg-white shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-[8px_8px_0px_0px_#1A1A1A] transition-all">
            <div className="w-10 h-10 rounded-none bg-[#1A1A1A] text-white flex items-center justify-center mb-5">
              <Gift size={16} />
            </div>
            <h3 className="text-sm font-display font-bold uppercase tracking-tight text-[#1A1A1A] mb-3">3. Interactive Match & Puzzles</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              We convert your actual travel and family photographs into card-flip matches and jigsaw puzzles that are fully playable within the private portal.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-[#1A1A1A] py-12 text-center text-[10px] text-stone-500 font-mono bg-white uppercase tracking-widest w-full">
        <p className="mb-2">© 2026 Memoir Cinema Showcase. Preserving moments in cinematic high resolution.</p>
        <p>Built with React, Tailwind CSS, and Framer Motion.</p>
      </footer>

      {/* FULLSCREEN IMMERSIVE SIMULATOR OVERLAY */}
      <AnimatePresence>
        {activeSimulatorWebsite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#F8F8F7]"
          >
            <MemoryWebsiteSimulator
              website={activeSimulatorWebsite}
              onClose={() => setActiveSimulatorWebsite(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
