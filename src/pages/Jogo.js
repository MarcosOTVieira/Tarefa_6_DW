import { useState } from 'react';
import '../css/Jogo.css';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Status({ winner, xIsNext }) {
  return (
    <div className="status">
      {winner ? 'Vencedor: ' + winner : 'Próximo jogador: ' + (xIsNext ? 'X' : 'O')}
    </div>
  );
}

function Board({ squares, onPlay }) {
  return (
    <div className="board">
      {[0, 3, 6].map((rowStart) => (
        <div className="board-row" key={rowStart}>
          {[0, 1, 2].map((col) => {
            const i = rowStart + col;
            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => onPlay(i)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function MoveHistory({ history, onJumpTo }) {
  return (
    <ol className="moveList">
      {history.map((_, move) => (
        <li key={move}>
          <button className="moveBtn" onClick={() => onJumpTo(move)}>
            {move === 0 ? 'Início do jogo' : `Jogada #${move}`}
          </button>
        </li>
      ))}
    </ol>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  const handlePlay = (i) => {
    if (winner || currentSquares[i]) return;

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (move) => setCurrentMove(move);

  return (
    <div className="divMain">
      <h1 className="h1Jogo">JOGO DA VELHA</h1>
      <div className="gameContainer">
        <Status winner={winner} xIsNext={xIsNext} />
        <Board squares={currentSquares} onPlay={handlePlay} />
        <div className="gameHistoryContainer">
          <MoveHistory history={history} onJumpTo={jumpTo} />
        </div>
      </div>
    </div>
  );
}