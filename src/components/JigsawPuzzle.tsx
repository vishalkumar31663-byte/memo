/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Trophy, HelpCircle, Eye } from 'lucide-react';

interface JigsawPuzzleProps {
  image: string;
  primaryColor: string;
}

interface PuzzlePiece {
  id: number;       // Original position (0-8)
  currentIdx: number; // Current grid index (0-8)
}

export default function JigsawPuzzle({ image, primaryColor }: JigsawPuzzleProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Initialize/Shuffle pieces
  const initPuzzle = () => {
    // Generate indices 0 to 8
    let indices = Array.from({ length: 9 }, (_, i) => i);
    
    // Shuffle ensuring we don't start with solved state
    let isSame = true;
    while (isSame) {
      indices = indices.sort(() => Math.random() - 0.5);
      isSame = indices.every((val, i) => val === i);
    }

    const newPieces = indices.map((val, currentIdx) => ({
      id: val,
      currentIdx
    }));

    setPieces(newPieces);
    setSelectedIdx(null);
    setMoves(0);
    setIsSolved(false);
  };

  useEffect(() => {
    initPuzzle();
  }, [image]);

  const handlePieceClick = (clickedIdx: number) => {
    if (isSolved) return;

    if (selectedIdx === null) {
      setSelectedIdx(clickedIdx);
    } else {
      if (selectedIdx === clickedIdx) {
        // Deselect
        setSelectedIdx(null);
        return;
      }

      // Swap pieces at selectedIdx and clickedIdx
      const newPieces = [...pieces];
      const selectedPiece = newPieces.find(p => p.currentIdx === selectedIdx);
      const clickedPiece = newPieces.find(p => p.currentIdx === clickedIdx);

      if (selectedPiece && clickedPiece) {
        selectedPiece.currentIdx = clickedIdx;
        clickedPiece.currentIdx = selectedIdx;
        setPieces(newPieces);
        setMoves(prev => prev + 1);

        // Check if solved
        const isNowSolved = newPieces.every(p => p.id === p.currentIdx);
        if (isNowSolved) {
          setIsSolved(true);
        }
      }

      setSelectedIdx(null);
    }
  };

  // Sort pieces by current index for rendering in correct grid cells
  const sortedPieces = [...pieces].sort((a, b) => a.currentIdx - b.currentIdx);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-md mb-6 text-xs font-mono">
        <div className="text-sm opacity-85">
          Swaps: <span className="font-bold text-lg" style={{ color: primaryColor }}>{moves}</span>
        </div>
        <div className="flex gap-2">
          <button
            onMouseDown={() => setShowPreview(true)}
            onMouseUp={() => setShowPreview(false)}
            onMouseLeave={() => setShowPreview(false)}
            onTouchStart={() => setShowPreview(true)}
            onTouchEnd={() => setShowPreview(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 active:scale-95 transition-all"
            title="Hold to preview complete image"
          >
            <Eye size={13} />
            Hold Preview
          </button>
          <button
            onClick={initPuzzle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 active:scale-95 transition-all"
          >
            <RefreshCw size={13} />
            Shuffle
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-neutral-900/40">
        {/* Solved Overlay */}
        <AnimatePresence>
          {isSolved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/85 p-6 text-center backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
                className="mb-4"
              >
                <Trophy size={48} style={{ color: primaryColor }} />
              </motion.div>
              <h3 className="text-xl font-bold mb-1">Memories Restored!</h3>
              <p className="text-xs text-gray-400 max-w-xs mb-6">
                You successfully assembled the cinematic snapshot in {moves} swaps. Let's keep exploring!
              </p>
              <button
                onClick={initPuzzle}
                className="px-5 py-2 rounded-xl text-white text-xs font-medium transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                style={{ backgroundColor: primaryColor }}
              >
                <RefreshCw size={14} />
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Temporary Image Preview Overlay */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-black/40"
            >
              <img
                src={image}
                alt="Full Guide Preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
          {sortedPieces.map((piece) => {
            // Calculate background positions for the 3x3 segments
            const col = piece.id % 3;
            const row = Math.floor(piece.id / 3);
            const xOffset = col * 50; // col * (100 / (3-1)) -> 0%, 50%, 100%
            const yOffset = row * 50; // row * (100 / (3-1)) -> 0%, 50%, 100%

            const isSelected = selectedIdx === piece.currentIdx;

            return (
              <button
                key={piece.id}
                id={`puzzle-piece-${piece.id}`}
                onClick={() => handlePieceClick(piece.currentIdx)}
                className={`relative overflow-hidden w-full h-full focus:outline-none transition-all duration-200 border border-black/10`}
                style={{
                  outline: isSelected ? `2px solid ${primaryColor}` : 'none',
                  zIndex: isSelected ? 5 : 1,
                  transform: isSelected ? 'scale(0.97)' : 'scale(1)',
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${xOffset}% ${yOffset}%`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                
                {/* Visual hint indicator of selected piece */}
                {isSelected && (
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <p className="mt-4 text-[10px] text-gray-500 font-mono text-center max-w-xs">
        *Tip: Click a piece, then click any other piece to swap their positions. Make the pieces match the full picture!
      </p>
    </div>
  );
}
