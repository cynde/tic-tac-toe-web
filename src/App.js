import { useState } from 'react';
import './App.css';

function App() {
  const boardSize = 3;
  const initialPlayer = 'O';
  const initialBoard = [
    ['+', '+', '+'],
    ['+', '+', '+'],
    ['+', '+', '+']
  ];
  const initialIsDisabled = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
  ];

  const [player, setPlayer] = useState(initialPlayer);
  const [board, setBoard] = useState(initialBoard);
  const [isDisabled, setIsDisabled] = useState(initialIsDisabled);

  const [moveCount, setMoveCount] = useState(0);
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);

  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  const isCurrentPlayerWin = (selectedXIndex, selectedYIndex) => {
    for (let yIndex = 0; yIndex < boardSize; yIndex++) {
      if (board[selectedXIndex][yIndex] !== player) {
        break;
      }
      if (yIndex === boardSize - 1) {
        return true;
      }
    }

    for (let xIndex = 0; xIndex < boardSize; xIndex++) {
      if (board[xIndex][selectedYIndex] !== player) {
        break;
      }
      if (xIndex === boardSize - 1) {
        return true;
      }
    }

    if (selectedXIndex === selectedYIndex) {
      for (let index = 0; index < boardSize; index++) {
        if (board[index][index] !== player) {
          break;
        }
        if (index === boardSize - 1) {
          return true;
        }
      }
    }

    if (selectedXIndex + selectedYIndex === boardSize - 1) {
      for (let index = 0; index < boardSize; index++) {
        if (board[index][(boardSize - 1) - index] !== player) {
          break;
        }
        if (index === boardSize - 1) {
          return true;
        }
      }
    }

    if (moveCount === (Math.pow(boardSize, 2) - 1)) {
      setIsTie(true);
    }
  };

  const handleRestart = () => {
    setPlayer(initialPlayer);
    setBoard(initialBoard);
    setIsDisabled(initialIsDisabled);
    setMoveCount(0);
    setWinner(null);
    setIsTie(false);
  };

  const handleCellClick = (xIndex, yIndex) => {
    if (winner) {
      alert(`${winner.toUpperCase()} has won the game. Start a new game`);
      return handleRestart();
    }

    if (isTie) {
      alert('Its a tie. It will restart.');
      return handleRestart();
    }

    if (isDisabled[xIndex][yIndex]) {
      return alert('Already selected');
    }

    board[xIndex][yIndex] = player;
    setBoard(board);

    isDisabled[xIndex][yIndex] = true;
    setIsDisabled(isDisabled);

    const newPlayer = player === 'O' ? 'X' : 'O';
    setPlayer(newPlayer);

    setMoveCount(moveCount + 1);

    if (isCurrentPlayerWin(xIndex, yIndex)) {
      setWinner(player);
      alert(`${player.toUpperCase()} wins`);
    };
  };

  const getCellClassName = (cell) => {
    return (
      `btn span1${cell === 'O' ? ' btn-primary' : cell === 'X' ? ' btn-info' : ''}`
    );
  }

  return (
    <div id='tic-tac-toe'>
			<div className='span3 new_span'>
				<div className='row'>
					<h1 className='span3'>Tic Tac Toe</h1>
					<div className='span3'>
						<div className='input-prepend input-append'>
							<span className='add-on win_text'>O won</span>
							<strong id='o_win' className='win_times add-on'>{oWinCount}</strong>
							<span className='add-on'>time(s)</span>
						</div>
						<div className='input-prepend input-append'>
							<span className='add-on win_text'>X won</span>
							<strong id='x_win' className='win_times add-on'>{xWinCount}</strong>
							<span className='add-on'>time(s)</span>
						</div>
					</div>
				</div>
				<ul className='row' id='game'>
          {board.map((row, xIndex) => (
            row.map((cell, yIndex) => (
              <li key={xIndex + yIndex} className={getCellClassName(cell)} onClick={() => handleCellClick(xIndex, yIndex)}>{cell}</li>
            ))
          ))}
				</ul>
				<div className='clr'>&nbsp;</div>
				<div className='row'>
					<a href='#' id='reset' className='btn-success btn span3' onClick={handleRestart}>Restart</a>
				</div>
			</div>
		</div>
  );
}

export default App;
