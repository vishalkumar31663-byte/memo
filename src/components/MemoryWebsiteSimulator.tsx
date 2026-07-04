/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Heart,
  Lock,
  Unlock,
  Layers,
  MapPin,
  Calendar,
  Music,
  Users,
  Grid,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MemoryWebsite, Profile, Episode } from '../types';
import MemoryMatchGame from './MemoryMatchGame';
import JigsawPuzzle from './JigsawPuzzle';

interface MemoryWebsiteSimulatorProps {
  website: MemoryWebsite;
  onClose: () => void;
}

export default function MemoryWebsiteSimulator({ website, onClose }: MemoryWebsiteSimulatorProps) {
  const { theme } = website;
  
  // State variables
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'episodes' | 'letters' | 'match' | 'puzzle'>('episodes');
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isLetterUnlocked, setIsLetterUnlocked] = useState<boolean>(false);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Equalizer animation bars
  const [equalizerHeights, setEqualizerHeights] = useState<number[]>([20, 40, 15, 30, 25]);

  // Handle ambient equalizer bars
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAmbient) {
      interval = setInterval(() => {
        setEqualizerHeights(
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 35) + 10)
        );
      }, 150);
    } else {
      setEqualizerHeights([10, 10, 10, 10, 10]);
    }
    return () => clearInterval(interval);
  }, [isPlayingAmbient]);

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsLetterUnlocked(false);
    setActiveTab('episodes');
    
    // Auto toggle ambient simulated soundtrack
    setIsPlayingAmbient(true);

    // Trigger greeting notification
    setShowNotification(profile.personalizedGreeting);
    setTimeout(() => {
      setShowNotification(null);
    }, 5000);
  };

  const handleOpenEpisode = (ep: Episode) => {
    setActiveEpisode(ep);
    setActiveSlideIndex(0);
  };

  const handleNextSlide = () => {
    if (!activeEpisode) return;
    if (activeSlideIndex < activeEpisode.images.length - 1) {
      setActiveSlideIndex(prev => prev + 1);
    } else {
      setActiveSlideIndex(0); // loop
    }
  };

  const handlePrevSlide = () => {
    if (!activeEpisode) return;
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(prev => prev - 1);
    } else {
      setActiveSlideIndex(activeEpisode.images.length - 1); // loop back
    }
  };

  // Get active ambient track name based on active tab/episode
  const getCurrentTrackName = () => {
    if (activeEpisode) {
      return activeEpisode.songTitle || 'Cinematic Lofi Ambient';
    }
    return 'Lover\'s Waltz (Vibe Track)';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col bg-[#F8F8F7] text-[#1A1A1A] transition-colors duration-500 font-sans">
      {/* Dynamic Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <div className="bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-none p-4 shadow-[4px_4px_0px_0px_#1A1A1A] flex items-start gap-3">
              <div className="p-1.5 rounded-none bg-amber-100 border border-[#1A1A1A] text-[#1A1A1A]">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-0.5">System Message</p>
                <p className="text-xs text-[#1A1A1A] font-semibold leading-relaxed">{showNotification}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE A: PROFILE SELECT (WHO'S WATCHING?) */}
      {!selectedProfile ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          {/* Subtle exit link */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 flex items-center gap-2 border-2 border-[#1A1A1A] bg-white rounded-none hover:bg-stone-50 transition-all text-xs font-mono uppercase tracking-widest px-4 py-2 text-[#1A1A1A] font-bold shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft size={14} /> Exit Simulator
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <span className="text-[10px] tracking-[0.25em] font-mono text-[#1A1A1A] opacity-60 uppercase block mb-2">
              [ Private Cinema Stream ]
            </span>
            <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-[#1A1A1A] mb-8">Who's watching?</h1>

            <div className="flex justify-center gap-8 md:gap-12">
              {website.profiles.map((prof) => (
                <button
                  key={prof.id}
                  id={`profile-btn-${prof.id}`}
                  onClick={() => handleProfileSelect(prof)}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <div className="relative mb-3">
                    <div
                      className="w-28 h-28 md:w-32 md:h-32 rounded-none overflow-hidden border-2 border-[#1A1A1A] transition-all duration-300 group-hover:scale-102 group-hover:border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] group-hover:shadow-[8px_8px_0px_0px_#1A1A1A] group-hover:-translate-y-1 relative bg-white"
                    >
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                    {/* Tiny heart icon on hover */}
                    <div className="absolute -bottom-2 -right-2 bg-white text-[#1A1A1A] p-1.5 rounded-none border border-[#1A1A1A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-none">
                      <Heart size={12} fill="currentColor" className="text-red-500" />
                    </div>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#1A1A1A] group-hover:underline">
                    {prof.name}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-12 text-[10px] text-stone-500 leading-relaxed font-mono uppercase tracking-wider">
              A private digital memory chest preserved with love.<br />
              Select a partner profile to unlock personalized experiences.
            </p>
          </motion.div>
        </div>
      ) : (
        /* STAGE B: ACTIVE PORTAL (DASHBOARD HUD) */
        <div className="flex-1 flex flex-col h-full relative">
          
          {/* TOP NAV BAR */}
          <header className="px-6 py-4 border-b-2 border-[#1A1A1A] flex justify-between items-center bg-white">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedProfile(null)}
                className="p-2 rounded-none hover:bg-stone-100 border border-[#1A1A1A] transition-colors"
                title="Switch Profile"
              >
                <Users size={16} className="text-[#1A1A1A] opacity-80 hover:opacity-100" />
              </button>
              
              <div className="h-4 w-[2px] bg-[#1A1A1A]" />
              
              <div>
                <span className="text-[9px] uppercase tracking-widest text-stone-500 font-mono block">
                  Cinematic Memories
                </span>
                <h2 className="text-sm font-display font-bold uppercase text-[#1A1A1A] tracking-tight">{website.title}</h2>
              </div>
            </div>

            {/* Simulated Live Soundtrack Player */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <span className="text-[8px] font-mono uppercase text-stone-500 block">Playing Track</span>
                <span className="text-[10px] font-mono font-semibold text-[#1A1A1A] truncate max-w-[120px] block lowercase">
                  {getCurrentTrackName()}
                </span>
              </div>
              
              {/* Equalizer animation */}
              <div className="flex items-end gap-[2px] h-4 w-7 px-1.5">
                {equalizerHeights.map((h, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-none transition-all duration-150"
                    style={{
                      height: `${h}%`,
                      backgroundColor: '#1A1A1A'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsPlayingAmbient(!isPlayingAmbient)}
                className="p-1.5 rounded-none hover:bg-stone-100 border border-stone-200 transition-colors"
                title={isPlayingAmbient ? "Pause Vibe Music" : "Play Vibe Music"}
              >
                {isPlayingAmbient ? (
                  <Volume2 size={15} className="text-[#1A1A1A]" />
                ) : (
                  <VolumeX size={15} className="opacity-40 text-stone-400" />
                )}
              </button>

              <div className="h-4 w-[2px] bg-[#1A1A1A]" />

              <button
                onClick={onClose}
                className="text-xs px-3 py-1.5 rounded-none hover:bg-[#1A1A1A] hover:text-white border-2 border-[#1A1A1A] transition-all font-mono uppercase tracking-widest font-bold bg-white"
              >
                Close Demo
              </button>
            </div>
          </header>

          {/* MAIN SIMULATOR PORTAL CONTENT */}
          <main className="flex-1 overflow-y-auto p-6 flex flex-col max-w-4xl w-full mx-auto justify-start">
            
            {/* HERO BIO BANNER */}
            <div className="p-6 rounded-none border-2 border-[#1A1A1A] bg-white mb-8 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center shadow-[4px_4px_0px_0px_#1A1A1A]">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-none overflow-hidden shadow-none flex-shrink-0 border-2 border-[#1A1A1A]">
                <img
                  src={website.coverImage}
                  alt={website.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-wrap gap-1.5 justify-center md:justify-start mb-2">
                  {website.tags.map(t => (
                    <span key={t} className="text-[9px] font-mono uppercase bg-[#F8F8F7] border border-[#1A1A1A] px-2 py-0.5 rounded-none text-[#1A1A1A] font-bold">
                      {t}
                    </span>
                  ))}
                </div>
                <h1 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tight text-[#1A1A1A] mb-1.5">{website.title}</h1>
                <p className="text-xs italic text-stone-600 mb-3">"{website.tagline}"</p>
                <p className="text-xs text-stone-600 leading-relaxed font-sans max-w-xl">{website.description}</p>
                <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  Shared vault curated by <span className="font-bold text-[#1A1A1A] underline">{website.creator}</span>
                </div>
              </div>
            </div>

            {/* TAB SYSTEM NAVIGATION */}
            <div className="flex border-b-2 border-[#1A1A1A] mb-8 overflow-x-auto gap-2">
              <button
                onClick={() => setActiveTab('episodes')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all focus:outline-none whitespace-nowrap border-2 ${
                  activeTab === 'episodes'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] rounded-none'
                    : 'bg-white text-stone-500 hover:text-[#1A1A1A] border-transparent rounded-none'
                }`}
              >
                <Layers size={13} /> Episodes
              </button>
              <button
                onClick={() => setActiveTab('letters')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all focus:outline-none whitespace-nowrap border-2 ${
                  activeTab === 'letters'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] rounded-none'
                    : 'bg-white text-stone-500 hover:text-[#1A1A1A] border-transparent rounded-none'
                }`}
              >
                <Lock size={13} /> Private Notes
              </button>
              <button
                onClick={() => setActiveTab('match')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all focus:outline-none whitespace-nowrap border-2 ${
                  activeTab === 'match'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] rounded-none'
                    : 'bg-white text-stone-500 hover:text-[#1A1A1A] border-transparent rounded-none'
                }`}
              >
                <Grid size={13} /> Flip Match
              </button>
              <button
                onClick={() => setActiveTab('puzzle')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all focus:outline-none whitespace-nowrap border-2 ${
                  activeTab === 'puzzle'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] rounded-none'
                    : 'bg-white text-stone-500 hover:text-[#1A1A1A] border-transparent rounded-none'
                }`}
              >
                <Puzzle size={13} /> Jigsaw
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1">
              
              {/* TAB 1: EPISODES */}
              {activeTab === 'episodes' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">[ Season 1 Catalog ]</span>
                    <span className="text-[10px] font-mono text-stone-500 uppercase">{website.episodes.length} Episodes Total</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {website.episodes.map((ep, i) => (
                      <div
                        key={ep.id}
                        id={`simulator-episode-${ep.id}`}
                        className="group border-2 border-[#1A1A1A] bg-white rounded-none overflow-hidden hover:scale-[1.01] hover:shadow-[4px_4px_0px_0px_#1A1A1A] transition-all relative"
                      >
                        <div className="aspect-video w-full overflow-hidden relative border-b-2 border-[#1A1A1A]">
                          <img
                            src={ep.coverImage}
                            alt={ep.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex items-end p-4">
                            <div>
                              <span className="text-[9px] font-mono uppercase bg-white border border-[#1A1A1A] px-2 py-0.5 rounded-none text-[#1A1A1A] font-bold">
                                Season {ep.season} • Episode {ep.episodeNumber}
                              </span>
                              <h3 className="text-sm font-display font-bold uppercase mt-1.5 text-white">{ep.title}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                            {ep.description}
                          </p>

                          <div className="flex justify-between items-center pt-2 border-t border-[#1A1A1A]/10 text-[10px] text-stone-500 font-mono uppercase">
                            <div className="flex flex-col gap-0.5">
                              {ep.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={10} className="text-[#1A1A1A]" /> {ep.location}
                                </span>
                              )}
                              {ep.date && (
                                <span className="flex items-center gap-1 mt-0.5">
                                  <Calendar size={10} /> {ep.date}
                                </span>
                              )}
                            </div>

                            <button
                              onClick={() => handleOpenEpisode(ep)}
                              className="px-4 py-2 rounded-none bg-[#1A1A1A] hover:bg-neutral-800 text-white font-mono font-bold uppercase tracking-widest flex items-center gap-1 active:scale-95 transition-all text-xs border border-[#1A1A1A]"
                            >
                              <Play size={10} fill="currentColor" /> Watch
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: PRIVATE SECRET LETTERS */}
              {activeTab === 'letters' && (
                <div className="flex flex-col items-center justify-center p-4">
                  <AnimatePresence mode="wait">
                    {!isLetterUnlocked ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="border-2 border-[#1A1A1A] bg-white p-8 rounded-none max-w-md text-center w-full shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1A1A1A]" />
                        
                        <div className="mx-auto w-12 h-12 rounded-none bg-stone-100 border-2 border-[#1A1A1A] flex items-center justify-center mb-4">
                          <Lock size={20} className="text-[#1A1A1A]" />
                        </div>

                        <h3 className="text-sm font-display font-bold uppercase text-[#1A1A1A] mb-1">Locked Personal Envelope</h3>
                        <p className="text-xs text-stone-500 mb-6 font-mono uppercase tracking-wider">
                          Preserved for: <span className="font-bold text-[#1A1A1A] underline">{selectedProfile.name}</span>
                        </p>

                        <div className="p-4 bg-stone-50 rounded-none text-left border border-stone-200 mb-6">
                          <p className="text-[11px] leading-relaxed text-stone-600 font-sans">
                            *This mailbox is secured to keep custom declarations and romantic cards hidden in public spaces. 
                            Confirm you are <span className="text-[#1A1A1A] font-bold">{selectedProfile.name}</span> to view.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setIsLetterUnlocked(true);
                            // Toggle notification
                            setShowNotification("Anniversary letter unlocked securely!");
                            setTimeout(() => setShowNotification(null), 3000);
                          }}
                          className="w-full py-2.5 rounded-none font-mono font-bold text-xs tracking-wider uppercase text-white bg-[#1A1A1A] hover:bg-neutral-800 border border-[#1A1A1A] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                        >
                          <Unlock size={14} /> Open Private Space
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="border-2 border-[#1A1A1A] bg-white p-8 rounded-none max-w-xl w-full shadow-[6px_6px_0px_0px_#1A1A1A] relative text-[#1A1A1A]"
                      >
                        <div className="absolute top-4 right-4 flex gap-1">
                          <Heart size={14} fill="currentColor" className="text-red-500" />
                          <Heart size={14} fill="currentColor" className="text-red-500 opacity-60" />
                        </div>

                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-stone-400 block mb-1">
                          Private Declaration
                        </span>
                        <h3 className="text-base font-display font-bold uppercase mb-6 border-b-2 border-[#1A1A1A] pb-2">
                          Dear {selectedProfile.name},
                        </h3>

                        <div className="text-xs md:text-sm leading-relaxed opacity-90 italic space-y-4 font-serif px-2">
                          {selectedProfile.secretLetter.split('\n').map((paragraph, pi) => (
                            <p key={pi}>{paragraph}</p>
                          ))}
                        </div>

                        <div className="mt-8 pt-4 border-t-2 border-[#1A1A1A] flex justify-between items-center">
                          <button
                            onClick={() => setIsLetterUnlocked(false)}
                            className="flex items-center gap-1 text-[10px] text-stone-600 hover:text-black transition-colors uppercase font-mono font-bold"
                          >
                            <Lock size={12} /> Lock Envelope
                          </button>
                          <span className="text-[10px] font-mono text-stone-500 italic uppercase">
                            With Love, Forever.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* TAB 3: MEMORY MATCH GAME */}
              {activeTab === 'match' && (
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-sm font-bold mb-1">Flip, match, keep the memories.</h3>
                    <p className="text-xs text-gray-400">Match the pairs of snapshots to restore the cinematic archives.</p>
                  </div>
                  
                  {/* Pull images from all episodes for the game, fallback to cover */}
                  <MemoryMatchGame
                    images={
                      website.episodes.length > 0
                        ? website.episodes.flatMap(e => e.images)
                        : [website.coverImage, website.coverImage]
                    }
                    primaryColor={theme.primary}
                    themeClass={theme.bg}
                  />
                </div>
              )}

              {/* TAB 4: JIGSAW PUZZLE */}
              {activeTab === 'puzzle' && (
                <div className="max-w-md mx-auto">
                  <div className="text-center mb-6">
                    <h3 className="text-sm font-bold mb-1">Rebuild the Cinematic Snapshot</h3>
                    <p className="text-xs text-gray-400">Assemble the photo pieces of this memory back to perfection.</p>
                  </div>

                  <JigsawPuzzle
                    image={website.episodes[0]?.coverImage || website.coverImage}
                    primaryColor={theme.primary}
                  />
                </div>
              )}

            </div>
          </main>

          {/* ACTIVE EPISODE PLAYER ("PROJECTOR OVERLAY") */}
          <AnimatePresence>
            {activeEpisode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center p-4 md:p-8 backdrop-blur-md"
              >
                {/* Close Projector */}
                <button
                  onClick={() => setActiveEpisode(null)}
                  className="absolute top-6 right-6 text-white bg-[#1A1A1A] border-2 border-white px-4 py-2 rounded-none hover:bg-neutral-800 transition-all text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-1.5"
                >
                  Close Theater [Esc]
                </button>

                <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col justify-center">
                                   {/* Slide Image Grid */}
                  <div className="relative aspect-video w-full rounded-none overflow-hidden border-2 border-white bg-neutral-900 shadow-2xl flex items-center justify-center">
                    
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeSlideIndex}
                        src={activeEpisode.images[activeSlideIndex]}
                        alt={`Slide ${activeSlideIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* HUD indicators */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-6 flex flex-col justify-end">
                      
                      <div className="flex flex-wrap items-center gap-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-gray-300">
                        <span className="bg-white border border-[#1A1A1A] px-2 py-0.5 rounded-none text-[#1A1A1A] font-bold">
                          Season {activeEpisode.season} • Episode {activeEpisode.episodeNumber}
                        </span>
                        {activeEpisode.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={10} className="text-red-400" /> {activeEpisode.location}
                          </span>
                        )}
                        {activeEpisode.date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={10} /> {activeEpisode.date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-white text-base md:text-lg font-display font-bold uppercase tracking-wide mb-2">{activeEpisode.title}</h3>
                      <p className="text-gray-300 text-xs leading-relaxed max-w-2xl font-sans">
                        {activeEpisode.description}
                      </p>
                    </div>

                    {/* Left/Right controls */}
                    {activeEpisode.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-black/85 border-2 border-white flex items-center justify-center text-white/90 hover:text-white hover:bg-black/95 hover:scale-105 active:scale-95 transition-all"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={handleNextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-black/88 border-2 border-white flex items-center justify-center text-white/90 hover:text-white hover:bg-black/95 hover:scale-105 active:scale-95 transition-all"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Dots indicator */}
                    <div className="absolute top-4 left-4 flex gap-1.5 bg-black/70 px-2.5 py-1.5 rounded-none border border-white/20">
                      {activeEpisode.images.map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`w-2 h-2 rounded-none transition-all cursor-pointer ${
                            activeSlideIndex === idx ? 'bg-white scale-110' : 'bg-white/45'
                          }`}
                        />
                      ))}
                    </div>
                    </div>

                  {/* Under Projection controls */}
                  <div className="flex justify-between items-center mt-4 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-2">
                      <Music size={12} className="text-gray-500 animate-spin" />
                      <span>Soundtrack: <span className="text-white">{activeEpisode.songTitle || 'Cinematic Lofi'}</span></span>
                    </div>
                    <div>
                      <span>Snapshot {activeSlideIndex + 1} of {activeEpisode.images.length}</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
