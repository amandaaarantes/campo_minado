import React, { useState, useEffect, useCallback } from 'react';
import { retornaMatriz, sorteiaMinas, contarBombas } from '../util/logic';
import type { SquareType } from '../util/logic';

import Header from '../components/Header';
import Board from '../components/Board';

const ROWS = 20;
const COLS = 20;
const MINES = 60;

type GameStatus = 'playing' | 'won' | 'lost';

const createBoard = () => {
  const newBoard = retornaMatriz(ROWS, COLS);
  sorteiaMinas(newBoard, MINES);
  contarBombas(newBoard);

  return newBoard;
};

const Home: React.FC = () => {
  const [board, setBoard] = useState<SquareType[][]>(createBoard
  
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [flagsCount, setFlagsCount] = useState<number>(MINES);

  const handleRestart = () => {
    setBoard(createBoard
    ());
    setGameStatus('playing');
    setFlagsCount(MINES);
  };

  const revealSquares = useCallback((boardCopy: SquareType[][], row: number, col: number) => {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return;
    const square = boardCopy[row][col];
    if (square.state !== 'closed') return;
    square.state = 'opened';
    if (square.nearMines === 0 && !square.hasMine) { 
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (dr !== 0 || dc !== 0) revealSquares(boardCopy, row + dr, col + dc);
      }
    }
  }, []);

  const handleSquareClick = (square: SquareType) => {
    if (gameStatus !== 'playing' || square.state !== 'closed') return;
    const boardCopy = JSON.parse(JSON.stringify(board));
    if (square.hasMine) {
      setGameStatus('lost');
      boardCopy.flat().forEach((sq: SquareType) => { if (sq.hasMine) sq.state = 'opened'; });
      setBoard(boardCopy);
      return;
    }
    revealSquares(boardCopy, square.row, square.column);
    setBoard(boardCopy);
  };
  
  const handleContextMenu = (e: React.MouseEvent, square: SquareType) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || square.state === 'opened') return;
    const boardCopy = JSON.parse(JSON.stringify(board));
    const clickedSquare = boardCopy[square.row][square.column];
    if (clickedSquare.state === 'closed' && flagsCount > 0) {
      clickedSquare.state = 'flagged';
      setFlagsCount(flagsCount - 1);
    } else if (clickedSquare.state === 'flagged') {
      clickedSquare.state = 'closed';
      setFlagsCount(flagsCount + 1);
    }
    setBoard(boardCopy);
  };

  const checkWinCondition = useCallback(() => {
    if (gameStatus !== 'playing') return;
    const nonMineSquares = board.flat().filter(sq => !sq.hasMine);
    if (nonMineSquares.every(sq => sq.state === 'opened')) {
      setGameStatus('won');
    }
  }, [board, gameStatus]);

  useEffect(() => { checkWinCondition(); }, [board, checkWinCondition]);

  return (
    
    <div className="
    bg-[#c8d9e6]
    rounded-lg 
    p-4 
    shadow-xl 
    flex 
    flex-col 
    items-center 
    max-w-fit 
    mx-auto 
    my-8">

      <div className="
      flex 
      justify-between 
      items-center 
      w-full 
      mb-2">
        <h1 className="
        text-4xl 
        font-bold 
        text-gray-800">
          Campo Minado
          </h1>
        <Header flagsCount={flagsCount} gameStatus={gameStatus} onRestart={handleRestart} />
      </div>

      <Board boardData={board} onSquareClick={handleSquareClick} onContextMenu={handleContextMenu} />
      
      {gameStatus !== 'playing' && (
        <div className="
        fixed 
        inset-0 
        flex 
        items-center 
        justify-center 
        bg-black 
        bg-opacity-60 
        z-50">
          <div className="
          bg-[#2f4156]
          p-8 
          rounded-lg 
          shadow-xl 
          text-center 
          text-[#c8d9e6]">
            <h2 className="text-4xl font-bold mb-4">
              {gameStatus === 'won' ? 'Você Venceu!' : 'Você Perdeu!'}
            </h2>
            <button onClick={handleRestart} className="
            mt-4 
            px-6 
            py-3 
            bg-[#c8d9e6] 
            rounded-lg 
            text-lg 
            text-[#2f4156]
            font-semibold">
              Jogar Novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;