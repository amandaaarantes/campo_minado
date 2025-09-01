import React from 'react';
import type { SquareType } from '../util/logic';
import Square from './Square';

interface BoardProps {
  boardData: SquareType[][];
  onSquareClick: (square: SquareType) => void;
  onContextMenu: (e: React.MouseEvent, square: SquareType) => void;
}

const Board: React.FC<BoardProps> = ({ boardData, onSquareClick, onContextMenu }) => {
  return (
    <div className="
    border-[#2f4156]
    p-1 
    border-2 
    bg-[#c8d9e6] 
    shadow-lg">

      {boardData.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((squareData) => (
            <Square
              key={`${squareData.row}-${squareData.column}`}
              squareData={squareData}
              onClick={onSquareClick}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;

