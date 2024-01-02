import { useState } from "react";
import Square from "./Square";
function Board({ xIsNext, squares, onPlay, totalMove }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c])
        return squares[a];
    }
    return null;
  }
  let winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : "Next Turn:" + (xIsNext ? "X" : "O");
  if(totalMove===9&&winner===null)
    status="Draw";

  return (
    <div className="board-center">
      <div className="status">{status}</div>
      {Array(3).fill(null).map((_, i) => (
          <div key={i} className="board-row">
            {Array(3).fill(null).map((_, j) => {
                const squareIndex = i * 3 + j;
                return (
                  <Square key={squareIndex} value={squares[squareIndex]} onSquareClick={() => handleClick(squareIndex)} />
                );
              })}
          </div>
        ))}
    </div>
  );
}
export default Board;
