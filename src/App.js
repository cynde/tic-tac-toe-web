import { useState } from 'react';
import './App.css';

function App() {
  const initialPlayer = 'o';
  const initialBoard = ['+', '+', '+', '+', '+', '+', '+', '+', '+'];
  const initialIsDisabled = [false, false, false, false, false, false, false, false, false];

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

  const handleCellClick = (selectedIndex) => {
    if (isDisabled[selectedIndex]) {
      return alert('Already selected');
    }

    const newBoard = board.map((cell, index) => {
      if (index === selectedIndex) {
        return player;
      }
      return cell;
    });
    setBoard(newBoard);

    const newIsDisabled = isDisabled.map((cellIsDisabled, index) => {
      if (index === selectedIndex) {
        return true;
      }
      return cellIsDisabled;
    })
    setIsDisabled(newIsDisabled);

    const newPlayer = player === 'o' ? 'x' : 'o';
    setPlayer(newPlayer);

    setCount(count + 1);
  };

  const getCellClassName = (cell, index) => {
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
          {board.map((cell, index) => (
            <li id={index} className={getCellClassName(cell, index)} onClick={() => handleCellClick(index)}>{cell}</li>
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
