/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, Plus, Trash2, Heart, Check, Film, Eye } from 'lucide-react';
import { MemoryWebsite, Profile, Episode, Theme } from '../types';

interface MemoryCreatorProps {
  onAddAndLaunch: (newWebsite: MemoryWebsite) => void;
  onCancel: () => void;
}

const THEME_PRESETS: { name: string; key: string; theme: Theme }[] = [
  {
    name: 'Sunset Rose (Romantic)',
    key: 'rose',
    theme: {
      primary: '#e11d48',
      accent: 'amber',
      bg: 'bg-stone-950',
      cardBg: 'bg-stone-900/90',
      text: 'text-stone-100',
      textMuted: 'text-stone-400',
      border: 'border-stone-800',
      font: 'serif'
    }
  },
  {
    name: 'Summer Emerald (Travel)',
    key: 'emerald',
    theme: {
      primary: '#10b981',
      accent: 'orange',
      bg: 'bg-neutral-950',
      cardBg: 'bg-neutral-900',
      text: 'text-neutral-100',
      textMuted: 'text-neutral-400',
      border: 'border-neutral-800',
      font: 'sans'
    }
  },
  {
    name: 'Midnight Ice (Winter/Chill)',
    key: 'ice',
    theme: {
      primary: '#06b6d4',
      accent: 'indigo',
      bg: 'bg-slate-950',
      cardBg: 'bg-slate-900',
      text: 'text-slate-100',
      textMuted: 'text-slate-400',
      border: 'border-slate-800',
      font: 'mono'
    }
  },
  {
    name: 'Golden Sepia (Retro/Anniversary)',
    key: 'gold',
    theme: {
      primary: '#ca8a04',
      accent: 'amber',
      bg: 'bg-stone-900',
      cardBg: 'bg-stone-800/80',
      text: 'text-stone-100',
      textMuted: 'text-stone-300',
      border: 'border-stone-700/60',
      font: 'serif'
    }
  }
];

const PRESET_IMAGES = [
  { name: 'Romantic Lights', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800' },
  { name: 'Beach Sunset', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
  { name: 'Bamboo Trails', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800' },
  { name: 'Campfire Nights', url: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?auto=format&fit=crop&q=80&w=800' },
  { name: 'City Overlook', url: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&q=80&w=800' },
  { name: 'Vintage Records', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800' }
];

const AVAILABLE_TAG_OPTIONS = ['Romantic', 'Travel', 'Friends', 'Winter', 'Nostalgia', 'Anniversary', 'Wanderlust', 'Wedding'];

export default function MemoryCreator({ onAddAndLaunch, onCancel }: MemoryCreatorProps) {
  const [step, setStep] = useState<number>(1);

  // Form states
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [tagline, setTagline] = useState('A private cinematic vault of our favorite memories.');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_IMAGES[0].url);
  const [selectedThemeKey, setSelectedThemeKey] = useState('rose');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Romantic']);

  // Profiles
  const [p1Name, setP1Name] = useState('User One');
  const [p1Secret, setP1Secret] = useState('This is my secret letter. Thanks for the memories!');
  const [p2Name, setP2Name] = useState('User Two');
  const [p2Secret, setP2Secret] = useState('I am so glad we built this digital cinema page together.');

  // Episodes
  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: 'custom-ep-1',
      title: 'Our Spontaneous Beginning',
      season: 1,
      episodeNumber: 1,
      description: 'The very first spark of this collection. A cold night, warm coffee, and infinite laughs.',
      coverImage: PRESET_IMAGES[4].url,
      images: [PRESET_IMAGES[4].url, PRESET_IMAGES[0].url],
      location: 'Local Coffee Joint',
      date: 'Oct 12, 2025',
      songTitle: 'First Spark - Ambient Folk'
    }
  ]);

  const handleAddEpisode = () => {
    const newNum = episodes.length + 1;
    setEpisodes([
      ...episodes,
      {
        id: `custom-ep-${Date.now()}`,
        title: `Episode ${newNum}: Uncharted Days`,
        season: 1,
        episodeNumber: newNum,
        description: 'Another beautiful chapter of our story, waiting to be retold.',
        coverImage: PRESET_IMAGES[1].url,
        images: [PRESET_IMAGES[1].url, PRESET_IMAGES[3].url],
        location: 'Spontaneous Escape',
        date: 'Recently',
        songTitle: 'Chasing Horizons'
      }
    ]);
  };

  const handleUpdateEpisode = (idx: number, field: keyof Episode, value: any) => {
    const updated = episodes.map((ep, i) => {
      if (i === idx) {
        return { ...ep, [field]: value };
      }
      return ep;
    });
    setEpisodes(updated);
  };

  const handleDeleteEpisode = (idx: number) => {
    if (episodes.length <= 1) return;
    setEpisodes(episodes.filter((_, i) => i !== idx));
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!title || !creator) return;

    const chosenTheme = THEME_PRESETS.find(t => t.key === selectedThemeKey)?.theme || THEME_PRESETS[0].theme;

    const profiles: Profile[] = [
      {
        id: 'p1',
        name: p1Name || 'Partner A',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: `Welcome back, ${p1Name}. Here is the timeline of your shared moments with ${p2Name}.`,
        secretLetter: p2Secret // Partner 2 leaves a letter for Partner 1
      },
      {
        id: 'p2',
        name: p2Name || 'Partner B',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: `Welcome back, ${p2Name}. Discover the interactive memories crafted for you.`,
        secretLetter: p1Secret // Partner 1 leaves a letter for Partner 2
      }
    ];

    // Build standard structure
    const customMemorySite: MemoryWebsite = {
      id: `custom-${Date.now()}`,
      title,
      tagline,
      description: description || `A highly personalized cinematic vault created by ${creator}.`,
      coverImage,
      creator,
      theme: chosenTheme,
      tags: selectedTags.length > 0 ? selectedTags : ['Romantic'],
      profiles,
      episodes,
      likes: 1,
      views: 1,
      dateCreated: new Date().toISOString().split('T')[0],
      hasCustomUploads: true
    };

    onAddAndLaunch(customMemorySite);
  };

  return (
    <div className="bg-white border-2 border-[#1A1A1A] rounded-none p-6 md:p-8 text-[#1A1A1A] max-w-3xl mx-auto shadow-[8px_8px_0px_0px_#1A1A1A] relative overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-[#1A1A1A]">
        <div>
          <span className="text-[#1A1A1A] text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1 mb-1">
            <Sparkles size={12} className="text-amber-500" />
            [ Memory Studio Wizard ]
          </span>
          <h2 className="text-2xl font-display font-bold uppercase tracking-tight text-[#1A1A1A]">Curate Your Cinematic Site</h2>
        </div>
        <button
          onClick={onCancel}
          className="text-stone-600 hover:text-white transition-colors text-xs font-semibold px-3 py-1.5 rounded-none hover:bg-[#1A1A1A] border border-[#1A1A1A] uppercase tracking-wider"
        >
          Cancel
        </button>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-none border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step === s
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : step > s
                    ? 'bg-stone-200 text-stone-500 border-stone-300'
                    : 'bg-white text-stone-400 border-stone-200'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              <span
                className={`text-xs font-mono uppercase tracking-wider ${
                  step === s ? 'text-[#1A1A1A] font-bold' : 'text-stone-400'
                }`}
              >
                {s === 1 ? 'Core' : s === 2 ? 'Profiles' : 'Episodes'}
              </span>
            </div>
            {s < 3 && <div className="flex-1 h-[2px] bg-[#1A1A1A] mx-1 max-w-[40px]" />}
          </React.Fragment>
        ))}
      </div>

      {/* STEP 1: CORE INFORMATION */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Cinematic Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Story of Us, Wanderlust 2026"
                className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] placeholder-stone-400 font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Creators / Partners *
              </label>
              <input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="e.g., Jack & Jill, The Travelers"
                className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] placeholder-stone-400 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g., A collection of our memories, sorted into episodes."
              className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] placeholder-stone-400 font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Long Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this memory vault holds (e.g., Seattle coffee runs, wedding bells, and snowy days)."
              rows={3}
              className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-4 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] placeholder-stone-400 font-sans resize-none"
            />
          </div>

          {/* Theme selection */}
          <div>
            <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-3">
              Choose Visual Theme & Typography
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {THEME_PRESETS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setSelectedThemeKey(t.key)}
                  className={`p-3 rounded-none border-2 text-left transition-all relative ${
                    selectedThemeKey === t.key
                      ? 'border-[#1A1A1A] bg-stone-100 shadow-[2px_2px_0px_0px_#1A1A1A]'
                      : 'border-stone-300 bg-white hover:bg-stone-50 hover:border-[#1A1A1A]'
                  }`}
                >
                  {selectedThemeKey === t.key && (
                    <div className="absolute top-2 right-2 text-[#1A1A1A]">
                      <Check size={14} className="stroke-[3px]" />
                    </div>
                  )}
                  <span className="block text-xs font-bold truncate mb-1 text-[#1A1A1A]">{t.name}</span>
                  <div className="flex gap-1.5 mt-2">
                    <div className="w-4 h-4 rounded-none bg-white border border-stone-300" />
                    <div className="w-4 h-4 rounded-none border border-stone-400" style={{ backgroundColor: t.theme.primary }} />
                    <span className="text-[9px] uppercase font-mono tracking-wider text-stone-500">
                      {t.theme.font}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-2.5">
              Select Navigation Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAG_OPTIONS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-none text-xs font-semibold uppercase tracking-wider transition-all ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A]'
                        : 'bg-transparent text-[#1A1A1A] border border-stone-300 hover:border-[#1A1A1A] hover:bg-stone-50'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cover Photo */}
          <div>
            <label className="block text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select Cover Snapshot
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
              {PRESET_IMAGES.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setCoverImage(img.url)}
                  className={`relative rounded-none overflow-hidden aspect-video border-2 transition-all ${
                    coverImage === img.url ? 'border-[#1A1A1A] scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
            <div className="text-stone-700 text-[11px] font-mono uppercase tracking-wider">
              Or paste custom cover Image URL:
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 mt-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] font-sans lowercase"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: PROFILES & SECRET LOCKS */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <p className="text-xs text-stone-600 leading-relaxed font-sans max-w-xl mb-4">
            A standard cinema-gift features a multi-profile select screen ("Who is watching?"). 
            Each partner logs into their portal to view private, highly tailored letters left for them. 
            Customize these elements below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile 1 */}
            <div className="p-5 bg-white border-2 border-[#1A1A1A] rounded-none shadow-[4px_4px_0px_0px_#1A1A1A]">
              <span className="text-[11px] font-mono uppercase font-bold text-[#1A1A1A] tracking-wider">[ Profile One ]</span>
              <div className="mt-3 space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Name</label>
                  <input
                    type="text"
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    placeholder="e.g., Arthur"
                    className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Anniversary Letter from {p1Name} to {p2Name || 'Partner Two'}
                  </label>
                  <textarea
                    value={p1Secret}
                    onChange={(e) => setP1Secret(e.target.value)}
                    placeholder="This will be locked inside their dashboard view, unlocked only by their profile choice."
                    rows={4}
                    className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] resize-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Profile 2 */}
            <div className="p-5 bg-white border-2 border-[#1A1A1A] rounded-none shadow-[4px_4px_0px_0px_#1A1A1A]">
              <span className="text-[11px] font-mono uppercase font-bold text-[#1A1A1A] tracking-wider">[ Profile Two ]</span>
              <div className="mt-3 space-y-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Name</label>
                  <input
                    type="text"
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    placeholder="e.g., Ruth"
                    className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Anniversary Letter from {p2Name} to {p1Name || 'Partner One'}
                  </label>
                  <textarea
                    value={p2Secret}
                    onChange={(e) => setP2Secret(e.target.value)}
                    placeholder="This will be locked inside their dashboard view, unlocked only by their profile choice."
                    rows={4}
                    className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] resize-none font-sans"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: CURATE EPISODES */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs text-stone-600 font-sans">
              Create seasons of episodes. Each episode acts as a beautifully packaged cinematic slides folder.
            </p>
            <button
              onClick={handleAddEpisode}
              type="button"
              className="flex items-center gap-1 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs px-3 py-2 rounded-none border border-[#1A1A1A] font-mono uppercase tracking-wider font-semibold"
            >
              <Plus size={14} /> Add Episode
            </button>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {episodes.map((ep, index) => (
              <div
                key={ep.id}
                id={`creator-episode-${index}`}
                className="p-5 bg-white border-2 border-[#1A1A1A] rounded-none shadow-[4px_4px_0px_0px_#1A1A1A] relative"
              >
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                    S1 : E{index + 1}
                  </span>
                  {episodes.length > 1 && (
                    <button
                      onClick={() => handleDeleteEpisode(index)}
                      type="button"
                      className="text-stone-500 hover:text-red-500 p-1"
                      title="Delete Episode"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Episode Title</label>
                      <input
                        type="text"
                        value={ep.title}
                        onChange={(e) => handleUpdateEpisode(index, 'title', e.target.value)}
                        className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none font-sans"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Location</label>
                        <input
                          type="text"
                          value={ep.location || ''}
                          onChange={(e) => handleUpdateEpisode(index, 'location', e.target.value)}
                          placeholder="e.g. Hawaii"
                          className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Date</label>
                        <input
                          type="text"
                          value={ep.date || ''}
                          onChange={(e) => handleUpdateEpisode(index, 'date', e.target.value)}
                          placeholder="e.g. July 2026"
                          className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none font-sans"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Background Song Title</label>
                      <input
                        type="text"
                        value={ep.songTitle || ''}
                        onChange={(e) => handleUpdateEpisode(index, 'songTitle', e.target.value)}
                        placeholder="e.g. Melodies of Love"
                        className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Episode Summary</label>
                      <textarea
                        value={ep.description}
                        onChange={(e) => handleUpdateEpisode(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none resize-none font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">Episode Cover Image URL</label>
                      <input
                        type="text"
                        value={ep.coverImage}
                        onChange={(e) => {
                          handleUpdateEpisode(index, 'coverImage', e.target.value);
                          handleUpdateEpisode(index, 'images', [e.target.value, PRESET_IMAGES[0].url]);
                        }}
                        placeholder="Paste image link"
                        className="w-full bg-[#F0F0EF] border border-[#1A1A1A] rounded-none px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none font-sans"
                      />
                      <div className="flex gap-2 mt-2">
                        {PRESET_IMAGES.slice(0, 3).map((pImg, pi) => (
                          <button
                            key={pi}
                            type="button"
                            onClick={() => {
                              handleUpdateEpisode(index, 'coverImage', pImg.url);
                              handleUpdateEpisode(index, 'images', [pImg.url, PRESET_IMAGES[pi + 1]?.url || PRESET_IMAGES[0].url]);
                            }}
                            className={`w-12 h-8 rounded-none overflow-hidden border-2 ${
                              ep.coverImage === pImg.url ? 'border-[#1A1A1A]' : 'border-stone-200'
                            }`}
                          >
                            <img src={pImg.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t-2 border-[#1A1A1A]">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            type="button"
            className="flex items-center gap-1.5 text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-stone-100 text-xs font-bold px-4 py-2 rounded-none bg-white font-mono uppercase tracking-wider transition-all active:scale-95"
          >
            <ArrowLeft size={14} /> Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 1 && (!title || !creator)}
            type="button"
            className="flex items-center gap-1.5 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-bold px-5 py-2.5 rounded-none border-2 border-[#1A1A1A] font-mono uppercase tracking-wider transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            Next Step <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            type="button"
            className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 border-2 border-[#1A1A1A] text-white text-xs font-bold px-6 py-3 rounded-none transition-all shadow-[4px_4px_0px_0px_#1A1A1A] font-mono uppercase tracking-widest active:scale-95"
          >
            <Film size={14} /> Launch Custom Cinema Space
          </button>
        )}
      </div>
    </div>
  );
}
