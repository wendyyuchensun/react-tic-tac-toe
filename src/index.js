import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
  render() {
    return (
      <button className="square"></button>
    )
  }
}

class Board extends React.Component {
  renderSquare() {
    return (
      <Square />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className="board-row">
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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
