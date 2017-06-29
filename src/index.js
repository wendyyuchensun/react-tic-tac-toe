import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

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
      ]
    }
  }

  onClick(i) {
    const history = this.state.history,
          current = history[history.length - 1],
          squares = current.squares.slice()

    squares[i] = 'X'
    this.setState({
      history: history.concat([{squares: squares}])
    })
  }

  render() {
    const history = this.state.history,
          current = history[history.length - 1]

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.onClick(i)}
          />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.querySelector('#root')
)
