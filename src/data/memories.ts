/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MemoryWebsite } from '../types';

export const ALL_TAGS = [
  'All',
  'Romantic',
  'Travel',
  'Friends',
  'Winter',
  'Nostalgia',
  'Interactive',
  'Anniversary',
  'Wanderlust',
  'Wedding'
];

export const defaultMemories: MemoryWebsite[] = [
  {
    id: 'the-journey-ahead',
    title: 'The Journey Ahead',
    tagline: 'A private cinematic space built from our memories, curated into seasons.',
    description: 'A beautiful collection of our first years together, from cozy rainy afternoons in Seattle, our spontaneous trek to Glacier National Park, to our candlelit evening in Portland where we promised to build a life together.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    creator: 'Priyank & Bharti',
    theme: {
      primary: '#e11d48', // rose-600
      accent: 'amber',
      bg: 'bg-stone-950',
      cardBg: 'bg-stone-900/90',
      text: 'text-stone-100',
      textMuted: 'text-stone-400',
      border: 'border-stone-800',
      font: 'serif'
    },
    tags: ['Romantic', 'Wedding', 'Interactive', 'Anniversary'],
    likes: 124,
    views: 1420,
    dateCreated: '2026-04-12',
    profiles: [
      {
        id: 'priyank',
        name: 'Priyank',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Hey Priyank, welcome back to our secret vault. There is a new episode added to Season 2!',
        secretLetter: 'Bharti here. Just wanted to remind you of that cold Tuesday when we shared a single cup of hot chocolate under the awning. Thank you for always keeping me warm. Love you to the moon!'
      },
      {
        id: 'bharti',
        name: 'Bharti',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Welcome back, Bharti. Priyank left a custom memory card game for you to solve today.',
        secretLetter: 'My dearest Bharti, looking through these photos makes me realize how incredibly lucky I am. From Seattle coffee hops to our wedding sunset, every moment is a masterwork. Let’s make more episodes soon!'
      }
    ],
    episodes: [
      {
        id: 'ja-s1-e1',
        title: 'The Rain Under the Awning',
        season: 1,
        episodeNumber: 1,
        description: 'Seattle gave us its grayest skies but our warmest memory. Sharing a single umbrella and running to the nearest pastry shop, soaking wet but laughing uncontrollably.',
        coverImage: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Seattle, WA',
        date: 'Oct 14, 2024',
        songTitle: 'Rainy Day Waltz - Autumn Trio'
      },
      {
        id: 'ja-s1-e2',
        title: 'Stars Over Lake McDonald',
        season: 1,
        episodeNumber: 2,
        description: 'Camping at Glacier National Park. We stayed up until 3:00 AM, wrapped in thick blankets, counting shooting stars against the crisp mountain air. We swore we saw the Milky Way.',
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Glacier National Park',
        date: 'Aug 22, 2025',
        songTitle: 'Stargazer - Sleeping At Last'
      },
      {
        id: 'ja-s2-e1',
        title: 'The Promise at Golden Hour',
        season: 2,
        episodeNumber: 1,
        description: 'Overlooking the cityscape during golden hour. A simple ring, teary eyes, and a breathless "Yes". A promise to build a beautiful cinematic life together, scene by scene.',
        coverImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Portland, OR',
        date: 'Feb 14, 2026',
        songTitle: 'With You - Cinematic Ambient Ensemble'
      },
      {
        id: 'ja-s2-e2',
        title: 'Hand in Hand, Always',
        season: 2,
        episodeNumber: 2,
        description: 'Our wedding afternoon. Surrounded by laughter, glowing warm lights, and our favorite people, we officially started our greatest season yet.',
        coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Sonoma Valley, CA',
        date: 'June 20, 2026',
        songTitle: 'Bloom - The Paper Kites'
      }
    ]
  },
  {
    id: 'goa-sunshine-sea',
    title: 'Goa Sunshine & Sea',
    tagline: 'Saltwater in our hair, laughter in our lungs, forever in our hearts.',
    description: 'A high-energy record of our legendary summer trip to Goa. Four friends, two rented scooters, infinite beach shacks, and a suitcase full of bad jokes.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    creator: 'Aarav, Kabir & Friends',
    theme: {
      primary: '#f97316', // orange-500
      accent: 'emerald',
      bg: 'bg-neutral-950',
      cardBg: 'bg-neutral-900',
      text: 'text-neutral-100',
      textMuted: 'text-neutral-400',
      border: 'border-neutral-800',
      font: 'sans'
    },
    tags: ['Travel', 'Friends', 'Wanderlust', 'Interactive'],
    likes: 98,
    views: 890,
    dateCreated: '2026-05-18',
    profiles: [
      {
        id: 'aarav',
        name: 'Aarav',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Yo Aarav! Grab a virtual beer. Kabir left a mock-puzzle of that epic scooter fail for you.',
        secretLetter: 'From Kabir: Bro, we still cannot believe you actually tried to ride the scooter directly into the tide. This website keeps the evidence safe forever. Next trip to Himachal is on you!'
      },
      {
        id: 'kabir',
        name: 'Kabir',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Kabir, the DJ of the group! Season 1 soundscapes are ready for replay.',
        secretLetter: 'Aarav here: Thanks for carrying the heavy camera everywhere, man. Because of your dedication, we have these cinematic memories preserved in high resolution. Cheers to many more!'
      }
    ],
    episodes: [
      {
        id: 'goa-s1-e1',
        title: 'Chasing Scooters at Dawn',
        season: 1,
        episodeNumber: 1,
        description: 'Waking up at 5:00 AM, renting two classic yellow Vespas, and racing down the empty, winding palm-fringed streets of South Goa with the ocean breeze in our faces.',
        coverImage: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'South Goa, India',
        date: 'May 02, 2026',
        songTitle: 'Summer High - AP Dhillon'
      },
      {
        id: 'goa-s1-e2',
        title: 'Shack Life & Seafood Platter',
        season: 1,
        episodeNumber: 2,
        description: 'Spending nine consecutive hours at Curlies. Eating fresh butter garlic calamari, drinking cold beverages, and listening to the waves crash as the sun dipped below the Arabian Sea.',
        coverImage: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Anjuna Beach',
        date: 'May 04, 2026',
        songTitle: 'Ocean Breeze - Beach Vibes Band'
      },
      {
        id: 'goa-s2-e1',
        title: 'The Secret Cove Campfire',
        season: 2,
        episodeNumber: 1,
        description: 'Hiking past Cola Beach to find a hidden bay. We built a small campfire, sang out of tune, and stared at the bioluminescent sparkles touching the shore.',
        coverImage: 'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1526218626217-dc65a29bb444?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Cola Beach Sanctuary',
        date: 'May 06, 2026',
        songTitle: 'Under the Stars - Indie Folk'
      }
    ]
  },
  {
    id: 'kyoto-winter-whispers',
    title: 'Kyoto Winter Whispers',
    tagline: 'Silent temples, warm tea cups, and dancing snowflakes.',
    description: 'A serene, minimal travel journal exploring Kyoto during a rare heavy snowfall. Capturing the absolute stillness of Arashiyama and the warm glow of side-alley lanterns.',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    creator: 'Chloe & Kenji',
    theme: {
      primary: '#06b6d4', // cyan-500
      accent: 'indigo',
      bg: 'bg-slate-950',
      cardBg: 'bg-slate-900',
      text: 'text-slate-100',
      textMuted: 'text-slate-400',
      border: 'border-slate-800',
      font: 'mono'
    },
    tags: ['Travel', 'Winter', 'Wanderlust', 'Minimalist'],
    likes: 85,
    views: 742,
    dateCreated: '2026-02-05',
    profiles: [
      {
        id: 'chloe',
        name: 'Chloe',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Greetings Chloe. The snow density tracker has been archived for Season 1.',
        secretLetter: 'Kenji here. I still remember how frozen your fingers were when we bought that steaming can of hot tea from the vending machine in Gion. Let us never forget that crisp, silent winter.'
      },
      {
        id: 'kenji',
        name: 'Kenji',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Welcome back Kenji. Your zen meditation ambient track is loaded.',
        secretLetter: 'Hi Kenji, thanks for guiding me through the hidden shrines. Seeing Golden Pavilion surrounded by pure white snow is something I will keep with me forever. Thank you for making it magical.'
      }
    ],
    episodes: [
      {
        id: 'kyoto-s1-e1',
        title: 'Snowfall over Golden Pavilion',
        season: 1,
        episodeNumber: 1,
        description: 'Arriving at Kinkaku-ji just as the winter blizzard peaked. The brilliant gold leaf reflecting off the frozen lake, completely covered in a fresh blanket of pure snow.',
        coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Kinkaku-ji, Kyoto',
        date: 'Jan 15, 2026',
        songTitle: 'Koto Melodies - Zen Flute'
      },
      {
        id: 'kyoto-s1-e2',
        title: 'Spicing Up in Gion Alleys',
        season: 1,
        episodeNumber: 2,
        description: 'Escaping the freezing storm into a tiny 6-seater ramen bar hidden in a narrow lantern-lit alleyway. Slurping spicy miso broth while listening to old vinyl jazz.',
        coverImage: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Gion District',
        date: 'Jan 16, 2026',
        songTitle: 'Midnight Jazz - Gion Cafe'
      }
    ]
  },
  {
    id: 'golden-years',
    title: 'Golden Years Together',
    tagline: '50 years of garden roses, vinyl records, and slow dances.',
    description: 'A deeply nostalgic commemorative cinematic space compiled by our children for our 50th Wedding Anniversary. Highlighting our slow steps, our vibrant garden, and the decades of love.',
    coverImage: 'https://images.unsplash.com/photo-1542362567-b07eac79094f?auto=format&fit=crop&q=80&w=800',
    creator: 'Arthur & Ruth',
    theme: {
      primary: '#ca8a04', // yellow-600
      accent: 'amber',
      bg: 'bg-stone-900',
      cardBg: 'bg-stone-800/80',
      text: 'text-stone-100',
      textMuted: 'text-stone-300',
      border: 'border-stone-700/60',
      font: 'serif'
    },
    tags: ['Romantic', 'Nostalgia', 'Anniversary'],
    likes: 210,
    views: 2450,
    dateCreated: '2026-06-01',
    profiles: [
      {
        id: 'arthur',
        name: 'Arthur',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Welcome back, Arthur. Ruth is sitting in the garden, and the Record Player is active.',
        secretLetter: 'My dearest Arthur, 50 years went by like a single afternoon. From our tiny apartment in Chicago to this quiet countryside cottage, you have been my anchor and my sunshine. Happy Anniversary.'
      },
      {
        id: 'ruth',
        name: 'Ruth',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        personalizedGreeting: 'Welcome back, Ruth. Arthur has requested your favorite Ella Fitzgerald track.',
        secretLetter: 'Dearest Ruth, they say a good marriage is a long conversation that always seems too short. Thank you for the roses, the tea, and the three beautiful children. I would choose you all over again.'
      }
    ],
    episodes: [
      {
        id: 'gy-s1-e1',
        title: 'Decades in a Single Step',
        season: 1,
        episodeNumber: 1,
        description: 'Slowing down, holding hands, and dancing to Ella Fitzgerald playing on our vintage record player in the living room as the evening light paints the wall orange.',
        coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1469571486090-7db5538517ab?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'Living Room',
        date: 'June 05, 2026',
        songTitle: 'Dream A Little Dream - Ella & Louis'
      },
      {
        id: 'gy-s1-e2',
        title: 'Caring for the Garden Roses',
        season: 1,
        episodeNumber: 2,
        description: 'Our morning ritual. Arthur waters the hydrangeas while Ruth inspects the yellow roses we planted twenty years ago. Quiet conversations over steam from Earl Grey.',
        coverImage: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800',
        images: [
          'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
        ],
        location: 'The Country Garden',
        date: 'June 06, 2026',
        songTitle: 'The Garden Waltz - Classical Acoustic'
      }
    ]
  }
];
