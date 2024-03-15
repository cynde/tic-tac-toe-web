import './App.css';

function App() {
  return (
    <div id="tic-tac-toe">
			<div className="span3 new_span">
				<div className="row">
					<h1 className="span3">Tic Tac Toe</h1>
					<div className="span3">
						<div className="input-prepend input-append">
							<span className="add-on win_text">O won</span>
							<strong id="o_win" className="win_times add-on">0</strong>
							<span className="add-on">time(s)</span>
						</div>
						<div className="input-prepend input-append">
							<span className="add-on win_text">X won</span>
							<strong id="x_win" className="win_times add-on">0</strong>
							<span className="add-on">time(s)</span>
						</div>
					</div>
				</div>
				<ul className="row" id="game">
					<li id="one" className="btn span1">+</li>
					<li id="two" className="btn span1">+</li>
					<li id="three" className="btn span1">+</li>
					<li id="four" className="btn span1">+</li>
					<li id="five" className="btn span1">+</li>
					<li id="six" className="btn span1">+</li>
					<li id="seven" className="btn span1">+</li>
					<li id="eight" className="btn span1">+</li>
					<li id="nine" className="btn span1">+</li>
				</ul>
				<div className="clr">&nbsp;</div>
				<div className="row">
					<a href="#" id="reset" className="btn-success btn span3">Restart</a>
				</div>
			</div>
		</div>
  );
}

export default App;
