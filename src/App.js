import { useState } from 'react';
import './App.css';

function App() {
  const initialPlayer = 'o';
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

  const [count, setCount] = useState(0);
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);

  const handleRestart = () => {
    setPlayer(initialPlayer);
    setBoard(initialBoard);
    setIsDisabled(initialIsDisabled);
    setCount(0);
  };

  const handleCellClick = (xIndex, yIndex) => {
    if (isDisabled[xIndex][yIndex]) {
      return alert('Already selected');
    }

    board[xIndex][yIndex] = player;
    setBoard(board);

    isDisabled[xIndex][yIndex] = true;
    setIsDisabled(isDisabled);

    const newPlayer = player === 'o' ? 'x' : 'o';
    setPlayer(newPlayer);

    setCount(count + 1);
  };

  const getCellClassName = (cell) => {
    return (
      `btn span1${cell === 'o' ? ' btn-primary' : cell === 'x' ? ' btn-info' : ''}`
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
