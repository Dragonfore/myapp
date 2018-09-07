import React from 'react'
import TotalScore from './TotalScore'

function Score(props) {
  return (
    <div>
      <button
        onClick={() => props.onChangeScore(props.index, props.player, -1)}>
        -1
      </button>
      <span>{props.score}</span>
      <button onClick={() => props.onChangeScore(props.index, props.player, 1)}>
        +1
      </button>
    </div>
  )
}

class ScoreBoard extends React.Component {
  state = {
    newPlayer: '',
    players: ['jonathan', 'kaileen'],
    scores: [{ jonathan: 4, kaileen: 5 }, { jonathan: 2, kaileen: 4 }]
  }

  addRound = () => {
    const newRound = { jonathan: 0, kaileen: 0 }
    const scores = [...this.state.scores, newRound]
    this.setState({ scores: scores })
  }

  changeScore = (index, player, score) => {
    const scores = JSON.parse(JSON.stringify(this.state.scores))
    scores[index][player] = scores[index][player]
      ? scores[index][player] + score
      : score

    this.setState({ scores: scores })
  }

  updateNewPlayer = event => {
      this.setState({newPlayer: event.target.value})
  }

  addNewPlayer = event => {
      event.preventDefault()
      const players = [...this.state.players, this.state.newPlayer]
      this.setState({ players: players, newPlayer: ''})
  }

  render() {
    const style = { width: '100%' }
    return (
      <div>
        <form onSubmit={this.addNewPlayer}>
          <input value={this.state.newPlayer} onChange={this.updateNewPlayer}/>
          <button>Add Player</button>
        </form>
        <table style={style}>
          <thead>
            <tr>
              <th />
              {this.state.players.map(player => <th key={player}>{player}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.state.scores.map((score, i) => (
              <tr key={i}>
                <td>Round {i + 1}</td>
                {this.state.players.map(player => (
                  <td key={player}>
                    <Score
                      player={player}
                      index={i}
                      score={score[player]}
                      onChangeScore={this.changeScore}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td colSpan={this.state.players.length + 1}>
                <button onClick={this.addRound}>
                  Add round {this.state.scores.length + 1}
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              {this.state.players.map(player => (
                <th key={player}>
                  <TotalScore scores={this.state.scores} player={player} />
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default ScoreBoard