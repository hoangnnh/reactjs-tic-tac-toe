import React from "react";
import ReactDOM from "react-dom/client";

import { detectWinner, getSquareCoordinates } from "./helpers";

import "./index.css";

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      coordinates: [],
      order: [],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (detectWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    const { order, coordinates } = this.state;
    order.push(i);

    const { col, row } = getSquareCoordinates(i);

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      coordinates:
        this.state.stepNumber !== coordinates.length
          ? coordinates
              .slice(0, this.state.stepNumber)
              .concat([{ col: col, row: row }])
          : coordinates.concat([
              {
                col: col,
                row: row,
              },
            ]),
      order:
        this.state.stepNumber !== order
          ? order.slice(0, this.state.stepNumber).concat(i)
          : order.concat(i),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const { history, order, coordinates } = this.state;
    const current = history[this.state.stepNumber];
    const winner = detectWinner(current.squares);

    const moves = history.map((step, move) => {
      const col = move !== 0 ? coordinates[move - 1].col : "";
      const row = move !== 0 ? coordinates[move - 1].row : "";

      const player =
        move !== 0 ? history[history.length - 1].squares[order[move - 1]] : "";

      const description = move
        ? `Step #${move}: ${player} (${col}, ${row})`
        : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (!winner && !current.squares.includes(null)) {
      status = "Game draw";
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
