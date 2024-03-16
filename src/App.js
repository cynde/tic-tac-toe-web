import { useState } from 'react';
import './App.css';

function App() {
  const cellWidth = 85;
  const [input, setInput] = useState(null);
  const [boardSize, setBoardSize] = useState(null);
  const [spanWidth, setSpanWidth] = useState(0);

  const initialPlayer = 'O';
  const [player, setPlayer] = useState(initialPlayer);
  
  const [initialBoard, setInitialBoard] = useState(null);
  const [initialIsDisabled, setInitialIsDisabled] = useState(null);
  const [board, setBoard] = useState(null);
  const [isDisabled, setIsDisabled] = useState(null);

  const [moveCount, setMoveCount] = useState(0);
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);

  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  const handleEnterSize = () => {
    if (parseInt(input) < 3) {
      return alert('Invalid board size. Size must be more than 2');
    }

    let initialBoardArray = [];
    let initialIsDisabledArray = [];
    for (let xIndex = 0; xIndex < input; xIndex++) {
      initialBoardArray[xIndex] = [];
      initialIsDisabledArray[xIndex] = [];
      for (let yIndex = 0; yIndex < input; yIndex++) {
        initialBoardArray[xIndex][yIndex] = '+';
        initialIsDisabledArray[xIndex][yIndex] = false;
      };
    };

    setBoardSize(input);
    setInitialBoard(JSON.parse(JSON.stringify(initialBoardArray)));
    setBoard(initialBoardArray);
    setInitialIsDisabled(JSON.parse(JSON.stringify(initialIsDisabledArray)));
    setIsDisabled(initialIsDisabledArray);
    setSpanWidth(input * cellWidth);
  };

  const isWinByColumn = (selectedXIndex) => {
    for (let yIndex = 0; yIndex < boardSize; yIndex++) {
      if (board[selectedXIndex][yIndex] !== player) {
        break;
      }
      if (yIndex === boardSize - 1) {
        return true;
      }
    }
  };

  const isWinByRow = (selectedYIndex) => {
    for (let xIndex = 0; xIndex < boardSize; xIndex++) {
      if (board[xIndex][selectedYIndex] !== player) {
        break;
      }
      if (xIndex === boardSize - 1) {
        return true;
      }
    }
  };

  const isWinByDiagonal = (selectedXIndex, selectedYIndex) => {
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
  };

  const isWinByAntiDiagonal = (selectedXIndex, selectedYIndex) => {
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
  };

  const isCurrentPlayerWin = (selectedXIndex, selectedYIndex) => {
    if (
      isWinByColumn(selectedXIndex) ||
      isWinByRow(selectedYIndex) ||
      isWinByDiagonal(selectedXIndex, selectedYIndex) ||
      isWinByAntiDiagonal(selectedXIndex, selectedYIndex)
    ) {
      return true;
    }

    if (moveCount === (Math.pow(boardSize, 2) - 1)) {
      return setIsTie(true);
    }

    return false;
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

    setMoveCount(moveCount + 1);

    if (isCurrentPlayerWin(xIndex, yIndex)) {
      setWinner(player);
      alert(`${player.toUpperCase()} wins`);
      if (player === 'O') {
        return setOWinCount(oWinCount + 1);
      }
      return setXWinCount(xWinCount + 1);
    };

    const newPlayer = player === 'O' ? 'X' : 'O';
    setPlayer(newPlayer);
  };

  const getCellClassName = (cell) => {
    return (
      `btn span1${cell === 'O' ? ' btn-primary' : cell === 'X' ? ' btn-info' : ''}`
    );
  }

  return (
    <div id='tic-tac-toe'>
			<div className='span3' style={{width: spanWidth}}>
				<div className='row'>
					<h1 className='span3'>Tic Tac Toe</h1>
          {boardSize ? (
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
          ) : (
            <div className='span3'>
              <label>Board size (3 for 3x3, 9 for 9x9, etc):</label>
              <input type="number" id="size" name="size" onChange={({ target: { value }}) => setInput(value)} />
              <a href='#' className='btn-success btn' onClick={handleEnterSize}>Enter</a>
            </div>
          )}
				</div>
				{boardSize && (
          <>
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
          </>
        )}
			</div>
		</div>
  );
}

export default App;
