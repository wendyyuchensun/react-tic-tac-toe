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
  render() {
    // loop1
    const squares = this.props.squares.map((square, i) => {
      return <Square key={i} value={square} onClick={() => this.props.onClick(i)} />
    })

    // loop2
    const board = squares.reduce((board, square, i, squares) => {
      if (!(i % 3)) {
        const squaresInRow = squares.slice(i, i + 3)
        board.push(
          <div key={Math.floor(i / 3)} className="baord-row">{squaresInRow}</div>
        )
      }
      return board
    }, [])

    return (
      <div>{board}</div>
    )
  }
}

class Moves extends React.Component {
  constructor() {
    super()
    this.state = {
      ascending: true
    }
  }

  renderMoves() {
    const moves = this.props.history.map((step, move, history) => {
      let desc = move?
          `Move ${move} (last: ${step.lastMove % 3 + 1}:${Math.floor(step.lastMove / 3) + 1})`:
          'Game start'

      return (
        <li
          key={move}
          onClick={() => this.props.jumpTo(move)}
          className="move">
          {desc}
        </li>
      )
    })

    return this.state.ascending? moves:moves.reverse()
  }

  handleSort() {
    this.setState({
      ascending: !this.state.ascending
    })
  }

  render() {
    return (
      <div>
        <button className="sort" onClick={() => this.handleSort()}>
          {this.state.ascending? 'Descending':'Ascending'}
        </button>
        <ol>
          {this.renderMoves()}
        </ol>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          lastMove: null
        }
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
      history: history.concat([{
        squares: squares,
        lastMove: i
      }]),
      xIsNext: !xIsNext
    })
  }

  jumpTo(move) {
    if (move === this.state.history.length - 1) return
    this.setState({
      history: this.state.history.slice(0, move + 1),
      xIsNext: move % 2? false:true
    })
  }

  render() {
    const history = this.state.history,
          current = history[history.length - 1],
          xIsNext = this.state.xIsNext,
          winner = calcWinner(current.squares)

    let status, newGame = true
    if (winner) {
      status = `Winner: ${winner}`
    } else if (history.length > 9) {
      status = 'Tie'
    } else {
      status = `Next player: ${xIsNext? 'X':'O'}`
      newGame = false
    }

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
          <Moves
            history={history}
            jumpTo={move => this.jumpTo(move)} />
          <a href="" className="newGame">{newGame? 'New Game':null}</a>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.querySelector('main')
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
