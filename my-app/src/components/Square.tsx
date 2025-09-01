import React from 'react';
import type { SquareType } from '../util/logic';
import Flag from './Flag';
import Mine from './Mine';

interface SquareProps {
  squareData: SquareType;
  onClick: (square: SquareType) => void;
  onContextMenu: (e: React.MouseEvent, square: SquareType) => void;
}

const Square: React.FC<SquareProps> = ({ squareData, onClick, onContextMenu }) => {
  const renderContent = () => {

    if (squareData.state === 'flagged') 
      return <Flag />;
    if (squareData.state === 'closed') 
      return null;
    if (squareData.hasMine) 
      return <Mine />;
    if (squareData.nearMines > 0) return squareData.nearMines;
    return null;
  };

  const getCSS = () => {
    let className = 'flex items-center justify-center w-8 h-8 font-["VT323",monospace] text-2xl select-none';
    // caso: square fechado
    if (squareData.state === 'closed' || squareData.state === 'flagged') {
      className += ' bg-[#2f4156] border-r-2 border-b-2 border-t-2 border-l-2 ';
      // caso: square aberto
    } else {
      className += ' border-2 border-[#f5efeb] bg-[#c8d9e6]';
      // caso: square aberto com mina
      if (squareData.hasMine) {
        className += ' bg-red-500';
      // caso: square aberto possue minas proximas
      } else {
        switch (squareData.nearMines) { //cores por num
          case 1: 
            className += ' text-blue-700'; 
            break;
          case 2: 
            className += ' text-green-700'; 
            break;
          case 3: 
            className += ' text-red-700'; 
            break;
          case 4: 
            className += ' text-indigo-800'; 
            break;
          default: 
            className += 'text-red-700'; 
            break;
        }
      }
    }
    return className;
  };

  return (
    <button
      className={getCSS()}
      onClick={() => onClick(squareData)}
      onContextMenu={(e) => onContextMenu(e, squareData)}
      disabled={squareData.state === 'opened'}
    >
      {renderContent()}
    </button>
  );
};

export default Square;