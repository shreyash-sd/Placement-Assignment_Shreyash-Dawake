import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    };
  }

  handleClick(index) {
    if (this.state.board[index] || this.state.winner) {
      return;
    }

    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentPlayer;

    const winner = this.calculateWinner(newBoard);
    const currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';

    this.setState({
      board: newBoard,
      currentPlayer,
      winner,
    });
  }

  calculateWinner(board) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  render() {
    const { board, currentPlayer, winner } = this.state;

    const squares = board.map((value, index) => (
      <button key={index} onClick={() => this.handleClick(index)}>
        {value}
      </button>
    ));

    let status;
    if (winner) {
      status = `Player ${winner} wins!`;
    } else if (board.every((value) => value)) {
      status = "It's a draw!";
    } else {
      status = `Next player: ${currentPlayer}`;
    }

    return (
      <div className="game">
        <div className="board">{squares}</div>
        <div className="status">{status}</div>
      </div>
    );
  }
}

export default App;
