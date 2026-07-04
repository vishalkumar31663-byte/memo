/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Trophy, Heart } from 'lucide-react';
import { GameCard } from '../types';

interface MemoryMatchGameProps {
  images: string[];
  primaryColor: string;
  themeClass: string;
}

export default function MemoryMatchGame({ images, primaryColor, themeClass }: MemoryMatchGameProps) {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Take up to 6 unique images for a 12-card grid (or 4 for 8-card)
  const uniqueImages = images.slice(0, 6);

  const initGame = () => {
    const cardSet: GameCard[] = [];
    uniqueImages.forEach((img, index) => {
      // Create pair
      cardSet.push({
        id: index * 2,
        imageId: index,
        image: img,
        isFlipped: false,
        isMatched: false,
      });
      cardSet.push({
        id: index * 2 + 1,
        imageId: index,
        image: img,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    const shuffled = cardSet.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, [images]);

  const handleCardClick = (id: number) => {
    // If already flipped, already matched, or 2 cards are currently flipped, do nothing
    if (flippedCards.length >= 2) return;
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip card
    const updatedCards = cards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.imageId === secondCard.imageId) {
        // Match!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setIsWon(true);
    }
  }, [cards]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-md mb-6">
        <div className="text-sm font-medium opacity-85">
          Moves: <span className="font-bold text-lg" style={{ color: primaryColor }}>{moves}</span>
        </div>
        <button
          onClick={initGame}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 active:scale-95 transition-all text-xs font-mono"
        >
          <RefreshCw size={14} />
          Reset Game
        </button>
      </div>

      <div className="relative w-full max-w-md">
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 rounded-2xl p-6 text-center border border-white/15 backdrop-blur-md"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-4"
              >
                <Trophy size={48} className="mx-auto" style={{ color: primaryColor }} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Memories Matched!</h3>
              <p className="text-sm text-gray-300 max-w-xs mb-6">
                You matched all the memory pairs in <span className="font-bold text-white">{moves}</span> moves. Beautiful!
              </p>
              <button
                onClick={initGame}
                className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                <Heart size={16} />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-3 md:gap-4 aspect-square">
          {cards.map((card) => {
            const showFace = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.id}
                id={`memory-card-${card.id}`}
                onClick={() => handleCardClick(card.id)}
                className="relative aspect-square rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/20 select-none group"
                disabled={card.isMatched}
              >
                <div
                  className="w-full h-full transition-transform duration-500 preserve-3d relative"
                  style={{ transform: showFace ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Card Back */}
                  <div className="absolute inset-0 w-full h-full bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backface-hidden group-hover:bg-white/10 transition-colors">
                    <Heart
                      size={24}
                      className="opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-300"
                      style={{ color: primaryColor }}
                    />
                  </div>

                  {/* Card Face */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-xl overflow-hidden backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <img
                      src={card.image}
                      alt="Memory card"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {card.isMatched && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-white/90 p-1.5 rounded-full text-black shadow-md"
                        >
                          <Heart size={14} fill="currentColor" className="text-red-500" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
