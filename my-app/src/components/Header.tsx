import React from 'react';
import flagIm from './bandeira.png';
import smileIm from './sorrindo.png';
import glassIm from './oculos.png';
import deadIm from './morreu.png'

type GameStatus = 'playing' | 'won' | 'lost';

interface HeaderProps {
  flagsCount: number;
  gameStatus: GameStatus;
  onRestart: () => void;
}

const Header: React.FC<HeaderProps> = ({ flagsCount, gameStatus, onRestart }) => {

  let imagem;

  if (gameStatus === 'playing') {
    imagem = smileIm;
  } else if (gameStatus === 'won') {
    imagem = glassIm;
  } else {
    imagem = deadIm;
  }



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
        <img src={flagIm} alt="bandeira" className="w-7 h-full" />
        <span>{String(flagsCount).padStart(3, '0')}</span>
      </div>
      
      <button onClick={onRestart} className="text-4x1">
        <img src={imagem} alt="carinha" className=' w-7 h-full'/>
      </button>

    </div>
  );
};

export default Header;