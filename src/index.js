import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './extra.css'

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
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
    )
  }
}

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      history: [
        {squares: Array(9).fill(null)}
      ],
      xIsNext: true
    }
  }

  onClick(i) {
    const history = this.state.history,
          current = history[history.length - 1],
          squares = current.squares.slice(),
          xIsNext = this.state.xIsNext

    if (squares[i] || calcWinner(squares)) return

    squares[i] = xIsNext? 'X':'O'
    this.setState({
      history: history.concat([{squares: squares}]),
      xIsNext: !xIsNext
    })
  }

  render() {
    const history = this.state.history,
          current = history[history.length - 1],
          xIsNext = this.state.xIsNext,
          winner = calcWinner(current.squares)

    let status, newGame = false
    if (winner) {
      status = `Winner: ${winner}`
      newGame = true
    }
    else if (history.length > 9){
      status = 'Tie'
      newGame = true
    }
    else status = `Next player: ${xIsNext? 'X':'O'}`

    const moves = history.map((step, move) => {
      const desc = move? `Move ${move}`:'Game start'
      return (
        <li key={move} className="move">{desc}</li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.onClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
          <a href="" className="newGame">{newGame? 'New Game':null}</a>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.querySelector('#root')
)

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null // no winner at this point
}
