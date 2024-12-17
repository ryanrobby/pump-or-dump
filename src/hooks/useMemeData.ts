import { useState } from 'react';

const INITIAL_MEMES = [
  { id: 1, name: "Moo Deng", price: 1.25, poolSize: 15000, pumpPercentage: 72 },
  { id: 2, name: "Fartcoin", price: 0.85, poolSize: 8500, pumpPercentage: 45 },
  { id: 3, name: "Peanut The Squirrel", price: 2.10, poolSize: 25000, pumpPercentage: 85 },
  { id: 4, name: "Bonk", price: 1.50, poolSize: 20000, pumpPercentage: 60 },
  { id: 5, name: "Dogwifhat", price: 3.20, poolSize: 35000, pumpPercentage: 90 },
  { id: 6, name: "Popcat", price: 0.95, poolSize: 12000, pumpPercentage: 55 }
];

export const useMemeData = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [price, setPrice] = useState(INITIAL_MEMES[0].price);
  const [poolSize, setPoolSize] = useState(INITIAL_MEMES[0].poolSize);
  const [pumpPercentage, setPumpPercentage] = useState(INITIAL_MEMES[0].pumpPercentage);

  const nextMeme = () => {
    if (currentIndex < INITIAL_MEMES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      const nextMeme = INITIAL_MEMES[currentIndex + 1];
      setPrice(nextMeme.price);
      setPoolSize(nextMeme.poolSize);
      setPumpPercentage(nextMeme.pumpPercentage);
    }
  };

  return {
    currentMeme: INITIAL_MEMES[currentIndex],
    price,
    poolSize,
    pumpPercentage,
    nextMeme,
    setPrice,
    setPoolSize,
    setPumpPercentage
  };
};