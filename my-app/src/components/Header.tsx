import React from 'react';
import flagIm from './bandeira.png';

type GameStatus = 'playing' | 'won' | 'lost';

interface HeaderProps {
  flagsCount: number;
  gameStatus: GameStatus;
  onRestart: () => void;
}

const Header: React.FC<HeaderProps> = ({ flagsCount, gameStatus, onRestart }) => {
  return (
    <div className="
    flex 
    items-center 
    gap-4 
    bg-[#2f4156]
    text-[#f5efe8]
    rounded-md 
    px-3 
    py-1 
    ">
      
      <div className="
      flex 
      items-center 
      gap-1 
      font-bold 
      font-mono">
        <img src={flagIm} alt="bandeira" className="w-full h-full" />
        <span>{String(flagsCount).padStart(3, '0')}</span>
      </div>
      
      <button onClick={onRestart} className="text-2xl">
        {gameStatus === 'playing' && '🙂'}
        {gameStatus === 'won' && '😎'}
        {gameStatus === 'lost' && '😵'}
      </button>

    </div>
  );
};

export default Header;